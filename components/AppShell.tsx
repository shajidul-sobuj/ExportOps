'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppHeader from '@/components/AppHeader';
import AppStatusDock from '@/components/AppStatusDock';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  if (isLandingPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
        {/* Public Marketing Navigation */}
        <Navbar />

        {/* Marketing Hero & Content with Vignette Grid & Ambient Mesh */}
        <main className="flex-1 bg-mesh-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-modern pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </main>

        {/* Rich Animated Marketing Footer */}
        <Footer />
      </div>
    );
  }

  // Enterprise WebApp Console Workspace
  return (
    <div className="min-h-screen flex flex-col bg-[#070b12] text-slate-100">
      {/* Dedicated Enterprise Console Header */}
      <AppHeader />

      {/* Main Workspace Container */}
      <main className="flex-1 relative overflow-x-hidden">
        {children}
      </main>

      {/* Compact Industrial App Status Dock (Replaces Marketing Footer) */}
      <AppStatusDock />
    </div>
  );
}
