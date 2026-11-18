'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  ShieldAlert, 
  Calendar, 
  Sparkles,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';
import initialShipments from '@/data/shipments.json';
import { Shipment, ShipmentStatus } from '@/types';

export default function HomePage() {
  const [shipments] = useState<Shipment[]>(initialShipments as unknown as Shipment[]);
  const [filter, setFilter] = useState<'All' | ShipmentStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Control Tower Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Document Intelligence & Bond Reconciled</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            RMG Pre-Shipment Control Tower
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminating garment-export delays before vessel cut-off. ExportOps AI cross-validates 
            PO, LC, Invoice, Packing List, and Bonded Fabric records. Fixed rules decide compliance; 
            AI reads and explains.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              R1-R5 Critical Mismatches Blocked
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              BondIQ UD Quota Protected
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              100% Immutable Audit Trail
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Demo Guide Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-amber-900">
              Judges & Reviewers: Start with Shipment <span className="underline font-bold">EXP-001</span>
            </p>
            <p className="text-amber-750 text-xs mt-0.5 text-slate-600">
              EXP-001 has a quantity mismatch between Invoice (12,000 pcs) and Packing List (11,400 pcs). 
              Open the control tower, test the interactive document correction, and watch the status dynamically turn <strong>Customs-ready</strong>!
            </p>
          </div>
        </div>
        <Link
          href="/shipments/EXP-001"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm shrink-0 transition-colors"
        >
          <span>Launch Demo Story</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Shipments</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{shipments.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Seeded test batch</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-red-100 bg-red-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-red-600 uppercase tracking-wider">Blocked</p>
            <AlertOctagon className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-700 mt-1">{blockedCount}</p>
          <p className="text-[11px] text-red-500 mt-0.5">Critical rule failures</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-100 bg-amber-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">At Risk</p>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-700 mt-1">{atRiskCount}</p>
          <p className="text-[11px] text-amber-500 mt-0.5">Warnings pending</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-emerald-100 bg-emerald-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Customs-Ready</p>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{readyCount}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Cleared for port gate-in</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Bank Score</p>
          <div className="flex items-baseline gap-1 mt-1">
            <p className="text-2xl font-bold text-slate-900">{avgScore}</p>
            <span className="text-xs text-slate-400">/100</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${avgScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {(['All', 'Blocked', 'At risk', 'Customs-ready'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'All' ? 'All Shipments' : tab}
              {tab === 'Blocked' && ` (${blockedCount})`}
              {tab === 'At risk' && ` (${atRiskCount})`}
              {tab === 'Customs-ready' && ` (${readyCount})`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search shipment, buyer, PO, LC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Shipment Control Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Shipment ID</th>
                <th className="py-3.5 px-4">Buyer & Factory</th>
                <th className="py-3.5 px-4">PO & Export LC</th>
                <th className="py-3.5 px-4">Port Cut-off</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Bank-Ready Score</th>
                <th className="py-3.5 px-4">Planted Issue / Summary</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredShipments.map((s) => {
                const isBlocked = s.status === 'Blocked';
                const isAtRisk = s.status === 'At risk';
                const isReady = s.status === 'Customs-ready';

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-slate-900">
                      <Link href={`/shipments/${s.id}`} className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        {s.id}
                        {s.id === 'EXP-001' && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-sans font-semibold">
                            Primary Demo
                          </span>
                        )}
                      </Link>
                    </td>

                    {/* Buyer & Factory */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-900">{s.buyer}</p>
                      <p className="text-[11px] text-slate-400">{s.supplier}</p>
                    </td>

                    {/* PO & LC */}
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                      <div>PO: {s.poNumber}</div>
                      <div className="text-slate-400">LC: {s.lcId}</div>
                    </td>

                    {/* Vessel Cutoff */}
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{s.vesselCutoff.split('T')[0]}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Container: {s.containerNumber}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {isBlocked && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-800 border border-red-200">
                          <AlertOctagon className="w-3 h-3 text-red-600" />
                          Blocked
                        </span>
                      )}
                      {isAtRisk && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          At Risk
                        </span>
                      )}
                      {isReady && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Customs-Ready
                        </span>
                      )}
                    </td>

                    {/* Bank-Ready Score */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold font-mono ${
                          s.bankReadyScore >= 90 ? 'text-emerald-600' : s.bankReadyScore >= 75 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {s.bankReadyScore}
                        </span>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              s.bankReadyScore >= 90 ? 'bg-emerald-500' : s.bankReadyScore >= 75 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${s.bankReadyScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Planted Issue Description */}
                    <td className="py-4 px-4 text-slate-600 max-w-xs">
                      {s.id === 'EXP-001' && (
                        <span className="text-red-700 font-medium">
                          Invoice Qty (12,000 pcs) != Packing list (11,400 pcs)
                        </span>
                      )}
                      {s.id === 'EXP-002' && (
                        <span className="text-red-700 font-medium">
                          Shipment date past LC window; Certificate of Origin missing
                        </span>
                      )}
                      {s.id === 'EXP-003' && (
                        <span className="text-red-700 font-medium">
                          Fabric consumed exceeds approved UD-linked quota (+2,500 kg)
                        </span>
                      )}
                      {s.id === 'EXP-004' && (
                        <span className="text-amber-700 font-medium">
                          Container number missing / unassigned on packing list
                        </span>
                      )}
                      {s.id === 'EXP-005' && (
                        <span className="text-emerald-700 font-medium">
                          Clean documentation; all 8 rules passed
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/shipments/${s.id}`}
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
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
  );
}
