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
      <div className="bg-[#030610]/85 backdrop-blur-xl border-b border-white/[0.06] py-3 overflow-hidden text-xs sm:text-sm font-mono tracking-wider flex select-none relative z-10 shadow-lg font-medium">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
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
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8" aria-hidden="true">
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
        </div>
      </div>

      {/* 2. Hero Section: Animated Pre-Shipment Control Tower */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 relative">
        {/* Subtle Ambient Background Aura */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/[0.05] rounded-full blur-3xl pointer-events-none animate-ambient-pulse [animation-delay:3s]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 transition-all cursor-default backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-300">
                Chittagong Port Cut-Off Shield // Berth 4 Active
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-black text-white tracking-tight leading-[1.08] font-display">
              Before the Vessel Leaves,
              <span className="block text-slate-200 mt-1">
                Know Your RMG Cargo is{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.35)] animate-gradient-x">
                  Customs-Ready.
                </span>
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              ExportOps AI cross-checks commercial invoices, packing lists, export LCs, and bonded fabric quotas (UD) before port gate-in. 
              Prevent container demurrage ($8,500/hold), eliminate air-freight panic, and guarantee clean bank presentation under UCP 600.
            </p>

            {/* Hero CTAs with Hover Shimmer */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/shipments/EXP-001"
                className="relative overflow-hidden group/btn inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-base rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-display"
              >
                {/* Shimmer line sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Launch Interactive Demo (EXP-001)</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <Link
                href="/roi"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-slate-900/80 hover:bg-slate-800/90 text-white font-bold text-base rounded-2xl border border-white/10 hover:border-emerald-500/50 backdrop-blur-md transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <Calculator className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
                <span>Calculate Factory Savings</span>
              </Link>
            </div>

            {/* Trust Badges with Micro-Transitions */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/[0.08]">
              <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/[0.05] hover:border-emerald-500/40 transition-colors flex items-center gap-2.5 group cursor-default">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <p className="text-xs font-bold text-white">Zero AI Hallucination</p>
                  <p className="text-[11px] text-slate-400">8-Point Deterministic Code</p>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/[0.05] hover:border-indigo-500/40 transition-colors flex items-center gap-2.5 group cursor-default">
                <Layers className="w-5 h-5 text-indigo-400 shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <p className="text-xs font-bold text-white">BGMEA e-UD Quota</p>
                  <p className="text-[11px] text-slate-400">Bond Raw Material Math</p>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/[0.05] hover:border-amber-500/40 transition-colors flex items-center gap-2.5 group cursor-default">
                <FileCheck className="w-5 h-5 text-amber-400 shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <p className="text-xs font-bold text-white">UCP 600 Bank Shield</p>
                  <p className="text-[11px] text-slate-400">Discrepancy-Free LC Export</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero: High-Tech Port Radar Command Center (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-emerald-500/25 via-teal-500/15 to-indigo-500/15 blur-2xl opacity-60 pointer-events-none" />

            {/* Hardware Glass Command Center Terminal */}
            <div className="relative rounded-3xl bg-[#060a14]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col justify-between space-y-4">
              
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-bold text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Anchor className="w-3.5 h-3.5 text-emerald-400 animate-float" />
                    <span>PORT RADAR // CHITTAGONG BERTH 4</span>
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  RADAR ACTIVE
                </span>
              </div>

              {/* Dynamic Sonar Radar Viewport */}
              <div className="relative aspect-[4/3] rounded-2xl bg-[#030610] border border-slate-800/80 overflow-hidden flex items-center justify-center shadow-inner">
                {/* Concentric Radar Sonar Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[88%] h-[88%] rounded-full border border-emerald-500/20 animate-pulse-ring" />
                  <div className="w-[66%] h-[66%] rounded-full border border-emerald-500/25" />
                  <div className="w-[44%] h-[44%] rounded-full border border-emerald-500/30" />
                  <div className="w-[22%] h-[22%] rounded-full border border-emerald-500/35 bg-emerald-500/10" />
                  
                  {/* Axis Crosshairs & Compass Ticks */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/20 -translate-y-1/2" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-500/20 -translate-x-1/2" />
                  
                  <span className="absolute top-2 text-[9px] font-mono text-emerald-500/50 font-bold">000° N</span>
                  <span className="absolute bottom-2 text-[9px] font-mono text-emerald-500/50 font-bold">180° S</span>
                  <span className="absolute left-2 text-[9px] font-mono text-emerald-500/50 font-bold">270° W</span>
                  <span className="absolute right-2 text-[9px] font-mono text-emerald-500/50 font-bold">090° E</span>
                  
                  {/* Rotating Radar Sonar Beam */}
                  <div className="absolute inset-0 animate-radar origin-center">
                    <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/30 via-emerald-500/5 to-transparent origin-bottom-right rounded-tl-full" />
                  </div>

                  {/* Blinking Container Cargo Vessel Blips */}
                  <div className="absolute top-1/3 left-1/4 flex items-center gap-1 group/blip pointer-events-auto cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    <span className="text-[9px] font-mono text-red-300 bg-red-950/80 px-1 rounded border border-red-800/60 opacity-80 group-hover/blip:opacity-100 transition-opacity">
                      EXP-001 (HOLD)
                    </span>
                  </div>

                  <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1 group/blip pointer-events-auto cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/80 px-1 rounded border border-emerald-800/60 opacity-80 group-hover/blip:opacity-100 transition-opacity">
                      EXP-005 (CLEARED)
                    </span>
                  </div>
                </div>

                {/* Range Overlay Tag */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[9px] font-mono text-slate-400 pointer-events-none">
                  RANGE: 2.5 NM
                </div>
              </div>

              {/* Live Feeds: Clickable Container Discrepancy Cards */}
              <div className="space-y-2.5 font-mono text-xs">
                {/* Card 1: EXP-001 (Blocked Alert with Remediation Trigger) */}
                <Link
                  href="/shipments/EXP-001"
                  className="block p-3.5 bg-red-950/60 hover:bg-red-950/80 border border-red-500/50 hover:border-red-400 rounded-2xl backdrop-blur-md shadow-lg transition-all group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-xs sm:text-sm group-hover:text-red-200 transition-colors">
                            EXP-001 • MSKU-781920-4
                          </p>
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[9px] shrink-0 uppercase tracking-wider">
                            BLOCKED
                          </span>
                        </div>
                        <p className="text-[11px] text-red-300 font-sans mt-0.5">
                          Invoice: 12,000 pcs ≠ Packing List: 11,400 pcs (-600 deficit)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-red-400 group-hover:text-white transition-colors shrink-0">
                      <span className="text-[11px] font-bold hidden sm:inline">Inspect & Fix</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                {/* Card 2: EXP-005 (Customs-Ready Verified Baseline) */}
                <Link
                  href="/shipments/EXP-005"
                  className="block p-3.5 bg-emerald-950/50 hover:bg-emerald-950/70 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl backdrop-blur-md shadow-lg transition-all group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-xs sm:text-sm group-hover:text-emerald-200 transition-colors">
                            EXP-005 • MSKU-908234-7
                          </p>
                          <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[9px] shrink-0 uppercase tracking-wider">
                            GATE PASS READY
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-300 font-sans mt-0.5">
                          All 8 rules passed • Cryptographic QR Gate Pass Issued
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 group-hover:text-white transition-colors shrink-0">
                      <span className="text-[11px] font-bold hidden sm:inline">View Pass</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Terminal Footer Telemetry */}
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-base leading-none">🚢</span>
                  <span>Vessel: <strong>MAERSK HAVEN</strong></span>
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-800/50">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Cut-Off: 47h 58m Remaining</span>
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

      {/* 4. The $47B Paperwork Problem Breakdown (The 4 Cost Drivers with Hover Lift) */}
      <section id="problem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-400 font-mono">
            The Cost of Trade Paperwork Friction
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            A Garment Shipment Fails on Paperwork, Not Production
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Over 15% of garment export containers leaving Bangladesh face documentation queries at customs, banks, or shipping lines. 
            The financial consequences are catastrophic for factory profit margins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Demurrage */}
          <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] space-y-4 cursor-default">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                <AlertOctagon className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-800/60 shadow-sm">
                CRITICAL HOLD
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg sm:text-xl">Port Demurrage Fees</h3>
              <p className="text-3xl font-black font-mono text-red-400 mt-1">$8,500+</p>
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
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800/60 shadow-sm">
                MARGIN WIPEOUT
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg sm:text-xl">Emergency Air-Freight</h3>
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
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/60 shadow-sm">
                BOND AUDIT RISK
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg sm:text-xl">Bonded Fabric Audits</h3>
              <p className="text-2xl sm:text-3xl font-black font-mono text-indigo-400 mt-1">Customs Penalties</p>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Unlinked fabric consumption exceeding BGMEA Utilization Declaration (UD) quotas triggers severe customs bond penalties, duty deposit demands, and license suspension.
            </p>
          </div>

          {/* Card 4: Bank Discrepancy */}
          <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] space-y-4 cursor-default">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800/60 shadow-sm">
                PAYMENT DELAYS
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg sm:text-xl">Bank Discrepancies</h3>
              <p className="text-2xl sm:text-3xl font-black font-mono text-blue-400 mt-1">Cashflow Freeze</p>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              A single typo in consignee name or shipment date outside the LC latest window triggers bank discrepancy notices under UCP 600, holding back export remittances for weeks.
            </p>
          </div>
        </div>
      </section>

      {/* 5. The Chaos vs Control Comparison (Stripe / Linear style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Transformation Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Manual Chaos vs Autonomous Pre-Shipment Control
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            See how ExportOps AI transforms chaotic trade document cross-checking into a deterministic, zero-error workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Manual Chaos */}
          <div className="p-8 sm:p-10 rounded-3xl bg-red-950/20 border border-red-500/30 hover-card-lift hover:border-red-500/60 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">The Legacy Manual Approach</h3>
                <p className="text-sm text-red-300 font-mono">Fragmented, high risk & error-prone</p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-200">
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-base shrink-0 mt-0.5">✕</span>
                <p className="leading-relaxed">Commercial teams spend 4+ hours per shipment juggling 5 separate PDF windows and printouts.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-base shrink-0 mt-0.5">✕</span>
                <p className="leading-relaxed">A 600-piece carton deficit slips past manual inspection during late-night packing floor rush.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-base shrink-0 mt-0.5">✕</span>
                <p className="leading-relaxed">Container arrives at Chittagong Port gate; customs physical audit halts the trailer.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-base shrink-0 mt-0.5">✕</span>
                <p className="leading-relaxed">Mother vessel departs without cargo, triggering $30,000 emergency air-freight demand by buyer.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-base shrink-0 mt-0.5">✕</span>
                <p className="leading-relaxed">Advising bank files UCP 600 discrepancy notices; export payment delayed by 3 weeks.</p>
              </div>
            </div>
          </div>

          {/* Column 2: ExportOps AI */}
          <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 hover-card-lift hover:border-emerald-500/60 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">The ExportOps AI Standard</h3>
                <p className="text-sm text-emerald-300 font-mono">Automated, deterministic & gate-ready</p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-200">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
                <p className="leading-relaxed">Commercial Invoice, Packing List, LC, and PO reconciled in under 60 seconds with 99% OCR confidence.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
                <p className="leading-relaxed">Deterministic 8-point engine instantly flags carton mismatch before container leaves factory premises.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
                <p className="leading-relaxed">Automated bilingual WhatsApp dispatch notifies floor supervisor in Savar/Gazipur within 5 seconds.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
                <p className="leading-relaxed">Official Chittagong Port Gate-In Pass issued with QR code and cryptographic verification hash.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base shrink-0 mt-0.5">✓</span>
                <p className="leading-relaxed">Zero bank discrepancies under UCP 600; export remittances released in 48 hours without demurrage.</p>
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Live Interactive Prototype</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Active Shipments Control Tower
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-1">
                5 synthetic test shipments with real planted export issues. Select any shipment to inspect.
              </p>
            </div>

            {/* Quick Demo Recommendation Guide */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-3.5 hover-card-lift">
              <Flame className="w-6 h-6 text-amber-400 shrink-0 animate-float" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-amber-300">Recommended Demo:</span>
                <p className="text-slate-300 text-xs mt-0.5">Start with EXP-001 for 1-click quantity remediation.</p>
              </div>
              <Link
                href="/shipments/EXP-001"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all ml-2 shrink-0 shadow-md"
              >
                Inspect EXP-001
              </Link>
            </div>
          </div>

          {/* Metric KPI Counter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#080d15] p-5 rounded-2xl border border-slate-800 hover-card-lift">
              <span className="text-xs text-slate-400 uppercase font-mono font-semibold">Total Shipments</span>
              <p className="text-3xl font-black font-mono text-white mt-1.5">{shipments.length}</p>
            </div>
            <div className="bg-red-950/40 p-5 rounded-2xl border border-red-500/30 hover-card-lift">
              <span className="text-xs text-red-300 uppercase font-mono font-semibold">Blocked at Port</span>
              <p className="text-3xl font-black font-mono text-red-400 mt-1.5">{blockedCount}</p>
            </div>
            <div className="bg-amber-950/40 p-5 rounded-2xl border border-amber-500/30 hover-card-lift">
              <span className="text-xs text-amber-300 uppercase font-mono font-semibold">At Risk (Warnings)</span>
              <p className="text-3xl font-black font-mono text-amber-400 mt-1.5">{atRiskCount}</p>
            </div>
            <div className="bg-emerald-950/40 p-5 rounded-2xl border border-emerald-500/30 hover-card-lift">
              <span className="text-xs text-emerald-300 uppercase font-mono font-semibold">Customs-Ready</span>
              <p className="text-3xl font-black font-mono text-emerald-400 mt-1.5">{readyCount}</p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-[#080d15] p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
              {(['All', 'Blocked', 'At risk', 'Customs-ready'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 ${
                    filter === tab
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'All' ? 'All Batches' : tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search shipment, buyer, PO, LC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#080d15] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/80 transition-all"
              />
            </div>
          </div>

          {/* Shipment Table */}
          <div className="rounded-3xl border border-slate-800 overflow-hidden bg-[#080d15] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800 text-xs font-bold text-slate-300 uppercase font-mono">
                    <th className="py-4 px-4 sm:px-6">Shipment ID</th>
                    <th className="py-4 px-4">Buyer & Factory</th>
                    <th className="py-4 px-4">PO & Export LC</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Bank-Ready Score</th>
                    <th className="py-4 px-4">Planted Issue</th>
                    <th className="py-4 px-4 text-right">Inspection</th>
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
                          <td className="py-4 px-4 sm:px-6 font-mono font-bold text-white text-sm">
                            <Link href={`/shipments/${s.id}`} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                              <span>{s.id}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500 opacity-60 group-hover:opacity-100 group-hover:text-emerald-400 transition-all" />
                            </Link>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-bold text-slate-100 text-sm">{s.buyer}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{s.supplier}</p>
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-slate-300">
                            <div>PO: {s.poNumber}</div>
                            <div className="text-slate-400">LC: {s.lcId}</div>
                          </td>
                          <td className="py-4 px-4">
                            {isBlocked && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950 text-red-300 border border-red-700 font-mono shadow-sm">
                                <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                                Blocked
                              </span>
                            )}
                            {isAtRisk && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700 font-mono shadow-sm">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                At Risk
                              </span>
                            )}
                            {isReady && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Customs-Ready
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-mono font-black text-base ${
                                s.bankReadyScore >= 90 ? 'text-emerald-400' : s.bankReadyScore >= 75 ? 'text-amber-400' : 'text-red-400'
                              }`}>
                                {s.bankReadyScore}/100
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs sm:text-sm text-slate-300 max-w-xs truncate" title={s.id}>
                            {s.id === 'EXP-001' && 'Invoice Qty != Packing List (-600 pcs)'}
                            {s.id === 'EXP-002' && 'Shipment past LC date & missing COO'}
                            {s.id === 'EXP-003' && 'Fabric consumed > UD quota (+2,500 kg)'}
                            {s.id === 'EXP-004' && 'Container missing from packing list'}
                            {s.id === 'EXP-005' && 'All 8 rules passed (Clean baseline)'}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link
                              href={`/shipments/${s.id}`}
                              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold hover:underline font-mono text-sm"
                            >
                              <span>Inspect</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-slate-400 font-mono text-sm">
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
      <section id="pipeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-400 font-mono">
            Deterministic Compliance Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            How Messy Trade Papers Become Customs-Ready in 60s
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            AI reads and explains; pure TypeScript deterministic code executes the legal clearance decision.
          </p>
        </div>

        <div className="relative">
          {/* Animated Connecting Electric Stream between steps (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-[2px] bg-slate-800/80 -translate-y-1/2 overflow-hidden pointer-events-none z-0">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-electric-stream" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
                01
              </span>
              <h3 className="font-extrabold text-white text-base sm:text-lg">Trade Docs Ingested</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Accepts Commercial Invoice, Packing List, PO, Export LC, Certificate of Origin, and Bond records via drag-and-drop or ERP sync.
              </p>
            </div>

            <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
                02
              </span>
              <h3 className="font-extrabold text-white text-base sm:text-lg">Multimodal AI Extraction</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Extracts quantities, values, HS codes, container numbers, and entity names with strict confidence scores and exact source quotations.
              </p>
            </div>

            <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
                03
              </span>
              <h3 className="font-extrabold text-white text-base sm:text-lg">8-Point Deterministic Rules</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Pure code checks R1-R8. Zero AI hallucination: mathematical cross-checking of units, dates, tolerances, and UD fabric quota balances.
              </p>
            </div>

            <div className="glass-panel hover-card-lift p-6 sm:p-7 rounded-3xl space-y-3.5 relative hover:border-emerald-500/60 transition-all cursor-default">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
                04
              </span>
              <h3 className="font-extrabold text-white text-base sm:text-lg">Customs Pass Issued</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Shipment flips to Customs-Ready, generating an official Chittagong Port Gate-In Pass with cryptographic verification hash and QR code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Feature Showcase (Tabbed with Smooth Animated Transitions) */}
      <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase font-mono tracking-wider">Product Deep-Dive</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Enterprise Suite Modules</h2>
          <p className="text-sm sm:text-base text-slate-300">Built specifically for Bangladeshi garment factories and clearing agents.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 text-sm font-bold">
          <button
            onClick={() => setActiveFeatureTab('studio')}
            className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
              activeFeatureTab === 'studio' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Inspection Studio
          </button>
          <button
            onClick={() => setActiveFeatureTab('bond')}
            className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
              activeFeatureTab === 'bond' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            BondIQ Fabric Ledger
          </button>
          <button
            onClick={() => setActiveFeatureTab('alerts')}
            className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
              activeFeatureTab === 'alerts' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Floor WhatsApp Alerts
          </button>
          <button
            onClick={() => setActiveFeatureTab('compliance')}
            className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
              activeFeatureTab === 'compliance' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Buyer Compliance (H&M, Zara)
          </button>
        </div>

        {/* Feature Tab Card with Smooth Fade-In on Switch */}
        <div className="bg-[#0b101a] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-fade-in key={activeFeatureTab}">
          {/* TAB 1: Inspection Studio */}
          {activeFeatureTab === 'studio' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  <span>MODULE 01: DUAL-WINDOW AUDITOR</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Side-by-Side Document Inspection Studio</h3>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                  No more switching between 5 different PDF windows and printed Excel sheets. ExportOps AI aligns the Commercial Invoice, Packing List, and LC side-by-side with line-item discrepancy highlighting.
                </p>
                <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Real-time OCR extraction with 99% confidence tagging</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Inline editing with instant re-validation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Official printable Chittagong Port Gate-In Pass</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/shipments/EXP-001"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-colors font-mono shadow-md"
                  >
                    <span>Open Live Studio (EXP-001)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Interactive Diff Simulator */}
              <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-slate-800 text-sm font-mono shadow-inner space-y-4 hover-card-lift">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400 text-xs font-semibold">// Interactive Audit Simulator</span>
                  <button
                    onClick={() => setStudioResolved(!studioResolved)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all transform active:scale-95 shadow-sm"
                  >
                    {studioResolved ? 'Reset to Mismatch' : 'Simulate 1-Click Fix'}
                  </button>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3 bg-slate-900/80 rounded-xl flex justify-between">
                    <span className="text-slate-400">COMMERCIAL INVOICE:</span>
                    <span className="text-white font-bold">12,000 PCS ($72,000)</span>
                  </div>
                  <div className={`p-3 rounded-xl flex justify-between transition-colors duration-300 ${
                    studioResolved ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border border-red-500/40 text-red-300'
                  }`}>
                    <span>PACKING LIST:</span>
                    <span className="font-bold">{studioResolved ? '12,000 PCS (500 Ctns)' : '11,400 PCS (475 Ctns)'}</span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                  studioResolved
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950'
                    : 'bg-red-950/40 border-red-500/50 text-red-300 shadow-md shadow-red-950'
                }`}>
                  {studioResolved ? (
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>RULE R1 PASSED: Quantities match exactly (12,000 pcs). Gate-In Pass Ready!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
                      <span>RULE R1 FAILED: 600 PCS Deficit detected between Invoice and Packing List.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BondIQ Fabric Ledger */}
          {activeFeatureTab === 'bond' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold border border-indigo-500/20">
                  <span>MODULE 02: CUSTOMS BOND COMPLIANCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">BondIQ: Fabric Math & UD Quota Ledger</h3>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                  Bonded raw material audits are Bangladesh's biggest export compliance hazard. BondIQ automatically computes fabric consumption per dozen, adds cutting wastage, and balances usage against approved BGMEA Utilization Declaration (UD) quotas.
                </p>
                <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Calculates fabric required across Knit, Woven, and Denim presets</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Prevents export declaration if unlinked fabric usage is found (Rule R8)</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/shipments/EXP-003"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-xl transition-colors font-mono shadow-md"
                  >
                    <span>Inspect Violation in EXP-003</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Interactive Garment Math Preset Selector */}
              <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-slate-800 text-sm font-mono text-slate-200 shadow-inner space-y-4 hover-card-lift">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400 text-xs font-semibold">// Select Garment Preset</span>
                  <div className="flex items-center gap-1.5">
                    {(['tshirt', 'hoodie', 'denim'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setBondGarmentType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
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

                <div className="space-y-2 text-xs sm:text-sm animate-fade-in key={bondGarmentType}">
                  <div className="text-indigo-300 font-bold text-sm sm:text-base">{garmentPresets[bondGarmentType].name}</div>
                  <div className="flex justify-between text-slate-300">
                    <span>Fabric Weight (GSM):</span>
                    <span className="text-white font-bold">{garmentPresets[bondGarmentType].gsm} GSM</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Consumption Formula:</span>
                    <span className="text-white font-bold">{garmentPresets[bondGarmentType].dznCons}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Order Batch Size:</span>
                    <span className="text-white font-bold">{garmentPresets[bondGarmentType].orderQty}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Cutting Wastage (5%):</span>
                    <span className="text-amber-400 font-bold">{garmentPresets[bondGarmentType].wastage}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-800 text-sm sm:text-base">
                    <span>Total Required Fabric:</span>
                    <span className="text-indigo-400 font-black">{garmentPresets[bondGarmentType].totalFabric}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>BGMEA UD Quota:</span>
                    <span className="text-white font-bold">{garmentPresets[bondGarmentType].udQuota}</span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-300 ${
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  <span>MODULE 03: INSTANT DISPATCH</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Bilingual Floor & C&F WhatsApp Dispatcher</h3>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                  When a mismatch is caught at midnight before vessel cut-off, merchandisers don't have time to draft emails. ExportOps AI generates formatted, urgency-ranked WhatsApp messages in Bangla and English for instant floor remediation.
                </p>
                <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>1-click copy for factory supervisor WhatsApp groups</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Bilingual instructions: clear action steps for floor in-charges</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleCopyAlert}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-all font-mono shadow-md transform active:scale-95"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedAlert ? 'Copied to Clipboard!' : 'Copy Dispatch Message'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive WhatsApp Message Simulator */}
              <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-emerald-500/30 text-sm font-mono shadow-inner space-y-4 hover-card-lift">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    WhatsApp Discrepancy Dispatch
                  </span>
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setAlertLanguage('bn')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        alertLanguage === 'bn' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      বাংলা
                    </button>
                    <button
                      onClick={() => setAlertLanguage('en')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        alertLanguage === 'en' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <div className="p-5 bg-[#0a1410] border border-emerald-500/20 rounded-2xl space-y-2.5 text-xs sm:text-sm animate-fade-in key={alertLanguage}">
                  <p className="text-emerald-400 font-extrabold text-sm sm:text-base">🚨 EXPORTOPS AI: URGENT COMPLIANCE ALERT</p>
                  <p className="text-slate-200">📦 Shipment: <strong className="text-white">EXP-001 (Nordic Retailers)</strong></p>
                  <p className="text-red-400 font-bold">⚠️ Issue: Quantity Mismatch (-600 PCS vs Invoice)</p>
                  
                  {alertLanguage === 'bn' ? (
                    <div className="pt-2.5 text-slate-100 font-bengali text-sm sm:text-base leading-relaxed border-t border-emerald-950">
                      ❗ <strong>জরুরি অ্যাকশন:</strong> ফ্লোরে প্যাকিং লিস্টের কার্টন সংখ্যা রি-চেক করুন। ৫০০ কার্টন রেডি থাকলে প্যাকিং লিস্ট আপডেট করে দ্রুত ক্লিয়ারিং এজেন্টের কাছে পাঠান। জাহাজ কাট-অফ বাকি: ৪৮ ঘণ্টা।
                    </div>
                  ) : (
                    <div className="pt-2.5 text-slate-100 font-sans text-xs sm:text-sm leading-relaxed border-t border-emerald-950">
                      ❗ <strong>URGENT ACTION:</strong> Verify carton counts on factory packing floor. If 500 cartons are verified, update packing list and transmit to Chittagong C&F agent. Remaining vessel cut-off: 48h.
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-400 flex justify-between font-mono pt-1">
                  <span>Priority: <strong className="text-amber-400">HIGH • CUT-OFF RISK</strong></span>
                  <span>Recipient: Factory Ops + C&F Lead</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Buyer Compliance */}
          {activeFeatureTab === 'compliance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-mono font-bold border border-blue-500/20">
                  <span>MODULE 04: RETAIL CHARGEBACK SHIELD</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Global Buyer Compliance Rulebook</h3>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                  Go beyond customs. International retail giants enforce strict packaging, barcode, and RFID rules. Prevent expensive $1.50 - $3.00 per-carton retailer chargebacks at European and American distribution hubs.
                </p>
                <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>H&M Ratio Pack & Polybag warning validation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Zara / Inditex UHF Gen2 RFID source tagging audits</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Target & Walmart GS1-128 barcode and carton weight checks</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/compliance"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-colors font-mono shadow-md"
                  >
                    <span>Explore Buyer Directory</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Retailer Rulebook Matrix Preview */}
              <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-slate-800 text-sm space-y-3 font-mono hover-card-lift">
                <p className="text-slate-400 text-xs pb-2 border-b border-slate-800">// Retailer Compliance Matrix</p>
                
                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                  <div>
                    <span className="font-bold text-white text-sm sm:text-base">H&M Group (HM-01)</span>
                    <p className="text-xs text-slate-400 mt-0.5">Ratio Pack & Suffocation Warning</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-xs">
                    PASSED
                  </span>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                  <div>
                    <span className="font-bold text-white text-sm sm:text-base">Inditex / Zara (ZRA-01)</span>
                    <p className="text-xs text-slate-400 mt-0.5">UHF Gen2 EPC RFID Inlay Audit</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-xs">
                    PASSED
                  </span>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                  <div>
                    <span className="font-bold text-white text-sm sm:text-base">Target US (TGT-02)</span>
                    <p className="text-xs text-slate-400 mt-0.5">Max Carton Gross Weight &lt; 20kg</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-xs">
                    PASSED
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 9. Interactive ROI & Demurrage Savings Calculator */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#0b101a] to-[#070b13] p-8 sm:p-14 rounded-3xl border border-emerald-500/40 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Pulse */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />

          <div className="space-y-5 max-w-xl relative z-10">
            <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase font-mono tracking-wider">The Business Case</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Calculate Your Factory's Monthly Savings
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Drag the volume slider to see how much avoidable demurrage, air-freight penalties, and documentation overtime your factory eliminates every month with ExportOps AI.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex justify-between items-baseline text-sm sm:text-base text-slate-200 font-mono">
                <span>Monthly Export Containers: <strong className="text-white text-base sm:text-lg">{quickContainers} FCL</strong></span>
                <span className="text-emerald-400 font-black text-base sm:text-lg">${estimatedSavingsMonth.toLocaleString()} / mo Saved</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={quickContainers}
                onChange={(e) => setQuickContainers(Number(e.target.value))}
                className="w-full accent-emerald-400 h-3 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>5 Containers (Small Unit)</span>
                <span>40 Containers (Mid Tier)</span>
                <span>80 Containers (Large Group)</span>
              </div>
            </div>

            {/* Micro Breakdown Stats */}
            <div className="grid grid-cols-3 gap-3.5 pt-2 text-xs font-mono">
              <div className="bg-[#070b13]/80 p-3.5 rounded-xl border border-slate-800 hover-card-lift">
                <span className="text-slate-400 block text-xs">Demurrage Avoided</span>
                <span className="text-emerald-400 font-black text-base mt-1 block">${(quickContainers * 1275).toLocaleString()}</span>
              </div>
              <div className="bg-[#070b13]/80 p-3.5 rounded-xl border border-slate-800 hover-card-lift">
                <span className="text-slate-400 block text-xs">Air-Freight Risk</span>
                <span className="text-emerald-400 font-black text-base mt-1 block">${(quickContainers * 850).toLocaleString()}</span>
              </div>
              <div className="bg-[#070b13]/80 p-3.5 rounded-xl border border-slate-800 hover-card-lift">
                <span className="text-slate-400 block text-xs">Hours Saved</span>
                <span className="text-emerald-400 font-black text-base mt-1 block">{(quickContainers * 4)} hrs/mo</span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-right shrink-0 space-y-5 bg-[#070b13]/90 p-8 sm:p-10 rounded-3xl border border-slate-800 relative z-10 hover-card-lift shadow-2xl">
            <div>
              <p className="text-xs sm:text-sm text-slate-300 font-mono uppercase tracking-wider font-semibold">Projected Annual Factory Savings</p>
              <p className="text-5xl sm:text-6xl font-black font-mono text-emerald-400 mt-2 drop-shadow-md">
                ${estimatedSavingsAnnual.toLocaleString()}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xs font-sans leading-relaxed">
              Based on Chittagong Port $8,500 average 5-day demurrage hold and 15% discrepancy rates.
            </p>
            <div>
              <Link
                href="/roi"
                className="relative overflow-hidden group/btn inline-flex items-center gap-2 px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Explore Pricing Plans (From ৳30k/mo)</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Technical Architecture & FAQ Accordion */}
      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase font-mono tracking-wider">
            Verification & Integrity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Frequently Asked Technical Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Why industry compliance officers and hackathon judges trust the ExportOps AI architecture.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                >
                  <span className="font-bold text-white text-base sm:text-lg flex items-center gap-3">
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

      {/* 11. Social Proof & Industry Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Trusted by Bangladesh Export Leaders</h2>
          <p className="text-sm sm:text-base text-slate-300">Proven feedback from documentation heads and clearing agents.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="glass-panel hover-card-lift p-7 sm:p-8 rounded-3xl space-y-4">
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

          <div className="glass-panel hover-card-lift p-7 sm:p-8 rounded-3xl space-y-4">
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

          <div className="glass-panel hover-card-lift p-7 sm:p-8 rounded-3xl space-y-4">
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

      {/* 12. Final High-Converting Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#0b101a] via-[#070b13] to-[#0b101a] border border-slate-800 p-10 sm:p-16 rounded-3xl space-y-7 shadow-2xl relative overflow-hidden">
          {/* Signature Animated Border Beam across the top of the CTA Box */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-800/80 overflow-hidden pointer-events-none">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-beam" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Ready to Clear Every Container on Time?
          </h2>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Eliminate vessel cut-off panic, reduce demurrage to zero, and deliver 100% bank-ready paperwork on every garment shipment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shipments/EXP-001"
              className="relative overflow-hidden group/btn px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Start Live Interactive Demo</span>
            </Link>
            <Link
              href="/roi"
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-2xl border border-slate-700/80 hover:border-emerald-500/40 transition-all hover:-translate-y-0.5"
            >
              Apply for 90-Day Factory Pilot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
