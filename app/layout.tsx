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

import AppShell from '@/components/AppShell';

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
      <body className="bg-[#060910] text-slate-100 antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-300">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
