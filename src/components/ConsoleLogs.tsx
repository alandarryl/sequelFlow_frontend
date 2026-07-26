"use client";

import { useState } from "react";
import { LogEntry } from "@/hooks/useSqlEngine";
import { Terminal, ChevronUp, ChevronDown, CheckCircle2, XCircle, Play, Trash2 } from "lucide-react";

interface ConsoleLogsProps {
  logs: LogEntry[];
  onExecuteCommand: (command: string) => void;
}

export function ConsoleLogs({ logs, onExecuteCommand }: ConsoleLogsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-40 flex flex-col items-end">
      {/* Panneau déplié */}
      {isOpen && (
        <div className="w-80 md:w-96 max-h-80 bg-[#121520]/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col mb-3 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          {/* Header de la console */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Historique des requêtes
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-500/20 text-blue-400 rounded-full">
                {logs.length}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Liste des logs */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 font-mono text-xs max-h-64 scrollbar-thin">
            {logs.length === 0 ? (
              <p className="text-center text-slate-500 py-6 text-[11px]">
                Aucune commande exécutée pour le moment.
              </p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col gap-1 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      {log.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                      <span className="text-slate-200 font-medium truncate">
                        {log.command}
                      </span>
                    </div>

                    {/* Bouton de ré-exécution au survol */}
                    <button
                      onClick={() => onExecuteCommand(log.command)}
                      title="Ré-exécuter cette commande"
                      className="opacity-0 group-hover:opacity-100 p-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 rounded-md transition shrink-0"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                    <span className={log.success ? "text-slate-400" : "text-rose-400/90"}>
                      {log.message}
                    </span>
                    <span className="shrink-0">{log.timestamp}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Bouton déclencheur au bas de l'écran */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 bg-[#121520]/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold shadow-xl backdrop-blur-md transition"
      >
        <Terminal className="w-4 h-4 text-blue-400" />
        <span>Console</span>
        {logs.length > 0 && (
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        )}
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
        )}
      </button>
    </div>
  );
}