import React from 'react';
import { XCircle, Zap, Check, X } from 'lucide-react';

export default function BeforeAfter() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-emerald-400">
          Workflow Evolution
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          Manual Chaos vs Autonomous Pre-Shipment Control
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          See how ExportOps AI replaces late-night manual PDF panic with a deterministic, zero-error clearance pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Manual Chaos */}
        <div className="p-7 sm:p-9 rounded-2xl bg-[#080d1a]/80 backdrop-blur-xl border border-rose-500/20 hover:border-rose-500/40 transition-all space-y-6 shadow-xl group">
          <div className="flex items-center gap-3.5 pb-4 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">The Legacy Manual Approach</h3>
              <p className="text-xs text-rose-300 font-mono">Fragmented, high risk & error-prone</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3 h-3" />
              </div>
              <p className="leading-relaxed">Commercial teams spend 4+ hours per shipment juggling 5 separate PDF windows and paper manifests.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3 h-3" />
              </div>
              <p className="leading-relaxed">A 600-piece carton deficit slips past manual inspection during late-night packing floor rush.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3 h-3" />
              </div>
              <p className="leading-relaxed">Container arrives at Chittagong Port gate; customs physical audit halts the trailer.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3 h-3" />
              </div>
              <p className="leading-relaxed">Mother vessel departs without cargo, triggering $30,000 emergency air-freight demand by buyer.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3 h-3" />
              </div>
              <p className="leading-relaxed">Advising bank files UCP 600 discrepancy notices; export payment delayed by 3 weeks.</p>
            </div>
          </div>
        </div>

        {/* Column 2: ExportOps AI */}
        <div className="p-7 sm:p-9 rounded-2xl bg-[#080d1a]/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all space-y-6 shadow-xl group">
          <div className="flex items-center gap-3.5 pb-4 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shadow-sm shadow-emerald-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">The ExportOps AI Standard</h3>
              <p className="text-xs text-emerald-300 font-mono">Automated, deterministic & gate-ready</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">Commercial Invoice, Packing List, LC, and PO reconciled in under 60 seconds with 99% accuracy.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">Deterministic 8-point engine instantly flags carton mismatch before container leaves factory premises.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">Automated bilingual WhatsApp dispatch notifies floor supervisor in Savar/Gazipur within 5 seconds.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">Official Chittagong Port Gate-In Pass issued with QR code and cryptographic verification hash.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">Zero bank discrepancies under UCP 600; export remittances released in 48 hours without demurrage.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
