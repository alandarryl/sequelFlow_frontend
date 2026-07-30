"use client";

import { Handle, Position } from "@xyflow/react";
import { TableSchema } from "@/hooks/useSqlEngine";
import { Key, Table, Trash2 } from "lucide-react";

interface TableNodeProps {
  data: TableSchema & { onDelete?: (tableName: string) => void };
}

export function TableNode({ data }: TableNodeProps) {
  if (!data) return null;

  return (
    <div className="bg-white border border-gray-200/90 rounded-xl shadow-md overflow-hidden min-w-[220px] max-w-[280px] group transition-shadow hover:shadow-lg">
      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="!bg-[#F37023] !border-2 !border-white !w-3.5 !h-3.5 -ml-1.5 shadow-sm"
      />

      {/* Header */}
      <div className="bg-gray-50/80 border-b border-gray-200 px-3.5 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1 bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] rounded-md shrink-0">
            <Table className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <h3 className="font-semibold text-[#111827] text-xs font-mono leading-tight truncate">
              {data.name}
            </h3>
            <span className="text-[10px] text-[#6B7280]">
              {data.rows?.length || 0} enregistrement(s)
            </span>
          </div>
        </div>

        {/* Bouton rapide pour supprimer la table */}
        {data.onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Évite d'ouvrir l'inspecteur
              data.onDelete?.(data.name);
            }}
            title="Supprimer la table"
            className="p-1 text-[#6B7280] hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all opacity-0 group-hover:opacity-100 nodrag shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Columns */}
      <div className="p-2.5 space-y-1 font-mono text-xs">
        {data.columns?.map((col, index) => {
          const isPk = col.toLowerCase() === "id" || index === 0;

          return (
            <div
              key={col}
              className="flex items-center justify-between px-2 py-1 rounded-md bg-[#FAFAFA] border border-gray-100 text-[#111827]"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                {isPk ? (
                  <Key className="w-3 h-3 text-[#F37023] shrink-0" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                )}
                <span className="font-medium text-[11px] truncate">{col}</span>
              </div>

              <span className={`text-[9px] font-semibold uppercase shrink-0 px-1 py-0.2 rounded ${
                isPk ? "text-[#F37023] bg-[#F37023]/10" : "text-[#6B7280]"
              }`}>
                {isPk ? "PK" : "TEXT"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="!bg-[#F37023] !border-2 !border-white !w-3.5 !h-3.5 -mr-1.5 shadow-sm"
      />
    </div>
  );
}