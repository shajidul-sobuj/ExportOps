'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Why does ExportOps AI use a Deterministic Rules Engine instead of pure LLM generation for customs clearance?',
    a: 'In maritime export compliance, customs law, and bank letters of credit, an AI hallucination is legally and financially catastrophic. A made-up HS code or fabricated quantity leads to container impoundment, tax penalties, or bonded license suspension. ExportOps AI uses multimodal LLMs exclusively for OCR extraction and explanation; the actual legal compliance verdict (R1 through R8) is calculated by 100% deterministic pure TypeScript logic with mathematical guarantees.'
  },
  {
    q: 'How does BondIQ handle raw material fabric consumption and BGMEA UD quotas?',
    a: 'Bonded RMG factories in Bangladesh import raw fabric duty-free under Utilization Declaration (UD) quotas sanctioned by BGMEA/BKMEA. BondIQ takes garment GSM, applies standard consumption per dozen, factors in 5% cutting wastage, and validates the cumulative consumption against the remaining UD quota. If consumption exceeds quota (Rule R8), the shipment is blocked before customs filing to prevent heavy customs duty demands and audits.'
  },
  {
    q: 'Does ExportOps AI integrate with ASYCUDA World or factory ERPs (SAP/Oracle)?',
    a: 'Yes. ExportOps AI generates standardized JSON and XML payloads formatted according to Bangladesh Customs ASYCUDA World pre-entry specifications. C&F agents and factory commercial teams can either ingest via REST API or download pre-validated data packages for one-click portal submission.'
  },
  {
    q: 'How does the bilingual WhatsApp alert system help floor merchandisers?',
    a: 'Most factory packing floor supervisors and C&F port agents communicate primarily via WhatsApp groups rather than desktop email, especially during late-night cut-offs. ExportOps AI instantly generates formatted, urgency-ranked WhatsApp messages in native Bangla and English with exact carton discrepancies and concrete action steps, reducing correction turnaround from hours to minutes.'
  }
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase font-mono tracking-wider">
          Verification & Integrity
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
          Frequently Asked Technical Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Why industry compliance officers and hackathon judges trust the ExportOps AI architecture.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div 
              key={idx}
              className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-white text-base sm:text-lg flex items-center gap-3 font-display">
                  <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-slate-200 text-sm sm:text-base leading-relaxed border-t border-slate-800/50 animate-fade-in font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
