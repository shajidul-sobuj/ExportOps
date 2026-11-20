'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Download, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  Cpu,
  FileCheck2,
  QrCode
} from 'lucide-react';

interface Scene {
  id: number;
  name: string;
  start: number; // seconds
  end: number;   // seconds
  duration: number;
  wordCount: number;
  purpose: string;
  voiceover: string;
  onScreenText: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    name: 'The Stuck Shipment',
    start: 0,
    end: 12,
    duration: 12,
    wordCount: 28,
    purpose: 'Hook with the character (Rafi), factory pride to sudden hold',
    voiceover: 'Meet Rafi. His factory finished twelve thousand garments right on time. But at the port, his shipment is stuck. Not because of the product. Because of paperwork.',
    onScreenText: '12,000 garments. Ready on time. Stuck on paperwork.'
  },
  {
    id: 2,
    name: 'Everything That Goes Wrong',
    start: 12,
    end: 30,
    duration: 18,
    wordCount: 38,
    purpose: 'Show the 5 exact trade paperwork friction points we solve',
    voiceover: 'The invoice says twelve thousand pieces. The packing list says eleven thousand four hundred. The LC date has passed. A certificate is missing. And the bonded fabric doesn\'t match the UD. Each mismatch means delay, bank queries, and late payment.',
    onScreenText: 'Quantity Mismatch • LC Cut-off Passed • Missing COO • UD Quota Breach • $8,500 Demurrage'
  },
  {
    id: 3,
    name: 'Why Today\'s Way Fails',
    start: 30,
    end: 42,
    duration: 12,
    wordCount: 27,
    purpose: 'Set up the critical pre-filing validation gap',
    voiceover: 'Today, teams check this by hand, in spreadsheets and chat groups. Government systems verify after filing, but nobody fixes the data before it goes in.',
    onScreenText: 'Spreadsheets. Chat groups. Manual checks. Verified too late.'
  },
  {
    id: 4,
    name: 'Enter ExportOps AI',
    start: 42,
    end: 50,
    duration: 8,
    wordCount: 14,
    purpose: 'Turning point: teal beam sweeps, logo reveal, hope restored',
    voiceover: 'Meet ExportOps AI. The control tower that makes every shipment ready before it moves.',
    onScreenText: 'ExportOps AI. Ship ready.'
  },
  {
    id: 5,
    name: 'Rafi\'s Problem, Solved',
    start: 50,
    end: 85,
    duration: 35,
    wordCount: 62,
    purpose: 'Live prototype demo: Upload, 8-point rules, plain explanation, 1-click fix',
    voiceover: 'Rafi uploads his documents. ExportOps reads them in seconds, and shows where each value came from. Eight rules check every document against the others, and against the bond ledger. Three problems appear, each explained in plain language. Rafi fixes them and re-runs. Blocked turns to customs-ready, and his container sails.',
    onScreenText: 'Read. Check. Explain. Fix. ➔ Blocked to Customs-Ready.'
  },
  {
    id: 6,
    name: 'Why This & Not The Others',
    start: 85,
    end: 105,
    duration: 20,
    wordCount: 46,
    purpose: 'Clear differentiation vs Customs, Defect AI, and ERP spreadsheets',
    voiceover: 'Why not the other tools? Customs systems file and verify, after the data is final. Defect-inspection AI checks fabric quality, not documents. ERPs and spreadsheets have no rules and no audit trail. ExportOps works before filing, and joins documents, bond, and bank readiness in one view.',
    onScreenText: 'Pre-Filing Intelligence. Documents + Bond + Bank in One View.'
  },
  {
    id: 7,
    name: 'How It Works',
    start: 105,
    end: 125,
    duration: 20,
    wordCount: 34,
    purpose: 'Shipment flow: AI reads, Rules decide, Human approves, Audit logged',
    voiceover: 'How it works. AI reads and explains. Fixed rules decide pass or fail. A human approves, and every step is logged. So AI never approves a shipment on its own.',
    onScreenText: 'AI reads. Rules decide. Humans approve. Everything is logged.'
  },
  {
    id: 8,
    name: 'What Else It Does',
    start: 125,
    end: 140,
    duration: 15,
    wordCount: 25,
    purpose: 'Beyond documents: BondIQ, Timeline, Bank Score, Delay causes',
    voiceover: 'Beyond documents: bond and UD reconciliation, a live shipment timeline, trade-finance readiness, and a dashboard of the top causes of delay and avoidable cost.',
    onScreenText: 'BondIQ Ledger • Shipment Timeline • Bank-Ready Score • Delay Analytics'
  },
  {
    id: 9,
    name: 'Business & Scale',
    start: 140,
    end: 155,
    duration: 15,
    wordCount: 28,
    purpose: 'SaaS subscription, paid pilots, cross-industry RMG expansion',
    voiceover: 'Factories pay a monthly subscription, starting with a paid pilot. One prevented delay pays for it. Garments first, then leather, jute, and pharma. Built with human review and audit logs.',
    onScreenText: 'Subscription. Paid pilots. Garments first, then global trade.'
  },
  {
    id: 10,
    name: 'Close & Payoff',
    start: 155,
    end: 170,
    duration: 15,
    wordCount: 16,
    purpose: 'Rafi celebrating, container sails, Extokened & Congress credits',
    voiceover: 'ExportOps AI. Ship ready. Ship on time. Team Extokened, for the International AI Builders Congress.',
    onScreenText: 'ExportOps AI. Ship ready. Ship on time. Team Extokened.'
  }
];

