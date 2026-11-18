'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Anchor, 
  ShieldCheck, 
  Layers, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  BarChart3, 
  ExternalLink, 
  Send, 
  Check, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Radio, 
  Lock, 
  Scale, 
  Ship, 
  Globe2, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'security' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#05080e] border-t border-slate-800/80 text-xs text-slate-400 relative">
      {/* 1. Regulatory & Port Dispatch Newsletter Banner */}
      <div className="border-b border-slate-800/80 bg-[#060a12]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/70 text-emerald-400 font-mono text-[11px] border border-emerald-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CHITTAGONG PORT & CUSTOMS REGULATORY DISPATCH</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Stay Ahead of Vessel Cut-Offs & Customs Changes
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Receive weekly updates on Bangladesh Customs ASYCUDA pre-entry revisions, BGMEA fabric quota notices, and Chittagong container demurrage alerts.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center gap-3 text-emerald-300">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-xs">Subscribed Successfully!</p>
                    <p className="text-[11px] text-emerald-400/80">You will receive the Chittagong Port regulatory bulletin weekly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter factory or corporate email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#080d16] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 transform hover:-translate-y-0.5"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-slate-400 mt-2 font-mono">
                Strict privacy guarantee • No spam • RMG compliance bulletins only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Anchor className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                  ExportOps <span className="text-emerald-400 font-extrabold">AI</span>
                </span>
                <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  RMG Pre-Shipment Control Tower
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Autonomous pre-shipment cross-checking of commercial invoices, packing lists, export LCs, and bonded fabric quotas (UD) before port gate-in. Protecting $47B in Bangladesh garment exports from container demurrage and air-freight penalties.
            </p>

            {/* Operational Terminal Status Pill */}
            <div className="p-3 bg-[#080d16] border border-slate-800 rounded-xl space-y-1.5 max-w-sm">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <strong className="text-white">CHITTAGONG PORT BERTH 4</strong>
                </span>
                <span className="text-emerald-400 font-bold">RADAR ACTIVE</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                ASYCUDA World Pre-Entry Validated • Zero AI Hallucination
              </p>
            </div>

            {/* Contact & Social Links */}
            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors"
                aria-label="ExportOps AI GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors"
                aria-label="ExportOps AI LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:compliance@exportops.ai"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Email ExportOps AI Compliance"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-mono text-slate-400 pl-1">
                Dhaka & Chattogram Hub
              </span>
            </div>
          </div>

          {/* Column 1: Platform (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Platform</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Control Tower
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-001" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Inspection Studio</span>
                  <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">Demo</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-003" className="hover:text-emerald-400 transition-colors">
                  BondIQ Fabric Ledger
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-emerald-400 transition-colors">
                  Buyer Compliance
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Cost Dashboard
                </Link>
              </li>
              <li>
                <Link href="/roi" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>ROI & Pricing</span>
                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">Pilot</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Compliance Rules (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Compliance Rules</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/docs" className="hover:text-emerald-400 transition-colors">
                  8-Point Matrix (R1-R8)
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-001" className="hover:text-emerald-400 transition-colors">
                  R1: Invoice vs PL Match
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-002" className="hover:text-emerald-400 transition-colors">
                  R4: LC Expiry & Date
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-003" className="hover:text-emerald-400 transition-colors">
                  R8: BGMEA UD Quota
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-emerald-400 transition-colors">
                  H&M Ratio Pack (HM-01)
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-emerald-400 transition-colors">
                  Zara RFID Inlays (ZRA-01)
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-emerald-400 transition-colors">
                  Target GS1-128 Weight
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Docs (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Resources</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/docs" className="hover:text-emerald-400 transition-colors">
                  Pitch & Demo Script
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-005" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Port Gate-In Pass</span>
                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">QR</span>
                </Link>
              </li>
              <li>
                <Link href="/roi" className="hover:text-emerald-400 transition-colors">
                  90-Day Factory Pilot
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-emerald-400 transition-colors">
                  ASYCUDA Format Specs
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-001" className="hover:text-emerald-400 transition-colors">
                  Sample Trade Docs
                </Link>
              </li>
              <li>
                <a href="#system-status" className="hover:text-emerald-400 transition-colors">
                  Live System Telemetry
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Standards (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Legal & Standards</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('security')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Bangladesh Customs Act
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  ICC UCP 600 Banking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Data Isolation Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Operational System Telemetry Bar (Raycast / Vercel style) */}
      <div id="system-status" className="border-t border-slate-800/80 bg-[#04060b] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono">
            <div className="flex flex-wrap items-center gap-5 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>ASYCUDA World Gateway: <strong className="text-white">OPERATIONAL (99.98%)</strong></span>
              </span>
              <span className="hidden sm:inline-block text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>BGMEA e-UD Quota Ledger: <strong className="text-white">SYNCED</strong></span>
              </span>
              <span className="hidden md:inline-block text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>Deterministic Rules Engine: <strong className="text-white">ZERO HALLUCINATION</strong></span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[10px]">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-BIT TLS INDUSTRIAL ENCRYPTION</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#030509] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center space-x-2 text-slate-400">
            <span>© {currentYear} <strong className="text-white">ExportOps AI</strong>. All rights reserved.</span>
            <span className="text-slate-600">•</span>
            <span>Chittagong Port Cut-Off Shield</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('security')}
              className="hover:text-slate-200 transition-colors"
            >
              Security Protocol
            </button>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden md:inline-block text-slate-400">
              Built in Dhaka & Chattogram 🇧🇩
            </span>
          </div>
        </div>
      </div>

      {/* 5. Legal Information Interactive Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0b101a] border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {activeModal === 'privacy' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white">Data Privacy & Isolation Policy</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ExportOps AI enforces strict tenant data isolation. Commercial Invoices, Packing Lists, and Export Letters of Credit uploaded by factory documentation teams are processed in ephemeral memory and encrypted with AES-256 keys. No commercial trade data or pricing terms are ever shared across competing manufacturers or used to train public LLM weights.
                </p>
                <div className="p-3 bg-[#070b13] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <p>✓ Zero third-party data broker transmission</p>
                  <p>✓ BGMEA e-UD ledger queries encrypted via SHA-256</p>
                  <p>✓ Compliant with Bangladesh Cyber Security Act 2023</p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white">Terms of Service & UCP 600 Compliance</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  By accessing the ExportOps AI platform, factory subscribers and clearing agents agree to submit authentic trade documents for pre-shipment cross-checking. The 8-point deterministic rules engine validates documentary compliance against ICC Uniform Customs and Practice for Documentary Credits (UCP 600).
                </p>
                <div className="p-3 bg-[#070b13] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <p>✓ Pre-clearance Gate-In pass valid at Chittagong Sea Port</p>
                  <p>✓ Factory retains legal title to all export declarations</p>
                  <p>✓ UCP 600 documentary discrepancy shield guaranteed</p>
                </div>
              </div>
            )}

            {activeModal === 'security' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white">Customs & Security Infrastructure</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ExportOps AI is engineered to comply with Bangladesh Customs Act 2023 regulations and ASYCUDA World electronic data interchange protocols. System audits guarantee deterministic calculation integrity so no container is falsely certified as Customs-Ready.
                </p>
                <div className="p-3 bg-[#070b13] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <p>✓ Cryptographic hash generated on every Gate-In Pass</p>
                  <p>✓ Anti-tampering QR code validation for port inspectors</p>
                  <p>✓ Sub-60 second deterministic audit execution</p>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
