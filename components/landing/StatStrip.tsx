import React from 'react';

export default function StatStrip() {
  const stats = [
    {
      label: 'Sector Scale',
      value: '$47.38B',
      detail: 'Annual Bangladesh RMG Exports',
      highlight: 'text-white'
    },
    {
      label: 'Gateway Volume',
      value: '84%',
      detail: 'Maritime Cargo via Chittagong Port',
      highlight: 'text-emerald-400'
    },
    {
      label: 'Paperwork Friction',
      value: '15.4%',
      detail: 'Containers Facing Port / Bank Queries',
      highlight: 'text-amber-400'
    },
    {
      label: 'Verification Engine',
      value: '< 60s',
      detail: 'Automated 8-Point Pre-Shipment Audit',
      highlight: 'text-teal-400'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl bg-[#080d1a]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Subtle hairline top highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-6 sm:p-8 space-y-2 hover:bg-white/[0.015] transition-colors group cursor-default"
            >
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                {stat.label}
              </span>
              <p className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono tracking-tight ${stat.highlight} transition-transform group-hover:scale-[1.02]`}>
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
