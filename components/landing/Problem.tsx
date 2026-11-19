import React from 'react';
import { AlertOctagon, Clock, Layers, FileText } from 'lucide-react';

export default function Problem() {
  return (
    <section id="problem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-400 font-mono">
          The Cost of Trade Paperwork Friction
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
          A Garment Shipment Fails on Paperwork, Not Production
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Over 15% of garment export containers leaving Bangladesh face documentation queries at customs, banks, or shipping lines. 
          The financial consequences are catastrophic for factory profit margins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Demurrage */}
        <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl hover:border-rose-500/60 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)] space-y-4 cursor-default">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800/60 shadow-sm">
              CRITICAL HOLD
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg sm:text-xl font-display">Port Demurrage Fees</h3>
            <p className="text-3xl font-black font-mono text-rose-400 mt-1">$8,500+</p>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            When invoice quantity differs from packing lists, customs holds the container for physical inspection. 5 days of port storage and container detention wipes out order profit.
          </p>
        </div>

        {/* Card 2: Air-Freight */}
        <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] space-y-4 cursor-default">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6 animate-float" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800/60 shadow-sm">
              MARGIN WIPEOUT
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg sm:text-xl font-display">Emergency Air-Freight</h3>
            <p className="text-3xl font-black font-mono text-amber-400 mt-1">$30,000+</p>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            If delayed paperwork misses the mother vessel cut-off, fast-fashion buyers like Zara or H&M enforce immediate air cargo shipment at the manufacturer's expense.
          </p>
        </div>

        {/* Card 3: Bond Audit */}
        <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl hover:border-indigo-500/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] space-y-4 cursor-default">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/60 shadow-sm">
              BOND AUDIT RISK
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg sm:text-xl font-display">Bonded Fabric Audits</h3>
            <p className="text-2xl sm:text-3xl font-black font-mono text-indigo-400 mt-1">Customs Penalties</p>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Unlinked fabric consumption exceeding BGMEA Utilization Declaration (UD) quotas triggers severe customs bond penalties, duty deposit demands, and license suspension.
          </p>
        </div>

        {/* Card 4: Bank Discrepancy */}
        <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] space-y-4 cursor-default">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 shadow-sm">
              PAYMENT DELAYS
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg sm:text-xl font-display">Bank Discrepancies</h3>
            <p className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 mt-1">Cashflow Freeze</p>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            A single typo in consignee name or shipment date outside the LC latest window triggers bank discrepancy notices under UCP 600, holding back export remittances for weeks.
          </p>
        </div>
      </div>
    </section>
  );
}
