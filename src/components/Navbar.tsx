"use client";

import Link from "next/link";
import { Database, BookOpen, PlusCircle } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-[#F37023] rounded-xl shadow-md shadow-[#F37023]/25 group-hover:scale-105 transition-transform duration-200">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-neutral-900">
              Sequel<span className="text-[#F37023]">Flow</span>
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 font-mono font-medium">
              v0.1 POC
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          <Link
            href="/docs"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 rounded-lg transition"
          >
            <BookOpen className="w-4 h-4 text-neutral-500" />
            Apprendre le SQL
          </Link>

          <Link
            href="/onboarding"
            className="flex items-center gap-2 px-4.5 py-2 text-sm font-semibold bg-[#F37023] hover:bg-[#e06216] text-white rounded-lg shadow-md shadow-[#F37023]/20 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Nouveau projet
          </Link>
        </nav>

      </div>
    </header>
  );
}