'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RoiCalculator() {
  const [quickContainers, setQuickContainers] = useState<number>(20);

  const estimatedSavingsMonth = Math.round(quickContainers * 2550);
  const estimatedSavingsAnnual = estimatedSavingsMonth * 12;

  return (
    <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#080d1a]/90 backdrop-blur-xl p-8 sm:p-12 rounded-2xl border border-white/[0.08] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-5 max-w-xl relative z-10">
          <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase font-mono tracking-wider">The Business Case</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Calculate Your Factory's Monthly Savings
          </h2>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            Drag the volume slider to see how much avoidable demurrage, air-freight penalties, and documentation overtime your factory eliminates every month with ExportOps AI.
          </p>

          <div className="pt-2 space-y-3">
            <div className="flex justify-between items-baseline text-sm sm:text-base text-slate-200 font-mono">
              <span>Monthly Export Containers: <strong className="text-white text-base sm:text-lg">{quickContainers} FCL</strong></span>
              <span className="text-emerald-400 font-black text-base sm:text-lg">${estimatedSavingsMonth.toLocaleString()} / mo Saved</span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              step="5"
              value={quickContainers}
              onChange={(e) => setQuickContainers(Number(e.target.value))}
              className="w-full accent-emerald-400 h-3 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>5 Containers (Small Unit)</span>
              <span>40 Containers (Mid Tier)</span>
              <span>80 Containers (Large Group)</span>
            </div>
          </div>

          {/* Micro Breakdown Stats */}
          <div className="grid grid-cols-3 gap-3.5 pt-2 text-xs font-mono">
            <div className="bg-[#070b13]/80 p-3.5 rounded-xl border border-slate-800 hover-card-lift">
              <span className="text-slate-400 block text-xs">Demurrage Avoided</span>
              <span className="text-emerald-400 font-bold text-base mt-1 block">${(quickContainers * 1275).toLocaleString()}</span>
            </div>
            <div className="bg-[#070b13]/80 p-3.5 rounded-xl border border-slate-800 hover-card-lift">
              <span className="text-slate-400 block text-xs">Air-Freight Risk</span>
              <span className="text-emerald-400 font-bold text-base mt-1 block">${(quickContainers * 850).toLocaleString()}</span>
            </div>
            <div className="bg-[#070b13]/80 p-3.5 rounded-xl border border-slate-800 hover-card-lift">
              <span className="text-slate-400 block text-xs">Hours Saved</span>
              <span className="text-emerald-400 font-bold text-base mt-1 block">{(quickContainers * 4)} hrs/mo</span>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-right shrink-0 space-y-5 bg-[#070b13]/90 p-8 sm:p-10 rounded-3xl border border-slate-800 relative z-10 hover-card-lift shadow-2xl">
          <div>
            <p className="text-xs sm:text-sm text-slate-300 font-mono uppercase tracking-wider font-semibold">Projected Annual Factory Savings</p>
            <p className="text-5xl sm:text-6xl font-bold font-mono text-emerald-400 mt-2 tracking-tight">
              ${estimatedSavingsAnnual.toLocaleString()}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xs font-sans leading-relaxed">
            Based on Chittagong Port $8,500 average 5-day demurrage hold and 15% discrepancy rates.
          </p>
          <div>
            <Link
              href="/app/roi"
              className="relative overflow-hidden group/btn inline-flex items-center gap-2 px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-display"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Explore Pricing Plans (From ৳30k/mo)</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
