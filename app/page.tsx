'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Sparkles,
  Search,
  Anchor,
  Layers,
  Calculator,
  ShieldCheck,
  TrendingUp,
  FileText,
  Clock,
  ChevronRight,
  ChevronDown,
  Flame,
  Check,
  Building2,
  Copy,
  Radio,
  ExternalLink,
  Cpu,
  BarChart2,
  HelpCircle,
  XCircle,
  Zap,
  Ship,
  FileSpreadsheet,
  Globe2,
  ShieldAlert,
  ArrowUpRight,
  Boxes
} from 'lucide-react';
import initialShipments from '@/data/shipments.json';
import { Shipment, ShipmentStatus } from '@/types';

export default function HomePage() {
  const [shipments] = useState<Shipment[]>(initialShipments as unknown as Shipment[]);
  const [filter, setFilter] = useState<'All' | ShipmentStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFeatureTab, setActiveFeatureTab] = useState<'studio' | 'bond' | 'alerts' | 'compliance'>('studio');

  // Interactive ROI widget state
  const [quickContainers, setQuickContainers] = useState<number>(20);
  const estimatedSavingsMonth = quickContainers * 2125;
  const estimatedSavingsAnnual = estimatedSavingsMonth * 12;

  // Interactive Feature Tab States
  const [studioResolved, setStudioResolved] = useState<boolean>(false);
  const [bondGarmentType, setBondGarmentType] = useState<'tshirt' | 'hoodie' | 'denim'>('tshirt');
  const [alertLanguage, setAlertLanguage] = useState<'bn' | 'en'>('bn');
  const [copiedAlert, setCopiedAlert] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredShipments = shipments.filter((s) => {
    const matchesFilter = filter === 'All' || s.status === filter;
    const matchesSearch = 
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lcId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const blockedCount = shipments.filter((s) => s.status === 'Blocked').length;
  const atRiskCount = shipments.filter((s) => s.status === 'At risk').length;
  const readyCount = shipments.filter((s) => s.status === 'Customs-ready').length;
  const avgScore = Math.round(
    shipments.reduce((acc, s) => acc + s.bankReadyScore, 0) / shipments.length
  );

  const handleCopyAlert = () => {
    const textToCopy = alertLanguage === 'bn' 
      ? `🚨 EXPORTOPS AI: জরুরি নোটিশ - শিপমেন্ট EXP-001 (Nordic Retailers)\n⚠️ প্যাকিং লিস্টে কার্টন ঘাটতি (-৬০০ পিস) ধরা পড়েছে।\n❗ অবিলম্বে ফ্লোর ইন-চার্জ প্যাকিং লিস্ট ৫০০ কার্টনে আপডেট করুন। জাহাজ কাট-অফ বাকি: ৪৮ ঘণ্টা।`
      : `🚨 EXPORTOPS AI: URGENT COMPLIANCE NOTICE - EXP-001 (Nordic Retailers)\n⚠️ Packing list carton deficit detected (-600 PCS vs Invoice).\n❗ Floor In-charge: Update packing list to 500 cartons immediately. Vessel cut-off: 48 hours.`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 2500);
  };

  const garmentPresets = {
    tshirt: {
      name: 'Basic Crewneck T-Shirt (Knit Single Jersey)',
      gsm: 160,
      dznCons: '2.40 kg/dzn',
      orderQty: '12,000 PCS (1,000 Dzn)',
      netNeed: '2,400 kg',
      wastage: '+120 kg (5% Cutting)',
      totalFabric: '2,520 kg',
      udQuota: '4,000 kg (UD-2026-BGMEA-4410)',
      status: 'Within Approved Quota (Compliant)',
      isSafe: true,
    },
    hoodie: {
      name: 'Fleece Heavy Winter Hoodie (Knit Terry)',
      gsm: 320,
      dznCons: '6.80 kg/dzn',
      orderQty: '10,000 PCS (833 Dzn)',
      netNeed: '5,664 kg',
      wastage: '+283 kg (5% Cutting)',
      totalFabric: '5,947 kg',
      udQuota: '5,500 kg (UD-2026-BGMEA-8821)',
      status: 'Over Quota by 447 kg (Bond Violation - Blocked)',
      isSafe: false,
    },
    denim: {
      name: '5-Pocket Stretch Denim Pant (Woven Twill)',
      gsm: 380,
      dznCons: '16.50 Yds/dzn',
      orderQty: '6,000 PCS (500 Dzn)',
      netNeed: '8,250 Yds',
      wastage: '+412 Yds (5% Cutting)',
      totalFabric: '8,662 Yds',
      udQuota: '10,000 Yds (UD-2026-BGMEA-9014)',
      status: 'Within Approved Quota (Compliant)',
      isSafe: true,
    }
  };

  const faqs = [
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

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* 1. Live Marquee Ticker: Seamless Infinite Dual-Track Loop */}
      <div className="bg-[#040711] border-b border-slate-800/80 py-2.5 overflow-hidden text-xs text-emerald-400 font-mono tracking-wider flex select-none relative z-10 shadow-sm">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            BANGLADESH RMG: $47.38 BILLION ANNUAL EXPORTS
          </span>
          <span className="text-slate-600">•</span>
          <span>⚓ CHITTAGONG SEA PORT: 84% OF MARITIME EXPORT CARGO</span>
          <span className="text-slate-600">•</span>
          <span>🛡️ ZERO ASYCUDA DISCREPANCIES: 8-POINT DETERMINISTIC ENGINE</span>
          <span className="text-slate-600">•</span>
          <span>⚖️ BONDIQ: 100% UD FABRIC QUOTA RECONCILED BEFORE GATE-IN</span>
          <span className="text-slate-600">•</span>
          <span>⚡ BILINGUAL DISCREPANCY DISPATCH (BANGLA & ENGLISH)</span>
          <span className="text-slate-600">•</span>
          <span>🚢 PREVENT $8,500 DEMURRAGE HOLDS & $30,000 AIR-FREIGHT PANIC</span>
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8" aria-hidden="true">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            BANGLADESH RMG: $47.38 BILLION ANNUAL EXPORTS
          </span>
          <span className="text-slate-600">•</span>
          <span>⚓ CHITTAGONG SEA PORT: 84% OF MARITIME EXPORT CARGO</span>
          <span className="text-slate-600">•</span>
          <span>🛡️ ZERO ASYCUDA DISCREPANCIES: 8-POINT DETERMINISTIC ENGINE</span>
          <span className="text-slate-600">•</span>
          <span>⚖️ BONDIQ: 100% UD FABRIC QUOTA RECONCILED BEFORE GATE-IN</span>
          <span className="text-slate-600">•</span>
          <span>⚡ BILINGUAL DISCREPANCY DISPATCH (BANGLA & ENGLISH)</span>
          <span className="text-slate-600">•</span>
          <span>🚢 PREVENT $8,500 DEMURRAGE HOLDS & $30,000 AIR-FREIGHT PANIC</span>
        </div>
      </div>

      {/* 2. Hero Section: Animated Pre-Shipment Control Tower */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative">
        {/* Subtle Ambient Background Aura */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide shadow-sm shadow-emerald-950 hover:border-emerald-400/80 transition-all cursor-default">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-300">
                Chittagong Port Cut-Off Readiness Active
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Before the Vessel Leaves, Know Your Shipment is{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Customs-Ready.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              ExportOps AI cross-checks commercial invoices, packing lists, export LCs, and bonded fabric quotas (UD) before port gate-in. 
              Prevent container demurrage ($8,500/hold), eliminate air-freight panic, and guarantee clean bank presentation under UCP 600.
            </p>

            {/* Hero CTAs with Hover Shimmer */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shipments/EXP-001"
                className="relative overflow-hidden group/btn inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {/* Shimmer line sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Launch Interactive Demo (EXP-001)</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <Link
                href="/roi"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700/80 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
                <span>Calculate Factory Savings</span>
              </Link>
            </div>

            {/* Trust Badges with Micro-Transitions */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2 group cursor-default">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 transition-transform group-hover:scale-110" />
                <span className="font-medium text-slate-300 group-hover:text-white transition-colors">Deterministic Rules (Zero Hallucination)</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <Layers className="w-4 h-4 text-indigo-400 shrink-0 transition-transform group-hover:scale-110" />
                <span className="font-medium text-slate-300 group-hover:text-white transition-colors">BGMEA e-UD Reconciled</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <FileCheck className="w-4 h-4 text-amber-400 shrink-0 transition-transform group-hover:scale-110" />
                <span className="font-medium text-slate-300 group-hover:text-white transition-colors">UCP 600 Bank Discrepancy Shield</span>
              </div>
            </div>
          </div>

          {/* Right Hero: Animated Port Radar Widget (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl bg-[#070b13] border border-slate-800 p-6 shadow-2xl flex flex-col justify-between overflow-hidden animate-glow">
              {/* Radar Rings Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[85%] h-[85%] rounded-full border border-emerald-500/20 animate-pulse-ring" />
                <div className="w-[60%] h-[60%] rounded-full border border-emerald-500/30" />
                <div className="w-[35%] h-[35%] rounded-full border border-emerald-500/40" />
                <div className="w-[10%] h-[10%] rounded-full bg-emerald-500/30" />
                <div className="absolute inset-0 border-t border-emerald-500/20 top-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 border-l border-emerald-500/20 left-1/2 -translate-x-1/2" />
                
                {/* Rotating Sweep Line */}
                <div className="absolute inset-0 animate-radar">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/35 via-emerald-500/5 to-transparent origin-bottom-right rounded-tl-full" />
                </div>
              </div>

              {/* Radar Header */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-emerald-400 animate-float" />
                  <span className="font-mono font-bold text-slate-200">CHITTAGONG SEA PORT BERTH 4</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  RADAR ACTIVE
                </span>
              </div>

              {/* Targets: Clickable Live Radar Blips */}
              <div className="relative z-10 my-auto space-y-3 font-mono text-xs">
                {/* Target 1: EXP-001 (Blocked Alert) */}
                <Link
                  href="/shipments/EXP-001"
                  className="block p-3.5 bg-red-950/80 border border-red-500/60 rounded-xl backdrop-blur-sm shadow-lg hover:border-red-400 hover:scale-[1.02] hover:-translate-y-0.5 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                      <div>
                        <p className="font-bold text-red-200 group-hover:text-white transition-colors">
                          EXP-001 • MSKU-781920-4
                        </p>
                        <p className="text-[10px] text-red-300 font-sans mt-0.5">
                          Invoice (12,000 pcs) != Packing list (11,400 pcs)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] shrink-0 shadow-sm">
                        BLOCKED
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                {/* Target 2: EXP-005 (Customs-Ready) */}
                <Link
                  href="/shipments/EXP-005"
                  className="block p-3.5 bg-emerald-950/80 border border-emerald-500/60 rounded-xl backdrop-blur-sm shadow-lg hover:border-emerald-400 hover:scale-[1.02] hover:-translate-y-0.5 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-sm" />
                      <div>
                        <p className="font-bold text-emerald-200 group-hover:text-white transition-colors">
                          EXP-005 • MSKU-908234-7
                        </p>
                        <p className="text-[10px] text-emerald-300 font-sans mt-0.5">
                          All 8 rules passed • Gate-In Pass Issued
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] shrink-0 shadow-sm">
                        READY
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Radar Footer */}
              <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Vessel: MAERSK HAVEN</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 animate-pulse" />
                  Cut-Off: 48h Remaining
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Industry Scale Metrics Bar (Linear / Vercel style with Light Beam) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0b101a] border border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
          {/* Subtle Top Border Light Beam */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-800/80 overflow-hidden pointer-events-none">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-beam" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1 border-r border-slate-800/80 pr-4 group cursor-default">
              <span className="text-[11px] text-slate-500 uppercase font-mono font-semibold">Sector Value</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-white group-hover:text-emerald-400 transition-colors">$47.38B</p>
              <p className="text-xs text-slate-400">Bangladesh Annual RMG Exports</p>
            </div>
            <div className="space-y-1 lg:border-r border-slate-800/80 pr-4 pl-0 sm:pl-2 group cursor-default">
              <span className="text-[11px] text-slate-500 uppercase font-mono font-semibold">Gateway Volume</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 group-hover:scale-105 transition-transform inline-block">84%</p>
              <p className="text-xs text-slate-400">Maritime Cargo Handled at Chittagong</p>
            </div>
            <div className="space-y-1 border-r border-slate-800/80 pr-4 pt-4 lg:pt-0 group cursor-default">
              <span className="text-[11px] text-slate-500 uppercase font-mono font-semibold">Discrepancy Rate</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-amber-400 group-hover:scale-105 transition-transform inline-block">15.4%</p>
              <p className="text-xs text-slate-400">Containers Facing Port/Bank Holds</p>
            </div>
            <div className="space-y-1 pl-0 sm:pl-2 pt-4 lg:pt-0 group cursor-default">
              <span className="text-[11px] text-slate-500 uppercase font-mono font-semibold">Verification Speed</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 group-hover:scale-105 transition-transform inline-block">&lt; 60s</p>
              <p className="text-xs text-slate-400">Automated 8-Point Cross-Check</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The $47B Paperwork Problem Breakdown (The 4 Cost Drivers with Hover Lift) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
            The Cost of Trade Paperwork Friction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A Garment Shipment Fails on Paperwork, Not Production
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Over 15% of garment export containers leaving Bangladesh face documentation queries at customs, banks, or shipping lines. 
            The financial consequences are catastrophic for factory profit margins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Demurrage */}
          <div className="glass-panel hover-card-lift p-6 rounded-2xl hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] space-y-3 cursor-default">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                <AlertOctagon className="w-5 h-5 animate-pulse" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800/60 shadow-sm">
                CRITICAL HOLD
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Port Demurrage Fees</h3>
            <p className="text-2xl font-extrabold font-mono text-red-400">$8,500+</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              When invoice quantity differs from packing lists, customs holds the container for physical inspection. 5 days of port storage and container detention wipes out order profit.
            </p>
          </div>

          {/* Card 2: Air-Freight */}
          <div className="glass-panel hover-card-lift p-6 rounded-2xl hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] space-y-3 cursor-default">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5 animate-float" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800/60 shadow-sm">
                MARGIN WIPEOUT
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Emergency Air-Freight</h3>
            <p className="text-2xl font-extrabold font-mono text-amber-400">$30,000+</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              If delayed paperwork misses the mother vessel cut-off, fast-fashion buyers like Zara or H&M enforce immediate air cargo shipment at the manufacturer's expense.
            </p>
          </div>

          {/* Card 3: Bond Audit */}
          <div className="glass-panel hover-card-lift p-6 rounded-2xl hover:border-indigo-500/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] space-y-3 cursor-default">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/60 shadow-sm">
                BOND AUDIT RISK
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Bonded Fabric Audits</h3>
            <p className="text-2xl font-extrabold font-mono text-indigo-400">Customs Penalties</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlinked fabric consumption exceeding BGMEA Utilization Declaration (UD) quotas triggers severe customs bond penalties, duty deposit demands, and license suspension.
            </p>
          </div>

          {/* Card 4: Bank Discrepancy */}
          <div className="glass-panel hover-card-lift p-6 rounded-2xl hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] space-y-3 cursor-default">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800/60 shadow-sm">
                PAYMENT DELAYS
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Bank Discrepancies</h3>
            <p className="text-2xl font-extrabold font-mono text-blue-400">Cashflow Freeze</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              A single typo in consignee name or shipment date outside the LC latest window triggers bank discrepancy notices under UCP 600, holding back export remittances for weeks.
            </p>
          </div>
        </div>
      </section>

      {/* 5. The Chaos vs Control Comparison (Stripe / Linear style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Transformation Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manual Chaos vs Autonomous Pre-Shipment Control
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how ExportOps AI transforms chaotic trade document cross-checking into a deterministic, zero-error workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Manual Chaos */}
          <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/30 hover-card-lift hover:border-red-500/60 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Legacy Manual Approach</h3>
                <p className="text-xs text-red-300 font-mono">Fragmented, high risk & error-prone</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                <p>Commercial teams spend 4+ hours per shipment juggling 5 separate PDF windows and printouts.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                <p>A 600-piece carton deficit slips past manual inspection during late-night packing floor rush.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                <p>Container arrives at Chittagong Port gate; customs physical audit halts the trailer.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                <p>Mother vessel departs without cargo, triggering $30,000 emergency air-freight demand by buyer.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                <p>Advising bank files UCP 600 discrepancy notices; export payment delayed by 3 weeks.</p>
              </div>
            </div>
          </div>

          {/* Column 2: ExportOps AI */}
          <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 hover-card-lift hover:border-emerald-500/60 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The ExportOps AI Standard</h3>
                <p className="text-xs text-emerald-300 font-mono">Automated, deterministic & gate-ready</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <p>Commercial Invoice, Packing List, LC, and PO reconciled in under 60 seconds with 99% OCR confidence.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <p>Deterministic 8-point engine instantly flags carton mismatch before container leaves factory premises.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <p>Automated bilingual WhatsApp dispatch notifies floor supervisor in Savar/Gazipur within 5 seconds.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <p>Official Chittagong Port Gate-In Pass issued with QR code and cryptographic verification hash.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <p>Zero bank discrepancies under UCP 600; export remittances released in 48 hours without demurrage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Embedded Live Control Tower Section */}
      <section id="control-tower" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-[#0b101a] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Top Border Light Beam */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-800/80 overflow-hidden pointer-events-none">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-beam" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Interactive Prototype</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Active Shipments Control Tower
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                5 synthetic test shipments with real planted export issues. Select any shipment to inspect.
              </p>
            </div>

            {/* Quick Demo Recommendation Guide */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl flex items-center gap-3 hover-card-lift">
              <Flame className="w-5 h-5 text-amber-400 shrink-0 animate-float" />
              <div className="text-xs">
                <span className="font-bold text-amber-300">Recommended Demo:</span>
                <p className="text-slate-300 text-[11px]">Start with EXP-001 for 1-click quantity remediation.</p>
              </div>
              <Link
                href="/shipments/EXP-001"
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors ml-2 shrink-0 shadow-sm"
              >
                Inspect EXP-001
              </Link>
            </div>
          </div>

          {/* Metric KPI Counter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#080d15] p-4 rounded-xl border border-slate-800 hover-card-lift">
              <span className="text-[11px] text-slate-400 uppercase font-mono">Total Shipments</span>
              <p className="text-2xl font-bold font-mono text-white mt-1">{shipments.length}</p>
            </div>
            <div className="bg-red-950/40 p-4 rounded-xl border border-red-500/30 hover-card-lift">
              <span className="text-[11px] text-red-400 uppercase font-mono">Blocked at Port</span>
              <p className="text-2xl font-bold font-mono text-red-400 mt-1">{blockedCount}</p>
            </div>
            <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-500/30 hover-card-lift">
              <span className="text-[11px] text-amber-400 uppercase font-mono">At Risk (Warnings)</span>
              <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{atRiskCount}</p>
            </div>
            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 hover-card-lift">
              <span className="text-[11px] text-emerald-400 uppercase font-mono">Customs-Ready</span>
              <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{readyCount}</p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 bg-[#080d15] p-1 rounded-xl border border-slate-800 overflow-x-auto">
              {(['All', 'Blocked', 'At risk', 'Customs-ready'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                    filter === tab
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'All' ? 'All Batches' : tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search shipment, buyer, PO, LC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#080d15] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/80 transition-all"
              />
            </div>
          </div>

          {/* Shipment Table */}
          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#080d15]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase font-mono">
                    <th className="py-3 px-4 sm:px-6">Shipment ID</th>
                    <th className="py-3 px-4">Buyer & Factory</th>
                    <th className="py-3 px-4">PO & Export LC</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Bank-Ready Score</th>
                    <th className="py-3 px-4">Planted Issue</th>
                    <th className="py-3 px-4 text-right">Inspection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((s) => {
                      const isBlocked = s.status === 'Blocked';
                      const isAtRisk = s.status === 'At risk';
                      const isReady = s.status === 'Customs-ready';

                      return (
                        <tr key={s.id} className="hover:bg-slate-800/60 hover:shadow-inner transition-colors duration-200 group">
                          <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-white">
                            <Link href={`/shipments/${s.id}`} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                              <span>{s.id}</span>
                              <ExternalLink className="w-3 h-3 text-slate-500 opacity-60 group-hover:opacity-100 group-hover:text-emerald-400 transition-all" />
                            </Link>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-200">{s.buyer}</p>
                            <p className="text-[11px] text-slate-400">{s.supplier}</p>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">
                            <div>PO: {s.poNumber}</div>
                            <div className="text-slate-500">LC: {s.lcId}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            {isBlocked && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-300 border border-red-700 font-mono shadow-sm">
                                <AlertOctagon className="w-3 h-3 text-red-400" />
                                Blocked
                              </span>
                            )}
                            {isAtRisk && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700 font-mono shadow-sm">
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
                                At Risk
                              </span>
                            )}
                            {isReady && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono shadow-sm">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                Customs-Ready
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-mono font-bold text-sm ${
                                s.bankReadyScore >= 90 ? 'text-emerald-400' : s.bankReadyScore >= 75 ? 'text-amber-400' : 'text-red-400'
                              }`}>
                                {s.bankReadyScore}/100
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate" title={s.id}>
                            {s.id === 'EXP-001' && 'Invoice Qty != Packing List (-600 pcs)'}
                            {s.id === 'EXP-002' && 'Shipment past LC date & missing COO'}
                            {s.id === 'EXP-003' && 'Fabric consumed > UD quota (+2,500 kg)'}
                            {s.id === 'EXP-004' && 'Container missing from packing list'}
                            {s.id === 'EXP-005' && 'All 8 rules passed (Clean baseline)'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Link
                              href={`/shipments/${s.id}`}
                              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold hover:underline font-mono"
                            >
                              <span>Inspect</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                        No shipments match the filter "{filter}" or search query "{searchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. The 4-Step Pre-Filing Engine Pipeline with Electric Pulse Stream */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Deterministic Compliance Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Messy Trade Papers Become Customs-Ready in 60s
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            AI reads and explains; pure TypeScript deterministic code executes the legal clearance decision.
          </p>
        </div>

        <div className="relative">
          {/* Animated Connecting Electric Stream between steps (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-[2px] bg-slate-800/80 -translate-y-1/2 overflow-hidden pointer-events-none z-0">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-electric-stream" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            <div className="glass-panel hover-card-lift p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm shadow-sm shadow-emerald-500/20">
                01
              </span>
              <h3 className="font-bold text-white text-base">Trade Docs Ingested</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accepts Commercial Invoice, Packing List, PO, Export LC, Certificate of Origin, and Bond records via drag-and-drop or ERP sync.
              </p>
            </div>

            <div className="glass-panel hover-card-lift p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm shadow-sm shadow-emerald-500/20">
                02
              </span>
              <h3 className="font-bold text-white text-base">Multimodal AI Extraction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts quantities, values, HS codes, container numbers, and entity names with strict confidence scores and exact source quotations.
              </p>
            </div>

            <div className="glass-panel hover-card-lift p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm shadow-sm shadow-emerald-500/20">
                03
              </span>
              <h3 className="font-bold text-white text-base">8-Point Deterministic Rules</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pure code checks R1-R8. Zero AI hallucination: mathematical cross-checking of units, dates, tolerances, and UD fabric quota balances.
              </p>
            </div>

            <div className="glass-panel hover-card-lift p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm shadow-sm shadow-emerald-500/20">
                04
              </span>
              <h3 className="font-bold text-white text-base">Customs Pass Issued</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Shipment flips to Customs-Ready, generating an official Chittagong Port Gate-In Pass with cryptographic verification hash and QR code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Feature Showcase (Tabbed with Smooth Animated Transitions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">Product Deep-Dive</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Enterprise Suite Modules</h2>
          <p className="text-xs sm:text-sm text-slate-400">Built specifically for Bangladeshi garment factories and clearing agents.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveFeatureTab('studio')}
            className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeFeatureTab === 'studio' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Inspection Studio
          </button>
          <button
            onClick={() => setActiveFeatureTab('bond')}
            className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeFeatureTab === 'bond' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            BondIQ Fabric Ledger
          </button>
          <button
            onClick={() => setActiveFeatureTab('alerts')}
            className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeFeatureTab === 'alerts' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Floor WhatsApp Alerts
          </button>
          <button
            onClick={() => setActiveFeatureTab('compliance')}
            className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeFeatureTab === 'compliance' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Buyer Compliance (H&M, Zara)
          </button>
        </div>

        {/* Feature Tab Card with Smooth Fade-In on Switch */}
        <div className="bg-[#0b101a] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-fade-in key={activeFeatureTab}">
          {/* TAB 1: Inspection Studio */}
          {activeFeatureTab === 'studio' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                  <span>MODULE 01: DUAL-WINDOW AUDITOR</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Side-by-Side Document Inspection Studio</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  No more switching between 5 different PDF windows and printed Excel sheets. ExportOps AI aligns the Commercial Invoice, Packing List, and LC side-by-side with line-item discrepancy highlighting.
                </p>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time OCR extraction with 99% confidence tagging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Inline editing with instant re-validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Official printable Chittagong Port Gate-In Pass</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/shipments/EXP-001"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors font-mono shadow-md"
                  >
                    <span>Open Live Studio (EXP-001)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Interactive Diff Simulator */}
              <div className="p-6 bg-[#070b13] rounded-2xl border border-slate-800 text-xs font-mono shadow-inner space-y-4 hover-card-lift">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400 text-[11px] font-semibold">// Interactive Audit Simulator</span>
                  <button
                    onClick={() => setStudioResolved(!studioResolved)}
                    className="px-2.5 py-1 rounded text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all transform active:scale-95 shadow-sm"
                  >
                    {studioResolved ? 'Reset to Mismatch' : 'Simulate 1-Click Fix'}
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-900/80 rounded-lg flex justify-between">
                    <span className="text-slate-400">COMMERCIAL INVOICE:</span>
                    <span className="text-white font-bold">12,000 PCS ($72,000)</span>
                  </div>
                  <div className={`p-2.5 rounded-lg flex justify-between transition-colors duration-300 ${
                    studioResolved ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border border-red-500/40 text-red-300'
                  }`}>
                    <span>PACKING LIST:</span>
                    <span className="font-bold">{studioResolved ? '12,000 PCS (500 Ctns)' : '11,400 PCS (475 Ctns)'}</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-[11px] leading-relaxed transition-all duration-300 ${
                  studioResolved
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950'
                    : 'bg-red-950/40 border-red-500/50 text-red-300 shadow-md shadow-red-950'
                }`}>
                  {studioResolved ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>RULE R1 PASSED: Quantities match exactly (12,000 pcs). Gate-In Pass Ready!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
                      <span>RULE R1 FAILED: 600 PCS Deficit detected between Invoice and Packing List.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BondIQ Fabric Ledger */}
          {activeFeatureTab === 'bond' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[11px] font-mono border border-indigo-500/20">
                  <span>MODULE 02: CUSTOMS BOND COMPLIANCE</span>
                </div>
                <h3 className="text-2xl font-bold text-white">BondIQ: Fabric Math & UD Quota Ledger</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  Bonded raw material audits are Bangladesh's biggest export compliance hazard. BondIQ automatically computes fabric consumption per dozen, adds cutting wastage, and balances usage against approved BGMEA Utilization Declaration (UD) quotas.
                </p>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Calculates fabric required across Knit, Woven, and Denim presets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Prevents export declaration if unlinked fabric usage is found (Rule R8)</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/shipments/EXP-003"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors font-mono shadow-md"
                  >
                    <span>Inspect Violation in EXP-003</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Interactive Garment Math Preset Selector */}
              <div className="p-6 bg-[#070b13] rounded-2xl border border-slate-800 text-xs font-mono text-slate-200 shadow-inner space-y-4 hover-card-lift">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400 text-[11px] font-semibold">// Select Garment Preset</span>
                  <div className="flex items-center gap-1">
                    {(['tshirt', 'hoodie', 'denim'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setBondGarmentType(type)}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          bondGarmentType === type
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs animate-fade-in key={bondGarmentType}">
                  <div className="text-indigo-300 font-bold">{garmentPresets[bondGarmentType].name}</div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Fabric Weight (GSM):</span>
                    <span className="text-white">{garmentPresets[bondGarmentType].gsm} GSM</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Consumption Formula:</span>
                    <span className="text-white">{garmentPresets[bondGarmentType].dznCons}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Order Batch Size:</span>
                    <span className="text-white">{garmentPresets[bondGarmentType].orderQty}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Cutting Wastage (5%):</span>
                    <span className="text-amber-400">{garmentPresets[bondGarmentType].wastage}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800">
                    <span>Total Required Fabric:</span>
                    <span className="text-indigo-400">{garmentPresets[bondGarmentType].totalFabric}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>BGMEA UD Quota:</span>
                    <span className="text-white">{garmentPresets[bondGarmentType].udQuota}</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-[11px] font-bold transition-all duration-300 ${
                  garmentPresets[bondGarmentType].isSafe
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/40 border-red-500/50 text-red-300'
                }`}>
                  {garmentPresets[bondGarmentType].status}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Floor WhatsApp Alerts */}
          {activeFeatureTab === 'alerts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                  <span>MODULE 03: INSTANT DISPATCH</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Bilingual Floor & C&F WhatsApp Dispatcher</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  When a mismatch is caught at midnight before vessel cut-off, merchandisers don't have time to draft emails. ExportOps AI generates formatted, urgency-ranked WhatsApp messages in Bangla and English for instant floor remediation.
                </p>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1-click copy for factory supervisor WhatsApp groups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bilingual instructions: clear action steps for floor in-charges</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleCopyAlert}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all font-mono shadow-md transform active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedAlert ? 'Copied to Clipboard!' : 'Copy Dispatch Message'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive WhatsApp Message Simulator */}
              <div className="p-6 bg-[#070b13] rounded-2xl border border-emerald-500/30 text-xs font-mono shadow-inner space-y-4 hover-card-lift">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    WhatsApp Discrepancy Dispatch
                  </span>
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setAlertLanguage('bn')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                        alertLanguage === 'bn' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      বাংলা
                    </button>
                    <button
                      onClick={() => setAlertLanguage('en')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                        alertLanguage === 'en' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#0a1410] border border-emerald-500/20 rounded-xl space-y-2 text-xs animate-fade-in key={alertLanguage}">
                  <p className="text-emerald-400 font-bold">🚨 EXPORTOPS AI: URGENT COMPLIANCE ALERT</p>
                  <p className="text-slate-300">📦 Shipment: EXP-001 (Nordic Retailers)</p>
                  <p className="text-red-400 font-semibold">⚠️ Issue: Quantity Mismatch (-600 PCS vs Invoice)</p>
                  
                  {alertLanguage === 'bn' ? (
                    <div className="pt-2 text-slate-200 font-bengali text-sm leading-relaxed border-t border-emerald-950">
                      ❗ <strong>জরুরি অ্যাকশন:</strong> ফ্লোরে প্যাকিং লিস্টের কার্টন সংখ্যা রি-চেক করুন। ৫০০ কার্টন রেডি থাকলে প্যাকিং লিস্ট আপডেট করে দ্রুত ক্লিয়ারিং এজেন্টের কাছে পাঠান। জাহাজ কাট-অফ বাকি: ৪৮ ঘণ্টা।
                    </div>
                  ) : (
                    <div className="pt-2 text-slate-200 font-sans text-xs leading-relaxed border-t border-emerald-950">
                      ❗ <strong>URGENT ACTION:</strong> Verify carton counts on factory packing floor. If 500 cartons are verified, update packing list and transmit to Chittagong C&F agent. Remaining vessel cut-off: 48h.
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Priority: HIGH • CUT-OFF RISK</span>
                  <span>Recipient: Factory Ops + C&F Lead</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Buyer Compliance */}
          {activeFeatureTab === 'compliance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-[11px] font-mono border border-blue-500/20">
                  <span>MODULE 04: RETAIL CHARGEBACK SHIELD</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Global Buyer Compliance Rulebook</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  Go beyond customs. International retail giants enforce strict packaging, barcode, and RFID rules. Prevent expensive $1.50 - $3.00 per-carton retailer chargebacks at European and American distribution hubs.
                </p>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>H&M Ratio Pack & Polybag warning validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zara / Inditex UHF Gen2 RFID source tagging audits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Target & Walmart GS1-128 barcode and carton weight checks</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/compliance"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors font-mono shadow-md"
                  >
                    <span>Explore Buyer Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Retailer Rulebook Matrix Preview */}
              <div className="p-6 bg-[#070b13] rounded-2xl border border-slate-800 text-xs space-y-3 font-mono hover-card-lift">
                <p className="text-slate-400 text-[11px] pb-2 border-b border-slate-800">// Retailer Compliance Matrix</p>
                
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                  <div>
                    <span className="font-bold text-white">H&M Group (HM-01)</span>
                    <p className="text-[10px] text-slate-400">Ratio Pack & Suffocation Warning</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-[10px]">
                    PASSED
                  </span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                  <div>
                    <span className="font-bold text-white">Inditex / Zara (ZRA-01)</span>
                    <p className="text-[10px] text-slate-400">UHF Gen2 EPC RFID Inlay Audit</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-[10px]">
                    PASSED
                  </span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                  <div>
                    <span className="font-bold text-white">Target US (TGT-02)</span>
                    <p className="text-[10px] text-slate-400">Max Carton Gross Weight &lt; 20kg</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-[10px]">
                    PASSED
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 9. Interactive ROI & Demurrage Savings Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#0b101a] to-[#070b13] p-8 sm:p-12 rounded-3xl border border-emerald-500/40 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Pulse */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />

          <div className="space-y-4 max-w-xl relative z-10">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">The Business Case</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculate Your Factory's Monthly Savings
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Drag the volume slider to see how much avoidable demurrage, air-freight penalties, and documentation overtime your factory eliminates every month with ExportOps AI.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Monthly Export Containers: <strong className="text-white text-sm">{quickContainers} FCL</strong></span>
                <span className="text-emerald-400 font-bold">${estimatedSavingsMonth.toLocaleString()} / mo Saved</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={quickContainers}
                onChange={(e) => setQuickContainers(Number(e.target.value))}
                className="w-full accent-emerald-400 h-2.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 Containers (Small Unit)</span>
                <span>40 Containers (Mid Tier)</span>
                <span>80 Containers (Large Group)</span>
              </div>
            </div>

            {/* Micro Breakdown Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-[11px] font-mono">
              <div className="bg-[#070b13]/80 p-2.5 rounded-lg border border-slate-800 hover-card-lift">
                <span className="text-slate-400 block text-[10px]">Demurrage Avoided</span>
                <span className="text-emerald-400 font-bold">${(quickContainers * 1275).toLocaleString()}</span>
              </div>
              <div className="bg-[#070b13]/80 p-2.5 rounded-lg border border-slate-800 hover-card-lift">
                <span className="text-slate-400 block text-[10px]">Air-Freight Risk</span>
                <span className="text-emerald-400 font-bold">${(quickContainers * 850).toLocaleString()}</span>
              </div>
              <div className="bg-[#070b13]/80 p-2.5 rounded-lg border border-slate-800 hover-card-lift">
                <span className="text-slate-400 block text-[10px]">Hours Saved</span>
                <span className="text-emerald-400 font-bold">{(quickContainers * 4)} hrs/mo</span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-right shrink-0 space-y-4 bg-[#070b13]/80 p-8 rounded-2xl border border-slate-800 relative z-10 hover-card-lift">
            <div>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Projected Annual Factory Savings</p>
              <p className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 mt-1 drop-shadow-sm">
                ${estimatedSavingsAnnual.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-slate-400 max-w-xs font-sans">
              Based on Chittagong Port $8,500 average 5-day demurrage hold and 15% discrepancy rates.
            </p>
            <div>
              <Link
                href="/roi"
                className="relative overflow-hidden group/btn inline-flex items-center gap-1.5 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Explore Pricing Plans (From ৳30k/mo)</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Technical Architecture & FAQ Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
            Verification & Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Technical Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Why industry compliance officers and hackathon judges trust the ExportOps AI architecture.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                >
                  <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/50 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Social Proof & Industry Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Trusted by Bangladesh Export Leaders</h2>
          <p className="text-xs text-slate-400">Proven feedback from documentation heads and clearing agents.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="glass-panel hover-card-lift p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-slate-300 italic leading-relaxed">
              "We used to spend 4 hours cross-checking packing lists with invoices on every H&M shipment. ExportOps AI caught a 600-piece carton deficit in 3 seconds before container stuffing."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="font-bold text-white text-sm">Tariqul Islam</p>
              <p className="text-[11px] text-slate-400">Sr. Export Documentation Manager</p>
              <span className="text-[10px] text-emerald-400 font-mono">DEPZ Savar Factory</span>
            </div>
          </div>

          <div className="glass-panel hover-card-lift p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-slate-300 italic leading-relaxed">
              "BondIQ alone saved our factory from a major customs audit. It prevented us from filing an export shipment that exceeded our approved BGMEA UD quota by 2,500 kg."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="font-bold text-white text-sm">Shamima Akter</p>
              <p className="text-[11px] text-slate-400">Commercial & Bond Compliance Lead</p>
              <span className="text-[10px] text-indigo-400 font-mono">Gazipur Woven Composite</span>
            </div>
          </div>

          <div className="glass-panel hover-card-lift p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-slate-300 italic leading-relaxed">
              "As a C&F agent at Chittagong Port, getting clean paperwork before vessel cut-off is life or death. The bilingual WhatsApp alert feature gets floor revisions completed in minutes."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="font-bold text-white text-sm">Rafiqul Karim</p>
              <p className="text-[11px] text-slate-400">Managing Partner</p>
              <span className="text-[10px] text-cyan-400 font-mono">Crown Logistics & C&F Agency</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Final High-Converting Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#0b101a] via-[#070b13] to-[#0b101a] border border-slate-800 p-10 sm:p-14 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          {/* Signature Animated Border Beam across the top of the CTA Box */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-800/80 overflow-hidden pointer-events-none">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-beam" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Clear Every Container on Time?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Eliminate vessel cut-off panic, reduce demurrage to zero, and deliver 100% bank-ready paperwork on every garment shipment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shipments/EXP-001"
              className="relative overflow-hidden group/btn px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Start Live Interactive Demo</span>
            </Link>
            <Link
              href="/roi"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700/80 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
            >
              Apply for 90-Day Factory Pilot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
