"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Database, Terminal, ArrowRight } from "lucide-react";

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
    // Redirection vers le canvas avec le nom de la BDD créée !
    router.push("/workspace");
  };

  return (
    <div className="min-h-screen bg-[#0d0f17] text-slate-100 flex items-center justify-center p-6">
      <div className="bg-[#121520] border border-slate-800 rounded-2xl max-w-lg w-full p-8 shadow-2xl space-y-6">
        
        {!isInitDbStep ? (
          <>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-500" />
                <span className="font-bold tracking-tight">SequelFlow</span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Étape {step + 1} sur {STEPS.length}
              </span>
            </div>

            <div className="space-y-3 py-4">
              <h1 className="text-2xl font-bold text-white">{STEPS[step].title}</h1>
              <p className="text-slate-400 text-sm leading-relaxed">{STEPS[step].description}</p>
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-blue-500" : "w-2 bg-slate-800"}`} />
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button onClick={handleSkip} className="text-xs font-medium text-slate-400 hover:text-slate-200 transition">
                Passer l'intro
              </button>
              <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition">
                {step === STEPS.length - 1 ? "Configurer la BDD" : "Suivant"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleCreateDatabase} className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <Terminal className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Initialisation de la BDD</h2>
                <p className="text-xs text-slate-400">Lancez votre première commande pour ouvrir le Canvas</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Commande SQL :
              </label>
              <input
                type="text"
                value={dbCommand}
                onChange={(e) => setDbCommand(e.target.value)}
                className="w-full bg-[#090b11] border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-blue-300 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition"
            >
              Ouvrir l'espace de travail
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}