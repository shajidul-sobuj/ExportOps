import initialShipments from '@/data/shipments.json';
import type { RuleResult, Shipment, ShipmentStatus } from '@/types';
import { computeBankReadyScore, computeShipmentStatus, evaluateShipmentRules } from '@/lib/rules';

/**
 * Single data-access layer for the web app.
 * Today it reads the bundled JSON fixtures; swap the body of `loadRaw()` for a
 * DB / API call later without touching any page.
 */

export interface EvaluatedShipment extends Shipment {
  ruleResults: RuleResult[];
  status: ShipmentStatus;
  bankReadyScore: number;
  failedRules: RuleResult[];
  criticalFailures: number;
  warningFailures: number;
}

function loadRaw(): Shipment[] {
  // Deep clone so callers can never mutate the shared fixture.
  return JSON.parse(JSON.stringify(initialShipments)) as Shipment[];
}

export function evaluateShipment(shipment: Shipment): EvaluatedShipment {
  const ruleResults = evaluateShipmentRules(shipment);
  const failedRules = ruleResults.filter((r) => !r.passed);
  return {
    ...shipment,
    ruleResults,
    status: computeShipmentStatus(ruleResults),
    bankReadyScore: computeBankReadyScore(ruleResults),
    failedRules,
    criticalFailures: failedRules.filter((r) => r.severity === 'Critical').length,
    warningFailures: failedRules.filter((r) => r.severity === 'Warning').length,
  };
}

export function getShipments(): EvaluatedShipment[] {
  return loadRaw().map(evaluateShipment);
}

export function getShipment(id: string): EvaluatedShipment | undefined {
  const raw = loadRaw().find((s) => s.id.toLowerCase() === id.toLowerCase());
  return raw ? evaluateShipment(raw) : undefined;
}

/** Hours remaining until vessel cut-off relative to `now` (negative = passed). */
export function hoursToCutoff(shipment: Pick<Shipment, 'vesselCutoff'>, now: Date = new Date()): number {
  return (new Date(shipment.vesselCutoff).getTime() - now.getTime()) / 36e5;
}

/**
 * A gate pass may only be issued when no Critical rule is failing.
 * Warnings are allowed (they are surfaced but do not block port gate-in).
 */
export function isGatePassEligible(shipment: Pick<EvaluatedShipment, 'ruleResults'>): boolean {
  return shipment.ruleResults.every((r) => r.passed || r.severity !== 'Critical');
}

const STATUS_WEIGHT: Record<ShipmentStatus, number> = {
  Blocked: 3,
  'At risk': 2,
  'Customs-ready': 0,
};

/**
 * Triage queue ordering: most severe status first, then the closest cut-off.
 * Customs-ready shipments are excluded.
 */
export function getTriageQueue(shipments: EvaluatedShipment[], now: Date = new Date()): EvaluatedShipment[] {
  return shipments
    .filter((s) => s.status !== 'Customs-ready')
    .sort((a, b) => {
      const w = STATUS_WEIGHT[b.status] - STATUS_WEIGHT[a.status];
      if (w !== 0) return w;
      return hoursToCutoff(a, now) - hoursToCutoff(b, now);
    });
}

export interface PortfolioStats {
  total: number;
  blocked: number;
  atRisk: number;
  ready: number;
  avgScore: number;
}

export function getPortfolioStats(shipments: EvaluatedShipment[]): PortfolioStats {
  const total = shipments.length;
  const count = (s: ShipmentStatus) => shipments.filter((x) => x.status === s).length;
  return {
    total,
    blocked: count('Blocked'),
    atRisk: count('At risk'),
    ready: count('Customs-ready'),
    avgScore: total ? Math.round(shipments.reduce((a, s) => a + s.bankReadyScore, 0) / total) : 0,
  };
}
