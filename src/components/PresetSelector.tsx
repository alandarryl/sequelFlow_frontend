"use client";

import { useState } from "react";
import { SQL_PRESETS, SqlPreset } from "@/data/sqlPresets";
import { Sparkles, ChevronDown } from "lucide-react";

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
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F37023]/10 hover:bg-[#F37023]/20 border border-[#F37023]/30 text-[#F37023] rounded-lg text-xs font-medium transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#F37023]" />
        <span>Charger un exemple</span>
        <ChevronDown className="w-3 h-3 opacity-70" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 z-50 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
            <div className="px-2.5 py-1.5 border-b border-gray-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
                Bases de données d'exemples
              </p>
            </div>

            {SQL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelect(preset)}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors group flex flex-col gap-0.5"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-xs text-[#111827] group-hover:text-[#F37023] transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] rounded">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7280] leading-tight">
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