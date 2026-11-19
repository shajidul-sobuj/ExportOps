'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Anchor, ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const marketingLinks = [
  { href: '/#problem', label: 'Problem' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#showcase', label: 'Product' },
  { href: '/#rules', label: '8 Rules' },
  { href: '/#calculator', label: 'ROI' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/docs', label: 'Docs' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="ExportOps AI home">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/25 to-teal-500/10 border border-emerald-500/40 rounded-lg flex items-center justify-center group-hover:border-emerald-400 transition-colors">
              <Anchor className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-display">
              ExportOps <span className="text-emerald-400">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {marketingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/app"
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/app"
              className="group inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all"
            >
              Open Console
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden ml-2 p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-white/[0.06] space-y-1 animate-fade-in">
            {marketingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-[15px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.05]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-slate-950 font-semibold text-sm rounded-lg"
            >
              Open Console <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
