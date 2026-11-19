'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  Tag, 
  Boxes, 
  Barcode, 
  FileText,
  Building2,
  ArrowRight
} from 'lucide-react';
import initialShipments from '@/data/shipments.json';
import { Shipment, BuyerComplianceRule } from '@/types';
import { evaluateBuyerCompliance } from '@/lib/buyer-rules';

export default function BuyerCompliancePage() {
  const shipments = initialShipments as unknown as Shipment[];
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('EXP-001');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const selectedShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];
  const complianceRules = evaluateBuyerCompliance(selectedShipment);

  const filteredRules = complianceRules.filter((r) => {
    return categoryFilter === 'All' || r.category === categoryFilter;
  });

  const passedCount = complianceRules.filter((r) => r.passed).length;
  const failedCount = complianceRules.filter((r) => !r.passed).length;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 text-xs font-semibold mb-2 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BUYER-SPECIFIC TECHNICAL SPECIFICATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Global Buyer Compliance Rulebook
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Validating shipments against strict packaging, RFID tagging, and carton labeling guidelines for H&M, Inditex, Target, and Walmart.
          </p>
        </div>

        <Link
          href={`/app/shipments/${selectedShipmentId}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 self-start transition-all transform hover:-translate-y-0.5"
        >
          <span>Open {selectedShipmentId} Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Shipment Selector & Quick Stats */}
      <div className="bg-[#0c121e] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase text-slate-400 font-mono">Select Shipment to Audit:</span>
            <select
              value={selectedShipmentId}
              onChange={(e) => setSelectedShipmentId(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono cursor-pointer"
            >
              {shipments.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.id} — {s.buyer} ({s.supplier})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {passedCount} Passed
            </span>
            {failedCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-bold bg-red-950/60 text-red-400 border border-red-800/60">
                <AlertOctagon className="w-3.5 h-3.5" />
                {failedCount} Discrepancy Found
              </span>
            )}
          </div>
        </div>

        {/* Selected Buyer Profile Banner */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold text-white text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Active Buyer Profile: {selectedShipment.buyer}</span>
            </p>
            <p className="text-slate-400 font-mono text-[11px] mt-0.5">
              PO: {selectedShipment.poNumber} • LC: {selectedShipment.lcId} • Container: {selectedShipment.containerNumber}
            </p>
          </div>
          <span className="text-[11px] px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full font-semibold text-slate-300 self-start font-mono">
            Sphere: RMG Apparel Export
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Ratio Packing', 'Labeling & RFID', 'Carton Specs', 'Documentation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
              categoryFilter === cat
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-[#0c121e] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rules Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => {
          const isPassed = rule.passed;

          return (
            <div
              key={rule.id}
              className={`p-5 rounded-2xl border text-xs space-y-3 transition-all hover-card-lift shadow-xl ${
                isPassed
                  ? 'bg-[#0c121e] border-slate-800'
                  : 'bg-[#0c121e] border-red-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[11px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {rule.id}
                  </span>
                  <span className="font-bold text-white text-sm">{rule.ruleName}</span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  isPassed 
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' 
                    : 'bg-red-950/80 text-red-400 border border-red-800/60'
                }`}>
                  {isPassed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="font-semibold text-slate-400 uppercase text-[10px] font-mono">Buyer Specification:</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{rule.requirement}</p>
                </div>

                <div className="pt-1">
                  <span className="font-semibold text-slate-400 uppercase text-[10px] font-mono">Actual Shipment Audit:</span>
                  <p className={`mt-0.5 font-medium leading-relaxed ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                    {rule.actual}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Category: {rule.category}</span>
                <span>Severity: {rule.severity}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Compliance Matters Callout */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 text-xs text-amber-200 space-y-2 shadow-xl">
        <p className="font-bold text-sm text-amber-400 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>The Financial Cost of Buyer Non-Compliance</span>
        </p>
        <p className="text-slate-300 leading-relaxed text-xs">
          International retailers enforce strict chargebacks for technical violations. Mismatched solid carton packing or unreadable RFID tags trigger <strong className="text-amber-300">$1.50 - $3.00 penalty per non-compliant carton</strong> at European distribution centers. ExportOps AI checks buyer specs before the container leaves the factory floor.
        </p>
      </div>
    </div>
  );
}
