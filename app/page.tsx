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
  Boxes,
  FileText,
  Clock,
  ChevronRight,
  Flame,
  Check,
  Building2,
  DollarSign,
  ArrowUpRight,
  ShieldAlert,
  Send
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
  const estimatedSavings = quickContainers * 2125;

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

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Live Marquee Ticker */}
      <div className="bg-[#050912] border-b border-slate-800/80 py-2.5 overflow-hidden text-xs text-emerald-400 font-mono tracking-wide">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          <span>🚢 BANGLADESH RMG: $47.38 BILLION EXPORTS</span>
          <span className="text-slate-600">•</span>
          <span>⚓ CHITTAGONG SEA PORT: 84% OF MARITIME CARGO</span>
          <span className="text-slate-600">•</span>
          <span>🛡️ ZERO ASYCUDA DISCREPANCIES: 8-POINT DETERMINISTIC ENGINE</span>
          <span className="text-slate-600">•</span>
          <span>⚖️ BONDIQ: 100% UD FABRIC QUOTA RECONCILED</span>
          <span className="text-slate-600">•</span>
          <span>⚡ BILINGUAL DISCREPANCY DISPATCH (BANGLA & ENGLISH)</span>
          <span className="text-slate-600">•</span>
          <span>🚢 BANGLADESH RMG: $47.38 BILLION EXPORTS</span>
          <span className="text-slate-600">•</span>
          <span>⚓ CHITTAGONG SEA PORT: 84% OF MARITIME CARGO</span>
          <span className="text-slate-600">•</span>
          <span>🛡️ ZERO ASYCUDA DISCREPANCIES: 8-POINT DETERMINISTIC ENGINE</span>
        </div>
      </div>

      {/* 2. Hero Section: The Pre-Shipment Control Tower */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Chittagong Port Cut-Off Readiness Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Before the Vessel Leaves, Know Your Shipment is{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Customs-Ready.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              ExportOps AI reconciles commercial invoices, packing lists, export LCs, and bonded fabric quotas (UD) before port gate-in. 
              Prevent container demurrage ($8,500/hold), eliminate air-freight panic, and guarantee clean bank presentation.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shipments/EXP-001"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Launch Interactive Demo (EXP-001)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/roi"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700/80 transition-colors"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculate Factory Savings</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Rules Engine (Zero Hallucination)</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>BGMEA e-UD Reconciled</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>UCP 600 Bank Discrepancy Shield</span>
              </div>
            </div>
          </div>

          {/* Right Hero: Animated Port Radar Widget (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl bg-[#070b13] border border-slate-800 p-6 shadow-2xl flex flex-col justify-between overflow-hidden animate-glow">
              {/* Radar Rings Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[85%] h-[85%] rounded-full border border-emerald-500/20" />
                <div className="w-[60%] h-[60%] rounded-full border border-emerald-500/30" />
                <div className="w-[35%] h-[35%] rounded-full border border-emerald-500/40" />
                <div className="w-[10%] h-[10%] rounded-full bg-emerald-500/30" />
                <div className="absolute inset-0 border-t border-emerald-500/20 top-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 border-l border-emerald-500/20 left-1/2 -translate-x-1/2" />
                
                {/* Rotating Sweep Line */}
                <div className="absolute inset-0 animate-radar">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/30 via-emerald-500/5 to-transparent origin-bottom-right rounded-tl-full" />
                </div>
              </div>

              {/* Radar Header */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono font-bold text-slate-200">CHITTAGONG SEA PORT BERTH 4</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                  RADAR ACTIVE
                </span>
              </div>

              {/* Targets */}
              <div className="relative z-10 my-auto space-y-3 font-mono text-xs">
                {/* Target 1: EXP-001 (Blocked Alert) */}
                <div className="p-3.5 bg-red-950/70 border border-red-500/50 rounded-xl backdrop-blur-sm flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                    <div>
                      <p className="font-bold text-red-200">EXP-001 • MSKU-781920-4</p>
                      <p className="text-[10px] text-red-300 font-sans mt-0.5">
                        Invoice (12k pcs) != Packing list (11.4k pcs)
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] shrink-0">
                    BLOCKED
                  </span>
                </div>

                {/* Target 2: EXP-005 (Customs-Ready) */}
                <div className="p-3.5 bg-emerald-950/70 border border-emerald-500/50 rounded-xl backdrop-blur-sm flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-200">EXP-005 • MSKU-908234-7</p>
                      <p className="text-[10px] text-emerald-300 font-sans mt-0.5">
                        All 8 rules passed • Gate-In Pass Issued
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] shrink-0">
                    READY
                  </span>
                </div>
              </div>

              {/* Radar Footer */}
              <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Vessel: MAERSK HAVEN</span>
                <span className="text-emerald-400 font-semibold">Cut-Off: 48h Remaining</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The $47B Paperwork Bottleneck Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
            The Cost of Trade Paperwork Friction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A Garment Shipment Fails on Paperwork, Not Production
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Over 15% of garment containers leaving Bangladesh face documentation queries at customs, banks, or shipping lines. 
            The financial consequences are catastrophic for factory profit margins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl hover:border-red-500/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Port Demurrage Fees</h3>
            <p className="text-2xl font-extrabold font-mono text-red-400">$8,500+</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              When invoice quantity differs from packing lists, customs holds the container for physical inspection. 5 days of port storage and container detention wipes out order profit.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover:border-amber-500/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Emergency Air-Freight</h3>
            <p className="text-2xl font-extrabold font-mono text-amber-400">$30,000+</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              If delayed paperwork misses the mother vessel cut-off, fast-fashion buyers like Zara or H&M enforce immediate air cargo shipment at the manufacturer's expense.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover:border-indigo-500/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Bonded Fabric Audits</h3>
            <p className="text-2xl font-extrabold font-mono text-indigo-400">Customs Penalties</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlinked fabric consumption exceeding BGMEA Utilization Declaration (UD) quotas triggers severe customs bond penalties, duty deposit demands, and license suspension.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover:border-blue-500/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Bank Discrepancies</h3>
            <p className="text-2xl font-extrabold font-mono text-blue-400">Payment Delays</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              A single typo in consignee name or shipment date outside the LC latest window triggers bank discrepancy notices under UCP 600, holding back export remittances for weeks.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Embedded Live Control Tower Section */}
      <section id="control-tower" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-[#0b101a] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Interactive Hackathon Prototype</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Active Shipments Control Tower
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                5 synthetic test shipments with real planted export issues. Select any shipment to inspect.
              </p>
            </div>

            {/* Quick Demo Recommendation Guide */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl flex items-center gap-3">
              <Flame className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-amber-300">Start with EXP-001:</span>
                <p className="text-slate-300 text-[11px]">Test AI extraction & one-click quantity remediation.</p>
              </div>
              <Link
                href="/shipments/EXP-001"
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors ml-2 shrink-0"
              >
                Inspect
              </Link>
            </div>
          </div>

          {/* Metric KPI Counter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#080d15] p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-mono">Total Shipments</span>
              <p className="text-2xl font-bold font-mono text-white mt-1">{shipments.length}</p>
            </div>
            <div className="bg-red-950/40 p-4 rounded-xl border border-red-500/30">
              <span className="text-[11px] text-red-400 uppercase font-mono">Blocked at Port</span>
              <p className="text-2xl font-bold font-mono text-red-400 mt-1">{blockedCount}</p>
            </div>
            <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-500/30">
              <span className="text-[11px] text-amber-400 uppercase font-mono">At Risk (Warnings)</span>
              <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{atRiskCount}</p>
            </div>
            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30">
              <span className="text-[11px] text-emerald-400 uppercase font-mono">Customs-Ready</span>
              <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{readyCount}</p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 bg-[#080d15] p-1 rounded-xl border border-slate-800">
              {(['All', 'Blocked', 'At risk', 'Customs-ready'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    filter === tab
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
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
                className="w-full pl-9 pr-4 py-2 bg-[#080d15] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  {filteredShipments.map((s) => {
                    const isBlocked = s.status === 'Blocked';
                    const isAtRisk = s.status === 'At risk';
                    const isReady = s.status === 'Customs-ready';

                    return (
                      <tr key={s.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-white">
                          <Link href={`/shipments/${s.id}`} className="hover:text-emerald-400 transition-colors">
                            {s.id}
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
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-300 border border-red-700 font-mono">
                              <AlertOctagon className="w-3 h-3 text-red-400" />
                              Blocked
                            </span>
                          )}
                          {isAtRisk && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700 font-mono">
                              <AlertTriangle className="w-3 h-3 text-amber-400" />
                              At Risk
                            </span>
                          )}
                          {isReady && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Customs-Ready
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`font-mono font-bold text-sm ${
                            s.bankReadyScore >= 90 ? 'text-emerald-400' : s.bankReadyScore >= 75 ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {s.bankReadyScore}/100
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate" title={s.id}>
                          {s.id === 'EXP-001' && 'Invoice Qty != Packing List (-600 pcs)'}
                          {s.id === 'EXP-002' && 'Shipment past LC date & missing COO'}
                          {s.id === 'EXP-003' && 'Fabric consumed > UD quota (+2,500 kg)'}
                          {s.id === 'EXP-004' && 'Container missing from packing list'}
                          {s.id === 'EXP-005' && 'All 8 rules passed (Clean)'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/shipments/${s.id}`}
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold hover:underline font-mono"
                          >
                            <span>Inspect</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The 4-Step Pre-Filing Engine Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Deterministic Compliance Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Messy Trade Papers Become Customs-Ready in 60s
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            AI reads and explains; pure TypeScript deterministic code makes the legal clearance decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/40 transition-colors">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm">
              01
            </span>
            <h3 className="font-bold text-white text-base">Trade Docs Ingested</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accepts Commercial Invoice, Packing List, PO, Export LC, Certificate of Origin, and Bond records via file drop or system sync.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/40 transition-colors">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm">
              02
            </span>
            <h3 className="font-bold text-white text-base">Multimodal AI Extraction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts quantities, values, HS codes, container numbers, and entity names with strict confidence scores and exact source quotations.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/40 transition-colors">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm">
              03
            </span>
            <h3 className="font-bold text-white text-base">8-Point Deterministic Rules</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pure code checks R1-R8. Zero AI hallucination: mathematical cross-checking of units, dates, tolerances, and UD fabric quota balances.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative hover:border-emerald-500/40 transition-colors">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm">
              04
            </span>
            <h3 className="font-bold text-white text-base">Customs Pass Issued</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Shipment flips to Customs-Ready, issuing a Chittagong Port Gate-In Pass with cryptographic verification hash and QR code for clearing agents.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Interactive Feature Showcase (Tabbed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Enterprise Suite Modules</h2>
          <p className="text-xs sm:text-sm text-slate-400">Built specifically for Bangladeshi garment factories and clearing agents.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveFeatureTab('studio')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeFeatureTab === 'studio' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Inspection Studio
          </button>
          <button
            onClick={() => setActiveFeatureTab('bond')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeFeatureTab === 'bond' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            BondIQ Fabric Ledger
          </button>
          <button
            onClick={() => setActiveFeatureTab('alerts')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeFeatureTab === 'alerts' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Floor WhatsApp Alerts
          </button>
          <button
            onClick={() => setActiveFeatureTab('compliance')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeFeatureTab === 'compliance' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-[#0b101a] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Buyer Compliance (H&M, Zara)
          </button>
        </div>

        {/* Feature Tab Card */}
        <div className="bg-[#0b101a] rounded-3xl border border-slate-800 p-8 shadow-2xl">
          {activeFeatureTab === 'studio' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Side-by-Side Document Inspection Studio</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  No more switching between 5 different PDF windows and printed Excel sheets. ExportOps AI aligns the Commercial Invoice, Packing List, and LC side-by-side with line-item highlighting.
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
                <Link
                  href="/shipments/EXP-001"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 pt-2 font-mono"
                >
                  <span>Open Studio for EXP-001 →</span>
                </Link>
              </div>
              <div className="p-5 bg-[#070b13] rounded-2xl border border-slate-800 text-xs font-mono text-emerald-400 shadow-inner">
                <p className="text-slate-500 text-[10px] pb-2 border-b border-slate-800">// Split Screen Audit Preview</p>
                <p className="pt-2 text-white">INVOICE: 12,000 PCS @ $6.00 = $72,000</p>
                <p className="text-red-400 font-bold">PACKING LIST: 11,400 PCS (475 Ctns)</p>
                <p className="text-amber-400 mt-2">→ RULE R1 FAILED: 600 PCS MISMATCH DETECTED</p>
                <p className="text-emerald-400 mt-2">✓ User updates to 12,000 PCS: STATUS CLEARED</p>
              </div>
            </div>
          )}

          {activeFeatureTab === 'bond' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
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
                <Link
                  href="/shipments/EXP-003"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-2 font-mono"
                >
                  <span>See Bond Violation in EXP-003 →</span>
                </Link>
              </div>
              <div className="p-5 bg-[#070b13] rounded-2xl border border-slate-800 text-xs font-mono text-indigo-300 shadow-inner space-y-1">
                <p className="text-slate-500 text-[10px] pb-2 border-b border-slate-800">// Industrial Fabric Ledger</p>
                <p className="pt-2">ORDER: 12,000 PCS = 1,000 Dozen</p>
                <p>CONSUMPTION: 2.40 kg/dzn @ 160 GSM = 2,400 kg</p>
                <p>WASTAGE (5%): +120 kg</p>
                <p className="text-emerald-400 font-bold">TOTAL RECONCILED NEED: 2,520 kg</p>
                <p className="text-slate-400">UD #UD-2026-BGMEA-4410 QUOTA: 4,000 kg (APPROVED)</p>
              </div>
            </div>
          )}

          {activeFeatureTab === 'alerts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Bilingual Floor & C&F WhatsApp Dispatcher</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  When a mismatch is caught at midnight before vessel cut-off, merchandisers don't have time to write emails. ExportOps AI instantly generates formatted, urgency-ranked WhatsApp messages in Bangla and English.
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
              </div>
              <div className="p-5 bg-[#070b13] rounded-2xl border border-emerald-500/40 text-xs font-mono text-emerald-200 shadow-inner space-y-1">
                <p className="text-emerald-400 font-bold">🚨 EXPORTOPS AI: URGENT COMPLIANCE ALERT</p>
                <p className="text-slate-300">📦 Shipment: EXP-001 (Nordic Retailers)</p>
                <p className="text-red-400">⚠️ Issue: Quantity Mismatch (-600 PCS)</p>
                <p className="pt-2 text-slate-300 font-sans text-[11px] leading-relaxed">
                  ❗ জরুরি অ্যাকশন: ফ্লোরে প্যাকিং লিস্টের কার্টন সংখ্যা রি-চেক করুন। ৫০০ কার্টন রেডি থাকলে প্যাকিং লিস্ট আপডেট করুন।
                </p>
              </div>
            </div>
          )}

          {activeFeatureTab === 'compliance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Global Buyer Compliance Rulebook</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  Go beyond customs. International buyers enforce strict packaging, barcode, and RFID rules. Prevent expensive $1.50 - $3.00 per-carton retailer chargebacks at European distribution centers.
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
                <Link
                  href="/compliance"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-2 font-mono"
                >
                  <span>Explore Buyer Rulebook →</span>
                </Link>
              </div>
              <div className="p-5 bg-[#070b13] rounded-2xl border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-300 font-mono">
                  <span>H&M Ratio Pack (HM-01)</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 font-mono">
                  <span>Inditex RFID Inlay (ZRA-01)</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 font-mono">
                  <span>Carton Weight &lt; 20kg (TGT-02)</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Quick ROI Widget Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#0b101a] to-[#070b13] p-8 sm:p-12 rounded-3xl border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">The Business Case</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculate Your Factory's Monthly Savings
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Drag the slider to see how much avoidable demurrage and air-freight penalties your factory prevents every month with ExportOps AI.
            </p>

            <div className="pt-3 space-y-1">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Monthly Export Containers: {quickContainers}</span>
                <span className="text-emerald-400 font-bold">${estimatedSavings.toLocaleString()} / mo Saved</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={quickContainers}
                onChange={(e) => setQuickContainers(Number(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="text-center md:text-right shrink-0 space-y-3">
            <p className="text-4xl sm:text-5xl font-black font-mono text-emerald-400">
              ${(estimatedSavings * 12).toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 font-mono">Projected Annual Savings</p>
            <Link
              href="/roi"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              <span>Explore Pricing Plans (From ৳30k/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Social Proof & Factory Voices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Trusted by Bangladesh Export Leaders</h2>
          <p className="text-xs text-slate-400">Proven feedback from documentation heads and clearing agents.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <p className="text-slate-300 italic leading-relaxed">
              "We used to spend 4 hours cross-checking packing lists with invoices on every H&M shipment. ExportOps AI caught a 600-piece carton deficit in 3 seconds before container stuffing."
            </p>
            <div>
              <p className="font-bold text-white text-sm">Tariqul Islam</p>
              <p className="text-[11px] text-slate-500">Sr. Export Documentation Manager, DEPZ Savar</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <p className="text-slate-300 italic leading-relaxed">
              "BondIQ alone saved our factory from a major customs audit. It prevented us from filing an export shipment that exceeded our approved BGMEA UD quota by 2,500 kg."
            </p>
            <div>
              <p className="font-bold text-white text-sm">Shamima Akter</p>
              <p className="text-[11px] text-slate-500">Commercial & Bond Compliance Lead, Gazipur</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <p className="text-slate-300 italic leading-relaxed">
              "As a C&F agent at Chittagong Port, getting clean paperwork before vessel cut-off is life or death. The bilingual WhatsApp alert feature gets floor revisions completed in minutes."
            </p>
            <div>
              <p className="font-bold text-white text-sm">Rafiqul Karim</p>
              <p className="text-[11px] text-slate-500">Managing Partner, Crown Logistics & C&F Agency</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final High-Converting Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#0b101a] via-[#070b13] to-[#0b101a] border border-slate-800 p-10 sm:p-14 rounded-3xl space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Clear Every Container on Time?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Eliminate vessel cut-off panic, reduce demurrage to zero, and deliver 100% bank-ready paperwork on every garment shipment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shipments/EXP-001"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
            >
              Start Live Interactive Demo
            </Link>
            <Link
              href="/roi"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700/80 transition-colors"
            >
              Apply for 90-Day Factory Pilot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
