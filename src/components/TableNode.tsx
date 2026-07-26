"use client";

import { Handle, Position } from "@xyflow/react";
import { TableSchema } from "@/hooks/useSqlEngine";
import { Key, Table } from "lucide-react";

interface TableNodeProps {
  data: TableSchema;
}

export function TableNode({ data }: TableNodeProps) {
  if (!data) return null;

  return (
    <div className="bg-[#121520] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden min-w-[220px] max-w-[280px]">
      {/* Poignée d'entrée pour les clés étrangères reçues */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="!bg-blue-500 !w-3 !h-3 -ml-1.5"
      />

      {/* Header de la Table */}
      <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-2.5">
        <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
          <Table className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm leading-tight">{data.name}</h3>
          <span className="text-[10px] text-slate-400 font-mono">
            {data.rows?.length || 0} enregistrement(s)
          </span>
        </div>
      </div>

      {/* Colonnes de la Table */}
      <div className="p-3 space-y-1.5 font-mono text-xs">
        {data.columns?.map((col, index) => {
          const isPk = col.toLowerCase() === "id" || index === 0;

          return (
            <div
              key={col}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#090b11] border border-slate-800/60 text-slate-300"
            >
              <div className="flex items-center gap-2">
                {isPk ? (
                  <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                )}
                <span className="font-medium">{col}</span>
              </div>

              <span className="text-[10px] text-slate-500 font-semibold uppercase">
                {isPk ? "PK" : "TEXT"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Poignée de sortie pour lier vers d'autres tables */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="!bg-blue-500 !w-3 !h-3 -mr-1.5"
      />
    </div>
  );
}