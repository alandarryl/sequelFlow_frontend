"use client";

import Link from "next/link";
import { Sparkles, PlusCircle, ArrowRight, BookOpen, Database, ArrowRightLeft } from "lucide-react";

export function Hero() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden my-12">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl text-center space-y-8 relative z-10">
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
          <Link
            href="/onboarding" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-5 h-5" />
            Créer un projet
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/docs"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl transition"
          >
            <BookOpen className="w-5 h-5 text-slate-400" />
            Apprendre le SQL
          </Link>
        </div>

        {/* --- APERÇU DU CANVAS (Mockup React / CSS) --- */}
        <div className="pt-8">
          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="h-[380px] w-full rounded-xl bg-[#090b11] border border-slate-800/50 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
              
              {/* Carte Table 1 : users */}
              <div className="absolute top-12 left-12 md:left-24 w-52 bg-[#121520] border border-blue-500/40 rounded-xl p-3 shadow-2xl text-left space-y-2 transform -rotate-1 hover:rotate-0 transition duration-300">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white font-mono">users</span>
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-blue-400">id</span>
                    <span className="text-slate-500">INT PK</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>name</span>
                    <span className="text-slate-500">VARCHAR</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>email</span>
                    <span className="text-slate-500">VARCHAR</span>
                  </div>
                </div>
              </div>

              {/* Ligne de connexion SVG avec point animé */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500/60" strokeWidth="2">
                <path d="M 260 110 C 350 110, 350 220, 440 220" fill="none" strokeDasharray="4 4" />
                <circle cx="350" cy="165" r="4" className="fill-blue-400 animate-ping" />
              </svg>

              {/* Carte Table 2 : orders */}
              <div className="absolute bottom-12 right-12 md:right-24 w-56 bg-[#121520] border border-indigo-500/40 rounded-xl p-3 shadow-2xl text-left space-y-2 transform rotate-1 hover:rotate-0 transition duration-300">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white font-mono">orders</span>
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-indigo-400">id</span>
                    <span className="text-slate-500">INT PK</span>
                  </div>
                  <div className="flex justify-between text-indigo-300 font-semibold bg-blue-500/10 px-1 rounded">
                    <span>user_id</span>
                    <span className="text-blue-400">FK</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>total</span>
                    <span className="text-slate-500">DECIMAL</span>
                  </div>
                </div>
              </div>

              {/* Overlay interactif au survol */}
              <Link 
                href="/workspace"
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center gap-2 text-white font-semibold text-sm"
              >
                <span>Ouvrir l'expérience interactive</span>
                <ArrowRightLeft className="w-4 h-4 text-blue-400" />
              </Link>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}