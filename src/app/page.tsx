"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-[#F37023]/20 selection:text-[#F37023]">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}