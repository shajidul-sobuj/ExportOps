import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  Scale, 
  FileCheck2, 
  Container, 
  Layers, 
  Calendar, 
  DollarSign, 
  Users 
} from 'lucide-react';

const RULES = [
  {
    id: 'R1',
    name: 'Quantity Match',
    description: 'Commercial Invoice total pieces must exactly equal Packing List total pieces.',
    icon: CheckCircle2,
    severity: 'Critical',
    stat: '100% Strict'
  },
  {
    id: 'R2',
    name: 'Value Tolerance',
    description: 'Invoice total cannot exceed LC credit amount plus allowed tolerance percentage.',
    icon: DollarSign,
    severity: 'Critical',
    stat: '+/- 5% Max'
  },
  {
    id: 'R3',
    name: 'Consignee Entity Match',
    description: 'PO Buyer legal entity name must match Commercial Invoice consignee verbatim.',
    icon: Users,
    severity: 'Critical',
    stat: 'UCP 600 §14'
  },
  {
    id: 'R4',
    name: 'LC Shipment Window',
    description: 'Cargo vessel departure must precede or match LC Latest Shipment Date cutoff.',
    icon: Calendar,
    severity: 'Critical',
    stat: 'Zero Overdue'
  },
  {
    id: 'R5',
    name: 'Document Completeness',
    description: 'Mandatory presence check for PO, LC, Commercial Invoice, Packing List & COO.',
    icon: FileCheck2,
    severity: 'Critical',
    stat: '5/5 Required'
  },
  {
    id: 'R6',
    name: 'Container Assignment',
    description: 'Valid ISO container number must be declared and cross-referenced on packing list.',
    icon: Container,
    severity: 'Warning',
    stat: 'ISO 6346'
  },
  {
    id: 'R7',
    name: 'HS Code Uniformity',
    description: 'Harmonized System code must be identical across invoice, packing list and customs dec.',
    icon: Scale,
    severity: 'Critical',
    stat: 'ASYCUDA Dec'
  },
  {
    id: 'R8',
    name: 'BondIQ Fabric Quota',
    description: 'Raw material consumed must not exceed approved BGMEA Utilization Declaration (UD) quota.',
    icon: Layers,
    severity: 'Critical',
    stat: 'BGMEA e-UD'
  }
];

export default function RulesGrid() {
  return (
    <section id="rules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono font-semibold">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>ZERO AI HALLUCINATION GUARANTEE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
          AI Reads. 8 Deterministic Rules Decide.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          While LLMs extract unstructured text from scanned PDFs, 100% of pass/fail customs clearance verdicts are executed by pure, unit-tested TypeScript functions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {RULES.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.id}
              className="p-5 rounded-2xl bg-surface-1 border border-line hover:border-emerald-500/40 hover-card-lift transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                    {rule.id}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-app text-ink-3 border border-line-strong">
                    {rule.stat}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base font-display flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{rule.name}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-line flex items-center justify-between text-[11px] font-mono text-ink-3">
                <span className="text-emerald-400 font-semibold">Unit Tested (11/11)</span>
                <span className="text-slate-400">Deterministic</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <Code2 className="w-4 h-4" />
          <span>Read the full technical specification & test suite in Docs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
