'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calculator, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Layers, 
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Sparkles,
  Ship,
  MapPin,
  RefreshCw
} from 'lucide-react';

export default function Hero() {
  const [resolved, setResolved] = useState(false);

  return (
    <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 overflow-hidden">
      {/* Ambient Radial Spotlight (Linear / Vercel Grade) */}
      <div className="absolute inset-0 hero-ambient-spotlight pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-96 hero-subtle-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Announcement Badge */}
            <div className="inline-flex">
              <Link
                href="/app/shipments/EXP-001"
                className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/80 border border-white/[0.08] hover:border-emerald-500/40 text-xs text-slate-300 backdrop-blur-xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.06)]"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono uppercase tracking-wider text-[11px] text-emerald-400 font-semibold">
                  Chittagong Port Cut-Off Shield
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 flex items-center gap-1 group-hover:text-slate-200 transition-colors">
                  Berth 4 Live Intel <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Before the vessel leaves, know your cargo is{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                customs-ready.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              ExportOps AI autonomously cross-checks commercial invoices, packing lists, export LCs, and bonded fabric quotas (UD) before port gate-in. 
              Eliminate Chittagong port demurrage ($8,500/hold), prevent air-freight panic, and guarantee clean bank presentation under UCP 600.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/app/shipments/EXP-001"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all hover:-translate-y-0.5 active:translate-y-0 font-display"
              >
                <span>Launch Interactive Demo (EXP-001)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/app/roi"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculate Factory Savings</span>
              </Link>
            </div>

            {/* Sleek Minimal Trust Strip */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/[0.08]">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors flex items-start gap-3 group">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Zero AI Hallucination</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">8-Point Deterministic Engine</p>
                </div>
              </div>
              
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-colors flex items-start gap-3 group">
                <Layers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">BGMEA e-UD Quota</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Bond Raw Material Math</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 transition-colors flex items-start gap-3 group">
                <FileCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">UCP 600 Bank Shield</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Discrepancy-Free Export LC</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pre-Shipment Control Tower Terminal Mockup (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Subtle glow behind console */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-indigo-500/15 blur-2xl opacity-70 pointer-events-none" />

            <div className="relative rounded-2xl bg-[#070b14] border border-white/[0.1] shadow-2xl overflow-hidden text-slate-200">
              
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-[#0a0f1d] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 ml-2 tracking-wider flex items-center gap-1.5">
                    <span>AUDIT-CONSOLE</span>
                    <span className="text-slate-600">//</span>
                    <span className="text-white">EXP-001</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-colors ${
                    resolved 
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' 
                      : 'bg-rose-950/80 text-rose-400 border-rose-500/40'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${resolved ? 'bg-emerald-400' : 'bg-rose-400 animate-ping'}`} />
                    {resolved ? 'GATE PASS ISSUED' : 'CRITICAL HOLD'}
                  </span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* Shipment Route Header */}
                <div className="flex items-center justify-between text-xs pb-3 border-b border-white/[0.06] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Gazipur</span>
                    <span className="text-slate-600">➔</span>
                    <span className="text-emerald-400 font-semibold">Chittagong</span>
                    <span className="text-slate-600">➔</span>
                    <span className="text-slate-400">Rotterdam</span>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.05]">MSKU-781920-4</span>
                </div>

                {/* Document Diff Comparison Card */}
                <div className="rounded-xl bg-[#040810] border border-white/[0.06] p-3.5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5 font-bold text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      LIVE CROSS-CHECK MATRIX
                    </span>
                    <span className="text-[10px] text-slate-500">8-POINT DETERMINISTIC</span>
                  </div>

                  {/* 2-Column Document Spec */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Invoice */}
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.05] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Commercial Invoice</span>
                      <p className="text-sm font-bold text-white">12,000 PCS</p>
                      <p className="text-[10px] text-slate-400 font-sans">$72,000 USD • 400 Cartons</p>
                    </div>

                    {/* Packing List */}
                    <div className={`p-2.5 rounded-lg border transition-all space-y-1 ${
                      resolved 
                        ? 'bg-emerald-950/30 border-emerald-500/40' 
                        : 'bg-rose-950/30 border-rose-500/40'
                    }`}>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Packing List (Floor Scan)</span>
                      <p className={`text-sm font-bold ${resolved ? 'text-emerald-300' : 'text-rose-300'}`}>
                        {resolved ? '12,000 PCS' : '11,400 PCS'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-sans">
                        {resolved ? '400 Cartons (Matched)' : '380 Cartons (-20 CTNS)'}
                      </p>
                    </div>
                  </div>

                  {/* Discrepancy Status Banner */}
                  <div className={`p-2.5 rounded-lg border text-[11px] flex items-center justify-between transition-all ${
                    resolved 
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                      : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      {resolved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
                      )}
                      <span className="font-sans font-medium">
                        {resolved 
                          ? 'Zero Discrepancies • 100% Customs-Ready' 
                          : 'Discrepancy: -600 PCS Deficit (Carton #42 missing)'}
                      </span>
                    </div>

                    <span className="font-mono font-bold text-xs">
                      {resolved ? 'SCORE: 100/100' : 'SCORE: 75/100'}
                    </span>
                  </div>

                  {/* Interactive Resolution Trigger */}
                  <button
                    onClick={() => setResolved(!resolved)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border font-sans cursor-pointer ${
                      resolved
                        ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-white/10'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${resolved ? '' : 'animate-spin'}`} />
                    <span>{resolved ? 'Reset Demo to Unresolved' : 'Simulate 1-Click Reconcile (+600 PCS)'}</span>
                  </button>
                </div>

                {/* Gate Pass / Clearance Verification Result */}
                <div className={`p-3 rounded-xl border transition-all ${
                  resolved 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : 'bg-slate-900/40 border-white/[0.05]'
                }`}>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        resolved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                      }`}>
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-[11px]">
                          {resolved ? 'PORT GATE-IN PASS #CGP-89201' : 'CRYPTOGRAPHIC GATE PASS'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-sans">
                          {resolved ? 'SHA-256 Verified • Port Berth 4 Approved' : 'Waiting for document reconciliation'}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      resolved ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {resolved ? 'CLEARED' : 'LOCKED'}
                    </span>
                  </div>
                </div>

                {/* Live Telemetry Bar */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                    <Ship className="w-3.5 h-3.5 text-teal-400" />
                    <span>Vessel: <strong className="text-white">MAERSK HAVEN</strong></span>
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px] bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Clock className="w-3 h-3 animate-pulse" />
                    <span>Cut-Off: 47h 58m</span>
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
