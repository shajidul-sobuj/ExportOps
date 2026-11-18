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
      <div className="min-h-screen flex flex-col bg-[#060910] text-slate-100">
        {/* Public Marketing Navigation */}
        <Navbar />

        {/* Marketing Hero & Content */}
        <main className="flex-1 bg-grid-subtle relative">
          <div className="absolute inset-0 radial-glow-emerald pointer-events-none" />
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
