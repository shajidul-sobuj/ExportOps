'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  DollarSign, 
  Clock, 
  AlertOctagon, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  Layers, 
  AlertTriangle,
  Building2,
  FileSpreadsheet,
  ChevronRight,
  Activity
} from 'lucide-react';
import initialShipments from '@/data/shipments.json';
import { Shipment } from '@/types';

export default function ManagementDashboard() {
  const shipments = initialShipments as unknown as Shipment[];

  // Financial exposure breakdown per shipment
  const costBreakdown = [
    {
      id: 'EXP-001',
      buyer: 'Nordic Retailers A/S',
      issue: 'Invoice Qty != Packing List (-600 pcs)',
      delayDays: '4 Days',
      avoidableCost: 8500,
      costType: 'Container Demurrage & Customs Re-filing',
      riskLevel: 'High',
    },
    {
      id: 'EXP-002',
      buyer: 'Zara Inditex S.A.',
      issue: 'Shipment Past LC Window & Missing COO',
      delayDays: '7 Days',
      avoidableCost: 14200,
      costType: 'Air-Freight Compensation & Bank Discrepancy',
      riskLevel: 'Critical',
    },
    {
      id: 'EXP-003',
      buyer: 'Target Brands Inc.',
      issue: 'Fabric Consumed > Approved UD (+2,500 kg)',
      delayDays: '6 Days',
      avoidableCost: 12000,
      costType: 'Customs Bond Penalty & Duty Escrow Deposit',
      riskLevel: 'Critical',
    },
    {
      id: 'EXP-004',
      buyer: 'Next Sourcing UK',
      issue: 'Container Number Unassigned on Packing List',
      delayDays: '2 Days',
      avoidableCost: 3700,
      costType: 'Port Gate-In Hold & Re-manifest Fees',
      riskLevel: 'Moderate',
    },
    {
      id: 'EXP-005',
      buyer: 'H&M Hennes & Mauritz',
      issue: 'All 8 Rules Passed (Customs-Ready)',
      delayDays: '0 Days',
      avoidableCost: 0,
      costType: 'None (Clean Clearance)',
      riskLevel: 'Zero Risk',
    },
  ];

  const totalAvoidableCost = costBreakdown.reduce((sum, item) => sum + item.avoidableCost, 0);

  const delayCauses = [
    { cause: 'Quantity Discrepancy (Invoice vs Packing List)', percentage: 38, count: '38%', color: 'bg-red-500' },
    { cause: 'BondIQ: Unlinked Fabric & UD Entitlement Deficit', percentage: 28, count: '28%', color: 'bg-indigo-500' },
    { cause: 'Shipment Window Beyond LC Latest Date', percentage: 20, count: '20%', color: 'bg-amber-500' },
    { cause: 'Missing Documents (COO / Container Number)', percentage: 14, count: '14%', color: 'bg-cyan-500' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-2 font-mono">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>EXECUTIVE DELAY & COST INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Management Delay & Cost Attribution Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Aggregated visibility across 5 active shipments: root-cause cost drivers, avoidable demurrage, and ROI metrics.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 self-start transition-all transform hover:-translate-y-0.5"
        >
          <span>Live Control Tower</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0c121e] p-5 rounded-2xl border border-red-500/30 shadow-xl hover-card-lift">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Avoidable Cost Exposure</p>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-red-400 mt-2 font-mono">
            ${totalAvoidableCost.toLocaleString()}
          </p>
          <p className="text-[11px] text-red-400/80 mt-1 font-medium">
            Saved by pre-filing validation across 5 batches
          </p>
        </div>

        <div className="bg-[#0c121e] p-5 rounded-2xl border border-slate-800 shadow-xl hover-card-lift">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Average Delay Risk</p>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono">
            4.2 Days
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Typical port gate-in & customs hold duration
          </p>
        </div>

        <div className="bg-[#0c121e] p-5 rounded-2xl border border-slate-800 shadow-xl hover-card-lift">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Total Value In-Flight</p>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono">
            $576,000
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Active export LC commitments protected
          </p>
        </div>

        <div className="bg-[#0c121e] p-5 rounded-2xl border border-emerald-500/30 shadow-xl hover-card-lift">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider font-mono">Target Monthly ROI</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">
            18.5x
          </p>
          <p className="text-[11px] text-emerald-400/80 mt-1 font-medium">
            Based on BDT 75,000/mo Growth subscription
          </p>
        </div>
      </div>

      {/* Two Column Grid: Top Delay Causes & Avoidable Cost Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Delay Causes (5 cols) */}
        <div className="lg:col-span-5 bg-[#0c121e] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
          <div>
            <h2 className="font-bold text-white text-base">Top Garment Export Delay Causes</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Identified through automated analysis of documentation mismatches.
            </p>
          </div>

          <div className="space-y-4">
            {delayCauses.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-300">{item.cause}</span>
                  <span className="font-bold font-mono text-white">{item.count}</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Why deterministic rules win:</span>
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Paperwork errors are 100% preventable. A single discrepancy between invoice and packing list 
              triggers customs physical inspection, adding 3-5 days of vessel demurrage.
            </p>
          </div>
        </div>

        {/* Avoidable Cost Breakdown per Shipment Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#0c121e] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-white text-base">Cost Attribution by Shipment</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Quantified financial penalties and demurrage exposure per batch.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 border border-red-800/60 px-2.5 py-1 rounded-md">
              ${totalAvoidableCost.toLocaleString()} Exposure
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase font-mono">
                  <th className="py-2.5 pr-2">Shipment</th>
                  <th className="py-2.5 px-2">Buyer</th>
                  <th className="py-2.5 px-2">Primary Root Cause</th>
                  <th className="py-2.5 px-2 text-right">Potential Cost</th>
                  <th className="py-2.5 pl-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {costBreakdown.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 pr-2 font-mono font-bold text-emerald-400">
                      {row.id}
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-200">
                      {row.buyer}
                    </td>
                    <td className="py-3 px-2 text-slate-300">
                      <p className="font-medium text-[11px] text-white">{row.issue}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{row.costType}</p>
                    </td>
                    <td className="py-3 px-2 text-right font-mono font-bold">
                      {row.avoidableCost > 0 ? (
                        <span className="text-red-400">${row.avoidableCost.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-400">$0 (Cleared)</span>
                      )}
                    </td>
                    <td className="py-3 pl-2 text-right">
                      <Link
                        href={`/app/shipments/${row.id}`}
                        className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold text-[11px] inline-flex items-center gap-0.5"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Business Model & Pitch Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-[#0b101a] to-slate-900 rounded-2xl p-6 sm:p-8 border border-emerald-500/40 text-white space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>The Commercial Reality: Path to $5,000 / Month</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Preventing a single delayed shipment pays for an entire year of ExportOps AI. 
              Priced at BDT 30,000 - 75,000 per factory, reaching $5k/mo requires only 8 factories 
              on the Growth tier in Bangladesh's 4,000+ factory ecosystem.
            </p>
          </div>
          <Link
            href="/app/roi"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 shrink-0 transition-all transform hover:-translate-y-0.5"
          >
            Explore ROI Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
