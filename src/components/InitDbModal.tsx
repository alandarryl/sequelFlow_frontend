"use client";

import { useState } from "react";
import { Terminal, X } from "lucide-react";

interface InitDbModalProps {
  onClose: () => void;
  onExecute: (command: string) => void;
}

export function InitDbModal({ onClose, onExecute }: InitDbModalProps) {
  const [command, setCommand] = useState("CREATE DATABASE my_first_db;");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecute(command);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#121520] border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Créer la Base de Données</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 p-1 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-400">
          Pour débloquer l'espace de travail infini, commencez par exécuter votre première commande DDL SQL pour créer la base de données.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Commande SQL :
            </label>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="w-full bg-[#090b11] border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-blue-300 focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm text-slate-400 hover:text-slate-200 transition">
              Annuler
            </button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition">
              Exécuter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}