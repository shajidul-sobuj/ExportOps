import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-[#080d1a]/90 backdrop-blur-xl border border-white/[0.08] p-10 sm:p-16 rounded-2xl space-y-7 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>ZERO DEMURRAGE GUARANTEE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display max-w-4xl mx-auto">
          Ready to Clear Every Garment Container on Time?
        </h2>
        
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Eliminate vessel cut-off panic, reduce demurrage to zero, and deliver 100% bank-ready paperwork on every RMG export shipment.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/app/shipments/EXP-001"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all hover:-translate-y-0.5 active:translate-y-0 font-display"
          >
            <span>Start Live Interactive Demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/app/roi"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-base border border-white/[0.1] hover:border-white/[0.2] transition-all hover:-translate-y-0.5"
          >
            Calculate Factory Savings
          </Link>
        </div>
      </div>
    </section>
  );
}
