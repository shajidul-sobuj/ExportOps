import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-400 font-mono">
          Deterministic Compliance Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
          How Messy Trade Papers Become Customs-Ready in 60s
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          AI reads and explains; pure TypeScript deterministic code executes the legal clearance decision.
        </p>
      </div>

      <div className="relative">
        {/* Animated Connecting Electric Stream between steps (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-4 right-4 h-[2px] bg-slate-800/80 -translate-y-1/2 overflow-hidden pointer-events-none z-0">
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-electric-stream" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
              01
            </span>
            <h3 className="font-extrabold text-white text-base sm:text-lg font-display">Trade Docs Ingested</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Accepts Commercial Invoice, Packing List, PO, Export LC, Certificate of Origin, and Bond records via drag-and-drop or ERP sync.
            </p>
          </div>

          <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
              02
            </span>
            <h3 className="font-extrabold text-white text-base sm:text-lg font-display">Multimodal AI Extraction</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Extracts quantities, values, HS codes, container numbers, and entity names with strict confidence scores and exact source quotations.
            </p>
          </div>

          <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
              03
            </span>
            <h3 className="font-extrabold text-white text-base sm:text-lg font-display">8-Point Deterministic Rules</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Pure code checks R1-R8. Zero AI hallucination: mathematical cross-checking of units, dates, tolerances, and UD fabric quota balances.
            </p>
          </div>

          <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
              04
            </span>
            <h3 className="font-extrabold text-white text-base sm:text-lg font-display">Customs Pass Issued</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Shipment flips to Customs-Ready, generating an official Chittagong Port Gate-In Pass with cryptographic verification hash and QR code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
