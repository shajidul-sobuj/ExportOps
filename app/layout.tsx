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
  CheckSquare 
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
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <Link href="/" className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-emerald-200">
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                      ExportOps <span className="text-emerald-600 font-extrabold">AI</span>
                    </span>
                    <span className="hidden sm:inline-block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                      RMG Pre-Shipment Control Tower
                    </span>
                  </div>
                </Link>
                <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  Supply Chain Nexus
                </span>
              </div>

              <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                <Link
                  href="/"
                  className="flex items-center space-x-1.5 px-2.5 py-2 rounded-md text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>Shipments</span>
                </Link>
                <Link
                  href="/compliance"
                  className="flex items-center space-x-1.5 px-2.5 py-2 rounded-md text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Buyer Compliance</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1.5 px-2.5 py-2 rounded-md text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Cost Dashboard</span>
                </Link>
                <Link
                  href="/roi"
                  className="flex items-center space-x-1.5 px-2.5 py-2 rounded-md text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ROI & Pricing</span>
                </Link>
                <Link
                  href="/docs"
                  className="hidden md:flex items-center space-x-1.5 px-2.5 py-2 rounded-md text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Pitch & Docs</span>
                </Link>
              </nav>

              <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-500 border-l border-slate-200 pl-4">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Deterministic Rules + AI Explanations</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 ExportOps AI. Built for Bangladesh RMG Exporters & Clearing Agents.</p>
            <p className="text-slate-400">
              Zero-Hallucination Compliance Architecture • 8-Point Pre-Filing Validation • BondIQ Reconciled
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
