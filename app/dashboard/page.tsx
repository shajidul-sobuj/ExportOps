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
  FileSpreadsheet
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
    { cause: 'Missing Documents (COO / Container Number)', percentage: 14, count: '14%', color: 'bg-blue-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Executive Delay & Cost Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Management Delay & Cost Attribution Dashboard
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Aggregated visibility across 5 active shipments: tracking root causes of RMG delays and measurable ROI.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm self-start transition-colors"
        >
          <span>View Active Shipments</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-red-200 bg-red-50/10 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estimated Avoidable Cost</p>
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-red-600 mt-2 font-mono">
            ${totalAvoidableCost.toLocaleString()}
          </p>
          <p className="text-[11px] text-red-500 mt-1 font-medium">
            Saved by pre-filing validation across 5 shipments
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Average Delay Risk</p>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono">
            4.2 Days
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Typical port gate-in & customs hold time
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Value In-Flight</p>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono">
            $576,000
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Export LC commitments protected
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Target Monthly ROI</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 mt-2 font-mono">
            18.5x
          </p>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">
            Based on BDT 75,000/mo Growth subscription
          </p>
        </div>
      </div>

      {/* Two Column Grid: Top Delay Causes & Avoidable Cost Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Delay Causes (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Top Garment Export Delay Causes</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Identified through automated analysis of documentation mismatches.
            </p>
          </div>

          <div className="space-y-4">
            {delayCauses.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700">{item.cause}</span>
                  <span className="font-bold font-mono text-slate-900">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <p className="font-semibold text-slate-800">Why deterministic rules win:</p>
            <p className="text-slate-600 text-[11px]">
              Paperwork errors are 100% preventable. A single discrepancy between invoice and packing list 
              triggers customs physical inspection, adding 3-5 days of vessel demurrage.
            </p>
          </div>
        </div>

        {/* Avoidable Cost Breakdown per Shipment Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Cost Attribution by Shipment</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Quantified financial penalties and demurrage exposure per batch.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
              ${totalAvoidableCost.toLocaleString()} Total Exposure
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase">
                  <th className="py-2.5 pr-2">Shipment</th>
                  <th className="py-2.5 px-2">Buyer</th>
                  <th className="py-2.5 px-2">Primary Root Cause</th>
                  <th className="py-2.5 px-2 text-right">Potential Cost</th>
                  <th className="py-2.5 pl-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {costBreakdown.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-2 font-mono font-bold text-slate-900">
                      {row.id}
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-800">
                      {row.buyer}
                    </td>
                    <td className="py-3 px-2 text-slate-600">
                      <p className="font-medium text-[11px] text-slate-900">{row.issue}</p>
                      <p className="text-[10px] text-slate-400">{row.costType}</p>
                    </td>
                    <td className="py-3 px-2 text-right font-mono font-bold">
                      {row.avoidableCost > 0 ? (
                        <span className="text-red-600">${row.avoidableCost.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-600">$0 (Cleared)</span>
                      )}
                    </td>
                    <td className="py-3 pl-2 text-right">
                      <Link
                        href={`/shipments/${row.id}`}
                        className="text-emerald-600 hover:underline font-semibold text-[11px]"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Business Model & Congress Pitch Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">The Business Case: Path to $5,000 / Month</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Preventing a single delayed shipment pays for an entire year of ExportOps AI. 
              Priced at BDT 30,000 - 75,000 per factory, reaching $5k/mo requires only 8 factories 
              on the Growth tier in Bangladesh's 4,000+ factory ecosystem.
            </p>
          </div>
          <Link
            href="/docs"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm shrink-0 transition-colors"
          >
            Read Pitch & Concept Note
          </Link>
        </div>
      </div>
    </div>
  );
}
