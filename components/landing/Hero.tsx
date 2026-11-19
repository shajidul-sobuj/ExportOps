import React from 'react';
import Link from 'next/link';
import { 
  Anchor, 
  ArrowRight, 
  Calculator, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 relative">
      {/* Subtle Ambient Background Aura */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/[0.05] rounded-full blur-3xl pointer-events-none animate-ambient-pulse [animation-delay:3s]" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        {/* Left Hero Content (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 transition-all cursor-default backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-300">
              Chittagong Port Cut-Off Shield // Berth 4 Active
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-black text-white tracking-tight leading-[1.08] font-display">
            Before the Vessel Leaves,
            <span className="block text-slate-200 mt-1">
              Know Your RMG Cargo is{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.35)] animate-gradient-x">
                Customs-Ready.
              </span>
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            ExportOps AI cross-checks commercial invoices, packing lists, export LCs, and bonded fabric quotas (UD) before port gate-in. 
            Prevent container demurrage ($8,500/hold), eliminate air-freight panic, and guarantee clean bank presentation under UCP 600.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              href="/app/shipments/EXP-001"
              className="relative overflow-hidden group/btn inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-base rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-display"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Launch Interactive Demo (EXP-001)</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
            </Link>

            <Link
              href="/app/roi"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-slate-900/80 hover:bg-slate-800/90 text-white font-bold text-base rounded-2xl border border-white/10 hover:border-emerald-500/50 backdrop-blur-md transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <Calculator className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
              <span>Calculate Factory Savings</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/[0.08]">
            <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/[0.05] hover:border-emerald-500/40 transition-colors flex items-center gap-2.5 group cursor-default">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 transition-transform group-hover:scale-110" />
              <div>
                <p className="text-xs font-bold text-white">Zero AI Hallucination</p>
                <p className="text-[11px] text-slate-400">8-Point Deterministic Code</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/[0.05] hover:border-indigo-500/40 transition-colors flex items-center gap-2.5 group cursor-default">
              <Layers className="w-5 h-5 text-indigo-400 shrink-0 transition-transform group-hover:scale-110" />
              <div>
                <p className="text-xs font-bold text-white">BGMEA e-UD Quota</p>
                <p className="text-[11px] text-slate-400">Bond Raw Material Math</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/[0.05] hover:border-amber-500/40 transition-colors flex items-center gap-2.5 group cursor-default">
              <FileCheck className="w-5 h-5 text-amber-400 shrink-0 transition-transform group-hover:scale-110" />
              <div>
                <p className="text-xs font-bold text-white">UCP 600 Bank Shield</p>
                <p className="text-[11px] text-slate-400">Discrepancy-Free LC Export</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero: High-Tech Port Radar Command Center (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-emerald-500/25 via-teal-500/15 to-indigo-500/15 blur-2xl opacity-60 pointer-events-none" />

          <div className="relative rounded-3xl bg-[#060a14]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col justify-between space-y-4">
            
            {/* Terminal Window Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-bold text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5 text-emerald-400 animate-float" />
                  <span>PORT RADAR // CHITTAGONG BERTH 4</span>
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                RADAR ACTIVE
              </span>
            </div>

            {/* Dynamic Sonar Radar Viewport */}
            <div className="relative aspect-[4/3] rounded-2xl bg-[#030610] border border-slate-800/80 overflow-hidden flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[88%] h-[88%] rounded-full border border-emerald-500/20 animate-pulse-ring" />
                <div className="w-[66%] h-[66%] rounded-full border border-emerald-500/25" />
                <div className="w-[44%] h-[44%] rounded-full border border-emerald-500/30" />
                <div className="w-[22%] h-[22%] rounded-full border border-emerald-500/35 bg-emerald-500/10" />
                
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/20 -translate-y-1/2" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-500/20 -translate-x-1/2" />
                
                <span className="absolute top-2 text-[9px] font-mono text-emerald-500/50 font-bold">000° N</span>
                <span className="absolute bottom-2 text-[9px] font-mono text-emerald-500/50 font-bold">180° S</span>
                <span className="absolute left-2 text-[9px] font-mono text-emerald-500/50 font-bold">270° W</span>
                <span className="absolute right-2 text-[9px] font-mono text-emerald-500/50 font-bold">090° E</span>
                
                <div className="absolute inset-0 animate-radar origin-center">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/30 via-emerald-500/5 to-transparent origin-bottom-right rounded-tl-full" />
                </div>

                <div className="absolute top-1/3 left-1/4 flex items-center gap-1 group/blip pointer-events-auto cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span className="text-[9px] font-mono text-red-300 bg-red-950/80 px-1 rounded border border-red-800/60 opacity-80 group-hover/blip:opacity-100 transition-opacity">
                    EXP-001 (HOLD)
                  </span>
                </div>

                <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1 group/blip pointer-events-auto cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/80 px-1 rounded border border-emerald-800/60 opacity-80 group-hover/blip:opacity-100 transition-opacity">
                    EXP-005 (CLEARED)
                  </span>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[9px] font-mono text-slate-400 pointer-events-none">
                RANGE: 2.5 NM
              </div>
            </div>

            {/* Live Container Discrepancy Cards */}
            <div className="space-y-2.5 font-mono text-xs">
              {/* Card 1: EXP-001 */}
              <Link
                href="/app/shipments/EXP-001"
                className="block p-3.5 bg-red-950/60 hover:bg-red-950/80 border border-red-500/50 hover:border-red-400 rounded-2xl backdrop-blur-md shadow-lg transition-all group cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-xs sm:text-sm group-hover:text-red-200 transition-colors">
                          EXP-001 • MSKU-781920-4
                        </p>
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[9px] shrink-0 uppercase tracking-wider">
                          BLOCKED
                        </span>
                      </div>
                      <p className="text-[11px] text-red-300 font-sans mt-0.5">
                        Invoice: 12,000 pcs ≠ Packing List: 11,400 pcs (-600 deficit)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-red-400 group-hover:text-white transition-colors shrink-0">
                    <span className="text-[11px] font-bold hidden sm:inline">Inspect & Fix</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Card 2: EXP-005 */}
              <Link
                href="/app/shipments/EXP-005"
                className="block p-3.5 bg-emerald-950/50 hover:bg-emerald-950/70 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl backdrop-blur-md shadow-lg transition-all group cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-xs sm:text-sm group-hover:text-emerald-200 transition-colors">
                          EXP-005 • MSKU-908234-7
                        </p>
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[9px] shrink-0 uppercase tracking-wider">
                          GATE PASS READY
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-300 font-sans mt-0.5">
                        All 8 rules passed • Cryptographic QR Gate Pass Issued
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 group-hover:text-white transition-colors shrink-0">
                    <span className="text-[11px] font-bold hidden sm:inline">View Pass</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Terminal Footer Telemetry */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="text-base leading-none">🚢</span>
                <span>Vessel: <strong>MAERSK HAVEN</strong></span>
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-800/50">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>Cut-Off: 47h 58m Remaining</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
