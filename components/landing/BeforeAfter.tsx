import React from 'react';
import { XCircle, Zap } from 'lucide-react';

export default function BeforeAfter() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
          Transformation Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
          Manual Chaos vs Autonomous Pre-Shipment Control
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          See how ExportOps AI transforms chaotic trade document cross-checking into a deterministic, zero-error workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Manual Chaos */}
        <div className="p-8 sm:p-10 rounded-3xl bg-rose-950/20 border border-rose-500/30 hover-card-lift hover:border-rose-500/60 space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">The Legacy Manual Approach</h3>
              <p className="text-sm text-rose-300 font-mono">Fragmented, high risk & error-prone</p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200">
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold text-base shrink-0 mt-0.5">✕</span>
              <p className="leading-relaxed">Commercial teams spend 4+ hours per shipment juggling 5 separate PDF windows and printouts.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold text-base shrink-0 mt-0.5">✕</span>
              <p className="leading-relaxed">A 600-piece carton deficit slips past manual inspection during late-night packing floor rush.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold text-base shrink-0 mt-0.5">✕</span>
              <p className="leading-relaxed">Container arrives at Chittagong Port gate; customs physical audit halts the trailer.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold text-base shrink-0 mt-0.5">✕</span>
              <p className="leading-relaxed">Mother vessel departs without cargo, triggering $30,000 emergency air-freight demand by buyer.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold text-base shrink-0 mt-0.5">✕</span>
              <p className="leading-relaxed">Advising bank files UCP 600 discrepancy notices; export payment delayed by 3 weeks.</p>
            </div>
          </div>
        </div>

        {/* Column 2: ExportOps AI */}
        <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 hover-card-lift hover:border-emerald-500/60 space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">The ExportOps AI Standard</h3>
              <p className="text-sm text-emerald-300 font-mono">Automated, deterministic & gate-ready</p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200">
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
              <p className="leading-relaxed">Commercial Invoice, Packing List, LC, and PO reconciled in under 60 seconds with 99% OCR confidence.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
              <p className="leading-relaxed">Deterministic 8-point engine instantly flags carton mismatch before container leaves factory premises.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
              <p className="leading-relaxed">Automated bilingual WhatsApp dispatch notifies floor supervisor in Savar/Gazipur within 5 seconds.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
              <p className="leading-relaxed">Official Chittagong Port Gate-In Pass issued with QR code and cryptographic verification hash.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
              <p className="leading-relaxed">Zero bank discrepancies under UCP 600; export remittances released in 48 hours without demurrage.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
