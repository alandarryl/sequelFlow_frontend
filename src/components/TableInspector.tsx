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

    const filledCols = table.columns.filter(
      (col) => newRowData[col] !== undefined && newRowData[col].trim() !== ""
    );

    if (filledCols.length === 0) return;

    const values = filledCols.map((col) => {
      const val = newRowData[col].trim();
      const escapedVal = val.replace(/'/g, "''");
      return !isNaN(Number(val)) && val !== "" ? val : `'${escapedVal}'`;
    });

    const sql = `INSERT INTO ${table.name} (${filledCols.join(", ")}) VALUES (${values.join(", ")})`;
    
    onExecuteCommand(sql);
    setNewRowData({});
  };

  return (
    <aside className="fixed right-5 top-20 bottom-24 w-96 bg-white/95 border border-gray-200 rounded-xl shadow-xl backdrop-blur-xl z-40 flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-150">
      {/* Header */}
      <div className="p-3.5 border-b border-gray-200 flex items-center justify-between bg-gray-50/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] rounded-lg">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-[#111827] text-xs font-mono">{table.name}</h3>
            <span className="text-[10px] text-[#6B7280]">
              {table.rows.length} enregistrement(s)
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-auto p-4 space-y-5 text-xs">
        {/* Colonnes */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Colonnes ({table.columns.length})
          </span>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
            {table.columns.map((col, idx) => (
              <div
                key={col}
                className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md text-[#111827]"
              >
                {idx === 0 || col.toLowerCase() === "id" ? (
                  <Key className="w-3 h-3 text-[#F37023] shrink-0" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                )}
                <span className="truncate">{col}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Données */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Données de la table
          </span>

          {table.rows.length === 0 ? (
            <div className="p-6 border border-dashed border-gray-200 rounded-lg text-center space-y-1.5 bg-gray-50/50">
              <Database className="w-5 h-5 text-gray-400 mx-auto" />
              <p className="text-xs text-[#6B7280]">Aucune donnée insérée.</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-x-auto bg-white">
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[#6B7280]">
                    {table.columns.map((col) => (
                      <th key={col} className="p-2 font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#111827]">
                  {table.rows.map((row, rIndex) => (
                    <tr key={rIndex} className="hover:bg-gray-50 transition-colors">
                      {table.columns.map((col) => (
                        <td key={col} className="p-2 whitespace-nowrap">
                          {row[col] !== undefined && row[col] !== null ? (
                            String(row[col])
                          ) : (
                            <span className="text-gray-400 italic">null</span>
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

        {/* Formulaire */}
        <form onSubmit={handleAddRow} className="space-y-2.5 pt-3 border-t border-gray-200">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] flex items-center gap-1">
            <Plus className="w-3 h-3 text-[#F37023]" /> Insérer une ligne
          </span>

          <div className="space-y-1.5">
            {table.columns.map((col) => (
              <div key={col} className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-mono text-[#6B7280] truncate">{col}</span>
                <input
                  type="text"
                  placeholder="valeur..."
                  value={newRowData[col] || ""}
                  onChange={(e) =>
                    setNewRowData({ ...newRowData, [col]: e.target.value })
                  }
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-xs text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#F37023] font-mono transition-colors"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-1.5 bg-[#F37023] hover:bg-[#e05f12] text-white font-medium text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Exécuter INSERT</span>
          </button>
        </form>
      </div>
    </aside>
  );
}