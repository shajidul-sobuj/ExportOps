import React from 'react';

export default function StatStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-[#0b101a] border border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
        {/* Subtle Top Border Light Beam */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-800/80 overflow-hidden pointer-events-none">
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-beam" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1.5 border-r border-slate-800/80 pr-4 group cursor-default">
            <span className="text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">Sector Value</span>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white group-hover:text-emerald-400 transition-colors">$47.38B</p>
            <p className="text-sm text-slate-300 font-medium">Bangladesh Annual RMG Exports</p>
          </div>
          <div className="space-y-1.5 lg:border-r border-slate-800/80 pr-4 pl-0 sm:pl-2 group cursor-default">
            <span className="text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">Gateway Volume</span>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-emerald-400 group-hover:scale-105 transition-transform inline-block">84%</p>
            <p className="text-sm text-slate-300 font-medium">Maritime Cargo via Chittagong</p>
          </div>
          <div className="space-y-1.5 border-r border-slate-800/80 pr-4 pt-4 lg:pt-0 group cursor-default">
            <span className="text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">Discrepancy Rate</span>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-amber-400 group-hover:scale-105 transition-transform inline-block">15.4%</p>
            <p className="text-sm text-slate-300 font-medium">Containers Facing Port/Bank Holds</p>
          </div>
          <div className="space-y-1.5 pl-0 sm:pl-2 pt-4 lg:pt-0 group cursor-default">
            <span className="text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">Verification Speed</span>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-cyan-400 group-hover:scale-105 transition-transform inline-block">&lt; 60s</p>
            <p className="text-sm text-slate-300 font-medium">Automated 8-Point Cross-Check</p>
          </div>
        </div>
      </div>
    </section>
  );
}
