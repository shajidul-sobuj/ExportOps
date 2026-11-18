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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Buyer-Specific Technical Specifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Global Buyer Compliance Rulebook
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Validating shipments against strict packaging, RFID tagging, and carton labeling guidelines for H&M, Inditex, Target, and Walmart.
          </p>
        </div>

        <Link
          href="/shipments/EXP-001"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm self-start transition-colors"
        >
          <span>Open EXP-001 Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Shipment Selector & Quick Stats */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase text-slate-500">Select Shipment to Audit:</span>
            <select
              value={selectedShipmentId}
              onChange={(e) => setSelectedShipmentId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            >
              {shipments.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.buyer} ({s.supplier})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {passedCount} Passed
            </span>
            {failedCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold bg-red-50 text-red-700 border border-red-200">
                <AlertOctagon className="w-3.5 h-3.5" />
                {failedCount} Discrepancy Found
              </span>
            )}
          </div>
        </div>

        {/* Selected Buyer Profile Banner */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold text-slate-900 text-sm">
              Active Buyer Profile: {selectedShipment.buyer}
            </p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              PO: {selectedShipment.poNumber} • LC: {selectedShipment.lcId} • Container: {selectedShipment.containerNumber}
            </p>
          </div>
          <span className="text-[11px] px-3 py-1 bg-white border border-slate-200 rounded-full font-semibold text-slate-700 self-start">
            Industry Sphere: Apparel & RMG
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Ratio Packing', 'Labeling & RFID', 'Carton Specs', 'Documentation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
              categoryFilter === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
              className={`p-5 rounded-2xl border text-xs space-y-3 transition-all ${
                isPassed
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-red-50/40 border-red-300 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {rule.id}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{rule.ruleName}</span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isPassed ? 'Compliant' : 'Non-Compliant'}
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="font-semibold text-slate-500 uppercase text-[10px]">Buyer Specification:</span>
                  <p className="text-slate-700 mt-0.5">{rule.requirement}</p>
                </div>

                <div className="pt-1">
                  <span className="font-semibold text-slate-500 uppercase text-[10px]">Actual Shipment Audit:</span>
                  <p className={`mt-0.5 font-medium ${isPassed ? 'text-emerald-700' : 'text-red-800'}`}>
                    {rule.actual}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>Category: {rule.category}</span>
                <span>Severity: {rule.severity}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Compliance Matters Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-xs text-amber-900 space-y-2">
        <p className="font-bold text-sm text-amber-950 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          The Financial Cost of Buyer Non-Compliance
        </p>
        <p className="text-slate-700 leading-relaxed text-xs">
          International retailers enforce strict chargebacks for technical violations. Mismatched solid carton packing or unreadable RFID tags trigger <strong>$1.50 - $3.00 penalty per non-compliant carton</strong> at European distribution centers. ExportOps AI checks buyer specs before the container leaves the factory floor.
        </p>
      </div>
    </div>
  );
}
