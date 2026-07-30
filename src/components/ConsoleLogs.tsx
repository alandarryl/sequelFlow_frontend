"use client";

import { useState } from "react";
import { LogEntry } from "@/hooks/useSqlEngine";
import { Terminal, ChevronUp, ChevronDown, CheckCircle2, XCircle, Play } from "lucide-react";

interface ConsoleLogsProps {
  logs: LogEntry[];
  onExecuteCommand: (command: string) => void;
}

export function ConsoleLogs({ logs, onExecuteCommand }: ConsoleLogsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 max-h-80 bg-white/95 border border-gray-200 rounded-xl shadow-xl backdrop-blur-xl flex flex-col mb-2 overflow-hidden animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between px-3.5 py-2 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#F37023]" />
              <span className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                Historique des requêtes
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[#F37023]/10 text-[#F37023] rounded-full">
                {logs.length}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#6B7280] hover:text-[#111827] p-0.5 rounded-md hover:bg-gray-200 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 font-mono text-[11px] max-h-60">
            {logs.length === 0 ? (
              <p className="text-center text-[#6B7280] py-6 text-xs font-sans">
                Aucune commande exécutée pour le moment.
              </p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors flex flex-col gap-1 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      {log.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span className="text-[#111827] font-medium truncate">
                        {log.command}
                      </span>
                    </div>

                    <button
                      onClick={() => onExecuteCommand(log.command)}
                      title="Ré-exécuter cette commande"
                      className="opacity-0 group-hover:opacity-100 p-1 bg-[#F37023]/10 hover:bg-[#F37023]/20 border border-[#F37023]/30 text-[#F37023] rounded transition-opacity shrink-0"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#6B7280] pt-0.5 font-sans">
                    <span className={log.success ? "text-[#6B7280]" : "text-rose-600"}>
                      {log.message}
                    </span>
                    <span className="shrink-0 font-mono">{log.timestamp}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-1.5 bg-white/90 hover:bg-gray-100 border border-gray-200 text-[#111827] rounded-lg text-xs font-medium shadow-md backdrop-blur-md transition-all"
      >
        <Terminal className="w-3.5 h-3.5 text-[#F37023]" />
        <span>Console</span>
        {logs.length > 0 && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#F37023] animate-pulse" />
        )}
        {isOpen ? (
          <ChevronDown className="w-3 h-3 text-[#6B7280]" />
        ) : (
          <ChevronUp className="w-3 h-3 text-[#6B7280]" />
        )}
      </button>
    </div>
  );
}