import { describe, it, expect } from 'vitest';
import {
  getShipments,
  getShipment,
  getTriageQueue,
  getPortfolioStats,
  hoursToCutoff,
  isGatePassEligible,
} from '../lib/data';

describe('Data access layer (lib/data.ts)', () => {
  it('returns all fixture shipments with computed rule results', () => {
    const all = getShipments();
    expect(all.length).toBe(5);
    all.forEach((s) => expect(s.ruleResults).toHaveLength(8));
  });

  it('looks up shipments case-insensitively and returns undefined for unknown IDs', () => {
    expect(getShipment('exp-001')?.id).toBe('EXP-001');
    expect(getShipment('EXP-999')).toBeUndefined();
  });

  it('only allows a gate pass when no Critical rule fails', () => {
    expect(isGatePassEligible(getShipment('EXP-001')!)).toBe(false);
    expect(isGatePassEligible(getShipment('EXP-005')!)).toBe(true);
  });

  it('orders the triage queue by severity then nearest cut-off and excludes ready shipments', () => {
    const now = new Date('2026-11-19T00:00:00Z');
    const queue = getTriageQueue(getShipments(), now);
    expect(queue.find((s) => s.status === 'Customs-ready')).toBeUndefined();
    // Blocked shipments always precede At-risk ones
    const firstAtRisk = queue.findIndex((s) => s.status === 'At risk');
    const lastBlocked = queue.map((s) => s.status).lastIndexOf('Blocked');
    if (firstAtRisk !== -1) expect(lastBlocked).toBeLessThan(firstAtRisk);
    // Within Blocked, earliest cut-off first (EXP-002 cut-off is 2026-11-20)
    expect(queue[0].id).toBe('EXP-002');
  });

  it('computes cut-off hours and portfolio stats', () => {
    const now = new Date('2026-11-22T06:00:00Z');
    expect(hoursToCutoff({ vesselCutoff: '2026-11-22T18:00:00Z' }, now)).toBe(12);
    const stats = getPortfolioStats(getShipments());
    expect(stats.total).toBe(stats.blocked + stats.atRisk + stats.ready);
    expect(stats.avgScore).toBeGreaterThan(0);
  });
});