export default function ExplainerVideoPage() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Autoplay animated video
  const [demoFixed, setDemoFixed] = useState<boolean>(false);
  const playerRef = useRef<HTMLDivElement>(null);

  // Playback timer loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 170) {
            setIsPlaying(false);
            return 170;
          }
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Synchronize dynamic demo fix during Scene 5
  useEffect(() => {
    if (currentTime >= 68 && currentTime < 85) {
      setDemoFixed(true);
    } else if (currentTime < 68) {
      setDemoFixed(false);
    }
  }, [currentTime]);

  // Current active scene
  const activeSceneIndex = SCENES.findIndex(
    (s) => currentTime >= s.start && currentTime < s.end
  );
  const currentScene = activeSceneIndex !== -1 ? SCENES[activeSceneIndex] : SCENES[SCENES.length - 1];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(Math.min(170, Math.max(0, seconds)));
  };

  const togglePlay = () => {
    if (currentTime >= 170) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  // Scene-relative time for animated micro-cues
  const sceneElapsed = currentTime - currentScene.start;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Downloads */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              170s LOCKED RUNTIME (02:50.00)
            </span>
            <span className="text-slate-400 text-xs font-mono">•</span>
            <span className="text-slate-400 text-xs font-mono">Team Extokened // Congress Submission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            ExportOps AI — Story-Led Animated Film
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Starring Rafi: a strong stickman whose shipment gets stuck on paperwork, rescued by ExportOps.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/video-assets/exportops_explainer_170s.mp4"
            download="exportops_explainer_170s.mp4"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 font-display"
          >
            <Download className="w-4 h-4" />
            <span>Download 1080p MP4 (170s)</span>
          </a>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all"
          >
            <span>Full Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── PURE 16:9 CINEMATIC ANIMATED VIDEO CANVAS (NO WATERMARK, NO SCRIPT OVERLAY) ── */}
      <div 
        ref={playerRef} 
        className="relative aspect-video w-full rounded-2xl bg-[#f8fafc] border border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex items-center justify-center text-slate-900 select-none"
      >
        
        {/* SCENE 1 (0:00 - 0:12) · The Stuck Shipment */}
        {currentScene.id === 1 && (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Animated Dock Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-slate-50 to-slate-200" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-slate-300 border-t-4 border-slate-400" />
            
            {/* Moving Crane & Cargo in background */}
            <div className="absolute top-10 right-20 opacity-30 text-slate-500 font-mono text-xs">
              PORT BERTH 4 • CHITTAGONG
            </div>

            {/* Container Truck Driving into dock */}
            <div className="absolute bottom-28 left-12 transition-all duration-1000 transform translate-x-0">
              <div className="w-64 h-32 rounded-lg bg-teal-800 border-4 border-slate-900 flex items-center justify-center text-white font-mono font-black text-sm shadow-xl">
                MSKU-781920-4 // 40FT HC
              </div>
              <div className="w-72 h-8 bg-slate-800 -mt-1 rounded-sm" />
              <div className="flex gap-16 ml-6 -mt-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-400 animate-spin [animation-duration:8s]" />
                <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-400 animate-spin [animation-duration:8s]" />
              </div>
            </div>

            {/* Rafi: Proud flexing to Shocked */}
            <div className="relative z-10 flex flex-col items-center">
              {sceneElapsed < 7 ? (
                /* Rafi Flexing Proudly */
                <div className="flex flex-col items-center animate-bicep-flex">
                  <img 
                    src="/video-assets/character/rafi_proud_flexing.svg" 
                    alt="Rafi Flexing" 
                    className="w-80 h-80 object-contain" 
                  />
                  <div className="mt-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-900 text-slate-900 font-black text-sm shadow-md animate-bounce">
                    12,000 Garments Ready on Time!
                  </div>
                </div>
              ) : (
                /* Rafi Shocked & Stamp Slams Down! */
                <div className="flex flex-col items-center animate-screen-shake">
                  <div className="relative">
                    <img 
                      src="/video-assets/character/rafi_shocked_stuck.svg" 
                      alt="Rafi Shocked" 
                      className="w-80 h-80 object-contain" 
                    />
                    {/* Animated Sweat Drops */}
                    <div className="absolute top-12 right-24 w-4 h-6 rounded-full bg-cyan-400 border border-slate-900 animate-sweat-drip" />
                    
                    {/* Phone Buzz Rings */}
                    <div className="absolute top-28 left-16 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded border-2 border-slate-900 animate-ping">
                      📱 BUZZ: PORT QUERY!
                    </div>

                    {/* Giant Slamming Red Stamp */}
                    <div className="absolute inset-0 flex items-center justify-center animate-stamp-slam pointer-events-none">
                      <div className="px-10 py-5 rounded-2xl bg-red-600/95 border-8 border-red-900 text-white font-black text-5xl tracking-widest uppercase shadow-2xl rotate-[-12deg]">
                        SHIPMENT HELD
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCENE 2 (0:12 - 0:30) · Everything That Goes Wrong */}
        {currentScene.id === 2 && (
          <div className="relative w-full h-full flex items-center justify-center p-10 overflow-hidden bg-gradient-to-br from-rose-50 via-slate-50 to-amber-50">
            {/* Rafi in center sweating */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-56 h-56 mx-auto relative">
                <img 
                  src="/video-assets/character/rafi_shocked_stuck.svg" 
                  alt="Rafi Troubled" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute -top-2 right-12 w-3 h-5 bg-cyan-400 rounded-full animate-sweat-drip" />
              </div>

              {/* 5 Animated Flying Discrepancy Cards */}
              <div className="grid grid-cols-5 gap-4 max-w-5xl mx-auto">
                {/* 1. Qty */}
                <div className="p-4 rounded-2xl bg-white border-4 border-rose-500 shadow-xl animate-paper-float-1">
                  <span className="text-[11px] font-mono font-black text-rose-600 block">01. QUANTITY</span>
                  <p className="text-xl font-black text-slate-900 mt-1">12k ≠ 11.4k</p>
                  <p className="text-xs text-rose-600 font-bold mt-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">-600 pcs Deficit</p>
                </div>

                {/* 2. LC */}
                <div className="p-4 rounded-2xl bg-white border-4 border-rose-500 shadow-xl animate-paper-float-2">
                  <span className="text-[11px] font-mono font-black text-rose-600 block">02. LC CUTOFF</span>
                  <p className="text-xl font-black text-slate-900 mt-1">Expired</p>
                  <p className="text-xs text-rose-600 font-bold mt-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Window Missed</p>
                </div>

                {/* 3. COO */}
                <div className="p-4 rounded-2xl bg-white border-4 border-rose-500 shadow-xl animate-paper-float-1">
                  <span className="text-[11px] font-mono font-black text-rose-600 block">03. ORIGIN COO</span>
                  <p className="text-xl font-black text-slate-900 mt-1">Missing</p>
                  <p className="text-xs text-rose-600 font-bold mt-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Empty Slot</p>
                </div>

                {/* 4. UD Bond */}
                <div className="p-4 rounded-2xl bg-white border-4 border-amber-500 shadow-xl animate-paper-float-2">
                  <span className="text-[11px] font-mono font-black text-amber-600 block">04. BOND QUOTA</span>
                  <p className="text-xl font-black text-slate-900 mt-1">+350 kg</p>
                  <p className="text-xs text-amber-600 font-bold mt-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">UD Overdraw</p>
                </div>

                {/* 5. Cost */}
                <div className="p-4 rounded-2xl bg-rose-900 text-white border-4 border-rose-700 shadow-xl animate-bounce [animation-duration:3s]">
                  <span className="text-[11px] font-mono font-black text-rose-300 block">05. FINANCIAL</span>
                  <p className="text-2xl font-black text-white mt-1">$8,500+</p>
                  <p className="text-xs text-rose-200 font-bold mt-1">Port Demurrage</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 3 (0:30 - 0:42) · Why Today's Way Fails */}
        {currentScene.id === 3 && (
          <div className="relative w-full h-full flex items-center justify-center p-12 overflow-hidden bg-slate-100">
            <div className="grid grid-cols-2 gap-10 w-full max-w-5xl items-center">
              {/* Manual Chaos */}
              <div className="p-8 rounded-3xl bg-white border-4 border-slate-900 shadow-2xl relative space-y-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-mono font-bold text-xs border border-amber-300">
                    MANUAL SPREADSHEETS
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs border border-emerald-300 animate-pulse">
                    WHATSAPP CHATS
                  </span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 font-display">Tired Eyes & Midnight Excel</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Teams scramble across 5 separate PDF windows and paper carton manifests. Human error is inevitable.
                </p>
                <div className="flex items-center gap-2 text-rose-600 font-bold font-mono text-sm">
                  <span>✕ Zero Automated Rules</span>
                  <span>•</span>
                  <span>✕ No Audit Trail</span>
                </div>
              </div>

              {/* Customs Post-Filing Gap */}
              <div className="p-8 rounded-3xl bg-white border-4 border-rose-500 shadow-2xl space-y-4">
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-mono font-bold text-xs border border-rose-300">
                  GOVERNMENT POST-FILING GAP
                </span>
                <h3 className="text-3xl font-black text-slate-900 font-display">Checks Only After Filing</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  ASYCUDA World and customs verify after submission. Once submitted, an error means 5 days of port impoundment.
                </p>
                <div className="p-3 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-700 font-black text-sm flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>NOBODY FIXES DATA BEFORE IT ENTERS THE PORT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4 (0:42 - 0:50) · Enter ExportOps AI */}
        {currentScene.id === 4 && (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
            {/* Futuristic Teal Laser Sweep */}
            <div className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent blur-md animate-laser-sweep pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.25)_0,transparent_70%)]" />

            <div className="relative z-10 text-center space-y-6">
              {/* Glowing Shield Logo */}
              <div className="w-28 h-28 rounded-3xl bg-teal-500 text-slate-950 flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(20,184,166,0.6)] animate-pulse-ring">
                <ShieldCheck className="w-16 h-16" />
              </div>

              <div className="space-y-2">
                <h1 className="text-6xl font-black tracking-tight font-display">
                  ExportOps <span className="text-teal-400">AI</span>
                </h1>
                <p className="text-2xl font-bold font-mono text-teal-300 tracking-wide">
                  The Pre-Shipment Control Tower
                </p>
                <p className="text-slate-400 text-sm max-w-lg mx-auto">
                  Makes every garment cargo customs-ready before the trailer moves.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 5 (0:50 - 1:25) · Rafi's Problem, Solved (Live Animated Demo) */}
        {currentScene.id === 5 && (
          <div className="relative w-full h-full flex items-center justify-center p-8 bg-slate-950 text-white overflow-hidden">
            <div className="grid grid-cols-12 gap-6 w-full max-w-6xl items-center">
              
              {/* Rafi Reaction */}
              <div className="col-span-4 flex flex-col items-center">
                <img 
                  src={demoFixed ? "/video-assets/character/rafi_celebrating_fistpump.svg" : "/video-assets/character/rafi_proud_flexing.svg"} 
                  alt="Rafi" 
                  className={`w-64 h-64 object-contain transition-all duration-500 ${demoFixed ? 'animate-victory-jump' : ''}`}
                />
                <span className={`mt-2 font-mono font-bold text-xs px-3 py-1 rounded-full border ${
                  demoFixed ? 'bg-emerald-950 text-emerald-400 border-emerald-500' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {demoFixed ? '✓ FIST PUMP: CLEARED!' : 'AUDITING SHIPMENT EXP-001'}
                </span>
              </div>

              {/* Live Working Terminal Mockup */}
              <div className="col-span-8 p-6 rounded-3xl bg-[#070b14] border-2 border-white/15 shadow-2xl space-y-4 font-mono relative">
                
                {/* Laser Scanning Line */}
                {!demoFixed && (
                  <div className="absolute inset-x-0 h-1 bg-teal-400 shadow-[0_0_15px_#2dd4bf] animate-scan-line pointer-events-none" />
                )}

                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="font-bold text-slate-300 ml-2">INSPECTION-STUDIO // EXP-001</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                    demoFixed ? 'bg-emerald-950 text-emerald-400 border-emerald-500' : 'bg-rose-950 text-rose-400 border-rose-500 animate-pulse'
                  }`}>
                    {demoFixed ? 'GATE PASS ISSUED' : '3 DISCREPANCIES FOUND'}
                  </span>
                </div>

                {/* Diff Comparison */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">COMMERCIAL INVOICE:</span>
                    <strong className="text-base text-white">12,000 PCS ($72,000)</strong>
                  </div>
                  <div className={`p-3 rounded-xl border transition-all duration-700 ${
                    demoFixed ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-rose-950/80 border-rose-500 text-rose-300'
                  }`}>
                    <span className="text-[10px] text-slate-400 block">PACKING LIST SCAN:</span>
                    <strong className="text-base">{demoFixed ? '12,000 PCS (Matched 100%)' : '11,400 PCS (-600 deficit)'}</strong>
                  </div>
                </div>

                {/* Deterministic Rule Status */}
                <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all duration-700 ${
                  demoFixed ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300' : 'bg-rose-950/50 border-rose-500 text-rose-300'
                }`}>
                  <div className="flex items-center gap-2">
                    {demoFixed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />}
                    <span>{demoFixed ? 'Zero Hallucinations • All 8 Rules Passed' : 'Rule R1: Carton #42 Missing from Packing Scan'}</span>
                  </div>
                  <span className="font-bold text-sm">{demoFixed ? 'SCORE: 100/100' : 'SCORE: 75/100'}</span>
                </div>

                {/* Gate Pass Unlocked */}
                {demoFixed && (
                  <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/50 text-teal-300 text-xs flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2 font-mono">
                      <QrCode className="w-5 h-5 text-teal-400" />
                      <span>CHITTAGONG GATE PASS #CGP-89201 APPROVED</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-teal-500 text-slate-950 font-black text-[10px]">
                      READY TO SHIP
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCENE 6 (1:25 - 1:45) · Why This & Not The Others */}
        {currentScene.id === 6 && (
          <div className="relative w-full h-full flex items-center justify-center p-12 bg-slate-900 text-white overflow-hidden">
            <div className="grid grid-cols-4 gap-4 w-full max-w-6xl text-left">
              <div className="p-6 rounded-2xl bg-slate-800/80 border-2 border-slate-700 space-y-3 opacity-70">
                <span className="text-xs font-mono font-bold text-rose-400 block">✕ CUSTOMS (ASYCUDA)</span>
                <h4 className="text-xl font-bold text-white">Post-Filing Only</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Checks after submission. Does not fix data before penalties occur.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border-2 border-slate-700 space-y-3 opacity-70">
                <span className="text-xs font-mono font-bold text-amber-400 block">⚠ DEFECT AI</span>
                <h4 className="text-xl font-bold text-white">Fabric Flaws Only</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inspects physical sewing defects on line; blind to export trade documents.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border-2 border-slate-700 space-y-3 opacity-70">
                <span className="text-xs font-mono font-bold text-rose-400 block">✕ ERP & EXCEL</span>
                <h4 className="text-xl font-bold text-white">No Rules Engine</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Static records. No cross-document validation and zero audit trail.
                </p>
              </div>

              {/* Elevated ExportOps Card */}
              <div className="p-6 rounded-2xl bg-teal-950 border-4 border-teal-400 shadow-[0_0_40px_rgba(20,184,166,0.3)] space-y-3 transform scale-105 z-10">
                <span className="text-xs font-mono font-black text-teal-300 block">✓ EXPORTOPS AI</span>
                <h4 className="text-xl font-black text-white">Pre-Filing Shield</h4>
                <p className="text-xs text-teal-100 leading-relaxed font-medium">
                  Validates before moving. Joins Documents + Bond + Bank readiness in one unified control tower.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 7 (1:45 - 2:05) · How It Works */}
        {currentScene.id === 7 && (
          <div className="relative w-full h-full flex items-center justify-center p-12 bg-slate-950 text-white overflow-hidden">
            <div className="w-full max-w-5xl space-y-10 text-center">
              
              {/* Supply Chain Circuit Flow with Moving Energy Stream */}
              <div className="relative p-5 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden">
                <div className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent animate-laser-sweep pointer-events-none" />
                <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-300 relative z-10">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10">01. PO & LC</span>
                  <span className="text-teal-400">➔</span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10">02. Production & Bond</span>
                  <span className="text-teal-400">➔</span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10">03. Invoice & Packing</span>
                  <span className="text-teal-400">➔</span>
                  <span className="px-3 py-1.5 rounded-lg bg-teal-950 text-teal-300 border border-teal-500">04. Customs Clearance</span>
                </div>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#070b14] border-2 border-teal-500/40 space-y-2 hover-card-lift">
                  <Cpu className="w-10 h-10 text-teal-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white font-display">1. AI Reads</h4>
                  <p className="text-xs text-slate-400">Extracts unstructured PDFs with confidence and source citations.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#070b14] border-2 border-emerald-500/40 space-y-2 hover-card-lift">
                  <FileCheck2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white font-display">2. Rules Decide</h4>
                  <p className="text-xs text-slate-400">100% deterministic TypeScript logic (R1 to R8). Zero hallucination.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#070b14] border-2 border-cyan-500/40 space-y-2 hover-card-lift">
                  <ShieldCheck className="w-10 h-10 text-cyan-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white font-display">3. Human Approves</h4>
                  <p className="text-xs text-slate-400">Officer sign-off; immutable audit log with cryptographic hash.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 8 (2:05 - 2:20) · What Else It Does */}
        {currentScene.id === 8 && (
          <div className="relative w-full h-full flex items-center justify-center p-12 bg-slate-900 text-white overflow-hidden">
            <div className="grid grid-cols-4 gap-4 w-full max-w-6xl text-center font-mono">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-white/10 space-y-3 hover-card-lift">
                <Layers className="w-10 h-10 text-indigo-400 mx-auto animate-pulse" />
                <h4 className="text-lg font-bold text-white">BondIQ Ledger</h4>
                <p className="text-xs text-slate-400 font-sans">e-UD fabric quota consumption math</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/90 border border-white/10 space-y-3 hover-card-lift">
                <Clock className="w-10 h-10 text-teal-400 mx-auto animate-spin [animation-duration:12s]" />
                <h4 className="text-lg font-bold text-white">Live Timeline</h4>
                <p className="text-xs text-slate-400 font-sans">Vessel cut-off countdown tracking</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/90 border border-white/10 space-y-3 hover-card-lift">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Bank-Ready Score</h4>
                <p className="text-xs text-slate-400 font-sans">UCP 600 clean payment guarantee</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/90 border border-white/10 space-y-3 hover-card-lift">
                <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Delay Analytics</h4>
                <p className="text-xs text-slate-400 font-sans">Top causes of avoidable demurrage</p>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 9 (2:20 - 2:35) · Business & Scale */}
        {currentScene.id === 9 && (
          <div className="relative w-full h-full flex items-center justify-center p-12 bg-slate-950 text-white overflow-hidden">
            <div className="max-w-4xl text-center space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-teal-950 text-teal-400 border border-teal-500 font-mono text-xs font-bold">
                COMMERCIAL MODEL & EXPANSION
              </div>
              <h2 className="text-5xl font-black font-display tracking-tight">
                Monthly SaaS • 90-Day Paid Pilots
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Preventing just <strong className="text-emerald-400">one $8,500 container hold</strong> pays for the software for a full factory year.
              </p>
              <div className="flex justify-center gap-4 text-sm font-mono font-bold pt-2">
                <span className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20">Garments (Live)</span>
                <span className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400">➔ Leather</span>
                <span className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400">➔ Jute</span>
                <span className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400">➔ Pharma</span>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 10 (2:35 - 2:50) · Close & Payoff */}
        {currentScene.id === 10 && (
          <div className="relative w-full h-full flex items-center justify-center p-10 bg-slate-950 text-white overflow-hidden">
            {/* Animated Ocean & Sailing Ship in Background */}
            <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-teal-950/80 to-transparent" />
            <div className="absolute bottom-8 right-16 animate-wave-bob">
              <div className="text-4xl">🚢</div>
              <span className="text-[10px] font-mono text-teal-400 block mt-1">SAILING TO ROTTERDAM</span>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-10">
              <div className="animate-victory-jump">
                <img 
                  src="/video-assets/character/rafi_celebrating_fistpump.svg" 
                  alt="Rafi Celebrating" 
                  className="w-72 h-72 object-contain"
                />
              </div>

              <div className="space-y-4 text-left">
                <div className="inline-block px-3 py-1 rounded bg-teal-950 border border-teal-500/40 text-teal-400 font-mono text-xs font-bold">
                  TEAM EXTOKENED // CONGRESS 2026
                </div>
                <h1 className="text-6xl font-black font-display tracking-tight text-white">
                  ExportOps <span className="text-teal-400">AI</span>
                </h1>
                <p className="text-2xl font-bold font-mono text-emerald-400">
                  Ship ready. Ship on time.
                </p>
                <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
                  <p>• International AI Builders Congress</p>
                  <p>• Live Working Prototype Active</p>
                  <p>• github.com/shajidul-sobuj/ExportOps</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── CLEAN TRANSPORT CONTROLS BELOW CANVAS ── */}
      <div className="p-5 rounded-2xl bg-[#080d1a] border border-white/[0.08] shadow-xl space-y-4">
        {/* Scrub Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>TIMELINE PROGRESS</span>
            <span className="text-emerald-400 font-bold">{formatTime(currentTime)} / 02:50 ({Math.round((currentTime / 170) * 100)}%)</span>
          </div>
          <input
            type="range"
            min={0}
            max={170}
            step={0.1}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 font-display"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Animated Video'}</span>
            </button>

            <button
              onClick={() => handleSeek(0)}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-all"
              title="Reset to 0:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Scene Jumper */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
            {SCENES.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSeek(s.start)}
                className={`px-2.5 py-1.5 rounded-lg transition-all shrink-0 border ${
                  activeSceneIndex === s.id - 1
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border-white/[0.06]'
                }`}
              >
                S{s.id}: {s.duration}s
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-all"
            title="Fullscreen Presentation"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Production Guide & Scene Table for Reference (Outside Video Screen) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#080d1a] border border-white/[0.08] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="text-xl font-bold text-white font-display">
              10-Scene Production Cue Sheet & Script
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Exact voiceover lineation, audio timing, and visual direction.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Total Budget: 318 words (~2.3 w/s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Sec</th>
                <th className="py-2.5 px-3">Scene</th>
                <th className="py-2.5 px-3">Words</th>
                <th className="py-2.5 px-3">Spoken Script</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {SCENES.map((scene) => (
                <tr 
                  key={scene.id} 
                  className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${
                    activeSceneIndex === scene.id - 1 ? 'bg-emerald-500/10 text-white font-bold' : ''
                  }`}
                  onClick={() => handleSeek(scene.start)}
                >
                  <td className="py-3 px-3 text-emerald-400">{scene.id}</td>
                  <td className="py-3 px-3">{formatTime(scene.start)} - {formatTime(scene.end)}</td>
                  <td className="py-3 px-3">{scene.duration}s</td>
                  <td className="py-3 px-3 text-white font-semibold">{scene.name}</td>
                  <td className="py-3 px-3 text-amber-400">{scene.wordCount}w</td>
                  <td className="py-3 px-3 font-sans text-slate-300">{scene.voiceover}</td>
                  <td className="py-3 px-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSeek(scene.start);
                        setIsPlaying(true);
                      }}
                      className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-[10px] transition-colors font-bold"
                    >
                      Play Scene
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
