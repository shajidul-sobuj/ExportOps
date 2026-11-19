import {
  LayoutDashboard,
  Ship,
  FilePlus2,
  Scale,
  ListChecks,
  BarChart3,
  TrendingUp,
  Settings,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  external?: boolean;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const APP_NAV: NavGroup[] = [
  {
    items: [
      { href: '/app', label: 'Overview', icon: LayoutDashboard, exact: true },
      { href: '/app/shipments', label: 'Shipments', icon: Ship },
      { href: '/app/shipments/new', label: 'New check', icon: FilePlus2, exact: true },
    ],
  },
  {
    label: 'Modules',
    items: [
      { href: '/app/bond', label: 'BondIQ', icon: Scale },
      { href: '/app/compliance', label: 'Buyer compliance', icon: ListChecks },
      { href: '/app/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/app/roi', label: 'ROI studio', icon: TrendingUp },
    ],
  },
  {
    items: [
      { href: '/app/settings', label: 'Settings', icon: Settings },
      { href: '/docs', label: 'Docs', icon: BookOpen, external: true },
    ],
  },
];

export function isActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  // "Shipments" should not light up while on the "New check" route
  if (item.href === '/app/shipments' && pathname === '/app/shipments/new') return false;
  return pathname === item.href || pathname.startsWith(item.href + '/');
}

const LABELS: Record<string, string> = {
  app: 'Console',
  shipments: 'Shipments',
  new: 'New check',
  bond: 'BondIQ',
  compliance: 'Buyer compliance',
  analytics: 'Analytics',
  roi: 'ROI studio',
  settings: 'Settings',
};

/** Builds breadcrumb segments from the pathname, e.g. /app/shipments/EXP-001. */
export function breadcrumbs(pathname: string): { label: string; href: string }[] {
  const parts = pathname.split('/').filter(Boolean);
  return parts.map((p, i) => ({
    label: LABELS[p] ?? decodeURIComponent(p),
    href: '/' + parts.slice(0, i + 1).join('/'),
  }));
}
