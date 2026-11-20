import { describe, it, expect } from 'vitest';
import { POST as dispatchAlertHandler } from '../app/api/dispatch-alert/route';
import { POST as extractHandler } from '../app/api/extract/route';
import { NextRequest } from 'next/server';

describe('ExportOps AI API Routes', () => {
  describe('POST /api/dispatch-alert', () => {
    it('generates bilingual alert payload and WhatsApp text for EXP-001', async () => {
      const req = new NextRequest('http://localhost:3000/api/dispatch-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipmentId: 'EXP-001',
          buyer: 'H&M Hennes & Mauritz GBC AB',
          invoiceQty: 12000,
          packingListQty: 11400,
          containerNumber: 'MSKU-781920-4',
          vesselCutoff: '2026-11-22T18:00:00Z',
        }),
      });

      const res = await dispatchAlertHandler(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.alert.shipmentId).toBe('EXP-001');
      expect(data.alert.severity).toBe('Critical');
      expect(data.alert.messageEn).toContain('600 pcs');
      expect(data.alert.messageBn).toContain('600 পিস');
      expect(data.alert.whatsappFormatted).toContain('MSKU-781920-4');
      expect(data.alert.whatsappFormatted).toContain('ফ্লোরে প্যাকিং লিস্টের কার্টন সংখ্যা রি-চেক করুন');
    });
  });

  describe('POST /api/extract', () => {
    it('returns 400 when documentType is missing', async () => {
      const req = new NextRequest('http://localhost:3000/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const res = await extractHandler(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('documentType is required');
    });

    it('returns high-fidelity cached extraction fixture for Packing List', async () => {
      const req = new NextRequest('http://localhost:3000/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: 'Packing List',
          shipmentId: 'EXP-001',
        }),
      });

      const res = await extractHandler(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.fields.length).toBeGreaterThan(0);
      const totalQtyField = data.fields.find((f: any) => f.name === 'totalQuantity');
      expect(totalQtyField).toBeDefined();
      expect(totalQtyField.value).toBe(11400);
    });

    it('returns remediated fixed fixture when isFixDemo is true', async () => {
      const req = new NextRequest('http://localhost:3000/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: 'Packing List',
          shipmentId: 'EXP-001',
          isFixDemo: true,
        }),
      });

      const res = await extractHandler(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      const totalQtyField = data.fields.find((f: any) => f.name === 'totalQuantity');
      expect(totalQtyField).toBeDefined();
      expect(totalQtyField.value).toBe(12000);
    });
  });
});
