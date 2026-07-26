import { useState } from "react";

export interface TableSchema {
  id: string;
  name: string;
  columns: string[];
  rows: Record<string, any>[];
}

export interface TableRelation {
  id: string;
  sourceTable: string;
  targetTable: string;
  sourceColumn: string;
}

export interface EngineResponse {
  success: boolean;
  message: string;
}

// 👈 1. Nouvelle interface pour chaque entrée dans l'historique
export interface LogEntry {
  id: string;
  command: string;
  success: boolean;
  message: string;
  timestamp: string;
}

export function useSqlEngine(initialTables: TableSchema[] = []) {
  const [tables, setTables] = useState<TableSchema[]>(initialTables);
  const [relations, setRelations] = useState<TableRelation[]>([]);
  // 👈 2. Nouvel état pour l'historique
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const detectRelations = (currentTables: TableSchema[]) => {
    const newRelations: TableRelation[] = [];

    currentTables.forEach((table) => {
      table.columns.forEach((col) => {
        const lowerCol = col.toLowerCase();
        if (lowerCol.endsWith("_id") && lowerCol !== "id") {
          const targetTableName = lowerCol.replace("_id", "");
          const targetTable = currentTables.find(
            (t) => t.name.toLowerCase() === targetTableName
          );

          if (targetTable) {
            newRelations.push({
              id: `${table.id}-${targetTable.id}-${col}`,
              sourceTable: table.id,
              targetTable: targetTable.id,
              sourceColumn: col,
            });
          }
        }
      });
    });

    setRelations(newRelations);
  };

  const resetWorkspace = () => {
    setTables([]);
    setRelations([]);
    setLogs([]); // Vide aussi les logs
  };

  // Helper pour ajouter une entrée dans l'historique
  const addLog = (command: string, response: EngineResponse) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      command,
      success: response.success,
      message: response.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const executeCommand = (rawCommand: string): EngineResponse => {
    const command = rawCommand.trim().replace(/;$/, "");
    if (!command) {
      const res = { success: false, message: "La commande est vide." };
      addLog(rawCommand, res);
      return res;
    }

    const upperCmd = command.toUpperCase();
    let response: EngineResponse = { success: false, message: "Commande non reconnue." };

    // 1. CREATE TABLE
    if (upperCmd.startsWith("CREATE TABLE")) {
      const match = command.match(/^CREATE\s+TABLE\s+([a-zA-Z0-9_]+)\s*\((.+)\)$/i);
      if (!match) {
        response = {
          success: false,
          message: "Syntaxe incorrecte. Exemple: CREATE TABLE users (id, name)",
        };
      } else {
        const tableName = match[1];
        const columns = match[2].split(",").map((c) => c.trim());
        const exists = tables.some((t) => t.name.toLowerCase() === tableName.toLowerCase());

        if (exists) {
          response = { success: false, message: `La table "${tableName}" existe déjà.` };
        } else {
          const newTable: TableSchema = {
            id: tableName.toLowerCase(),
            name: tableName,
            columns,
            rows: [],
          };
          const updatedTables = [...tables, newTable];
          setTables(updatedTables);
          detectRelations(updatedTables);
          response = { success: true, message: `Table "${tableName}" créée avec succès.` };
        }
      }
    }

    // 2. INSERT INTO
    else if (upperCmd.startsWith("INSERT INTO")) {
      const match = command.match(
        /^INSERT\s+INTO\s+([a-zA-Z0-9_]+)\s*(?:\((.+)\))?\s*VALUES\s*\((.+)\)$/i
      );

      if (!match) {
        response = {
          success: false,
          message: "Syntaxe incorrecte. Exemple: INSERT INTO users (name) VALUES ('Alice')",
        };
      } else {
        const tableName = match[1];
        const columnsRaw = match[2];
        const valuesRaw = match[3];

        const tableIndex = tables.findIndex((t) => t.name.toLowerCase() === tableName.toLowerCase());
        if (tableIndex === -1) {
          response = { success: false, message: `La table "${tableName}" n'existe pas.` };
        } else {
          const targetTable = tables[tableIndex];
          const values = valuesRaw.split(",").map((v) => v.trim().replace(/^['"]|['"]$/g, ""));
          const newRow: Record<string, any> = { id: Date.now() };

          if (columnsRaw) {
            const cols = columnsRaw.split(",").map((c) => c.trim());
            cols.forEach((col, idx) => {
              newRow[col] = values[idx] || null;
            });
          } else {
            targetTable.columns.forEach((col, idx) => {
              newRow[col] = values[idx] || null;
            });
          }

          setTables((prev) => {
            const updated = [...prev];
            updated[tableIndex] = {
              ...updated[tableIndex],
              rows: [...updated[tableIndex].rows, newRow],
            };
            return updated;
          });
          response = { success: true, message: `Ligne insérée dans "${tableName}".` };
        }
      }
    }

    // 3. ALTER TABLE
    else if (upperCmd.startsWith("ALTER TABLE")) {
      const match = command.match(/^ALTER\s+TABLE\s+([a-zA-Z0-9_]+)\s+ADD\s+(?:COLUMN\s+)?([a-zA-Z0-9_]+)$/i);
      if (!match) {
        response = {
          success: false,
          message: "Syntaxe incorrecte. Exemple: ALTER TABLE users ADD age",
        };
      } else {
        const tableName = match[1];
        const columnName = match[2];
        const tableIndex = tables.findIndex((t) => t.name.toLowerCase() === tableName.toLowerCase());

        if (tableIndex === -1) {
          response = { success: false, message: `La table "${tableName}" n'existe pas.` };
        } else {
          let updatedTables = [...tables];
          const targetTable = updatedTables[tableIndex];

          if (!targetTable.columns.includes(columnName)) {
            updatedTables[tableIndex] = {
              ...targetTable,
              columns: [...targetTable.columns, columnName],
            };
            setTables(updatedTables);
            detectRelations(updatedTables);
          }
          response = { success: true, message: `Colonne "${columnName}" ajoutée à "${tableName}".` };
        }
      }
    }

    // 4. DROP TABLE
    else if (upperCmd.startsWith("DROP TABLE")) {
      const match = command.match(/^DROP\s+TABLE\s+([a-zA-Z0-9_]+)$/i);
      if (!match) {
        response = {
          success: false,
          message: "Syntaxe incorrecte. Exemple: DROP TABLE users",
        };
      } else {
        const tableName = match[1];
        const exists = tables.some((t) => t.name.toLowerCase() === tableName.toLowerCase());

        if (!exists) {
          response = { success: false, message: `La table "${tableName}" n'existe pas.` };
        } else {
          const updatedTables = tables.filter((t) => t.name.toLowerCase() !== tableName.toLowerCase());
          setTables(updatedTables);
          detectRelations(updatedTables);
          response = { success: true, message: `Table "${tableName}" supprimée avec succès.` };
        }
      }
    }

    // Enregistrer le log
    addLog(rawCommand, response);
    return response;
  };

  return {
    tables,
    relations,
    logs, // 👈 Export des logs
    executeCommand,
    resetWorkspace,
    setTables,
  };
}