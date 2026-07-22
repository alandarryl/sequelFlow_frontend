"use client";

import { CanvasWorkspace } from "@/components/CanvasWorkspace";
import { BottomToolbar } from "@/components/BottomToolbar";
import { Database, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function WorkspacePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090b11] flex flex-col">
      {/* Header Workspace */}
      <header className="absolute top-4 left-6 right-6 z-30 flex items-center justify-between p-3 bg-[#121520]/80 border border-slate-800/80 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-white text-sm">SequelFlow — my_first_db</span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition">
          <Save className="w-3.5 h-3.5" />
          Sauvegarder
        </button>
      </header>

      {/* Le Canvas Infini */}
      <main className="flex-1 w-full h-full">
        <CanvasWorkspace />
      </main>

      {/* Barre d'outils flottante */}
      <BottomToolbar />
    </div>
  );
}