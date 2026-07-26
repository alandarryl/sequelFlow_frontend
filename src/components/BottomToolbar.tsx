"use client";

import { useState } from "react";
import { Play, Terminal } from "lucide-react";
import { EngineResponse } from "@/hooks/useSqlEngine";

interface BottomToolbarProps {
  onExecute: (sql: string) => EngineResponse;
}

export function BottomToolbar({ onExecute }: BottomToolbarProps) {
  const [inputCommand, setInputCommand] = useState("");
  const [feedback, setFeedback] = useState<EngineResponse | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;

    // Execute via custom hook
    const res = onExecute(inputCommand);
    setFeedback(res);

    if (res.success) {
      setInputCommand(""); // Clear on success
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 space-y-2">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`px-4 py-2 rounded-xl text-xs font-medium border backdrop-blur-md transition ${
            feedback.success
              ? "bg-emerald-950/80 border-emerald-800 text-emerald-300"
              : "bg-rose-950/80 border-rose-800 text-rose-300"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 p-2 bg-[#121520]/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-2 pl-3 text-slate-500">
          <Terminal className="w-4 h-4 text-blue-400" />
        </div>

        <input
          type="text"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          placeholder="ex: create table users (id, name, email)..."
          className="flex-1 bg-transparent border-none text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Exécuter
        </button>
      </form>
    </div>
  );
}