import React from 'react';

export default function Ticker() {
  const items = (
    <>
      <span className="flex items-center gap-2 text-emerald-400 font-bold">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        BANGLADESH RMG: $47.38 BILLION ANNUAL EXPORTS
      </span>
      <span className="text-slate-700">•</span>
      <span className="text-slate-300 flex items-center gap-2">
        <span className="text-teal-400 font-bold">⚓ CHITTAGONG SEA PORT:</span> 84% OF MARITIME EXPORT CARGO
      </span>
      <span className="text-slate-700">•</span>
      <span className="text-slate-300 flex items-center gap-2">
        <span className="text-emerald-400 font-bold">🛡️ ZERO ASYCUDA DISCREPANCIES:</span> 8-POINT DETERMINISTIC ENGINE
      </span>
      <span className="text-slate-700">•</span>
      <span className="text-slate-300 flex items-center gap-2">
        <span className="text-indigo-400 font-bold">⚖️ BONDIQ:</span> 100% UD FABRIC QUOTA RECONCILED BEFORE GATE-IN
      </span>
      <span className="text-slate-700">•</span>
      <span className="text-slate-300 flex items-center gap-2">
        <span className="text-amber-400 font-bold">⚡ BILINGUAL DISPATCH:</span> URGENT BANGLA & ENGLISH WHATSAPP ALERTS
      </span>
      <span className="text-slate-700">•</span>
      <span className="text-slate-300 flex items-center gap-2">
        <span className="text-cyan-400 font-bold">🚢 PREVENT $8,500 DEMURRAGE:</span> STOP AIR-FREIGHT EMERGENCY PANIC
      </span>
    </>
  );

  return (
    <div className="bg-[#030610]/85 backdrop-blur-xl border-b border-white/[0.06] py-3 overflow-hidden text-xs sm:text-sm font-mono tracking-wider flex select-none relative z-10 shadow-lg font-medium">
      <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
        {items}
      </div>
      <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8" aria-hidden="true">
        {items}
      </div>
    </div>
  );
}
