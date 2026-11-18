import { describe, it, expect } from 'vitest';
import shipmentsData from '../data/shipments.json';
import { Shipment } from '../types';
import {
  evaluateShipmentRules,
  computeShipmentStatus,
  computeBankReadyScore,
  checkR1_QuantityMatch,
  checkR4_ShipmentWindow,
  checkR5_RequiredDocuments,
  checkR6_ContainerOnPackingList,
  checkR8_BondUdQuota,
} from '../lib/rules';

const shipments = shipmentsData as unknown as Shipment[];

describe('ExportOps AI Rules Engine (R1 - R8)', () => {
  it('EXP-001 must be BLOCKED due to R1 Quantity Discrepancy', () => {
    const exp001 = shipments.find((s) => s.id === 'EXP-001')!;
    expect(exp001).toBeDefined();

    const r1 = checkR1_QuantityMatch(exp001);
    expect(r1.passed).toBe(false);
    expect(r1.severity).toBe('Critical');
    expect(r1.explanation).toContain('Invoice specifies 12,000 pcs');
    expect(r1.explanation).toContain('Packing List specifies 11,400 pcs');

    const allResults = evaluateShipmentRules(exp001);
    const status = computeShipmentStatus(allResults);
    expect(status).toBe('Blocked');
    expect(computeBankReadyScore(allResults)).toBe(75);
  });

  it('EXP-002 must be BLOCKED due to R4 Late Shipment Date and R5 Missing COO', () => {
    const exp002 = shipments.find((s) => s.id === 'EXP-002')!;
    expect(exp002).toBeDefined();

    const r4 = checkR4_ShipmentWindow(exp002);
    expect(r4.passed).toBe(false);
    expect(r4.severity).toBe('Critical');

    const r5 = checkR5_RequiredDocuments(exp002);
    expect(r5.passed).toBe(false);
    expect(r5.explanation).toContain('Certificate of Origin');

    const allResults = evaluateShipmentRules(exp002);
    expect(computeShipmentStatus(allResults)).toBe('Blocked');
    expect(computeBankReadyScore(allResults)).toBe(50);
  });

  it('EXP-003 must be BLOCKED due to R8 Fabric Consumed exceeding UD-linked quota', () => {
    const exp003 = shipments.find((s) => s.id === 'EXP-003')!;
    expect(exp003).toBeDefined();

    const r8 = checkR8_BondUdQuota(exp003);
    expect(r8.passed).toBe(false);
    expect(r8.severity).toBe('Critical');
    expect(r8.explanation).toContain('2,500 kg of fabric consumption is unlinked to any approved UD');

    const allResults = evaluateShipmentRules(exp003);
    expect(computeShipmentStatus(allResults)).toBe('Blocked');
    expect(computeBankReadyScore(allResults)).toBe(75);
  });

  it('EXP-004 must be AT RISK due to R6 Container Number missing on Packing List', () => {
    const exp004 = shipments.find((s) => s.id === 'EXP-004')!;
    expect(exp004).toBeDefined();

    const r6 = checkR6_ContainerOnPackingList(exp004);
    expect(r6.passed).toBe(false);
    expect(r6.severity).toBe('Warning');

    const allResults = evaluateShipmentRules(exp004);
    expect(computeShipmentStatus(allResults)).toBe('At risk');
    expect(computeBankReadyScore(allResults)).toBe(90);
  });

  it('EXP-005 must be CUSTOMS-READY with 100 Bank-Ready Score', () => {
    const exp005 = shipments.find((s) => s.id === 'EXP-005')!;
    expect(exp005).toBeDefined();

    const allResults = evaluateShipmentRules(exp005);
    expect(allResults.every((r) => r.passed)).toBe(true);

    const status = computeShipmentStatus(allResults);
    expect(status).toBe('Customs-ready');
    expect(computeBankReadyScore(allResults)).toBe(100);
  });

  it('Remediation flow: Updating EXP-001 packing list quantity turns status from BLOCKED to CUSTOMS-READY', () => {
    const exp001 = JSON.parse(JSON.stringify(shipments.find((s) => s.id === 'EXP-001')!)) as Shipment;

    // Initially blocked
    let results = evaluateShipmentRules(exp001);
    expect(computeShipmentStatus(results)).toBe('Blocked');

    // Human fixes Packing List count from 11,400 to 12,000
    const pl = exp001.documents.find((d) => d.type === 'Packing List')!;
    pl.fields.totalQuantity.value = 12000;

    // Re-evaluate
    results = evaluateShipmentRules(exp001);
    expect(results.every((r) => r.passed)).toBe(true);
    expect(computeShipmentStatus(results)).toBe('Customs-ready');
    expect(computeBankReadyScore(results)).toBe(100);
  });
});
