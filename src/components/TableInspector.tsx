"use client";

import { TableSchema } from "@/hooks/useSqlEngine";
import { X, Table, Plus, Database, Key } from "lucide-react";
import { useState } from "react";

interface TableInspectorProps {
  table: TableSchema | null;
  onClose: () => void;
  onExecuteCommand: (sql: string) => void;
}

export function TableInspector({ table, onClose, onExecuteCommand }: TableInspectorProps) {
  const [newRowData, setNewRowData] = useState<Record<string, string>>({});

  if (!table) return null;

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Filtrer uniquement les colonnes pour lesquelles une valeur a été saisie
    const filledCols = table.columns.filter(
      (col) => newRowData[col] !== undefined && newRowData[col].trim() !== ""
    );

    if (filledCols.length === 0) return;

    // 2. Formater les valeurs
    const values = filledCols.map((col) => {
      const val = newRowData[col].trim();
      // Si la valeur est un nombre pur, on ne met pas de guillemets
      return !isNaN(Number(val)) && val !== "" ? val : `'${val}'`;
    });

    // 3. Générer le SQL au format : INSERT INTO users (col1, col2) VALUES ('val1', 'val2')
    const sql = `INSERT INTO ${table.name} (${filledCols.join(", ")}) VALUES (${values.join(", ")})`;
    
    onExecuteCommand(sql);
    setNewRowData({});
  };

  return (
    <aside className="fixed right-6 top-20 bottom-24 w-96 bg-[#121520]/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/40">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">{table.name}</h3>
            <span className="text-[10px] text-slate-400 font-mono">
              {table.rows.length} enregistrement(s)
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Contenu principal / Table de données */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Structure du Schéma */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Colonnes ({table.columns.length})
          </span>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            {table.columns.map((col, idx) => (
              <div
                key={col}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#090b11] border border-slate-800/80 rounded-lg text-slate-300"
              >
                {idx === 0 || col.toLowerCase() === "id" ? (
                  <Key className="w-3 h-3 text-amber-400 shrink-0" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                )}
                <span className="truncate">{col}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Données (Rows) */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Données de la table
          </span>

          {table.rows.length === 0 ? (
            <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center space-y-2">
              <Database className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-500">Aucune donnée insérée pour le moment.</p>
            </div>
          ) : (
            <div className="border border-slate-800 rounded-xl overflow-x-auto bg-[#090b11]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                    {table.columns.map((col) => (
                      <th key={col} className="p-2.5 font-semibold text-[11px]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {table.rows.map((row, rIndex) => (
                    <tr key={rIndex} className="hover:bg-slate-800/30 transition">
                      {table.columns.map((col) => (
                        <td key={col} className="p-2.5 whitespace-nowrap">
                          {row[col] !== undefined && row[col] !== null ? (
                            String(row[col])
                          ) : (
                            <span className="text-slate-600">null</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Formulaire rapide pour ajouter une ligne */}
        <form onSubmit={handleAddRow} className="space-y-3 pt-2 border-t border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Plus className="w-3 h-3 text-blue-400" /> Insérer une ligne
          </span>

          <div className="space-y-2">
            {table.columns.map((col) => (
              <div key={col} className="flex items-center gap-2">
                <span className="w-24 text-xs font-mono text-slate-400 truncate">{col}</span>
                <input
                  type="text"
                  placeholder="valeur..."
                  value={newRowData[col] || ""}
                  onChange={(e) =>
                    setNewRowData({ ...newRowData, [col]: e.target.value })
                  }
                  className="flex-1 bg-[#090b11] border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Exécuter INSERT</span>
          </button>
        </form>
      </div>
    </aside>
  );
}