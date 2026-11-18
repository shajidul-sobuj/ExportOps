import { NextRequest, NextResponse } from 'next/server';
import { DiscrepancyDispatchAlert, Severity } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      shipmentId = 'EXP-001', 
      buyer = 'Nordic Retailers A/S',
      discrepancyType = 'Quantity Mismatch',
      invoiceQty = 12000,
      packingListQty = 11400,
      vesselCutoff = '2026-11-22T18:00:00Z',
      containerNumber = 'MSKU-781920-4'
    } = body;

    const diff = Math.abs(invoiceQty - packingListQty);
    const cutoffDate = vesselCutoff.split('T')[0];

    const alert: DiscrepancyDispatchAlert = {
      shipmentId,
      severity: 'Critical',
      titleEn: `[URGENT] Document Discrepancy on ${shipmentId} (${buyer})`,
      titleBn: `[জরুরি] শিপমেন্ট ${shipmentId} এর ডকুমেন্টে অমিল (${buyer})`,
      messageEn: `ExportOps AI flagged a critical mismatch of ${diff.toLocaleString()} pcs between Commercial Invoice (${invoiceQty.toLocaleString()} pcs) and Packing List (${packingListQty.toLocaleString()} pcs). Port gate-in will be BLOCKED unless resolved before ${cutoffDate}.`,
      messageBn: `এক্সপোর্টঅপস এআই ইনভয়েস (${invoiceQty.toLocaleString()} পিস) এবং প্যাকিং লিস্টের (${packingListQty.toLocaleString()} পিস) মধ্যে ${diff.toLocaleString()} পিসের অমিল ধরেছে। ${cutoffDate} তারিখের মধ্যে সংশোধন না করলে পোর্ট গেট-ইন ব্লক থাকবে।`,
      suggestedActionEn: `1. Packaging supervisor must verify physical carton count on packing floor. 2. Commercial team must update Packing List to ${invoiceQty.toLocaleString()} pcs if all 500 cartons are ready.`,
      suggestedActionBn: `১. প্যাকেজিং ইনচার্জ ফ্লোরে থাকা কার্টনের মোট সংখ্যা পুনরায় গণনা করুন। ২. ৫০০ কার্টন রেডি থাকলে প্যাকিং লিস্ট আপডেট করে ১২,০০০ পিস করুন।`,
      whatsappFormatted: `🚨 *EXPORTOPS AI: URGENT COMPLIANCE ALERT* 🚨
━━━━━━━━━━━━━━━━━━━━
📦 *Shipment:* ${shipmentId} (${buyer})
⚠️ *Issue:* Quantity Mismatch (-${diff.toLocaleString()} PCS)
📋 *Invoice:* ${invoiceQty.toLocaleString()} pcs
📦 *Packing List:* ${packingListQty.toLocaleString()} pcs
🚢 *Port Cut-Off:* ${cutoffDate}
🚛 *Container:* ${containerNumber}
━━━━━━━━━━━━━━━━━━━━
❗ *জরুরি অ্যাকশন (Floor Action Needed):*
ফ্লোরে প্যাকিং লিস্টের কার্টন সংখ্যা রি-চেক করুন। ১২,০০০ পিসের সম্পূর্ণ ৫০০০ কার্টন লোড হলে সংশোধিত প্যাকিং লিস্ট অবিলম্বে কমার্শিয়াল টিমে পাঠান।

*ExportOps Control Tower:* Status is currently *BLOCKED*.`,
      emailFormatted: `Subject: URGENT: Pre-Shipment Document Discrepancy on ${shipmentId} - Vessel Cut-off at Risk

Dear Packaging & Commercial Team,

ExportOps AI pre-shipment validation has flagged a CRITICAL mismatch on shipment ${shipmentId}:

- Buyer: ${buyer}
- Commercial Invoice Total: ${invoiceQty.toLocaleString()} pcs
- Packing List Total: ${packingListQty.toLocaleString()} pcs
- Discrepancy: -${diff.toLocaleString()} pcs
- Container: ${containerNumber}
- Port Cut-off Date: ${cutoffDate}

Unless reconciled, this shipment cannot be submitted to ASYCUDA or cleared for port gate-in, incurring demurrage risks of up to $8,500.

Required Action:
1. Packaging floor must confirm actual packed carton count.
2. Submit revised Packing List via ExportOps AI immediately to clear customs status.

Best regards,
ExportOps AI Control Tower
Northfield Apparel Ltd.`
    };

    return NextResponse.json({ success: true, alert });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
