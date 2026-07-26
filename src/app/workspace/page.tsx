"use client";

import { useSqlEngine } from "@/hooks/useSqlEngine";
import { CanvasWorkspace } from "@/components/CanvasWorkspace";
import { BottomToolbar } from "@/components/BottomToolbar";
import { Database, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WorkspacePage() {
  const { tables, relations, executeCommand } = useSqlEngine();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090b11] flex flex-col">
      <header className="absolute top-4 left-6 right-6 z-30 flex items-center justify-between p-3 bg-[#121520]/80 border border-slate-800/80 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-white text-sm">SequelFlow — Workspace</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
          <span>Tables : {tables.length}</span>
          <span>Relations : {relations.length}</span>
        </div>
      </header>

      <main className="flex-1 w-full h-full">
        <CanvasWorkspace tables={tables} relations={relations} />
      </main>

      <BottomToolbar onExecute={executeCommand} />
    </div>
  );
}