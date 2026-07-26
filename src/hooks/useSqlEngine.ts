import { useState } from "react";

export interface TableSchema {
  id: string;
  name: string;
  columns: string[];
  rows: Record<string, any>[];
}

export interface TableRelation {
  id: string;
  sourceTable: string; // Ex: "orders"
  targetTable: string; // Ex: "users"
  sourceColumn: string; // Ex: "user_id"
}

export interface EngineResponse {
  success: boolean;
  message: string;
}

export function useSqlEngine(initialTables: TableSchema[] = []) {
  const [tables, setTables] = useState<TableSchema[]>(initialTables);
  const [relations, setRelations] = useState<TableRelation[]>([]);

  // Fonction interne pour détecter et créer automatiquement des relations
  const detectRelations = (currentTables: TableSchema[]) => {
    const newRelations: TableRelation[] = [];

    currentTables.forEach((table) => {
      table.columns.forEach((col) => {
        const lowerCol = col.toLowerCase();
        // Si la colonne se termine par _id (ex: user_id) et n'est pas "id" tout court
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

  const executeCommand = (rawCommand: string): EngineResponse => {
    const command = rawCommand.trim().replace(/;$/, "");
    if (!command) {
      return { success: false, message: "La commande est vide." };
    }

    const upperCmd = command.toUpperCase();

    // -------------------------------------------------------------
    // 1. CREATE TABLE <name> (<col1>, <col2>, ...)
    // -------------------------------------------------------------
    if (upperCmd.startsWith("CREATE TABLE")) {
      const match = command.match(/^CREATE\s+TABLE\s+([a-zA-Z0-9_]+)\s*\((.+)\)$/i);
      if (!match) {
        return {
          success: false,
          message: "Sintaxe incorrecte. Exemple: CREATE TABLE users (id, name)",
        };
      }

      const tableName = match[1];
      const columns = match[2].split(",").map((c) => c.trim());

      const exists = tables.some((t) => t.name.toLowerCase() === tableName.toLowerCase());
      if (exists) {
        return { success: false, message: `La table "${tableName}" existe déjà.` };
      }

      const newTable: TableSchema = {
        id: tableName.toLowerCase(),
        name: tableName,
        columns,
        rows: [],
      };

      const updatedTables = [...tables, newTable];
      setTables(updatedTables);
      detectRelations(updatedTables);

      return { success: true, message: `Table "${tableName}" créée avec succès.` };
    }

    // -------------------------------------------------------------
    // 2. INSERT INTO <name> (<cols>) VALUES (<vals>)
    // -------------------------------------------------------------
    if (upperCmd.startsWith("INSERT INTO")) {
      const match = command.match(
        /^INSERT\s+INTO\s+([a-zA-Z0-9_]+)\s*(?:\((.+)\))?\s*VALUES\s*\((.+)\)$/i
      );

      if (!match) {
        return {
          success: false,
          message: "Sintaxe incorrecte. Exemple: INSERT INTO users (name) VALUES ('Alice')",
        };
      }

      const tableName = match[1];
      const columnsRaw = match[2];
      const valuesRaw = match[3];

      const tableIndex = tables.findIndex((t) => t.name.toLowerCase() === tableName.toLowerCase());
      if (tableIndex === -1) {
        return { success: false, message: `La table "${tableName}" n'existe pas.` };
      }

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

      return { success: true, message: `Ligne insérée dans "${tableName}".` };
    }

    // -------------------------------------------------------------
    // 3. ALTER TABLE <name> ADD <col>
    // -------------------------------------------------------------
    if (upperCmd.startsWith("ALTER TABLE")) {
      const match = command.match(/^ALTER\s+TABLE\s+([a-zA-Z0-9_]+)\s+ADD\s+(?:COLUMN\s+)?([a-zA-Z0-9_]+)$/i);
      if (!match) {
        return {
          success: false,
          message: "Sintaxe incorrecte. Exemple: ALTER TABLE users ADD age",
        };
      }

      const tableName = match[1];
      const columnName = match[2];
      const tableIndex = tables.findIndex((t) => t.name.toLowerCase() === tableName.toLowerCase());

      if (tableIndex === -1) {
        return { success: false, message: `La table "${tableName}" n'existe pas.` };
      }

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

      return { success: true, message: `Colonne "${columnName}" ajoutée à "${tableName}".` };
    }

    // -------------------------------------------------------------
    // 4. DROP TABLE <name>
    // -------------------------------------------------------------
    if (upperCmd.startsWith("DROP TABLE")) {
      const match = command.match(/^DROP\s+TABLE\s+([a-zA-Z0-9_]+)$/i);
      if (!match) {
        return {
          success: false,
          message: "Syntaxe incorrecte. Exemple: DROP TABLE users",
        };
      }

      const tableName = match[1];
      const exists = tables.some((t) => t.name.toLowerCase() === tableName.toLowerCase());

      if (!exists) {
        return { success: false, message: `La table "${tableName}" n'existe pas.` };
      }

      // Action: Supprimer la table de l'état
      setTables((prev) => prev.filter((t) => t.name.toLowerCase() !== tableName.toLowerCase()));

      return { success: true, message: `Table "${tableName}" supprimée avec succès.` };
    }

    return {
      success: false,
      message: `Commande non reconnue : "${command}"`,
    };
  };

  return {
    tables,
    relations, // Export des relations
    executeCommand,
  };
}