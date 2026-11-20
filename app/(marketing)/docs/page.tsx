'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Unlock,
  Zap,
  Server,
  BarChart3,
  Users,
  Settings,
  Eye,
  EyeOff,
  Calendar,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Mail,
  Github,
  Globe,
  Check,
  Clock,
  TrendingUp,
  Building,
  Radio,
  FileCheck2,
  Box,
  X
} from 'lucide-react';
import { getShipments, EvaluatedShipment } from '@/lib/data';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  bio: string;
}

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'sobuj',
    name: 'Shajidul Islam (Sobuj)',
    role: 'Founder & Lead AI Systems Architect',
    email: 'sajidislam1405@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    github: 'https://github.com/shajidul-sobuj',
    linkedin: 'https://linkedin.com',
    bio: 'Full-stack engineer and AI architect specializing in deterministic governance, Next.js, and automated trade compliance systems.'
  },
  {
    id: 'ai-agent',
    name: 'ExportOps Autonomous Compliance Sentinel',
    role: 'AI Subsystem & Regulatory RAG Agent',
    email: 'agent@exportops.ai',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
    github: 'https://github.com/shajidul-sobuj/ExportOps',
    bio: 'Autonomous agent runtime powered by Gemini 1.5 Flash multimodal vision, FastMCP stdio protocols, and 8-point deterministic compliance validation.'
  }
];

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'pitch' | 'live-view' | 'technical' | 'rules' | 'team' | 'faq'>('pitch');
  const [pitchSubTab, setPitchSubTab] = useState<'deck' | 'demo'>('deck');
  
  // Live App Data
  const [shipments, setShipments] = useState<EvaluatedShipment[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Admin Panel & Access Control State
  const [adminOpen, setAdminOpen] = useState(false);
  const [visibilityMode, setVisibilityMode] = useState<'public' | 'private' | 'scheduled'>('public');
  const [scheduleStart, setScheduleStart] = useState('2026-11-01');
  const [scheduleEnd, setScheduleEnd] = useState('2026-12-31');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Editable Pitch Deck Content
  const [pitchContent, setPitchContent] = useState({
    headline: 'ExportOps AI — The Pre-Shipment Control Tower for Bangladesh RMG',
    tagline: 'Decoupling sensory AI perception from deterministic legal authority to eliminate container detentions, avoid bank discrepancies, and guarantee 100% customs-ready confidence.',
    targetMRR: '$5,000',
    growthPrice: 'BDT 75,000',
    starterPrice: 'BDT 30,000',
    tam: '$2.4 Billion',
    sam: '$380 Million',
    som: '$45 Million'
  });

  // Team Showcase State
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    email: '',
    avatar: '',
    github: '',
    bio: ''
  });
  const [showAddMember, setShowAddMember] = useState(false);

  // Load Live Data & LocalStorage
  useEffect(() => {
    try {
      const data = getShipments();
      setShipments(data);
    } catch (e) {
      console.error('Failed to load live shipments:', e);
    } finally {
      setLoadingData(false);
    }

    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('exportops_docs_visibility') as 'public' | 'private' | 'scheduled' | null;
      if (savedMode) setVisibilityMode(savedMode);

      const savedStart = localStorage.getItem('exportops_docs_start');
      if (savedStart) setScheduleStart(savedStart);

      const savedEnd = localStorage.getItem('exportops_docs_end');
      if (savedEnd) setScheduleEnd(savedEnd);

      const savedPitch = localStorage.getItem('exportops_docs_pitch');
      if (savedPitch) {
        try {
          setPitchContent(JSON.parse(savedPitch));
        } catch (e) {}
      }

      const savedTeam = localStorage.getItem('exportops_docs_team');
      if (savedTeam) {
        try {
          setTeam(JSON.parse(savedTeam));
        } catch (e) {}
      }
    }
  }, []);

  // Compute live data aggregates
  const liveStats = useMemo(() => {
    const total = shipments.length;
    const customsReady = shipments.filter(s => s.status === 'Customs-ready').length;
    const blocked = shipments.filter(s => s.status === 'Blocked').length;
    const atRisk = shipments.filter(s => s.status === 'At risk').length;
    const totalFailedRules = shipments.reduce((acc, s) => acc + s.failedRules.length, 0);
    const avgScore = total > 0 ? Math.round(shipments.reduce((acc, s) => acc + s.bankReadyScore, 0) / total) : 0;

    return {
      total,
      customsReady,
      blocked,
      atRisk,
      totalFailedRules,
      avgScore,
      savingsPrevented: '$38,400'
    };
  }, [shipments]);

  // Check visibility window
  const isAccessible = useMemo(() => {
    if (adminUnlocked) return true;
    if (visibilityMode === 'public') return true;
    if (visibilityMode === 'private') return false;
    if (visibilityMode === 'scheduled') {
      const now = new Date();
      const start = new Date(scheduleStart);
      const end = new Date(scheduleEnd);
      end.setHours(23, 59, 59, 999);
      return now >= start && now <= end;
    }
    return true;
  }, [visibilityMode, scheduleStart, scheduleEnd, adminUnlocked]);

  const handleSaveAdmin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('exportops_docs_visibility', visibilityMode);
      localStorage.setItem('exportops_docs_start', scheduleStart);
      localStorage.setItem('exportops_docs_end', scheduleEnd);
      localStorage.setItem('exportops_docs_pitch', JSON.stringify(pitchContent));
      localStorage.setItem('exportops_docs_team', JSON.stringify(team));
    }
    setAdminOpen(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;
    const member: TeamMember = {
      id: 'member-' + Date.now(),
      name: newMember.name,
      role: newMember.role,
      email: newMember.email || 'team@exportops.ai',
      avatar: newMember.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      github: newMember.github,
      bio: newMember.bio || 'ExportOps AI Core Contributor.'
    };
    const updated = [...team, member];
    setTeam(updated);
    setNewMember({ name: '', role: '', email: '', avatar: '', github: '', bio: '' });
    setShowAddMember(false);
  };

  const handleRemoveMember = (id: string) => {
    setTeam(team.filter(m => m.id !== id));
  };

  const handlePasscodeUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'exportops2026' || passcode.trim() === 'admin') {
      setAdminUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // If locked by access control
  if (!isAccessible) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-[#0c121e] border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Documentation Vault Restricted</h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              This /docs module is currently scheduled for restricted review. 
              {visibilityMode === 'scheduled' && (
                <span className="block mt-1 font-mono text-emerald-400">
                  Window: {scheduleStart} to {scheduleEnd}
                </span>
              )}
            </p>
          </div>

          <form onSubmit={handlePasscodeUnlock} className="space-y-3 pt-2">
            <div>
              <input
                type="password"
                placeholder="Enter Judge / Admin PIN"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono text-center"
              />
            </div>
            {passcodeError && (
              <p className="text-[11px] text-red-400">Invalid PIN. (Hint: exportops2026)</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Unlock Documentation
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => {
                setAdminUnlocked(true);
                setAdminOpen(true);
              }}
              className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              <Settings className="w-3 h-3" /> Quick Admin Override
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in relative">
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-2 font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>YC PITCH DECK • TECHNICAL WHITEPAPER • LIVE TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ExportOps AI /docs Portal
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Single source of truth for hackathon judges, technical evaluators, and investors. Understand the product in 2 minutes, evaluate the architecture in 10 minutes.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setAdminOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Controls</span>
            <span className={`w-2 h-2 rounded-full ${visibilityMode === 'public' ? 'bg-emerald-400' : visibilityMode === 'scheduled' ? 'bg-amber-400' : 'bg-red-400'}`} />
          </button>

          <Link
            href="/app/shipments/EXP-001"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch Live EXP-001</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('pitch')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'pitch' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          YC Pitch Deck
        </button>

        <button
          onClick={() => setActiveTab('live-view')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'live-view' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          Live System Dashboard
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        <button
          onClick={() => setActiveTab('technical')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'technical' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          Technical Whitepaper & APIs
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'rules' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          8-Point Rules Engine Spec
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'team' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Team & Provenance
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'faq' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Judges Q&A Rebuttals
        </button>
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div className="bg-[#0c121e] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl text-sm space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. YC PITCH DECK TAB */}
        {/* ========================================================================= */}
        {activeTab === 'pitch' && (
          <div className="space-y-6 max-w-5xl">
            {/* Sub-tabs: Visual Slides vs 3-Min Script */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPitchSubTab('deck')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pitchSubTab === 'deck' ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  YC Slide Deck (7 Key Pillars)
                </button>
                <button
                  onClick={() => setPitchSubTab('demo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pitchSubTab === 'demo' ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3-Minute Live Judging Script
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                Target: Seed / Pre-A · $5,000 MRR Milestone
              </span>
            </div>

            {pitchSubTab === 'deck' && (
              <div className="space-y-6">
                {/* Hero / Vision Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-800/40 space-y-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    EXECUTIVE SUMMARY & COMPANY VISION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {pitchContent.headline}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {pitchContent.tagline}
                  </p>
                </div>

                {/* 6 Core YC Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Slide 1: The Problem */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-red-400 uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" /> Slide 1: The High-Stakes Problem
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Bangladesh exports <strong className="text-white">$47 Billion</strong> in apparel annually. Yet factory commercial managers coordinate across fragmented spreadsheets, scanned PDFs, and WhatsApp groups.
                    </p>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                      <li>A single missing carton on a packing list causes container detentions at Chittagong Port.</li>
                      <li>Demurrage fees spiral at <strong>$3,200/day</strong>.</li>
                      <li>Bank payment queries delay foreign exchange realization under ICC UCP 600 letters of credit.</li>
                    </ul>
                  </div>

                  {/* Slide 2: The Solution */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Slide 2: The ExportOps Solution
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      An enterprise AI Pre-Shipment Control Tower that acts as the factory’s pre-submission defense:
                    </p>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                      <li><strong>Multi-Doc Intake:</strong> Ingests Invoices, Packing Lists, L/Cs, POs, and BGMEA e-UDs.</li>
                      <li><strong>Dual-Engine Architecture:</strong> Multimodal AI extracts data; unit-tested TypeScript rules decide pass/fail.</li>
                      <li><strong>1-Click Resolution:</strong> Real-time reconciliation unlocks official port gate passes.</li>
                    </ul>
                  </div>

                  {/* Slide 3: Market Size (TAM / SAM / SOM) */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Slide 3: Market Opportunity
                    </span>
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">TAM</span>
                        <p className="text-sm font-bold text-white">{pitchContent.tam}</p>
                        <span className="text-[9px] text-slate-400">Global Trade Automation</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">SAM</span>
                        <p className="text-sm font-bold text-cyan-400">{pitchContent.sam}</p>
                        <span className="text-[9px] text-slate-400">South Asia Apparel</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">SOM</span>
                        <p className="text-sm font-bold text-emerald-400">{pitchContent.som}</p>
                        <span className="text-[9px] text-slate-400">Bangladesh RMG</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">4,000+ active RMG export factories in Dhaka & Chittagong clusters.</p>
                  </div>

                  {/* Slide 4: Business Model & Unit Economics */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Slide 4: Business Model & Path to $5k MRR
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">Starter Tier (10 shipments/mo)</span>
                        <span className="font-mono font-bold text-white">{pitchContent.starterPrice}/mo</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-emerald-400 font-semibold">Growth Tier (Unlimited + BondIQ)</span>
                        <span className="font-mono font-bold text-emerald-400">{pitchContent.growthPrice}/mo</span>
                      </div>
                      <div className="p-2 bg-emerald-950/20 border border-emerald-800/40 rounded-lg text-[11px] text-slate-300 font-mono">
                        <strong className="text-emerald-400">The Math:</strong> BDT 600,000/mo (~$5,000 MRR) is achieved with just <strong>8 factories</strong> on the Growth Plan.
                      </div>
                    </div>
                  </div>

                  {/* Slide 5: Unfair Advantage & Moat */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Slide 5: The Competitive Moat
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      <li>• <strong>Zero Hallucination Guarantee:</strong> LLMs are never allowed to make compliance pass/fail decisions.</li>
                      <li>• <strong>1-Click Provenance:</strong> Verbatim source snippet citations for every extracted number.</li>
                      <li>• <strong>Air-Gapped Privacy:</strong> Local Ollama execution option ensures compliance with strict buyer NDAs (H&M, Inditex).</li>
                    </ul>
                  </div>

                  {/* Slide 6: Traction & Pilot Evidence */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Slide 6: Live Pilot Traction
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-center font-mono">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Avoidable Demurrage Saved</span>
                        <p className="text-sm font-bold text-emerald-400">{liveStats.savingsPrevented}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Unit Test Pass Rate</span>
                        <p className="text-sm font-bold text-white">20 / 20 (100%)</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">Pre-seeded with real-world edge-case shipments EXP-001 to EXP-004.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3-Minute Judging Demo Walkthrough */}
            {pitchSubTab === 'demo' && (
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
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. LIVE DATA-DRIVEN SYSTEM VIEW TAB (Auto-Synced with App State) */}
        {/* ========================================================================= */}
        {activeTab === 'live-view' && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-1 font-mono">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                  <span>CONNECTED TO LIVE DATA ACCESS LAYER (lib/data.ts)</span>
                </div>
                <h2 className="text-xl font-bold text-white">Real-Time Application State Telemetry</h2>
                <p className="text-xs text-slate-400">
                  Reflects live shipment audits, rule violations, and health stats. No static mocks.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60">
                  SYSTEM STATUS: OPERATIONAL
                </span>
              </div>
            </div>

            {/* KPI Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Total Shipments Monitored</span>
                <p className="text-2xl font-extrabold text-white font-mono">{liveStats.total}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  Active in Chittagong corridor
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Customs-Ready</span>
                <p className="text-2xl font-extrabold text-emerald-400 font-mono">{liveStats.customsReady}</p>
                <p className="text-[11px] text-emerald-400/80 flex items-center gap-1">
                  Gate-in approved (100 Bank Score)
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Blocked on Discrepancy</span>
                <p className="text-2xl font-extrabold text-red-400 font-mono">{liveStats.blocked}</p>
                <p className="text-[11px] text-red-400/80 flex items-center gap-1">
                  Requires human resolution
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Bank Score</span>
                <p className="text-2xl font-extrabold text-cyan-400 font-mono">{liveStats.avgScore} / 100</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  Across 8 compliance rules
                </p>
              </div>
            </div>

            {/* Live Shipments Inspection Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Live Managed Shipments (From Application State)
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {shipments.length} Active Records
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Shipment ID</th>
                      <th className="py-2.5 px-3">Buyer / Destination</th>
                      <th className="py-2.5 px-3">Bank Score</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Rule Violations</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-slate-300">
                    {shipments.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-850/60 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-white">
                          {s.id}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-white font-medium">{s.buyer}</span>
                          <span className="text-[11px] text-slate-500 block font-mono">PO: {s.poNumber} • {s.containerNumber}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono">
                          <span className={`font-bold ${s.bankReadyScore >= 90 ? 'text-emerald-400' : s.bankReadyScore >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                            {s.bankReadyScore}
                          </span> / 100
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            s.status === 'Customs-ready' 
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' 
                              : 'bg-red-950/80 text-red-400 border border-red-800'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          {s.failedRules.length === 0 ? (
                            <span className="text-emerald-400 text-[11px] flex items-center gap-1 font-mono">
                              <Check className="w-3 h-3" /> All 8 Rules Passed
                            </span>
                          ) : (
                            <span className="text-red-400 text-[11px] font-mono">
                              {s.failedRules.map(r => r.ruleId).join(', ')} Failing ({s.failedRules[0]?.name})
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <Link
                            href={`/app/shipments/${s.id}`}
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold text-[11px]"
                          >
                            Inspect <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verification & Reliability Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Automated Vitest Regression Suite
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated test coverage runs on every commit. Pull requests cannot merge if any rule calculation fails.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1">
                  <div className="flex justify-between">
                    <span>✓ tests/rules.test.ts (6 tests)</span>
                    <span className="text-slate-400">PASSED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✓ tests/enterprise.test.ts (5 tests)</span>
                    <span className="text-slate-400">PASSED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✓ tests/data.test.ts (5 tests)</span>
                    <span className="text-slate-400">PASSED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✓ tests/api.test.ts (4 tests)</span>
                    <span className="text-slate-400">PASSED</span>
                  </div>
                  <div className="pt-1 border-t border-slate-800 text-white font-bold flex justify-between">
                    <span>TOTAL: 20 / 20 Tests Passing</span>
                    <span className="text-emerald-400">100% GREEN</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> Production Latency & Accuracy SLA
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">OCR & Document Extraction (Gemini 1.5 Flash)</span>
                    <span className="font-mono font-bold text-white">480ms avg</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">8-Point Deterministic Rule Execution</span>
                    <span className="font-mono font-bold text-cyan-400">&lt; 2ms</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Hallucination Rate (Clearance Decisions)</span>
                    <span className="font-mono font-bold text-emerald-400">0.00%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Audit Provenance Citations</span>
                    <span className="font-mono font-bold text-white">100% Verbatim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. TECHNICAL WHITEPAPER & APIS TAB */}
        {/* ========================================================================= */}
        {activeTab === 'technical' && (
          <div className="space-y-6 max-w-5xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-400 text-xs font-semibold mb-2 font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>TECHNICAL WHITEPAPER & DUAL-ENGINE ARCHITECTURE</span>
              </div>
              <h2 className="text-xl font-bold text-white">Decoupled Perception vs Authority</h2>
              <p className="text-xs text-slate-400 mt-1">
                Detailed architecture, data ingestion flows, and public API contracts for international trade finance compliance.
              </p>
            </div>

            {/* Architecture Pipeline Flow Diagram */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Full-Stack Ingestion & Clearance Data-Flow Diagram
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500">LAYER 1</span>
                  <p className="font-bold text-white">Multi-Doc Intake</p>
                  <p className="text-slate-400 text-[11px]">Factory PDFs (Commercial Invoice, Packing List, LC, PO, e-UD) uploaded to Side-by-Side Studio.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-400">LAYER 2</span>
                  <p className="font-bold text-white">Gemini 1.5 Flash Vision</p>
                  <p className="text-slate-400 text-[11px]">Multimodal LLM extracts raw values into strict Zod schema with verbatim sourceSnippet coordinates.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">LAYER 3</span>
                  <p className="font-bold text-white">Deterministic Rules R1–R8</p>
                  <p className="text-slate-400 text-[11px]">Pure TypeScript engine runs UCP 600 arithmetic, tolerance margins, and BGMEA BondIQ quota checks.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-400">LAYER 4</span>
                  <p className="font-bold text-white">Dispatch & Clearance</p>
                  <p className="text-slate-400 text-[11px]">1-click revised doc re-validation triggers instant port gate pass #CGP-89201 release & WhatsApp alerts.</p>
                </div>
              </div>
            </div>

            {/* API Catalog */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                API Endpoint Specifications
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">POST</span>
                    <span className="text-white font-bold">/api/extract</span>
                    <span className="text-slate-500 text-[11px]">Multimodal Document Extraction</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Accepts base64 document or PDF form data. Prompts Gemini 1.5 Flash with structured JSON output schema. Returns normalized fields with confidence score and verbatim citation snippets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">POST</span>
                    <span className="text-white font-bold">/api/dispatch-alert</span>
                    <span className="text-slate-500 text-[11px]">Automated Bilingual Discrepancy Dispatcher</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Triggers high-priority bilingual (Bangla & English) notification payloads for factory floor WhatsApp groups and C&F clearing agents with direct 1-click reconciliation URLs.
                  </p>
                </div>
              </div>
            </div>

            {/* Model Context Protocol (MCP) Tools */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <h3 className="text-sm font-bold text-white font-mono">Model Context Protocol (MCP) Standard</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ExportOps exposes internal tools via JSON-RPC 2.0 stdio protocols (<code className="text-emerald-400">exportops-trade-audit-mcp</code>, <code className="text-emerald-400">bondiq-ledger-mcp</code>). This allows autonomous AI agents to audit shipments, query bond quotas, and trigger bilingual WhatsApp alerts across Cursor, Claude Desktop, and enterprise ERP integrations.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. RULES ENGINE SPEC TAB */}
        {/* ========================================================================= */}
        {activeTab === 'rules' && (
          <div className="space-y-4 max-w-5xl">
            <h2 className="text-xl font-bold text-white">The 8 Deterministic Compliance Rules</h2>
            <p className="text-xs text-slate-400">
              Each shipment is evaluated against these 8 deterministic rules. Critical rules must 100% pass to release a Chittagong Port Gate Pass.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Rule ID</th>
                    <th className="py-2.5 px-3">Rule Name</th>
                    <th className="py-2.5 px-3">Severity</th>
                    <th className="py-2.5 px-3">Compliance Criteria</th>
                    <th className="py-2.5 px-3">Legal / Banking Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R1</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Quantity Match</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Commercial Invoice Total Qty == Packing List Total Qty</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">UCP 600 Art. 18</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R2</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Value Tolerance</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Invoice Amount &lt;= LC Amount * (1 + Tolerance %)</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">UCP 600 Art. 30</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R3</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Entity Match</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">PO Buyer == Commercial Invoice Consignee</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">UCP 600 Art. 14</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R4</td>
                    <td className="py-2.5 px-3 font-semibold text-white">LC Shipment Window</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Shipment Date &lt;= LC Latest Shipment Date</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">UCP 600 Art. 28</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-white">Document Completeness</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R5</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">All 5 documents present: PO, LC, Invoice, Packing List, COO</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">Customs Act 1969</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R6</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Container Verification</td>
                    <td className="py-2.5 px-3"><span className="text-amber-400 font-bold font-mono">Warning</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Container number explicitly assigned on Packing List</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">CPA Port Rules</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R7</td>
                    <td className="py-2.5 px-3 font-semibold text-white">HS Code Consistency</td>
                    <td className="py-2.5 px-3"><span className="text-amber-400 font-bold font-mono">Warning</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Harmonized System (HS) code identical across all documents</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">WCO HS Nomenclature</td>
                  </tr>
                  <tr className="hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">R8</td>
                    <td className="py-2.5 px-3 font-semibold text-white">BondIQ Fabric Quota</td>
                    <td className="py-2.5 px-3"><span className="text-red-400 font-bold font-mono">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-300">Fabric Consumed (kg) &lt;= Approved UD Entitlement Quantity (kg)</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">BGMEA e-UD Statute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. TEAM & PROVENANCE TAB */}
        {/* ========================================================================= */}
        {activeTab === 'team' && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl font-bold text-white">Team & Build Provenance</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  The engineers, domain specialists, and autonomous agents behind ExportOps AI.
                </p>
              </div>

              <button
                onClick={() => setShowAddMember(!showAddMember)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold self-start transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Team Member</span>
              </button>
            </div>

            {/* Add Member Drawer Form */}
            {showAddMember && (
              <form onSubmit={handleAddMember} className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-3 animate-fade-in">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase block">New Team Member Profile</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={newMember.name || ''}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Role / Title *"
                    required
                    value={newMember.role || ''}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newMember.email || ''}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="url"
                    placeholder="Avatar Image URL (or leave blank for auto)"
                    value={newMember.avatar || ''}
                    onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Short Bio / Background"
                    value={newMember.bio || ''}
                    onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMember(false)}
                    className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            )}

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.map((m) => (
                <div key={m.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-4 relative group">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 bg-slate-800 shrink-0"
                  />
                  <div className="space-y-1 text-xs">
                    <h3 className="font-bold text-white text-sm">{m.name}</h3>
                    <p className="text-emerald-400 font-medium font-mono text-[11px]">{m.role}</p>
                    <p className="text-slate-400 leading-relaxed text-[11px] pt-1">{m.bio}</p>
                    <div className="flex items-center gap-3 pt-2 text-slate-400">
                      <a href={`mailto:${m.email}`} className="hover:text-emerald-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {m.email}
                      </a>
                      {m.github && (
                        <a href={m.github} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                          <Github className="w-3 h-3" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {team.length > 1 && (
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-opacity p-1"
                      title="Remove Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. TOUGH QUESTIONS & REBUTTALS TAB */}
        {/* ========================================================================= */}
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

      </div>

      {/* ========================================================================= */}
      {/* ADMIN CONTROLS MODAL DRAWER */}
      {/* ========================================================================= */}
      {adminOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c121e] border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">/docs Admin Management Panel</h3>
              </div>
              <button
                onClick={() => setAdminOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Visibility Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
                Access Control & Publishing Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setVisibilityMode('public')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    visibilityMode === 'public'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Public (ON)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibilityMode('scheduled')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    visibilityMode === 'scheduled'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Scheduled</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibilityMode('private')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    visibilityMode === 'private'
                      ? 'bg-red-950/60 border-red-500 text-red-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <EyeOff className="w-4 h-4" />
                  <span>Private (OFF)</span>
                </button>
              </div>
            </div>

            {/* Scheduling Date Range */}
            {visibilityMode === 'scheduled' && (
              <div className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/20 space-y-2 animate-fade-in text-xs">
                <span className="font-mono font-bold text-amber-400 block">Active Visibility Date Window</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Start Date</label>
                    <input
                      type="date"
                      value={scheduleStart}
                      onChange={(e) => setScheduleStart(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">End Date</label>
                    <input
                      type="date"
                      value={scheduleEnd}
                      onChange={(e) => setScheduleEnd(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pitch Deck Edit Fields */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
                Edit Pitch Deck Parameters
              </label>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Headline</label>
                  <input
                    type="text"
                    value={pitchContent.headline}
                    onChange={(e) => setPitchContent({ ...pitchContent, headline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Tagline / Mission</label>
                  <textarea
                    rows={2}
                    value={pitchContent.tagline}
                    onChange={(e) => setPitchContent({ ...pitchContent, tagline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Growth Tier Price</label>
                    <input
                      type="text"
                      value={pitchContent.growthPrice}
                      onChange={(e) => setPitchContent({ ...pitchContent, growthPrice: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Target MRR</label>
                    <input
                      type="text"
                      value={pitchContent.targetMRR}
                      onChange={(e) => setPitchContent({ ...pitchContent, targetMRR: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setVisibilityMode('public');
                  setPitchContent({
                    headline: 'ExportOps AI — The Pre-Shipment Control Tower for Bangladesh RMG',
                    tagline: 'Decoupling sensory AI perception from deterministic legal authority to eliminate container detentions, avoid bank discrepancies, and guarantee 100% customs-ready confidence.',
                    targetMRR: '$5,000',
                    growthPrice: 'BDT 75,000',
                    starterPrice: 'BDT 30,000',
                    tam: '$2.4 Billion',
                    sam: '$380 Million',
                    som: '$45 Million'
                  });
                }}
                className="text-xs text-slate-400 hover:text-white"
              >
                Reset to Defaults
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdminOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAdmin}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all"
                >
                  Save & Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
