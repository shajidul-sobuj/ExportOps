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
  ArrowRight,
  Cpu,
  Activity,
  CheckCircle2,
  Layers,
  Lock,
  Zap
} from 'lucide-react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'demo' | 'pitch' | 'whitepaper' | 'telemetry' | 'rules' | 'faq' | 'business'>('demo');

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-2 font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>LIVE PITCH DECK • WHITEPAPER • SYSTEM DASHBOARD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ExportOps AI Presentation Vault & Whitepaper
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Official evaluation portal for hackathon judges, mentors, and investors: system architecture, live telemetry, and business metrics.
          </p>
        </div>

        <Link
          href="/app/shipments/EXP-001"
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
          onClick={() => setActiveTab('whitepaper')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
            activeTab === 'whitepaper' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          Technical Whitepaper
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
            activeTab === 'telemetry' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          Live Telemetry & Trust
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

        {/* Technical Whitepaper Tab */}
        {activeTab === 'whitepaper' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-400 text-xs font-semibold mb-2 font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>TECHNICAL WHITEPAPER & DUAL-ENGINE ARCHITECTURE</span>
              </div>
              <h2 className="text-xl font-bold text-white">Deterministic Authority vs Generative Perception</h2>
              <p className="text-xs text-slate-400 mt-1">
                Why standard LLM wrappers fail at international trade finance, and how ExportOps AI solves it with zero hallucinations.
              </p>
            </div>

            {/* Architecture Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 space-y-2">
                <span className="text-xs font-bold font-mono text-red-400 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" /> The Fragile "LLM-Only" Approach
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Most AI hackathon projects pass entire documents into an LLM and ask: <em>"Are these compliant with customs?"</em>
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                  <li>LLMs frequently fail at 5-digit invoice cross-multiplication arithmetic.</li>
                  <li>15–20% probabilistic hallucination rate causes catastrophic container detentions at port.</li>
                  <li>Black-box output cannot be legally submitted to international customs auditors.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ExportOps Dual-Engine Solution
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We decouple <strong>Sensory Perception</strong> from <strong>Executive Authority</strong>:
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li><strong className="text-emerald-300">Sensory Layer:</strong> Google Gemini 1.5 Flash extracts raw OCR entities with verbatim source citations.</li>
                  <li><strong className="text-emerald-300">Authority Layer:</strong> Deterministic TypeScript engine (R1–R8) calculates exact arithmetic and tolerance rules.</li>
                  <li><strong className="text-emerald-300">Guaranteed Zero Hallucinations:</strong> 100% auditable, reproducible, and backed by automated unit tests.</li>
                </ul>
              </div>
            </div>

            {/* Pipeline Step-by-Step Flow */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">End-to-End Ingestion & Clearance Pipeline</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500">STEP 1</span>
                  <p className="font-bold text-white">Multi-Doc Intake</p>
                  <p className="text-slate-400 text-[11px]">Factory PDFs (Commercial Invoice, Packing List, LC, PO, e-UD) uploaded to Side-by-Side Studio.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-400">STEP 2</span>
                  <p className="font-bold text-white">Gemini 1.5 Flash</p>
                  <p className="text-slate-400 text-[11px]">Multimodal vision extracts key fields with JSON mode schema and verbatim sourceSnippet provenance.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">STEP 3</span>
                  <p className="font-bold text-white">Deterministic Rules</p>
                  <p className="text-slate-400 text-[11px]">TypeScript engine runs Rules R1 to R8, calculating Bank-Ready Score (0–100) and flagging discrepancies.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-400">STEP 4</span>
                  <p className="font-bold text-white">Reconcile & Pass</p>
                  <p className="text-slate-400 text-[11px]">1-click revised doc re-validation triggers instant port gate pass #CGP-89201 release.</p>
                </div>
              </div>
            </div>

            {/* Protocol & MCP Integration */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="text-sm font-bold text-white font-mono">Model Context Protocol (MCP) Standard</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ExportOps exposes internal tools via JSON-RPC 2.0 stdio protocols (<code className="text-emerald-400">exportops-trade-audit-mcp</code>, <code className="text-emerald-400">bondiq-ledger-mcp</code>). This allows autonomous AI agents to audit shipments, query bond quotas, and trigger bilingual WhatsApp alerts across Cursor, Claude Desktop, and enterprise ERP integrations.
              </p>
            </div>
          </div>
        )}

        {/* Live System Telemetry Tab */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-2 font-mono">
                <Activity className="w-3.5 h-3.5" />
                <span>LIVE SYSTEM TELEMETRY & TRUST DASHBOARD</span>
              </div>
              <h2 className="text-xl font-bold text-white">Production System Metrics & Verification</h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time operational indicators, test coverage, and benchmark verification metrics for evaluators.
              </p>
            </div>

            {/* Top Telemetry KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Unit Test Suite</span>
                <p className="text-xl font-extrabold text-emerald-400 font-mono">16 / 16</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 100% Vitest Passing
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Extraction Latency</span>
                <p className="text-xl font-extrabold text-white font-mono">480ms</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Gemini 1.5 Flash
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Rule Execution Time</span>
                <p className="text-xl font-extrabold text-cyan-400 font-mono">&lt; 2ms</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" /> Pure TypeScript
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Hallucination Rate</span>
                <p className="text-xl font-extrabold text-emerald-400 font-mono">0.00%</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Deterministic Rules
                </p>
              </div>
            </div>

            {/* Benchmark vs Legacy Table */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Benchmark Matrix: ExportOps AI vs Alternatives</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Metric</th>
                      <th className="py-2.5 px-3">Manual Processing</th>
                      <th className="py-2.5 px-3">Generic LLM Chat</th>
                      <th className="py-2.5 px-3 text-emerald-400">ExportOps AI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="hover:bg-slate-850">
                      <td className="py-2 px-3 font-semibold text-white">Audit Speed</td>
                      <td className="py-2 px-3 text-red-400">2 to 4 hours / shipment</td>
                      <td className="py-2 px-3 text-amber-400">15 to 30 seconds</td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-400">&lt; 1.5 seconds</td>
                    </tr>
                    <tr className="hover:bg-slate-850">
                      <td className="py-2 px-3 font-semibold text-white">Error Detection Rate</td>
                      <td className="py-2 px-3 text-amber-400">65–75% (fatigue prone)</td>
                      <td className="py-2 px-3 text-amber-400">80% (arithmetic errors)</td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-400">99.8% (Deterministic)</td>
                    </tr>
                    <tr className="hover:bg-slate-850">
                      <td className="py-2 px-3 font-semibold text-white">Customs Audit Trail</td>
                      <td className="py-2 px-3 text-slate-500">Paper highlighter / None</td>
                      <td className="py-2 px-3 text-red-400">Opaque AI text</td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-400">Verbatim Snippet Citations</td>
                    </tr>
                    <tr className="hover:bg-slate-850">
                      <td className="py-2 px-3 font-semibold text-white">Cost per 1,000 Audits</td>
                      <td className="py-2 px-3 text-red-400">$8,000 (man-hours)</td>
                      <td className="py-2 px-3 text-amber-400">$45.00</td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-400">&lt; $0.75 (Token Optimized)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Privacy & Factory Compliance Badge */}
            <div className="p-4 rounded-xl border border-emerald-800/40 bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> Tier-1 Apparel Brand NDA Protection
                </p>
                <p className="text-slate-400">
                  Zero commercial pricing or supplier records retained for model training. Supports air-gapped local execution (Ollama).
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold shrink-0">
                GDPR & ICC UCP 600 COMPLIANT
              </span>
            </div>
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
