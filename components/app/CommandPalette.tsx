'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CornerDownLeft, Search, Ship } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getShipments } from '@/lib/data';
import { APP_NAV } from '@/components/app/nav';
import { Kbd, StatusBadge } from '@/components/ui';
import type { ShipmentStatus } from '@/types';

interface Command {
  id: string;
  group: 'Shipments' | 'Navigate';
  label: string;
  sub?: string;
  href: string;
  status?: ShipmentStatus;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const shipments: Command[] = getShipments().map((s) => ({
      id: s.id,
      group: 'Shipments',
      label: `${s.id} · ${s.buyer}`,
      sub: `${s.poNumber} · ${s.lcId}`,
      href: `/app/shipments/${s.id}`,
      status: s.status,
      icon: Ship,
      keywords: [s.id, s.buyer, s.poNumber, s.lcId, s.containerNumber].join(' ').toLowerCase(),
    }));
    const nav: Command[] = APP_NAV.flatMap((g) => g.items).map((i) => ({
      id: i.href,
      group: 'Navigate',
      label: i.label,
      href: i.href,
      icon: i.icon,
      keywords: i.label.toLowerCase(),
    }));
    return [...shipments, ...nav];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.keywords.includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const go = useCallback(
    (c: Command | undefined) => {
      if (!c) return;
      onClose();
      router.push(c.href);
    },
    [onClose, router]
  );

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = '';

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-xl bg-surface-1 border border-line-strong shadow-2xl overflow-hidden animate-scale-up" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 px-4 h-12 border-b border-line">
          <Search className="w-4 h-4 text-ink-3" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shipment ID, buyer, PO, LC, container…"
            className="flex-1 bg-transparent outline-none text-sm text-ink-1 placeholder:text-ink-3"
            aria-label="Search"
          />
          <Kbd>Esc</Kbd>
        </div>

        <ul className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
          {results.length === 0 && <li className="px-4 py-8 text-center text-sm text-ink-3">No matches for “{query}”</li>}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            const Icon = c.icon;
            return (
              <React.Fragment key={c.id}>
                {header && <li className="px-4 pt-2 pb-1 text-xs font-medium text-ink-3">{header}</li>}
                <li
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(c)}
                  className={cn(
                    'mx-2 px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer',
                    i === active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                  )}
                >
                  <Icon className="w-4 h-4 text-ink-3 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-ink-1 truncate">{c.label}</div>
                    {c.sub && <div className="text-xs text-ink-3 font-mono truncate">{c.sub}</div>}
                  </div>
                  {c.status && <StatusBadge status={c.status} />}
                  {i === active && (c.status ? <CornerDownLeft className="w-4 h-4 text-ink-3" /> : <ArrowRight className="w-4 h-4 text-ink-3" />)}
                </li>
              </React.Fragment>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 px-4 h-9 border-t border-line text-xs text-ink-3">
          <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
          <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> open</span>
        </div>
      </div>
    </div>
  );
}
