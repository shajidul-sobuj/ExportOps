'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Activity, 
  Terminal, 
  ExternalLink, 
  HelpCircle,
  Cpu,
  Layers,
  Radio
} from 'lucide-react';

export default function AppStatusDock() {
  return (
    <footer className="w-full bg-[#070b12] border-t border-slate-800/80 text-[11px] text-slate-400 py-2.5 px-4 sm:px-6 lg:px-8 mt-auto z-40">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Port Gateway & ASYCUDA Node Status */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">ASYCUDA Gateway</span>
            <span className="text-slate-500">Node #04 (CTG Berth)</span>
          </div>

          <div className="hidden sm:block h-3 w-px bg-slate-800" />

          <div className="flex items-center gap-1.5 font-mono text-emerald-400/90">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>24ms latency</span>
          </div>

          <div className="hidden md:block h-3 w-px bg-slate-800" />

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>UCP 600 & BondIQ Rules Active</span>
          </div>
        </div>

        {/* Center: Active Environment Badge */}
        <div className="hidden xl:flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
            Tenant: <strong className="text-slate-200">Apex Holdings (BD-CTG-092)</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-[10px] font-mono text-emerald-300">
            Zero ASYCUDA Hold SLA
          </span>
        </div>

        {/* Right: Shortcuts, Version, Quick Help */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          <div className="hidden lg:flex items-center gap-1 text-slate-500">
            <span>Quick search</span>
            <kbd className="px-1.5 py-0.5 text-[9px] bg-slate-900 border border-slate-800 rounded text-slate-400">⌘K</kbd>
          </div>

          <div className="hidden sm:block h-3 w-px bg-slate-800" />

          <Link 
            href="/docs" 
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Support & Docs</span>
          </Link>

          <div className="h-3 w-px bg-slate-800" />

          <span className="text-slate-500 font-mono">
            v1.4.2-prod
          </span>
        </div>
      </div>
    </footer>
  );
}
