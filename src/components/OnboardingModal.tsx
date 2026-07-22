"use client";

import { useState } from "react";
import { X, ChevronRight } from "lucide-react";

interface OnboardingModalProps {
  onClose: () => void;
  onComplete: () => void;
}

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

export function OnboardingModal({ onClose, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#121520] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Étape {step + 1} sur {STEPS.length}
          </span>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 p-1 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">{STEPS[step].title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{STEPS[step].description}</p>
        </div>

        <div className="flex items-center justify-center gap-1.5 py-2">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-blue-500" : "w-1.5 bg-slate-800"}`} />
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <button onClick={onComplete} className="text-xs font-medium text-slate-400 hover:text-slate-200 transition">
            Passer l'intro (Skip)
          </button>
          <button onClick={handleNext} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition">
            {step === STEPS.length - 1 ? "C'est parti !" : "Suivant"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}