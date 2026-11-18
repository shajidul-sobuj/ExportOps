import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  FileText, 
  Anchor, 
  TrendingUp, 
  CheckSquare,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ExportOps AI - RMG Pre-Shipment Control Tower',
  description: 'Validating export documents, reconciling bonded fabric, and delivering live customs-ready clearance for Bangladesh RMG exports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080c14] text-slate-100 antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Brand */}
              <div className="flex items-center space-x-3">
                <Link href="/" className="flex items-center space-x-2.5 group">
                  <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
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

              {/* Navigation Links */}
              <nav className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                <Link
                  href="/"
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Shipments</span>
                </Link>
                <Link
                  href="/compliance"
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Buyer Compliance</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Cost Dashboard</span>
                </Link>
                <Link
                  href="/roi"
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 hover:bg-emerald-900/60 transition-colors"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ROI & Pricing</span>
                </Link>
                <Link
                  href="/docs"
                  className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pitch & Docs</span>
                </Link>
              </nav>

              {/* Quick Launch CTA */}
              <div className="hidden lg:flex items-center space-x-3 border-l border-slate-800 pl-4">
                <Link
                  href="/shipments/EXP-001"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm shadow-emerald-500/20 transition-all"
                >
                  <span>Launch Demo (EXP-001)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-grid-subtle relative">
          <div className="absolute inset-0 radial-glow-emerald pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </main>

        {/* Global Footer */}
        <footer className="bg-[#05080e] border-t border-slate-800/80 py-8 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white">ExportOps AI</span>
              <span className="text-slate-600">•</span>
              <span>RMG Pre-Shipment Control Tower</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Built for Bangladesh RMG Exporters, Buying Houses & Clearing Agents • Chittagong Port Cut-Off Shield
            </p>
            <div className="flex items-center space-x-4 text-[11px] text-slate-500">
              <Link href="/docs" className="hover:text-slate-300">Pitch Script</Link>
              <span>•</span>
              <Link href="/roi" className="hover:text-slate-300">Pricing & Pilot</Link>
              <span>•</span>
              <Link href="/compliance" className="hover:text-slate-300">Buyer Rulebook</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
