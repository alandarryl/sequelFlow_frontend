"use client";

import Link from "next/link";
import { Sparkles, PlusCircle, ArrowRight, BookOpen, Database, ArrowRightLeft, Layers, Server, HardDrive } from "lucide-react";

export function Hero() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden my-8 md:my-14">
      
      {/* Grille de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Halo discret orange en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[260px] bg-[#F37023]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* --- LOGOS DE BDD ÉPARPILLÉS EN FILIGRANE (BACKGROUND) --- */}
      <div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none select-none overflow-hidden opacity-15">
        {/* Postgres / DB Top Left */}
        <div className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-neutral-800 rotate-[-12deg]">
          <Database className="w-12 h-12" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase">POSTGRESQL</span>
        </div>

        {/* MySQL Top Right */}
        <div className="absolute top-16 right-8 md:right-16 flex items-center gap-2 text-neutral-800 rotate-[8deg]">
          <Server className="w-14 h-14" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase">MYSQL</span>
        </div>

        {/* SQLite Middle Left */}
        <div className="absolute top-1/2 left-2 md:left-8 -translate-y-1/2 flex items-center gap-2 text-neutral-800 rotate-[6deg]">
          <HardDrive className="w-10 h-10" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase">SQLITE</span>
        </div>

        {/* MariaDB / Schema Middle Right */}
        <div className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 flex items-center gap-2 text-neutral-800 rotate-[-8deg]">
          <Layers className="w-12 h-12" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase">MARIADB</span>
        </div>

        {/* DB Bottom Left */}
        <div className="absolute bottom-12 left-16 flex items-center gap-2 text-neutral-800 rotate-[-5deg]">
          <Database className="w-10 h-10" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase">SQL_SCHEMA</span>
        </div>
      </div>

      {/* --- CONTENU HERO --- */}
      <div className="max-w-5xl text-center space-y-8 relative z-10">
        
        {/* Badge "Figma" */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-neutral-100 text-xs font-medium shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#F37023]" />
          <span>L'éditeur graphique SQL pensé comme Figma</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 leading-[1.15]">
          Visualisez et pratiquez le SQL en{" "}
          <span className="relative inline-block text-[#F37023]">
            temps réel
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#F37023]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
          .
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Manipulez vos bases de données sur un canvas infini. Créez des tables, insérez des données et liez vos relations avec un aperçu interactif instantané.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-bold bg-[#F37023] hover:bg-[#e06216] text-white rounded-xl shadow-lg shadow-[#F37023]/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-5 h-5" />
            Créer un projet
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/docs"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-xl shadow-sm transition"
          >
            <BookOpen className="w-5 h-5 text-neutral-500" />
            Apprendre le SQL
          </Link>
        </div>

        {/* --- APERÇU DU CANVAS (Mockup Carte / UI) --- */}
        <div className="pt-6">
          <div className="p-2.5 bg-neutral-900/5 border border-neutral-200 rounded-2xl shadow-2xl">
            <div className="h-[400px] w-full rounded-xl bg-[#111319] border border-neutral-800 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(#262a36_1px,transparent_1px)] [background-size:16px_16px]">
              
              {/* Table 1 : users */}
              <div className="absolute top-10 left-8 md:left-20 w-56 bg-[#1a1d27] border border-neutral-700/80 rounded-xl p-3.5 shadow-xl text-left space-y-2.5 transform -rotate-1 hover:rotate-0 transition duration-300">
                <div className="flex items-center justify-between border-b border-neutral-700/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#F37023]" />
                    <span className="text-xs font-bold text-white font-mono">users</span>
                  </div>
                  <span className="text-[10px] bg-[#F37023]/20 text-[#F37023] px-1.5 py-0.5 rounded font-mono">Table</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-neutral-200">
                    <span className="text-[#F37023] font-semibold">id</span>
                    <span className="text-neutral-500">INT PK</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>name</span>
                    <span className="text-neutral-500">VARCHAR</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>email</span>
                    <span className="text-neutral-500">VARCHAR</span>
                  </div>
                </div>
              </div>

              {/* Ligne de connexion SVG (Relation Foreign Key en Orange) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#F37023]" strokeWidth="2">
                <path d="M 280 120 C 370 120, 360 230, 440 230" fill="none" strokeDasharray="4 4" />
                <circle cx="360" cy="175" r="4" className="fill-[#F37023] animate-ping" />
              </svg>

              {/* Table 2 : orders */}
              <div className="absolute bottom-10 right-8 md:right-20 w-60 bg-[#1a1d27] border border-[#F37023]/40 rounded-xl p-3.5 shadow-xl text-left space-y-2.5 transform rotate-1 hover:rotate-0 transition duration-300">
                <div className="flex items-center justify-between border-b border-neutral-700/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#F37023]" />
                    <span className="text-xs font-bold text-white font-mono">orders</span>
                  </div>
                  <span className="text-[10px] bg-[#F37023]/20 text-[#F37023] px-1.5 py-0.5 rounded font-mono">Table</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-neutral-200">
                    <span className="text-[#F37023] font-semibold">id</span>
                    <span className="text-neutral-500">INT PK</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold bg-[#F37023]/20 border border-[#F37023]/30 px-1.5 py-0.5 rounded">
                    <span>user_id</span>
                    <span className="text-[#F37023]">FK</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>total</span>
                    <span className="text-neutral-500">DECIMAL</span>
                  </div>
                </div>
              </div>

              {/* Overlay interactif au survol */}
              <Link 
                href="/workspace"
                className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center gap-2 text-white font-bold text-sm"
              >
                <span className="bg-[#F37023] px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
                  Ouvrir l'expérience interactive
                  <ArrowRightLeft className="w-4 h-4" />
                </span>
              </Link>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}