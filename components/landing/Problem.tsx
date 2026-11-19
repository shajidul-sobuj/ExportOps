import React from 'react';
import { AlertOctagon, Clock, Layers, FileText } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: AlertOctagon,
      badge: 'PORT BOTTLENECK',
      badgeStyle: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
      title: 'Port Demurrage Fees',
      metric: '$8,500+',
      metricColor: 'text-rose-400',
      description: 'When invoice quantity differs from packing lists, customs holds the container at Chittagong. 5 days of port storage and container detention wipes out entire order profit margin.',
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/10'
    },
    {
      icon: Clock,
      badge: 'BUYER PENALTY',
      badgeStyle: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
      title: 'Emergency Air-Freight',
      metric: '$30,000+',
      metricColor: 'text-amber-400',
      description: 'If delayed paperwork misses the mother vessel cut-off, fast-fashion buyers like Zara or H&M enforce immediate air-cargo dispatch at the manufacturer\'s sole expense.',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    },
    {
      icon: Layers,
      badge: 'BOND AUDIT RISK',
      badgeStyle: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
      title: 'Bonded Fabric Penalties',
      metric: 'Duty Lock',
      metricColor: 'text-rose-400',
      description: 'Unlinked fabric consumption exceeding BGMEA Utilization Declaration (UD) quotas triggers severe customs bond penalties, mandatory duty deposits, and license freeze.',
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/10'
    },
    {
      icon: FileText,
      badge: 'BANKING HOLD',
      badgeStyle: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
      title: 'Bank Discrepancies',
      metric: '3-Wk Delay',
      metricColor: 'text-amber-400',
      description: 'A single typo in consignee name or shipment date outside the LC validity window triggers bank discrepancy notices under UCP 600, holding back export remittances for weeks.',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    }
  ];

  return (
    <section id="problem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-rose-400">
          The Cost of Trade Paperwork Friction
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          A Garment Shipment Fails on Paperwork, Not Production
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Over 15% of garment export containers leaving Bangladesh face documentation queries at customs, banks, or shipping lines. 
          The financial consequences are catastrophic for factory margins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#080d1a]/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.16] hover:-translate-y-1 transition-all space-y-4 shadow-lg group cursor-default"
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl ${p.iconBg} ${p.iconColor} flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${p.badgeStyle}`}>
                  {p.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg font-display">{p.title}</h3>
                <p className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${p.metricColor}`}>{p.metric}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
