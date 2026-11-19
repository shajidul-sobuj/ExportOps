'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowDownUp, Download, FilePlus2, Search, SearchX, Ship, X } from 'lucide-react';
import { getShipments, type EvaluatedShipment } from '@/lib/data';
import {
  Button,
  ButtonLink,
  Card,
  CountdownChip,
  EmptyState,
  Kbd,
  PageHeader,
  ScoreRing,
  Skeleton,
  StatusBadge,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { ShipmentStatus } from '@/types';

const STATUSES: (ShipmentStatus | 'All')[] = ['All', 'Blocked', 'At risk', 'Customs-ready'];
type SortKey = 'cutoff' | 'score' | 'id';

function toCsv(rows: EvaluatedShipment[]) {
  const header = ['ID', 'Buyer', 'PO', 'LC', 'Container', 'Vessel cut-off', 'Status', 'Bank-ready score', 'Failed rules'];
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map((s) =>
    [s.id, s.buyer, s.poNumber, s.lcId, s.containerNumber, s.vesselCutoff, s.status, s.bankReadyScore, s.failedRules.map((r) => r.ruleId).join(' ')]
      .map(esc)
      .join(',')
  );
  return [header.map(esc).join(','), ...lines].join('\n');
}

function ShipmentsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const all = useMemo(() => getShipments(), []);
  const [query, setQuery] = useState(params.get('q') ?? '');
  const status = (params.get('status') as ShipmentStatus | null) ?? 'All';
  const buyer = params.get('buyer') ?? 'All';
  const sort = (params.get('sort') as SortKey | null) ?? 'cutoff';
  const [cursor, setCursor] = useState(0);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === 'All') next.delete(key);
    else next.set(key, value);
    router.replace(`${pathname}${next.toString() ? `?${next}` : ''}`, { scroll: false });
  };

  const buyers = useMemo(() => ['All', ...Array.from(new Set(all.map((s) => s.buyer)))], [all]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((s) => status === 'All' || s.status === status)
      .filter((s) => buyer === 'All' || s.buyer === buyer)
      .filter((s) => !q || [s.id, s.buyer, s.poNumber, s.lcId, s.containerNumber].join(' ').toLowerCase().includes(q))
      .sort((a, b) => {
        if (sort === 'score') return a.bankReadyScore - b.bankReadyScore;
        if (sort === 'id') return a.id.localeCompare(b.id);
        return new Date(a.vesselCutoff).getTime() - new Date(b.vesselCutoff).getTime();
      });
  }, [all, query, status, buyer, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: all.length };
    all.forEach((s) => (c[s.status] = (c[s.status] ?? 0) + 1));
    return c;
  }, [all]);

  useEffect(() => setCursor(0), [rows.length]);

  // j / k / Enter keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
      if (e.key === 'j') setCursor((c) => Math.min(rows.length - 1, c + 1));
      if (e.key === 'k') setCursor((c) => Math.max(0, c - 1));
      if (e.key === 'Enter' && rows[cursor]) router.push(`/app/shipments/${rows[cursor].id}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rows, cursor, router]);

  const exportCsv = () => {
    const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exportops-shipments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtersActive = status !== 'All' || buyer !== 'All' || query !== '';

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setParam('q', query || null)}
            placeholder="Search ID, buyer, PO, LC, container"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-1 border border-line-strong text-sm text-ink-1 placeholder:text-ink-3 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15"
            aria-label="Search shipments"
          />
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-1 border border-line overflow-x-auto" role="tablist" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={status === s}
              onClick={() => setParam('status', s)}
              className={cn(
                'h-7 px-3 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors flex items-center gap-1.5',
                status === s ? 'bg-white/[0.08] text-ink-1' : 'text-ink-3 hover:text-ink-1'
              )}
            >
              {s}
              <span className="text-xs text-ink-3 tabular-nums">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:ml-auto">
          <select
            value={buyer}
            onChange={(e) => setParam('buyer', e.target.value)}
            className="h-9 px-3 rounded-lg bg-surface-1 border border-line-strong text-[13px] text-ink-2 outline-none focus:border-emerald-500/50"
            aria-label="Filter by buyer"
          >
            {buyers.map((b) => (
              <option key={b} value={b}>{b === 'All' ? 'All buyers' : b}</option>
            ))}
          </select>
          <div className="relative">
            <ArrowDownUp className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-3 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setParam('sort', e.target.value === 'cutoff' ? null : e.target.value)}
              className="h-9 pl-8 pr-3 rounded-lg bg-surface-1 border border-line-strong text-[13px] text-ink-2 outline-none focus:border-emerald-500/50"
              aria-label="Sort"
            >
              <option value="cutoff">Nearest cut-off</option>
              <option value="score">Lowest score</option>
              <option value="id">Shipment ID</option>
            </select>
          </div>
          <Button variant="secondary" onClick={exportCsv} disabled={rows.length === 0} title="Export current view as CSV">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">CSV</span>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        {rows.length === 0 ? (
          filtersActive ? (
            <EmptyState
              icon={SearchX}
              title="No shipments match these filters"
              description="Try a different search term or clear the filters."
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery('');
                    router.replace(pathname);
                  }}
                >
                  <X className="w-4 h-4" /> Clear filters
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={Ship}
              title="No shipments yet"
              description="Upload your first shipment's documents to run the 8-rule check."
              action={<ButtonLink href="/app/shipments/new" variant="primary"><FilePlus2 className="w-4 h-4" /> Start a check</ButtonLink>}
            />
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium text-ink-3 border-b border-line">
                  <th className="px-5 py-3 font-medium">Shipment</th>
                  <th className="px-3 py-3 font-medium hidden md:table-cell">PO / LC</th>
                  <th className="px-3 py-3 font-medium hidden xl:table-cell">Container</th>
                  <th className="px-3 py-3 font-medium">Cut-off</th>
                  <th className="px-3 py-3 font-medium hidden sm:table-cell">Score</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Failed rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((s, i) => (
                  <tr
                    key={s.id}
                    onClick={() => router.push(`/app/shipments/${s.id}`)}
                    onMouseEnter={() => setCursor(i)}
                    className={cn('cursor-pointer transition-colors', i === cursor ? 'bg-white/[0.035]' : 'hover:bg-white/[0.02]')}
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-mono text-[13px] text-ink-1">{s.id}</div>
                      <div className="text-[13px] text-ink-3 truncate max-w-[220px]">{s.buyer}</div>
                    </td>
                    <td className="px-3 py-3.5 hidden md:table-cell">
                      <div className="font-mono text-xs text-ink-2">{s.poNumber}</div>
                      <div className="font-mono text-xs text-ink-3">{s.lcId}</div>
                    </td>
                    <td className="px-3 py-3.5 hidden xl:table-cell font-mono text-xs text-ink-2">{s.containerNumber || '—'}</td>
                    <td className="px-3 py-3.5"><CountdownChip cutoff={s.vesselCutoff} /></td>
                    <td className="px-3 py-3.5 hidden sm:table-cell"><ScoreRing value={s.bankReadyScore} size={34} /></td>
                    <td className="px-3 py-3.5"><StatusBadge status={s.status} /></td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      {s.failedRules.length === 0 ? (
                        <span className="text-xs text-ink-3">None</span>
                      ) : (
                        <div className="flex gap-1 flex-wrap">
                          {s.failedRules.map((r) => (
                            <span
                              key={r.ruleId}
                              title={r.name}
                              className={cn(
                                'font-mono text-xs px-1.5 h-5 inline-flex items-center rounded border',
                                r.severity === 'Critical' ? 'text-rose-300 border-rose-500/25 bg-rose-500/10' : 'text-amber-300 border-amber-500/25 bg-amber-500/10'
                              )}
                            >
                              {r.ruleId}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-3 flex items-center justify-between text-xs text-ink-3">
        <span>{rows.length} of {all.length} shipments</span>
        <span className="hidden md:flex items-center gap-1.5"><Kbd>j</Kbd><Kbd>k</Kbd> move · <Kbd>↵</Kbd> open</span>
      </div>
    </>
  );
}

function TableSkeleton() {
  return (
    <Card className="p-5 space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </Card>
  );
}

export default function ShipmentsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <PageHeader
        title="Shipments"
        description="Every active export shipment, checked by the 8-rule engine."
        actions={<ButtonLink href="/app/shipments/new" variant="primary"><FilePlus2 className="w-4 h-4" /> New check</ButtonLink>}
      />
      <Suspense fallback={<TableSkeleton />}>
        <ShipmentsTable />
      </Suspense>
    </div>
  );
}
