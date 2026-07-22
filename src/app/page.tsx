"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0f17] text-slate-100 flex flex-col font-sans">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}