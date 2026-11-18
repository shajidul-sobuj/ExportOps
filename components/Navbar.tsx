'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Anchor, 
  Layers, 
  CheckSquare, 
  BarChart3, 
  TrendingUp, 
  FileText, 
  ArrowRight,
  Menu,
  X,
  Radio
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Shipments', icon: Layers },
    { href: '/compliance', label: 'Buyer Compliance', icon: CheckSquare },
    { href: '/dashboard', label: 'Cost Dashboard', icon: BarChart3 },
    { href: '/roi', label: 'ROI & Pricing', icon: TrendingUp, highlight: true },
    { href: '/docs', label: 'Pitch & Docs', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060910]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Anchor className="w-5 h-5" />
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
              Supply Chain Nexus
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    link.highlight
                      ? active 
                        ? 'text-emerald-200 bg-emerald-900/80 border border-emerald-500 shadow-sm shadow-emerald-500/20'
                        : 'text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 hover:bg-emerald-900/60 hover:border-emerald-600'
                      : active
                        ? 'text-emerald-400 bg-slate-800/90 border border-slate-700'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Launch CTA (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 border-l border-slate-800 pl-4">
            <Link
              href="/shipments/EXP-001"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Launch Demo (EXP-001)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/shipments/EXP-001"
              className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold text-[11px] rounded-lg shadow-sm"
            >
              Demo
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
          <div className="md:hidden py-3 px-2 border-t border-slate-800/80 space-y-1 bg-[#060910]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    active 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/shipments/EXP-001"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
              >
                <span>Launch Interactive Demo (EXP-001)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
