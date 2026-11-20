'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Anchor,
  Bell,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAV, breadcrumbs, isActive } from '@/components/app/nav';
import CommandPalette from '@/components/app/CommandPalette';
import { Kbd } from '@/components/ui';
import { getShipments } from '@/lib/data';

const COLLAPSE_KEY = 'exportops.sidebar.collapsed';

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/app" className="flex items-center gap-2.5 min-w-0" aria-label="ExportOps console home">
      <div className="w-8 h-8 shrink-0 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
        <Anchor className="w-4 h-4 text-emerald-400" />
      </div>
      {!collapsed && (
        <span className="text-[15px] font-bold tracking-tight text-ink-1 font-display truncate">
          ExportOps <span className="text-emerald-400">AI</span>
        </span>
      )}
    </Link>
  );
}

function NavList({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname() ?? '';
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-5" aria-label="Console">
      {APP_NAV.map((group, gi) => (
        <div key={gi} className="space-y-0.5">
          {group.label && !collapsed && (
            <div className="px-2.5 pb-1.5 text-xs font-medium text-ink-3">{group.label}</div>
          )}
          {group.label && collapsed && <div className="mx-2 mb-2 h-px bg-line" />}
          {group.items.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex items-center gap-3 h-9 rounded-lg text-sm transition-colors',
                  collapsed ? 'justify-center px-0' : 'px-2.5',
                  active ? 'bg-white/[0.06] text-ink-1 font-medium' : 'text-ink-3 hover:text-ink-1 hover:bg-white/[0.04]'
                )}
              >
                {active && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-emerald-400" />}
                <Icon className={cn('w-[18px] h-[18px] shrink-0', active ? 'text-emerald-400' : 'text-ink-3 group-hover:text-ink-2')} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Persisted sidebar state
  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === '1');
  }, []);
  const toggleCollapsed = () => {
    setCollapsed((c) => {
      localStorage.setItem(COLLAPSE_KEY, c ? '0' : '1');
      return !c;
    });
  };

  // ⌘K / Ctrl+K / "/" opens palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const crumbs = breadcrumbs(pathname);
  const alerts = getShipments().filter((s) => s.status === 'Blocked').length;

  return (
    <div className="min-h-screen bg-app text-ink-2 flex">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col sticky top-0 h-screen shrink-0 border-r border-line bg-[#060a10] transition-[width] duration-200',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        <div className={cn('h-14 flex items-center border-b border-line', collapsed ? 'justify-center px-2' : 'px-4')}>
          <Brand collapsed={collapsed} />
        </div>
        <NavList collapsed={collapsed} />
        <div className="p-3 border-t border-line">
          <button
            onClick={toggleCollapsed}
            className={cn(
              'w-full flex items-center gap-2 h-8 rounded-lg text-[13px] text-ink-3 hover:text-ink-1 hover:bg-white/[0.04] transition-colors',
              collapsed ? 'justify-center' : 'px-2.5'
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronsRight className="w-4 h-4" /> : <><ChevronsLeft className="w-4 h-4" /> Collapse</>}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-[#060a10] border-r border-line flex flex-col animate-fade-in">
            <div className="h-14 flex items-center justify-between px-4 border-b border-line">
              <Brand collapsed={false} />
              <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2 text-ink-3 hover:text-ink-1" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <NavList collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 h-14 flex items-center gap-3 px-4 sm:px-6 border-b border-line bg-app/85 backdrop-blur-xl">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 text-ink-3 hover:text-ink-1" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>

          <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
            <ol className="flex items-center gap-1.5 text-sm min-w-0">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.href} className={cn('flex items-center gap-1.5 min-w-0', !last && 'hidden sm:flex')}>
                    {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-ink-3/60 shrink-0 hidden sm:block" />}
                    {last ? (
                      <span className="text-ink-1 font-medium truncate" aria-current="page">{c.label}</span>
                    ) : (
                      <Link href={c.href} className="text-ink-3 hover:text-ink-1 transition-colors truncate">{c.label}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 h-8 w-64 px-3 rounded-lg border border-line-strong bg-white/[0.02] text-[13px] text-ink-3 hover:text-ink-2 hover:border-white/20 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="flex-1 text-left">Search shipments…</span>
            <Kbd>⌘K</Kbd>
          </button>
          <button onClick={() => setPaletteOpen(true)} className="md:hidden p-2 text-ink-3 hover:text-ink-1" aria-label="Search">
            <Search className="w-[18px] h-[18px]" />
          </button>

          <Link
            href="/app/shipments?status=Blocked"
            className="relative p-2 text-ink-3 hover:text-ink-1 rounded-lg hover:bg-white/[0.04]"
            aria-label={`${alerts} blocked shipments need attention`}
          >
            <Bell className="w-[18px] h-[18px]" />
            {alerts > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-[10px] leading-4 font-semibold text-white text-center">
                {alerts}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 border border-line-strong flex items-center justify-center text-xs font-semibold text-ink-1" title="Rahim Ahmed · Commercial">
              RA
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">{children}</main>

        {/* Compact status dock */}
        <footer className="h-8 px-4 sm:px-6 flex items-center justify-between gap-4 border-t border-line text-xs text-ink-3 bg-[#060a10]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Rules engine online
            </span>
            <span className="hidden sm:inline text-ink-3/50">·</span>
            <span className="hidden sm:inline">8 / 8 rules active</span>
            <span className="hidden md:inline text-ink-3/50">·</span>
            <span className="hidden md:inline">Tenant: Apex Holdings</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono">v1.5.0</span>
          </div>
        </footer>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
