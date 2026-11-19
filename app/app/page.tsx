'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FilePlus2,
  Gauge,
  OctagonX,
  Ship,
} from 'lucide-react';
import { getPortfolioStats, getShipments, getTriageQueue, hoursToCutoff } from '@/lib/data';
import {
  Badge,
  ButtonLink,
  Card,
  CardHeader,
  CountdownChip,
  KPIStat,
  PageHeader,
  ScoreRing,
  StatusBadge,
} from '@/components/ui';
import { cn } from '@/lib/utils';

const WINDOW_HOURS = 7 * 24;

function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

function relativeTime(iso: string, now: Date) {
  const diff = (now.getTime() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function OverviewPage() {
  const now = useNow();
  const shipments = useMemo(() => getShipments(), []);
  const stats = useMemo(() => getPortfolioStats(shipments), [shipments]);
  const queue = useMemo(() => getTriageQueue(shipments, now ?? new Date()), [shipments, now]);

  const activity = useMemo(
    () =>
      shipments
        .flatMap((s) => s.auditLog)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 7),
    [shipments]
  );

  const timeline = useMemo(
    () => [...shipments].sort((a, b) => new Date(a.vesselCutoff).getTime() - new Date(b.vesselCutoff).getTime()),
    [shipments]
  );

  const greeting = now ? (now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening') : 'Welcome';

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <PageHeader
        title={`${greeting}, Rahim`}
        description={
          stats.blocked > 0
            ? `${stats.blocked} shipment${stats.blocked > 1 ? 's are' : ' is'} blocked and ${stats.atRisk} at risk. Fix these before their vessel cut-off.`
            : 'All shipments are clear for gate-in.'
        }
        actions={
          <>
            <ButtonLink href="/app/shipments" variant="secondary">
              <Ship className="w-4 h-4" /> All shipments
            </ButtonLink>
            <ButtonLink href="/app/shipments/new" variant="primary">
              <FilePlus2 className="w-4 h-4" /> New check
            </ButtonLink>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <KPIStat label="Active shipments" value={stats.total} icon={Ship} href="/app/shipments" />
        <KPIStat label="Blocked" value={stats.blocked} tone="danger" icon={OctagonX} hint="Critical rule failed" href="/app/shipments?status=Blocked" />
        <KPIStat label="At risk" value={stats.atRisk} tone="warning" icon={AlertTriangle} hint="Warnings only" href="/app/shipments?status=At%20risk" />
        <KPIStat label="Customs-ready" value={stats.ready} tone="success" icon={CheckCircle2} hint="Gate pass available" href="/app/shipments?status=Customs-ready" />
        <div className="col-span-2 lg:col-span-1">
          <KPIStat label="Avg bank-ready score" value={`${stats.avgScore}%`} icon={Gauge} tone={stats.avgScore >= 90 ? 'success' : stats.avgScore >= 70 ? 'warning' : 'danger'} />
        </div>
      </div>

      {/* Cut-off timeline */}
      <Card className="mt-4">
        <CardHeader
          title="Vessel cut-off timeline"
          description="Next 7 days · bar length = time left before port gate closes"
        />
        <div className="px-5 pb-5">
          <div className="hidden sm:grid grid-cols-7 text-xs text-ink-3 mb-2 ml-[180px]">
            {Array.from({ length: 7 }).map((_, i) => {
              const d = now ? new Date(now.getTime() + i * 86400000) : null;
              return (
                <span key={i} className="border-l border-line pl-1.5">
                  {d ? d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }) : '—'}
                </span>
              );
            })}
          </div>
          <ul className="space-y-2">
            {timeline.map((s) => {
              const hrs = now ? hoursToCutoff(s, now) : 0;
              const pct = Math.max(0, Math.min(100, (hrs / WINDOW_HOURS) * 100));
              const color =
                s.status === 'Blocked' ? 'bg-rose-500/70' : s.status === 'At risk' ? 'bg-amber-400/70' : 'bg-emerald-400/70';
              return (
                <li key={s.id}>
                  <Link href={`/app/shipments/${s.id}`} className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 rounded-lg -mx-2 px-2 py-1.5 hover:bg-white/[0.03]">
                    <div className="sm:w-[180px] shrink-0 flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[13px] text-ink-1">{s.id}</span>
                      <span className="text-[13px] text-ink-3 truncate">{s.buyer.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="relative flex-1 h-6 rounded-md bg-white/[0.03] overflow-hidden">
                        {now && (
                          <div
                            className={cn('absolute inset-y-0 left-0 rounded-md transition-all duration-500', color)}
                            style={{ width: `${Math.max(pct, 1.5)}%` }}
                          />
                        )}
                      </div>
                      <div className="w-[120px] flex justify-end shrink-0">
                        <CountdownChip cutoff={s.vesselCutoff} />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Triage queue */}
        <Card className="xl:col-span-3">
          <CardHeader
            title="Needs action"
            description="Sorted by severity, then nearest cut-off"
            action={<Badge tone={queue.length ? 'danger' : 'success'}>{queue.length} open</Badge>}
          />
          {queue.length === 0 ? (
            <div className="px-5 pb-6 text-sm text-ink-3">Nothing to fix. Every shipment is customs-ready.</div>
          ) : (
            <ul className="divide-y divide-line border-t border-line">
              {queue.map((s) => {
                const top = s.failedRules.find((r) => r.severity === 'Critical') ?? s.failedRules[0];
                return (
                  <li key={s.id}>
                    <Link href={`/app/shipments/${s.id}`} className="group flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                      <ScoreRing value={s.bankReadyScore} size={38} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm text-ink-1">{s.id}</span>
                          <span className="text-sm text-ink-3 truncate">{s.buyer}</span>
                        </div>
                        {top && (
                          <p className="text-[13px] text-ink-2 mt-0.5 truncate">
                            <span className={top.severity === 'Critical' ? 'text-rose-300' : 'text-amber-300'}>{top.ruleId}</span>{' '}
                            {top.name}
                            {s.failedRules.length > 1 && <span className="text-ink-3"> · +{s.failedRules.length - 1} more</span>}
                          </p>
                        )}
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <StatusBadge status={s.status} />
                        <CountdownChip cutoff={s.vesselCutoff} />
                      </div>
                      <span className="flex items-center gap-1 text-[13px] text-ink-3 group-hover:text-emerald-300 transition-colors">
                        Fix <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Recent activity */}
        <Card className="xl:col-span-2">
          <CardHeader title="Recent activity" description="Audit trail across all shipments" action={<Activity className="w-4 h-4 text-ink-3" />} />
          <ol className="px-5 pb-5 space-y-4 relative">
            {activity.map((a, i) => (
              <li key={a.id} className="relative pl-5">
                <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-white/20 ring-4 ring-surface-1" />
                {i < activity.length - 1 && <span className="absolute left-[3.5px] top-4 bottom-[-14px] w-px bg-line" />}
                <div className="flex items-center justify-between gap-3">
                  <Link href={`/app/shipments/${a.shipmentId}`} className="font-mono text-xs text-ink-3 hover:text-ink-1">
                    {a.shipmentId}
                  </Link>
                  <span className="text-xs text-ink-3">{now ? relativeTime(a.timestamp, now) : ''}</span>
                </div>
                <p className="text-[13px] text-ink-1 mt-0.5">{a.action}</p>
                <p className="text-xs text-ink-3 mt-0.5">{a.actor}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
