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
    <header className="sticky top-0 z-50 bg-[#060910]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Anchor className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                  ExportOps <span className="text-emerald-400 font-extrabold">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  RMG Pre-Shipment Control Tower
                </span>
              </div>
            </Link>
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Public Portal
            </span>
          </div>

          {/* Desktop Marketing Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {marketingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Enter Enterprise Console CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/shipments/EXP-001"
              className="relative group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Enter Enterprise Console</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/shipments/EXP-001"
              className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm"
            >
              Console
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 px-2 border-t border-slate-800/80 space-y-1 bg-[#060910] animate-fade-in">
            {marketingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-800/80">
              <Link
                href="/shipments/EXP-001"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
              >
                <span>Launch Enterprise Console (EXP-001)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
