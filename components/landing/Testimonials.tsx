import React from 'react';

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
          Trusted by Bangladesh Export Leaders
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Proven feedback from documentation heads and clearing agents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="glass-panel hover-card-lift p-7 sm:p-8 rounded-3xl space-y-4 cursor-default">
          <div className="flex items-center gap-1.5 text-amber-400 text-base">
            {'★'.repeat(5)}
          </div>
          <p className="text-slate-200 italic leading-relaxed text-sm sm:text-base">
            "We used to spend 4 hours cross-checking packing lists with invoices on every H&M shipment. ExportOps AI caught a 600-piece carton deficit in 3 seconds before container stuffing."
          </p>
          <div className="pt-3 border-t border-slate-800">
            <p className="font-bold text-white text-base">Tariqul Islam</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Sr. Export Documentation Manager</p>
            <span className="text-xs text-emerald-400 font-mono font-semibold mt-1 inline-block">DEPZ Savar Factory</span>
          </div>
        </div>

        <div className="glass-panel hover-card-lift p-7 sm:p-8 rounded-3xl space-y-4 cursor-default">
          <div className="flex items-center gap-1.5 text-amber-400 text-base">
            {'★'.repeat(5)}
          </div>
          <p className="text-slate-200 italic leading-relaxed text-sm sm:text-base">
            "BondIQ alone saved our factory from a major customs audit. It prevented us from filing an export shipment that exceeded our approved BGMEA UD quota by 2,500 kg."
          </p>
          <div className="pt-3 border-t border-slate-800">
            <p className="font-bold text-white text-base">Shamima Akter</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Commercial & Bond Compliance Lead</p>
            <span className="text-xs text-indigo-400 font-mono font-semibold mt-1 inline-block">Gazipur Woven Composite</span>
          </div>
        </div>

        <div className="glass-panel hover-card-lift p-7 sm:p-8 rounded-3xl space-y-4 cursor-default">
          <div className="flex items-center gap-1.5 text-amber-400 text-base">
            {'★'.repeat(5)}
          </div>
          <p className="text-slate-200 italic leading-relaxed text-sm sm:text-base">
            "As a C&F agent at Chittagong Port, getting clean paperwork before vessel cut-off is life or death. The bilingual WhatsApp alert feature gets floor revisions completed in minutes."
          </p>
          <div className="pt-3 border-t border-slate-800">
            <p className="font-bold text-white text-base">Rafiqul Karim</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Managing Partner</p>
            <span className="text-xs text-cyan-400 font-mono font-semibold mt-1 inline-block">Crown Logistics & C&F Agency</span>
          </div>
        </div>
      </div>
    </section>
  );
}
