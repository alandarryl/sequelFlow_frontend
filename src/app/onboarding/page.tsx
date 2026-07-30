"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Database, Terminal, ArrowRight, Play, Server, HardDrive, Layers } from "lucide-react";

const STEPS = [
  {
    title: "Bienvenue sur SequelFlow 👋",
    description: "Apprenez et pratiquez le SQL de façon 100% visuelle et interactive. Fini les requêtes abstraites dans un terminal !"
  },
  {
    title: "Un Canvas Infini à la Figma 🎨",
    description: "Déplacez-vous librement, zoomez et observez vos tables prendre forme sous forme de cartes modulables directement à la souris."
  },
  {
    title: "Exécution SQL en Temps Réel ⚡",
    description: "Tapez des requêtes CREATE, INSERT, UPDATE ou DELETE et voyez l'impact instantané sur la représentation graphique de vos données."
  },
  {
    title: "Inspecteur & Code Couleur 🔍",
    description: "Cliquez sur n'importe quelle table pour inspecter ses lignes et distinguer facilement les clés primaires (vert), clés étrangères (jaune) et colonnes (bleu)."
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isInitDbStep, setIsInitDbStep] = useState(false);
  const [dbCommand, setDbCommand] = useState("CREATE DATABASE my_first_db;");

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsInitDbStep(true);
    }
  };

  const handleSkip = () => {
    setIsInitDbStep(true);
  };

  const handleCreateDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/workspace");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[#F37023]/20 selection:text-[#F37023]">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 pointer-events-none" />

      {/* Halo lumineux orange discret */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F37023]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Logos BDD Filigrane */}
      <div className="absolute inset-0 max-w-5xl mx-auto pointer-events-none select-none overflow-hidden opacity-10">
        <Database className="absolute top-12 left-10 w-16 h-16 text-neutral-900 rotate-[-12deg]" />
        <Server className="absolute top-20 right-14 w-20 h-20 text-neutral-900 rotate-[10deg]" />
        <HardDrive className="absolute bottom-16 left-16 w-14 h-14 text-neutral-900 rotate-[-8deg]" />
        <Layers className="absolute bottom-12 right-20 w-16 h-16 text-neutral-900 rotate-[12deg]" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 bg-white border border-neutral-200/80 rounded-2xl max-w-lg w-full p-8 shadow-2xl shadow-neutral-900/10 space-y-6">
        
        {!isInitDbStep ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-[#F37023] rounded-lg shadow-sm shadow-[#F37023]/20">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold tracking-tight text-neutral-900">
                  Sequel<span className="text-[#F37023]">Flow</span>
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F37023] bg-[#F37023]/10 px-2.5 py-1 rounded-full font-mono">
                Étape {step + 1} sur {STEPS.length}
              </span>
            </div>

            {/* Step Content */}
            <div className="space-y-3 py-4 min-h-[140px] flex flex-col justify-center">
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
                {STEPS[step].title}
              </h1>
              <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                {STEPS[step].description}
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 py-1">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? "w-8 bg-[#F37023]" : "w-2 bg-neutral-200"
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <button
                onClick={handleSkip}
                className="text-xs font-semibold text-neutral-400 hover:text-neutral-700 transition"
              >
                Passer l'intro
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#F37023] hover:bg-[#e06216] text-white text-sm font-bold rounded-xl shadow-md shadow-[#F37023]/25 transition active:scale-95"
              >
                {step === STEPS.length - 1 ? "Configurer la BDD" : "Suivant"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleCreateDatabase} className="space-y-6">
            {/* Header Form */}
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <div className="p-2 bg-neutral-900 rounded-xl text-white">
                <Terminal className="w-5 h-5 text-[#F37023]" />
              </div>
              <div>
                <h2 className="text-lg font-black text-neutral-900">Initialisation de la BDD</h2>
                <p className="text-xs text-neutral-500">Lancez votre première commande pour ouvrir le Canvas</p>
              </div>
            </div>

            {/* Input SQL styled like terminal */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono">
                Commande SQL d'initialisation :
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dbCommand}
                  onChange={(e) => setDbCommand(e.target.value)}
                  className="w-full bg-[#111319] border border-neutral-800 rounded-xl px-4 py-3 text-sm font-mono text-[#F37023] focus:outline-none focus:border-[#F37023] focus:ring-1 focus:ring-[#F37023] shadow-inner transition"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">
                  [SQL]
                </span>
              </div>
            </div>

            {/* Action Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#F37023] hover:bg-[#e06216] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#F37023]/25 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Ouvrir l'espace de travail
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}