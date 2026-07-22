"use client";

import { Sparkles, PlusCircle, ArrowRight, BookOpen, Layers } from "lucide-react";

interface HeroProps {
  onStartProject: () => void;
}

export function Hero({ onStartProject }: HeroProps) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden my-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>L'éditeur graphique SQL pensé comme Figma</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Visualisez et pratiquez le SQL en <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">temps réel</span>.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Manipulez vos bases de données sur un canvas infini. Créez des tables, insérez des données et liez vos relations avec un aperçu interactif instantané.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-5 h-5" />
            Créer un projet
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => alert("Redirection vers les tutoriels...")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl transition"
          >
            <BookOpen className="w-5 h-5 text-slate-400" />
            Apprendre le SQL
          </button>
        </div>

        <div className="pt-12">
          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="aspect-video w-full rounded-xl bg-[#090b11] border border-slate-800/50 flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
              <div className="p-4 bg-slate-900/80 rounded-full border border-slate-800 text-slate-500 group-hover:scale-110 group-hover:text-blue-400 transition">
                <Layers className="w-8 h-8" />
              </div>
              <p className="text-slate-400 text-sm font-medium">Aperçu du Canvas Infini SequelFlow</p>
              <span className="text-xs text-slate-600">Cliquez sur "Créer un projet" pour lancer l'expérience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}