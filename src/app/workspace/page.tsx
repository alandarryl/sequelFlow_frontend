"use client";

import { useSqlEngine } from "@/hooks/useSqlEngine";
import { CanvasWorkspace } from "@/components/CanvasWorkspace";
import { BottomToolbar } from "@/components/BottomToolbar";
import { TableInspector } from "@/components/TableInspector"; // 👈 Import de l'inspecteur
import Link from "next/link";
import { Database, ArrowLeft, BookOpen } from "lucide-react";
import { useState } from "react";

export default function WorkspacePage() {
  const { tables, relations, executeCommand } = useSqlEngine();
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  // Retrouver l'objet table sélectionné
  const selectedTable = tables.find((t) => t.id === selectedTableId) || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090b11]">
      {/* Header */}
      <header className="absolute top-4 left-6 right-6 z-30 flex items-center justify-between p-3 bg-[#121520]/80 border border-slate-800/80 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-white text-sm">SequelFlow — Workspace</span>
          </div>
        </div>

        <Link
          href="/docs"
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 rounded-xl text-xs font-medium transition"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Documentation</span>
        </Link>
      </header>

      {/* Canvas */}
      <CanvasWorkspace
        tables={tables}
        relations={relations}
        onSelectTable={(table) => setSelectedTableId(table.id)} // 👈 Ouvre l'inspecteur au clic
        onExecuteCommand={executeCommand}
      />

      {/* Inspecteur de Table latéral (S'ouvre lorsqu'une table est cliquée) */}
      <TableInspector
        table={selectedTable}
        onClose={() => setSelectedTableId(null)}
        onExecuteCommand={executeCommand}
      />

      {/* Bottom Console */}
      <BottomToolbar onExecuteCommand={executeCommand} />
    </div>
  );
}