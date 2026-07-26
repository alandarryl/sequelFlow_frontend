"use client";

import Link from "next/link";
import { Database, BookOpen, PlusCircle } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-slate-800/80 bg-[#0d0f17]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            SequelFlow
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
            v0.1 POC
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            href="/docs"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            Apprendre le SQL
          </Link>

          <Link
            href="/onboarding"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-600/25 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Nouveau projet
          </Link>
        </nav>

      </div>
    </header>
  );
}