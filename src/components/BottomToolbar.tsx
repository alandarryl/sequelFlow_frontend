"use client";

import { useState } from "react";
import { Terminal, Send } from "lucide-react";

interface BottomToolbarProps {
  onExecuteCommand: (sql: string) => void;
}

export function BottomToolbar({ onExecuteCommand }: BottomToolbarProps) {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    if (typeof onExecuteCommand === "function") {
      onExecuteCommand(command);
    }
    setCommand("");
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 border border-gray-200 rounded-xl p-1.5 shadow-md backdrop-blur-xl flex items-center gap-2 focus-within:border-[#F37023]/60 transition-colors"
      >
        <div className="pl-2.5 text-[#6B7280]">
          <Terminal className="w-4 h-4 text-[#F37023]" />
        </div>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Ex: CREATE TABLE users (id, name, email)..."
          className="flex-1 bg-transparent border-none text-xs text-[#111827] placeholder-[#6B7280] focus:outline-none font-mono"
        />
        <button
          type="submit"
          className="px-3.5 py-1.5 bg-[#F37023] hover:bg-[#e05f12] text-white font-medium text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Exécuter</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}