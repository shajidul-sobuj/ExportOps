import { describe, it, expect } from 'vitest';
import { calculateFabricConsumption } from '../lib/bond-ledger';
import { evaluateBuyerCompliance } from '../lib/buyer-rules';
import shipmentsData from '../data/shipments.json';
import { Shipment } from '../types';

const shipments = shipmentsData as unknown as Shipment[];

describe('ExportOps AI Enterprise Modules', () => {
  describe('BondIQ Industrial Fabric Consumption Ledger', () => {
    it('accurately calculates fabric requirements with 5% cutting wastage', () => {
      // 12,000 pieces = 1,000 dozen
      // Net fabric = 1,000 dzn * 2.4 kg = 2,400 kg
      // Wastage (5%) = 2,400 * 0.05 = 120 kg
      // Total fabric required = 2,520 kg
      const result = calculateFabricConsumption({
        orderQuantityPcs: 12000,
        gsm: 160,
        consumptionPerDznKg: 2.4,
        wastagePercent: 5,
        approvedUdQuotaKg: 4000,
      });

      expect(result.fabricNetKg).toBe(2400);
      expect(result.wastageKg).toBe(120);
      expect(result.totalFabricRequiredKg).toBe(2520);
      expect(result.isExceeded).toBe(false);
      expect(result.quotaBalanceKg).toBe(1480);
      expect(result.utilizationRatePercent).toBe(63);
      expect(result.summary).toContain('RECONCILED');
    });

    it('detects and flags over-consumption when fabric required exceeds approved UD', () => {
      // 30,000 pieces = 2,500 dozen
      // Net fabric = 2,500 dzn * 7.2 kg = 18,000 kg
      // Wastage (5%) = 900 kg
      // Total fabric required = 18,900 kg against approved 16,000 kg
      const result = calculateFabricConsumption({
        orderQuantityPcs: 30000,
        gsm: 320,
        consumptionPerDznKg: 7.2,
        wastagePercent: 5,
        approvedUdQuotaKg: 16000,
      });

      expect(result.totalFabricRequiredKg).toBe(18900);
      expect(result.isExceeded).toBe(true);
      expect(result.quotaBalanceKg).toBe(-2900);
      expect(result.summary).toContain('OVER-CONSUMPTION');
    });
  });

  describe('Global Buyer Compliance Rulebook', () => {
    it('evaluates H&M Ratio Pack specifications for EXP-001', () => {
      const exp001 = shipments.find((s) => s.id === 'EXP-001')!;
      expect(exp001).toBeDefined();

      const rules = evaluateBuyerCompliance(exp001);
      const ratioRule = rules.find((r) => r.id === 'HM-01')!;
      expect(ratioRule).toBeDefined();
      expect(ratioRule.passed).toBe(false); // Because initial qty is 11,400 != 12,000
    });

    it('clears H&M Ratio Pack rule when packing list is reconciled to 12,000 pcs', () => {
      const exp001 = JSON.parse(JSON.stringify(shipments.find((s) => s.id === 'EXP-001')!)) as Shipment;
      const pl = exp001.documents.find((d) => d.type === 'Packing List')!;
      pl.fields.totalQuantity.value = 12000;

      const rules = evaluateBuyerCompliance(exp001);
      const ratioRule = rules.find((r) => r.id === 'HM-01')!;
      expect(ratioRule.passed).toBe(true);
    });

    it('evaluates Zara / Inditex RFID and Single-SKU carton rules for EXP-002', () => {
      const exp002 = shipments.find((s) => s.id === 'EXP-002')!;
      const rules = evaluateBuyerCompliance(exp002);

      const rfidRule = rules.find((r) => r.id === 'ZRA-01')!;
      expect(rfidRule.passed).toBe(true);

      const cartonRule = rules.find((r) => r.id === 'ZRA-02')!;
      expect(cartonRule.passed).toBe(false);
    });
  });
});
