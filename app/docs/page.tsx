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
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-2 font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>HACKATHON PITCH & DOCUMENTATION VAULT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ExportOps AI Presentation Guide & Architecture
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Everything judges, mentors, and investors need to understand our prototype, architecture, and market.
          </p>
        </div>

        <Link
          href="/shipments/EXP-001"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all self-start transform hover:-translate-y-0.5"
        >
          <span>Launch Live EXP-001 Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
            activeTab === 'demo' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          3-Minute Demo Script
        </button>
        <button
          onClick={() => setActiveTab('pitch')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
            activeTab === 'pitch' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          30-Second Pitch & Hook
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
            activeTab === 'rules' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          8-Point Rules Engine Spec
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
            activeTab === 'faq' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          Tough Questions & Answers
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
            activeTab === 'business' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          Business Model & GTM
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#0c121e] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl text-sm space-y-6">
        {/* 3-Minute Demo Script Tab */}
        {activeTab === 'demo' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-white">3-Minute Judging Demo Walkthrough</h2>
              <p className="text-xs text-slate-400 mt-1">
                Follow this exact sequence during the live hackathon judging round.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase">Act 1 (0:00 - 0:40) • The Problem & The Hook</span>
                <p className="font-semibold text-white">Open Home Page (Control Tower)</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Bangladesh exports over $47B in apparel. Right now at Chittagong Port, containers get held up every day because a single number on a packing list didn't match the commercial invoice. Look at shipment <strong className="text-emerald-400">EXP-001</strong>: it has a Bank-Ready Score of 75 and is marked <strong className="text-red-400">BLOCKED</strong>."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase">Act 2 (0:40 - 1:20) • The Inspection</span>
                <p className="font-semibold text-white">Click into EXP-001</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Here in the Control Tower, we see all 5 documents. In the Exceptions Panel, <strong className="text-red-400">Rule R1 failed</strong>: Commercial Invoice says 12,000 pcs, but Packing List says 11,400 pcs. A 600-piece mismatch that would have triggered customs inspection and a bank discrepancy."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-1">
                <span className="text-xs font-bold font-mono text-emerald-300 uppercase">Act 3 (1:20 - 2:10) • The Interactive Fix</span>
                <p className="font-semibold text-white">Upload Revised Document / Set to 12,000 & Re-validate</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "The documentation manager confirms with packaging: final carton count is 12,000 pcs. She clicks <strong>'Upload Revised Packing List'</strong>. AI extracts the new count with 99% confidence. She hits Re-validate. Instantly, Rule R1 turns green, status turns <strong className="text-emerald-400">CUSTOMS-READY</strong>, and Bank-Ready Score hits 100!"
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase">Act 4 (2:10 - 2:40) • BondIQ & Dashboard</span>
                <p className="font-semibold text-white">Highlight EXP-003 and open Dashboard</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "In EXP-003, BondIQ caught 2,500 kg of fabric consumed without an approved UD. And on our Management Dashboard, leadership tracks <strong className="text-emerald-400">$38,400 in avoidable demurrage and penalties saved</strong>."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase">Act 5 (2:40 - 3:00) • Business & Closing</span>
                <p className="font-semibold text-white">Subscription Model & Ask</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "We charge BDT 30k-75k/month per factory. Just 8 factories on our Growth plan gets us to our $5,000/month recurring milestone. ExportOps AI: turning messy trade paperwork into customs-ready confidence. Thank you!"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 30-Second Pitch Tab */}
        {activeTab === 'pitch' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-xl font-bold text-white">30-Second Elevator Pitch</h2>
            <blockquote className="p-5 bg-slate-900/80 border-l-4 border-emerald-500 rounded-r-xl text-slate-200 italic text-base leading-relaxed">
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
            <h2 className="text-xl font-bold text-white">The 8 Deterministic Compliance Rules</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Rule ID</th>
                    <th className="py-2.5 px-3">Rule Name</th>
                    <th className="py-2.5 px-3">Severity</th>
                    <th className="py-2.5 px-3">Compliance Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R1</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Quantity Match</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Commercial Invoice Total Qty == Packing List Total Qty</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R2</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Value Tolerance</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Invoice Amount &lt;= LC Amount * (1 + Tolerance %)</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R3</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Entity Match</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">PO Buyer == Commercial Invoice Consignee</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R4</td>
                    <td className="py-2.5 px-3 font-semibold text-white">LC Shipment Window</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Shipment Date &lt;= LC Latest Shipment Date</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R5</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Document Completeness</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">All 5 documents present: PO, LC, Invoice, Packing List, COO</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R6</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Container Verification</td>
                    <td className="py-2.5 px-3"><span className="text-amber-400 font-bold font-mono">Warning</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Container number explicitly assigned on Packing List</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R7</td>
                    <td className="py-2.5 px-3 font-semibold text-white">HS Code Consistency</td>
                    <td className="py-2.5 px-3"><span className="text-amber-400 font-bold font-mono">Warning</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Harmonized System (HS) code identical across all documents</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R8</td>
                    <td className="py-2.5 px-3 font-semibold text-white">BondIQ Fabric Quota</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Fabric Consumed (kg) &lt;= Approved UD Entitlement Quantity (kg)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tough Questions Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-xl font-bold text-white">Tough Judging Questions & Rebuttals</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <p className="font-bold text-emerald-400 text-xs">Q: Does AI make the compliance decision?</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>A: Absolutely not.</strong> AI reads and extracts fields, and translates mismatches into plain language. Deterministic, unit-tested TypeScript functions make the pass/fail determination. A human manager signs off with an immutable audit log.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <p className="font-bold text-emerald-400 text-xs">Q: Doesn't Bangladesh Customs (ASYCUDA) or BGMEA e-UD do this?</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>A: No.</strong> ASYCUDA and e-UD are submission endpoints. If you submit mismatched documents, your container gets flagged, physically audited, and hit with demurrage. ExportOps AI is the factory's internal pre-submission defense that ensures clean data <em>before</em> filing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <p className="font-bold text-emerald-400 text-xs">Q: What if the AI extraction is inaccurate?</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>A:</strong> Every extracted field has a confidence score and source snippet citation. Low confidence fields are flagged for manual review, and users can edit any field in one click.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Business Model Tab */}
        {activeTab === 'business' && (
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-xl font-bold text-white">Business Model & Path to $5,000 / Month</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <p className="font-bold text-white text-sm">Starter Plan</p>
                <p className="text-xl font-extrabold text-white font-mono">BDT 30,000 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-slate-400 leading-relaxed">For single factories up to 10 shipments/month. Basic document validation & control tower.</p>
              </div>

              <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-950/20 space-y-2 relative">
                <span className="absolute -top-2.5 right-3 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">Recommended</span>
                <p className="font-bold text-white text-sm">Growth Plan</p>
                <p className="text-xl font-extrabold text-emerald-400 font-mono">BDT 75,000 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-slate-300 leading-relaxed">For mid-sized exporters. Unlimited shipments, BondIQ UD quota reconciliation, and dashboard.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <p className="font-bold text-white text-sm">Enterprise Group</p>
                <p className="text-xl font-extrabold text-white font-mono">BDT 200,000+ <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-slate-400 leading-relaxed">For large garment conglomerates and buying houses managing multiple factories.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
              <strong className="text-emerald-400 font-bold">The Math:</strong> At ~BDT 120 / USD, $5,000/month is BDT 600,000. That equals just <strong>8 factories on the Growth plan</strong>, or 3 enterprise groups. Bangladesh has over 4,000 active RMG factories.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
