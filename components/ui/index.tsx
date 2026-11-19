'use client';

/**
 * ExportOps design-system primitives (implementation_plan §3.4).
 * Every app screen composes these — avoid one-off styling in pages.
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Clock, OctagonX, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ShipmentStatus } from '@/types';

/* ───────────────────────── Button ───────────────────────── */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const buttonBase =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-app disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold',
  secondary: 'bg-surface-2 text-ink-1 border border-line-strong hover:bg-white/[0.08]',
  ghost: 'text-ink-2 hover:text-ink-1 hover:bg-white/[0.05]',
  danger: 'bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-[15px]',
};

export function buttonClass(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md', className?: string) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = 'secondary',
  size = 'md',
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

/* ───────────────────────── Card ───────────────────────── */

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-xl bg-surface-1 border border-line', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 px-5 pt-4 pb-3', className)}>
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold text-ink-1 tracking-tight font-sans">{title}</h2>
        {description && <p className="text-[13px] text-ink-3 mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ───────────────────────── Page header ───────────────────────── */

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-1 tracking-tight">{title}</h1>
        {description && <p className="text-sm text-ink-3 mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

/* ───────────────────────── Badges ───────────────────────── */

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-white/[0.04] text-ink-2 border-line-strong',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  warning: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  danger: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
  info: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
};

export function Badge({ tone = 'neutral', className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2 rounded-md border text-xs font-medium whitespace-nowrap',
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const statusMeta: Record<ShipmentStatus, { tone: Tone; icon: LucideIcon; label: string }> = {
  Blocked: { tone: 'danger', icon: OctagonX, label: 'Blocked' },
  'At risk': { tone: 'warning', icon: AlertTriangle, label: 'At risk' },
  'Customs-ready': { tone: 'success', icon: CheckCircle2, label: 'Customs-ready' },
};

/** Status is always icon + colour + text — never colour alone. */
export function StatusBadge({ status, className }: { status: ShipmentStatus; className?: string }) {
  const meta = statusMeta[status];
  const Icon = meta.icon;
  return (
    <Badge tone={meta.tone} className={className}>
      <Icon className="w-3.5 h-3.5" aria-hidden />
      {meta.label}
    </Badge>
  );
}

/* ───────────────────────── KPI stat ───────────────────────── */

export function KPIStat({
  label,
  value,
  hint,
  tone = 'neutral',
  icon: Icon,
  href,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: Tone;
  icon?: LucideIcon;
  href?: string;
}) {
  const accent: Record<Tone, string> = {
    neutral: 'text-ink-1',
    success: 'text-emerald-300',
    warning: 'text-amber-300',
    danger: 'text-rose-300',
    info: 'text-cyan-300',
  };
  const body = (
    <Card className={cn('p-4 h-full', href && 'hover:border-line-strong hover:bg-surface-2/60 transition-colors')}>
      <div className="flex items-center justify-between text-[13px] text-ink-3 font-medium">
        <span>{label}</span>
        {Icon && <Icon className={cn('w-4 h-4', accent[tone])} aria-hidden />}
      </div>
      <div className={cn('mt-2 text-2xl font-semibold tabular-nums tracking-tight', accent[tone])}>{value}</div>
      {hint && <div className="mt-1 text-xs text-ink-3">{hint}</div>}
    </Card>
  );
  return href ? (
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded-xl">
      {body}
    </Link>
  ) : (
    body
  );
}

/* ───────────────────────── Score ring ───────────────────────── */

export function ScoreRing({ value, size = 40, stroke = 4, showLabel = true }: { value: number; size?: number; stroke?: number; showLabel?: boolean }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = value >= 90 ? '#34d399' : value >= 70 ? '#fbbf24' : '#fb7185';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={`Bank-ready score ${value}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (value / 100) * c}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      {showLabel && (
        <span className="absolute font-semibold tabular-nums text-ink-1" style={{ fontSize: Math.max(12, size * 0.28) }}>
          {value}
        </span>
      )}
    </div>
  );
}

/* ───────────────────────── Countdown chip ───────────────────────── */

function formatRemaining(ms: number) {
  if (ms <= 0) return 'Cut-off passed';
  const totalMin = Math.floor(ms / 60000);
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  if (d > 0) return `${d}d ${h}h`;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

/** Live vessel cut-off countdown. Amber < 48h, rose < 12h or passed. */
export function CountdownChip({ cutoff, className }: { cutoff: string; className?: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  if (now === null) {
    return <span className={cn('inline-block h-6 w-20 rounded-md bg-white/[0.04] animate-pulse', className)} />;
  }

  const ms = new Date(cutoff).getTime() - now;
  const hours = ms / 36e5;
  const tone: Tone = hours < 12 ? 'danger' : hours < 48 ? 'warning' : 'neutral';
  return (
    <Badge tone={tone} className={cn('font-mono tabular-nums', className)}>
      <Clock className="w-3.5 h-3.5" aria-hidden />
      {formatRemaining(ms)}
    </Badge>
  );
}

/* ───────────────────────── Empty state / skeleton / kbd ───────────────────────── */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-line flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-ink-3" aria-hidden />
      </div>
      <h3 className="text-[15px] font-semibold text-ink-1 font-sans tracking-tight">{title}</h3>
      {description && <p className="text-sm text-ink-3 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('rounded-md bg-white/[0.05] animate-pulse', className)} />;
}

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded border border-line-strong bg-white/[0.04] text-[11px] font-mono text-ink-3',
        className
      )}
    >
      {children}
    </kbd>
  );
}

/* ───────────────────────── Progress bar ───────────────────────── */

export function UtilizationBar({ percent, className }: { percent: number; className?: string }) {
  const color = percent > 100 ? 'bg-rose-400' : percent > 90 ? 'bg-amber-400' : 'bg-emerald-400';
  return (
    <div className={cn('h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden', className)} role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${Math.min(100, percent)}%` }} />
    </div>
  );
}
