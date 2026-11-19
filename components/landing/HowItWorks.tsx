import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Trade Docs Ingested',
      description: 'Accepts Commercial Invoice, Packing List, PO, Export LC, Certificate of Origin, and Bond records via drag-and-drop or ERP sync.'
    },
    {
      step: '02',
      title: 'Multimodal AI Extraction',
      description: 'Extracts quantities, values, HS codes, container numbers, and entity names with strict confidence scores and exact source citations.'
    },
    {
      step: '03',
      title: '8-Point Deterministic Rules',
      description: 'Pure TypeScript rules verify R1–R8. Zero AI hallucination: mathematical cross-checking of units, dates, tolerances, and UD fabric quotas.'
    },
    {
      step: '04',
      title: 'Customs Pass Issued',
      description: 'Shipment flips to Customs-Ready, generating an official Chittagong Port Gate-In Pass with cryptographic verification hash and QR seal.'
    }
  ];

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-emerald-400">
          Deterministic Compliance Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          How Messy Trade Papers Become Customs-Ready in 60s
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          AI reads and explains; pure TypeScript deterministic code executes the legal clearance decision.
        </p>
      </div>

      <div className="relative">
        {/* Animated Connecting Electric Stream between steps (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[1px] bg-white/[0.08] -translate-y-1/2 overflow-hidden pointer-events-none z-0">
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-electric-stream" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#080d1a]/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.16] hover:-translate-y-1 transition-all space-y-3.5 shadow-lg group cursor-default"
            >
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-sm shadow-sm group-hover:bg-emerald-500/20 transition-colors">
                {s.step}
              </span>
              <h3 className="font-bold text-white text-base sm:text-lg font-display">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
