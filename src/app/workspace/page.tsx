"use client";

import { useState } from "react";
import Link from "next/link";
import { Database, ArrowLeft, BookOpen } from "lucide-react";
import { useSqlEngine } from "@/hooks/useSqlEngine";
import { CanvasWorkspace } from "@/components/CanvasWorkspace";
import { BottomToolbar } from "@/components/BottomToolbar";
import { TableInspector } from "@/components/TableInspector";
import { PresetSelector } from "@/components/PresetSelector";
import { ConsoleLogs } from "@/components/ConsoleLogs";

export default function WorkspacePage() {
  const { tables, relations, logs, executeCommand, resetWorkspace } = useSqlEngine();
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  const selectedTable = tables.find((t) => t.id === selectedTableId) || null;

  const handleLoadPreset = (commands: string[]) => {
    resetWorkspace();
    commands.forEach((cmd) => {
      executeCommand(cmd);
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#FAFAFA] text-[#111827] font-sans antialiased selection:bg-[#F37023]/20">
      {/* Logos Fond en Filigrane (MySQL / PostgreSQL) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          className="absolute -top-12 -right-12 w-96 h-96 text-slate-900 opacity-[0.03]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        </svg>
        <svg
          className="absolute -bottom-20 -left-20 w-[450px] h-[450px] text-slate-900 opacity-[0.03]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3C6.48 3 2 7.48 2 13c0 3.65 1.95 6.84 4.88 8.58.37.22.84.07 1.04-.3.19-.36.06-.82-.3-1.03C5.08 18.73 3.5 16.03 3.5 13c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5c0 3.03-1.58 5.73-4.12 7.25-.36.21-.49.67-.3 1.03.19.37.66.52 1.04.3C20.05 19.84 22 16.65 22 13c0-5.52-4.48-10-10-10z" />
        </svg>
      </div>

      {/* Header */}
      <header className="absolute top-4 left-6 right-6 z-30 flex items-center justify-between px-4 py-2.5 bg-white/90 border border-gray-200/80 rounded-xl backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 hover:bg-gray-100 text-[#6B7280] hover:text-[#111827] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="p-1 bg-[#F37023]/10 border border-[#F37023]/20 rounded-md">
              <Database className="w-4 h-4 text-[#F37023]" />
            </div>
            <span className="font-semibold text-[#111827] text-xs tracking-tight">
              SequelFlow <span className="text-[#6B7280] font-normal">/ Studio</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <PresetSelector onLoadPreset={handleLoadPreset} />

          <Link
            href="/docs"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#111827] border border-gray-200 rounded-lg text-xs font-medium transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#F37023]" />
            <span>Guide</span>
          </Link>
        </div>
      </header>

      {/* Canvas principal */}
      <CanvasWorkspace
        tables={tables}
        relations={relations}
        onSelectTable={(table) => setSelectedTableId(table.id)}
        onExecuteCommand={executeCommand}
      />

      {/* Inspecteur latéral */}
      <TableInspector
        table={selectedTable}
        onClose={() => setSelectedTableId(null)}
        onExecuteCommand={executeCommand}
      />

      {/* Console d'historique */}
      <ConsoleLogs logs={logs} onExecuteCommand={executeCommand} />

      {/* Barre de commande du bas */}
      <BottomToolbar onExecuteCommand={executeCommand} />
    </div>
  );
}