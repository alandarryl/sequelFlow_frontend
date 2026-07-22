"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { OnboardingModal } from "@/components/OnboardingModal";
import { InitDbModal } from "@/components/InitDbModal";

export default function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showInitDbModal, setShowInitDbModal] = useState(false);

  const handleStartProject = () => setShowOnboarding(true);

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setShowInitDbModal(true);
  };

  const handleExecuteDb = (command: string) => {
    alert(`Base de données créée avec la commande : "${command}"`);
    setShowInitDbModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0f17] text-slate-100 flex flex-col font-sans">
      <Navbar onStartProject={handleStartProject} />
      <Hero onStartProject={handleStartProject} />

      {showOnboarding && (
        <OnboardingModal
          onClose={() => setShowOnboarding(false)}
          onComplete={handleCompleteOnboarding}
        />
      )}

      {showInitDbModal && (
        <InitDbModal
          onClose={() => setShowInitDbModal(false)}
          onExecute={handleExecuteDb}
        />
      )}

      <Footer/>
    </div>
  );
}