"use client";

import { useState } from "react";
import { Terminal, Send } from "lucide-react";

interface BottomToolbarProps {
  onExecuteCommand: (sql: string) => void; // 👈 Nom exact de la prop
}

export function BottomToolbar({ onExecuteCommand }: BottomToolbarProps) {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // On vérifie que la fonction existe avant de l'appeler pour éviter le crash
    if (typeof onExecuteCommand === "function") {
      onExecuteCommand(command);
    }
    setCommand("");
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#121520]/90 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl flex items-center gap-2"
      >
        <div className="p-2 text-blue-400 pl-3">
          <Terminal className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Ex: CREATE TABLE users (id, name, email)..."
          className="flex-1 bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 shrink-0"
        >
          <span>Exécuter</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}