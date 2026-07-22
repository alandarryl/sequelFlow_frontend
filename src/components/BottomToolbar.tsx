"use client";

import { Plus, Database, Terminal, ZoomIn, ZoomOut, Maximize } from "lucide-react";

export function BottomToolbar() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-2 bg-[#121520]/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md text-slate-300">
      <button 
        onClick={() => alert("Ajouter une Table")}
        className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-medium transition"
      >
        <Plus className="w-4 h-4" />
        Table
      </button>

      <div className="w-[1px] h-6 bg-slate-800" />

      <button className="p-2 hover:bg-slate-800 hover:text-white rounded-xl transition" title="Exécuter SQL">
        <Terminal className="w-4 h-4" />
      </button>

      <button className="p-2 hover:bg-slate-800 hover:text-white rounded-xl transition" title="Inspecter BDD">
        <Database className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-6 bg-slate-800" />

      <button className="p-2 hover:bg-slate-800 hover:text-white rounded-xl transition" title="Zoom In">
        <ZoomIn className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-800 hover:text-white rounded-xl transition" title="Zoom Out">
        <ZoomOut className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-800 hover:text-white rounded-xl transition" title="Reset Zoom">
        <Maximize className="w-4 h-4" />
      </button>
    </div>
  );
}