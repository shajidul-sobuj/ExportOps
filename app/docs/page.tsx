'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Target, 
  DollarSign, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'pitch' | 'demo' | 'rules' | 'faq' | 'business'>('demo');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hackathon Pitch & Documentation Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ExportOps AI Presentation Guide & Architecture
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Everything judges, mentors, and investors need to understand our prototype, architecture, and market.
          </p>
        </div>

        <Link
          href="/shipments/EXP-001"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors self-start"
        >
          <span>Launch Live EXP-001 Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
            activeTab === 'demo' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3-Minute Demo Script
        </button>
        <button
          onClick={() => setActiveTab('pitch')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
            activeTab === 'pitch' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          30-Second Pitch & Hook
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
            activeTab === 'rules' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          8-Point Rules Engine Spec
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
            activeTab === 'faq' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tough Questions & Answers
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
            activeTab === 'business' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Business Model & GTM
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-sm space-y-6">
        {/* 3-Minute Demo Script Tab */}
        {activeTab === 'demo' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900">3-Minute Judging Demo Walkthrough</h2>
              <p className="text-xs text-slate-500 mt-1">
                Follow this exact sequence during the live hackathon judging round.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs font-bold font-mono text-emerald-700 uppercase">Act 1 (0:00 - 0:40) • The Problem & The Hook</span>
                <p className="font-semibold text-slate-900 mt-1">Open Home Page (Control Tower)</p>
                <p className="text-xs text-slate-600 mt-1">
                  "Bangladesh exports over $47B in apparel. Right now at Chittagong Port, containers get held up every day because a single number on a packing list didn't match the commercial invoice. Look at shipment <strong>EXP-001</strong>: it has a Bank-Ready Score of 75 and is marked <strong>BLOCKED</strong>."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs font-bold font-mono text-emerald-700 uppercase">Act 2 (0:40 - 1:20) • The Inspection</span>
                <p className="font-semibold text-slate-900 mt-1">Click into EXP-001</p>
                <p className="text-xs text-slate-600 mt-1">
                  "Here in the Control Tower, we see all 5 documents. In the Exceptions Panel, <strong>Rule R1 failed</strong>: Commercial Invoice says 12,000 pcs, but Packing List says 11,400 pcs. A 600-piece mismatch that would have triggered customs inspection and a bank discrepancy."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <span className="text-xs font-bold font-mono text-emerald-800 uppercase">Act 3 (1:20 - 2:10) • The Interactive Fix</span>
                <p className="font-semibold text-slate-900 mt-1">Upload Revised Document / Set to 12,000 & Re-validate</p>
                <p className="text-xs text-slate-600 mt-1">
                  "The documentation manager confirms with packaging: final carton count is 12,000 pcs. She clicks <strong>'Upload Revised Packing List'</strong>. AI extracts the new count with 99% confidence. She hits Re-validate. Instantly, Rule R1 turns green, status turns <strong>CUSTOMS-READY</strong>, and Bank-Ready Score hits 100!"
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs font-bold font-mono text-emerald-700 uppercase">Act 4 (2:10 - 2:40) • BondIQ & Dashboard</span>
                <p className="font-semibold text-slate-900 mt-1">Highlight EXP-003 and open Dashboard</p>
                <p className="text-xs text-slate-600 mt-1">
                  "In EXP-003, BondIQ caught 2,500 kg of fabric consumed without an approved UD. And on our Management Dashboard, leadership tracks <strong>$38,400 in avoidable demurrage and penalties saved</strong>."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs font-bold font-mono text-emerald-700 uppercase">Act 5 (2:40 - 3:00) • Business & Closing</span>
                <p className="font-semibold text-slate-900 mt-1">Subscription Model & Ask</p>
                <p className="text-xs text-slate-600 mt-1">
                  "We charge BDT 30k-75k/month per factory. Just 8 factories on our Growth plan gets us to our $5,000/month recurring milestone. ExportOps AI: turning messy trade paperwork into customs-ready confidence. Thank you!"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 30-Second Pitch Tab */}
        {activeTab === 'pitch' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900">30-Second Elevator Pitch</h2>
            <blockquote className="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-r-xl text-slate-700 italic text-base leading-relaxed">
              "Every garment shipment leaving Bangladesh depends on a dozen documents that live in spreadsheets, PDFs, and WhatsApp groups. One mismatch between the invoice, the packing list, the LC, or the bond record can delay a container or trigger a bank query.
              <br /><br />
              ExportOps AI reads those documents, checks them against each other and against the bond ledger, and gives every shipment a live customs-ready status.
              <br /><br />
              AI extracts and explains; deterministic rules decide. Factories pay a monthly subscription, and preventing just one delayed shipment pays for the entire year."
            </blockquote>
          </div>
        )}

        {/* Rules Engine Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900">The 8 Deterministic Compliance Rules</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Rule ID</th>
                    <th className="py-2.5 px-3">Rule Name</th>
                    <th className="py-2.5 px-3">Severity</th>
                    <th className="py-2.5 px-3">Compliance Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R1</td>
                    <td className="py-2.5 px-3 font-semibold">Quantity Match</td>
                    <td className="py-2.5 px-3"><span className="text-red-700 font-bold">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-600">Commercial Invoice Total Qty == Packing List Total Qty</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R2</td>
                    <td className="py-2.5 px-3 font-semibold">Value Tolerance</td>
                    <td className="py-2.5 px-3"><span className="text-red-700 font-bold">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-600">Invoice Amount &lt;= LC Amount * (1 + Tolerance %)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R3</td>
                    <td className="py-2.5 px-3 font-semibold">Entity Match</td>
                    <td className="py-2.5 px-3"><span className="text-red-700 font-bold">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-600">PO Buyer == Commercial Invoice Consignee</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R4</td>
                    <td className="py-2.5 px-3 font-semibold">LC Shipment Window</td>
                    <td className="py-2.5 px-3"><span className="text-red-700 font-bold">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-600">Shipment Date &lt;= LC Latest Shipment Date</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R5</td>
                    <td className="py-2.5 px-3 font-semibold">Document Completeness</td>
                    <td className="py-2.5 px-3"><span className="text-red-700 font-bold">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-600">All 5 documents present: PO, LC, Invoice, Packing List, COO</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R6</td>
                    <td className="py-2.5 px-3 font-semibold">Container Verification</td>
                    <td className="py-2.5 px-3"><span className="text-amber-700 font-bold">Warning</span></td>
                    <td className="py-2.5 px-3 text-slate-600">Container number explicitly assigned on Packing List</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R7</td>
                    <td className="py-2.5 px-3 font-semibold">HS Code Consistency</td>
                    <td className="py-2.5 px-3"><span className="text-amber-700 font-bold">Warning</span></td>
                    <td className="py-2.5 px-3 text-slate-600">Harmonized System (HS) code identical across all documents</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold">R8</td>
                    <td className="py-2.5 px-3 font-semibold">BondIQ Fabric Quota</td>
                    <td className="py-2.5 px-3"><span className="text-red-700 font-bold">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-600">Fabric Consumed (kg) &lt;= Approved UD Entitlement Quantity (kg)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tough Questions Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900">Tough Judging Questions & Rebuttals</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-xs">Q: Does AI make the compliance decision?</p>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>A: Absolutely not.</strong> AI reads and extracts fields, and translates mismatches into plain language. Deterministic, unit-tested TypeScript functions make the pass/fail determination. A human manager signs off with an immutable audit log.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-xs">Q: Doesn't Bangladesh Customs (ASYCUDA) or BGMEA e-UD do this?</p>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>A: No.</strong> ASYCUDA and e-UD are submission endpoints. If you submit mismatched documents, your container gets flagged, physically audited, and hit with demurrage. ExportOps AI is the factory's internal pre-submission defense that ensures clean data <em>before</em> filing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-xs">Q: What if the AI extraction is inaccurate?</p>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>A:</strong> Every extracted field has a confidence score and source snippet citation. Low confidence fields are flagged for manual review, and users can edit any field in one click.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Business Model Tab */}
        {activeTab === 'business' && (
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900">Business Model & Path to $5,000 / Month</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <p className="font-bold text-slate-900 text-sm">Starter Plan</p>
                <p className="text-xl font-extrabold text-slate-900 font-mono">BDT 30,000 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-slate-500">For single factories up to 10 shipments/month. Basic document validation & control tower.</p>
              </div>

              <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/30 space-y-2 relative">
                <span className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Recommended</span>
                <p className="font-bold text-slate-900 text-sm">Growth Plan</p>
                <p className="text-xl font-extrabold text-emerald-700 font-mono">BDT 75,000 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-slate-600">For mid-sized exporters. Unlimited shipments, BondIQ UD quota reconciliation, and dashboard.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <p className="font-bold text-slate-900 text-sm">Enterprise Group</p>
                <p className="text-xl font-extrabold text-slate-900 font-mono">BDT 200,000+ <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-slate-500">For large garment conglomerates and buying houses managing multiple factories.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong>The Math:</strong> At ~BDT 120 / USD, $5,000/month is BDT 600,000. That equals just <strong>8 factories on the Growth plan</strong>, or 3 enterprise groups. Bangladesh has over 4,000 active RMG factories.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
