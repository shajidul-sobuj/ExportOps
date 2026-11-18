'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight,
  ChevronRight,
  Activity,
  Cpu
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'security' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // Viewport scroll-based reveal (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4500);
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-[#05080e] border-t border-slate-800/80 text-xs text-slate-400 relative overflow-hidden"
    >
      {/* A. Signature Animated Border Beam (Linear / Raycast Style) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-800/60 overflow-hidden pointer-events-none z-20">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-beam opacity-90" />
      </div>

      {/* B. Ambient Moving Lights & Background Textures */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft emerald radial aura (Top-Left) */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-ambient-pulse" />
        {/* Soft indigo/cyan radial aura (Bottom-Right) */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-ambient-pulse [animation-delay:4s]" />
      </div>

      {/* 1. Regulatory & Port Dispatch Newsletter Banner */}
      <div className="border-b border-slate-800/80 bg-[#060a12]/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="lg:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-400 font-mono text-[11px] border border-emerald-800/50 shadow-sm shadow-emerald-950">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>CHITTAGONG PORT & CUSTOMS REGULATORY DISPATCH</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Stay Ahead of Vessel Cut-Offs & Customs Changes
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Receive weekly trade digests on Bangladesh Customs ASYCUDA pre-entry revisions, BGMEA fabric quota notices, and Chittagong container demurrage alerts.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 flex items-center gap-3 text-emerald-300 shadow-lg shadow-emerald-950 animate-glow">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-white">Subscribed Successfully!</p>
                    <p className="text-[11px] text-emerald-400/90 font-mono">Weekly Chittagong Port regulatory bulletin dispatched to your inbox.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 relative group/input">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter factory or corporate email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#080d16] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/80 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative overflow-hidden group/btn px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 shrink-0 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {/* Hover Shimmer Line Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10">Subscribe</span>
                    <Send className="w-3.5 h-3.5 relative z-10 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-slate-500 mt-2 font-mono flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-600" />
                <span>Strict privacy guarantee • No spam • RMG export bulletins only</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Columns (Staggered Scroll Reveal) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Mission (4 cols) */}
          <div className={`lg:col-span-4 space-y-4 transition-all duration-700 delay-150 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <Link href="/" className="inline-flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/25 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                <Anchor className="w-5 h-5 transition-transform group-hover:scale-110" />
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
            <div className="p-3 bg-[#080d16] border border-slate-800/80 rounded-xl space-y-1.5 max-w-sm hover:border-emerald-500/40 transition-colors duration-300 shadow-inner">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <strong className="text-white">CHITTAGONG PORT BERTH 4</strong>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/60">
                  RADAR ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                ASYCUDA World Pre-Entry Validated • Zero AI Hallucination
              </p>
            </div>

            {/* Social & Contact Icons with Animated Hover Glow */}
            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group relative w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-950/40 hover:scale-110 hover:-rotate-3 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                aria-label="ExportOps AI GitHub Repository"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group relative w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-950/40 hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                aria-label="ExportOps AI LinkedIn"
                title="LinkedIn Network"
              >
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="mailto:compliance@exportops.ai"
                className="group relative w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-950/40 hover:scale-110 hover:-rotate-3 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                aria-label="Email Compliance Support"
                title="Compliance Desk"
              >
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <span className="text-[11px] font-mono text-slate-400 pl-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Dhaka & Chattogram Hub
              </span>
            </div>
          </div>

          {/* Column 1: Platform (2 cols) */}
          <div className={`lg:col-span-2 space-y-3 transition-all duration-700 delay-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Platform</span>
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Control Tower</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-001" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Inspection Studio</span>
                  <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">Demo</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-003" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>BondIQ Fabric Ledger</span>
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Buyer Compliance</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Cost Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/roi" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>ROI & Pricing</span>
                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">Pilot</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Compliance Rules (2 cols) */}
          <div className={`lg:col-span-2 space-y-3 transition-all duration-700 delay-250 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Rules Engine</span>
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/docs" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>8-Point Matrix (R1-R8)</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-001" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>R1: Invoice vs PL Match</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-002" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>R4: LC Expiry & Date</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-003" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>R8: BGMEA UD Quota</span>
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>H&M Ratio Pack (HM-01)</span>
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Zara RFID Inlays (ZRA-01)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Docs (2 cols) */}
          <div className={`lg:col-span-2 space-y-3 transition-all duration-700 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Resources</span>
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/docs" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Pitch & Demo Script</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-005" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Port Gate-In Pass</span>
                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">QR</span>
                </Link>
              </li>
              <li>
                <Link href="/roi" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>90-Day Factory Pilot</span>
                </Link>
              </li>
              <li>
                <Link href="/docs" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>ASYCUDA Format Specs</span>
                </Link>
              </li>
              <li>
                <Link href="/shipments/EXP-001" className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200">
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Sample Trade Docs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Standards (2 cols) */}
          <div className={`lg:col-span-2 space-y-3 transition-all duration-700 delay-350 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Standards</span>
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('security')}
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-left"
                >
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Bangladesh Customs Act</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-left"
                >
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>ICC UCP 600 Banking</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-left"
                >
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Data Isolation Protocol</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-left"
                >
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-left"
                >
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-200 text-emerald-400 font-bold">›</span>
                  <span>Terms of Service</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Operational System Telemetry Bar (Interactive Hover Highlights) */}
      <div id="system-status" className="border-t border-slate-800/80 bg-[#04060b] py-3.5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400">
              {/* ASYCUDA Pill */}
              <div className="flex items-center gap-2 p-1 px-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-all duration-300 cursor-default group">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse shrink-0" />
                <span>ASYCUDA Gateway: <strong className="text-white group-hover:text-emerald-300 transition-colors">OPERATIONAL (99.98%)</strong></span>
              </div>

              {/* BGMEA UD Pill */}
              <div className="flex items-center gap-2 p-1 px-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-all duration-300 cursor-default group">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />
                <span>BGMEA e-UD Ledger: <strong className="text-white group-hover:text-emerald-300 transition-colors">SYNCED</strong></span>
              </div>

              {/* Zero Hallucination Pill */}
              <div className="hidden md:flex items-center gap-2 p-1 px-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-all duration-300 cursor-default group">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />
                <span>Deterministic Rules: <strong className="text-white group-hover:text-emerald-300 transition-colors">ZERO HALLUCINATION</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[10px] bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800/60">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>256-BIT TLS INDUSTRIAL ENCRYPTION</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#030509] py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center space-x-2 text-slate-400">
            <span>© {currentYear} <strong className="text-white font-semibold">ExportOps AI</strong>. All rights reserved.</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Chittagong Port Cut-Off Shield</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-emerald-400 transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('security')}
              className="hover:text-emerald-400 transition-colors"
            >
              Security Protocol
            </button>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden md:inline-block text-slate-400">
              Engineered with Industrial Precision in Dhaka & Chattogram 🇧🇩
            </span>
          </div>
        </div>
      </div>

      {/* 5. Legal Information Interactive Modals (With Smooth Backdrop Transition) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0b101a] border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-4 animate-scale-up">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Close Notice"
            >
              <X className="w-4 h-4" />
            </button>

            {activeModal === 'privacy' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">Data Privacy & Isolation Policy</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ExportOps AI enforces strict tenant data isolation. Commercial Invoices, Packing Lists, and Export Letters of Credit uploaded by factory documentation teams are processed in ephemeral memory and encrypted with AES-256 keys. No commercial trade data or pricing terms are ever shared across competing manufacturers or used to train public LLM weights.
                </p>
                <div className="p-3 bg-[#070b13] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <p className="text-emerald-400">✓ Zero third-party data broker transmission</p>
                  <p className="text-emerald-400">✓ BGMEA e-UD ledger queries encrypted via SHA-256</p>
                  <p className="text-emerald-400">✓ Compliant with Bangladesh Cyber Security Act 2023</p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">Terms of Service & UCP 600 Compliance</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  By accessing the ExportOps AI platform, factory subscribers and clearing agents agree to submit authentic trade documents for pre-shipment cross-checking. The 8-point deterministic rules engine validates documentary compliance against ICC Uniform Customs and Practice for Documentary Credits (UCP 600).
                </p>
                <div className="p-3 bg-[#070b13] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <p className="text-blue-400">✓ Pre-clearance Gate-In pass valid at Chittagong Sea Port</p>
                  <p className="text-blue-400">✓ Factory retains legal title to all export declarations</p>
                  <p className="text-blue-400">✓ UCP 600 documentary discrepancy shield guaranteed</p>
                </div>
              </div>
            )}

            {activeModal === 'security' && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">Customs & Security Infrastructure</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ExportOps AI is engineered to comply with Bangladesh Customs Act 2023 regulations and ASYCUDA World electronic data interchange protocols. System audits guarantee deterministic calculation integrity so no container is falsely certified as Customs-Ready.
                </p>
                <div className="p-3 bg-[#070b13] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <p className="text-indigo-400">✓ Cryptographic hash generated on every Gate-In Pass</p>
                  <p className="text-indigo-400">✓ Anti-tampering QR code validation for port inspectors</p>
                  <p className="text-indigo-400">✓ Sub-60 second deterministic audit execution</p>
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
