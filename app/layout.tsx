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

import Navbar from '@/components/Navbar';

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
      <body className="bg-[#060910] text-slate-100 antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
        {/* Navigation Bar */}
        <Navbar />

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
