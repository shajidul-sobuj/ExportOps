'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Anchor, 
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Layers,
  Activity,
  Calculator,
  FileText,
  ShieldAlert
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const marketingLinks = [
    { href: '#problem', label: 'The $47B Risk' },
    { href: '#pipeline', label: '4-Step Engine' },
    { href: '#control-tower', label: 'Control Tower' },
    { href: '#showcase', label: 'Simulators' },
    { href: '#calculator', label: 'Demurrage Calculator' },
    { href: '/roi', label: 'Pricing & ROI' },
    { href: '/docs', label: 'Pitch & Docs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500/25 to-teal-500/10 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-105 group-hover:border-emerald-400 transition-all">
                <Anchor className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1 font-display">
                  ExportOps <span className="text-emerald-400 font-black">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
                  RMG Pre-Shipment Control Tower
                </span>
              </div>
            </Link>
            <span className="hidden xl:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              Live Radar Link
            </span>
          </div>

          {/* Desktop Marketing Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5">
            {marketingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Enter Enterprise Console CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/shipments/EXP-001"
              className="relative group inline-flex items-center gap-2 px-4.5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 overflow-hidden font-display"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Enter Enterprise Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/shipments/EXP-001"
              className="px-3.5 py-2 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-sm"
            >
              Console
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 px-3 border-t border-slate-800/80 space-y-2 bg-[#060910] animate-fade-in">
            {marketingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-800/80">
              <Link
                href="/shipments/EXP-001"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-md font-display"
              >
                <span>Launch Enterprise Console (EXP-001)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
