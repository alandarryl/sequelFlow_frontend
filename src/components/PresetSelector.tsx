"use client";

import { useState } from "react";
import { SQL_PRESETS, SqlPreset } from "@/data/sqlPresets";
import { Sparkles, ChevronDown, Check } from "lucide-react";

interface PresetSelectorProps {
  onLoadPreset: (commands: string[]) => void;
}

export function PresetSelector({ onLoadPreset }: PresetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (preset: SqlPreset) => {
    onLoadPreset(preset.commands);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-semibold transition shadow-lg shadow-blue-500/10"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span>Charger un exemple</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop pour fermer en cliquant à côté */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-72 bg-[#121520] border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-800/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Bases de données d'exemples
              </p>
            </div>

            {SQL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelect(preset)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/60 transition space-y-1 group flex flex-col"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-xs text-white group-hover:text-blue-400 transition">
                    {preset.name}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}