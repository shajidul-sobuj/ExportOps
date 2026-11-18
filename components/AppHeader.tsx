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
  ArrowLeft,
  Search,
  ChevronDown,
  Building2,
  Activity,
  Menu,
  X
} from 'lucide-react';

export default function AppHeader() {
  const pathname = usePathname();
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const appNavLinks = [
    { href: '/', label: 'Control Tower', icon: Layers, matchExact: true },
    { href: '/shipments/EXP-001', label: 'Inspection Studio', icon: Activity },
    { href: '/dashboard', label: 'Delay & Cost Analytics', icon: BarChart3 },
    { href: '/compliance', label: 'Buyer Compliance', icon: CheckSquare },
    { href: '/roi', label: 'ROI Studio', icon: TrendingUp },
    { href: '/docs', label: 'Docs & API', icon: FileText },
  ];

  const isActive = (link: typeof appNavLinks[0]) => {
    if (link.matchExact) {
      return pathname === '/';
    }
    return pathname.startsWith(link.href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20">
      {/* Top Utility & Tenant Bar */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Brand + Console Pill + Tenant Selector */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Anchor className="w-4 h-4 text-slate-950" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                  ExportOps <span className="text-emerald-400 font-extrabold">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-widest">
                  Console
                </span>
              </div>
            </Link>

            <div className="h-5 w-px bg-slate-800 hidden md:block" />

            {/* Tenant / Factory Selector */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-200">Apex Textile Holdings</span>
                <span className="text-[10px] text-slate-500 font-mono">CTG-EPZ #02</span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              {tenantDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-64 bg-[#0b101a] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1 animate-scale-up">
                  <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800/80">
                    Active Factory Workspace
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-emerald-300">Apex Textile Holdings Ltd.</p>
                      <p className="text-[10px] text-emerald-500/80">Unit 2 • Chittagong EPZ (Bond #8841)</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors">
                    <p className="font-semibold">Viyellatex Group Ltd.</p>
                    <p className="text-[10px] text-slate-500">Gazipur Industrial Unit (Bond #9102)</p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors">
                    <p className="font-semibold">Ha-Meem Denim Division</p>
                    <p className="text-[10px] text-slate-500">Ashulia Complex (Bond #7214)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Telemetry, Quick Search, User, Return to Website */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live Gateway Telemetry Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ASYCUDA Gateway: <strong className="text-emerald-300">24ms</strong></span>
            </div>

            {/* Global Search Hint */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">Search EXP / PO / LC...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-800 rounded border border-slate-700">
                ⌘K
              </kbd>
            </Link>

            {/* User Profile Pill */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                KR
              </div>
              <div className="text-left hidden xl:block">
                <p className="text-xs font-semibold text-slate-200 leading-none">Engr. K. Rahman</p>
                <p className="text-[10px] text-slate-500 leading-tight">Chief Commercial Officer</p>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-800 hidden sm:block" />

            {/* Back to Public Website CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
              title="Return to Public Marketing Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Marketing Site</span>
              <span className="sm:hidden">Website</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle App Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop App Navigation Tabs */}
        <div className="hidden md:flex items-center space-x-1 py-1.5 border-t border-slate-800/80 overflow-x-auto">
          {appNavLinks.map((link) => {
            const active = isActive(link);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-600/50 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-1 border-t border-slate-800 space-y-1 bg-[#090d16] animate-fade-in">
            <div className="p-2 mb-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-xs font-bold text-white">Apex Textile Holdings</p>
                  <p className="text-[10px] text-slate-400">Unit 2 • Chittagong EPZ</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {appNavLinks.map((link) => {
              const active = isActive(link);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    active 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
