import React from 'react';
import Link from 'next/link';

export default function FinalCta() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-gradient-to-br from-[#0b101a] via-[#070b13] to-[#0b101a] border border-slate-800 p-10 sm:p-16 rounded-3xl space-y-7 shadow-2xl relative overflow-hidden">
        {/* Signature Animated Border Beam across the top of the CTA Box */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-800/80 overflow-hidden pointer-events-none">
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-beam" />
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display">
          Ready to Clear Every Container on Time?
        </h2>
        <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Eliminate vessel cut-off panic, reduce demurrage to zero, and deliver 100% bank-ready paperwork on every garment shipment.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/app/shipments/EXP-001"
            className="relative overflow-hidden group/btn px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-display"
          >
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Start Live Interactive Demo</span>
          </Link>
          <Link
            href="/app/roi"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-2xl border border-slate-700/80 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
          >
            Apply for 90-Day Factory Pilot
          </Link>
        </div>
      </div>
    </section>
  );
}
