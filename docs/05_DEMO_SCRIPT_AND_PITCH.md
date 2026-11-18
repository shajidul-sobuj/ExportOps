# ExportOps AI: Demo Script & Pitch Guide

Use this script to deliver a flawless, high-impact hackathon presentation.

---

## 1. 30-Second Elevator Pitch (Memorize This)

> "Every garment shipment leaving Bangladesh depends on a dozen documents that live in spreadsheets, PDFs, and WhatsApp groups. One mismatch between the invoice, the packing list, the LC, or the bond record can delay a container or trigger a bank query.
>
> ExportOps AI reads those documents, checks them against each other and against the bond ledger, and gives every shipment a live customs-ready status.
>
> AI extracts and explains; deterministic rules decide. Factories pay a monthly subscription, and preventing just one delayed shipment pays for the entire year."

---

## 2. 3-Minute Hackathon Demo Script (Step-by-Step)

### Act 1: The Problem & The Hook (0:00 - 0:40)
- **Visual:** Open home page (`/`). Show shipment table.
- **Narrative:**
  - "Bangladesh exports over $47 Billion in garments annually. But right now, at Chittagong Port, containers get held up every single day not because clothes weren't made, but because a single number on a packing list didn't match the commercial invoice."
  - "Notice shipment `EXP-001`. It has a Bank-Ready Score of 75 and is marked **BLOCKED**."

### Act 2: Deep Dive into Shipment EXP-001 (0:40 - 1:20)
- **Visual:** Click on `EXP-001` to open the detail view (`/shipments/EXP-001`).
- **Narrative:**
  - "Here is the ExportOps Control Tower for `EXP-001`. On the left: all 5 core documents—PO, LC, Invoice, Packing List, and Certificate of Origin."
  - "Look at the Exceptions Panel: **Rule R1: Quantity Reconciliation failed**. Our engine caught that the Commercial Invoice specifies **12,000 pcs**, but the Packing List says **11,400 pcs**. A 600-piece mismatch."
  - "AI extracted these values with 98% confidence and cited the exact line item from the invoice PDF."

### Act 3: Live AI Extraction & Remediation (1:20 - 2:10)
- **Visual:** Click "Upload / Re-extract Packing List" -> Edit Packing List quantity from `11,400` to `12,000` -> Click **"Re-run Validation"**.
- **Narrative:**
  - "The export documentation manager verifies with the packaging floor: the final carton count was indeed 12,000 pieces. She updates the corrected figure and hits 'Re-run Validation'."
  - *(Watch the screen transform)*
  - "Instantly, Rule R1 turns green. The status dynamically changes from **BLOCKED** to **CUSTOMS-READY**, and the Bank-Ready Score shoots up to **100**!"
  - "Notice the Audit Log: every edit is timestamped with the actor's identity. No compliance officer is left guessing."

### Act 4: BondIQ Check & Management Dashboard (2:10 - 2:40)
- **Visual:** Quick glimpse at `EXP-003` (BondIQ violation) then navigate to `/dashboard`.
- **Narrative:**
  - "In `EXP-003`, our BondIQ module caught that the factory consumed 18,500 kg of fabric against an approved UD quota of only 16,000 kg—saving the factory from a massive customs bond penalty."
  - "And on our **Management Dashboard**, executives see at a glance: 3 shipments blocked this week, and **$38,400 in avoidable demurrage and air-freight penalties saved**."

### Act 5: Business Model & Closing Ask (2:40 - 3:00)
- **Visual:** Pitch slide / dashboard footer.
- **Narrative:**
  - "We charge BDT 30,000 to 75,000/month per factory. With just 8 factories on our growth plan, we reach our initial $5,000/month milestone."
  - "ExportOps AI: Turning messy trade paperwork into customs-ready confidence. Thank you!"

---

## 3. Tough Judging Questions & Winning Answers

| Question | Winning Answer |
| --- | --- |
| **"Can we trust AI for legally binding export compliance?"** | "Absolutely not—and that's why we never let AI make the compliance decision. In ExportOps, AI is restricted to reading documents and explaining errors in natural language. The compliance verdict is evaluated 100% by deterministic TypeScript pure functions." |
| **"Doesn't ASYCUDA or BGMEA e-UD already do this?"** | "No. ASYCUDA and e-UD are government filing and audit endpoints. If you submit bad data to ASYCUDA, your container gets flagged and penalized. ExportOps is the internal factory-side shield that validates and cleans your paperwork *before* filing." |
| **"What happens if OCR or AI extraction makes a mistake?"** | "Every extracted field displays a confidence level. Any low-confidence extraction is flagged for mandatory human review. Furthermore, the human manager can inspect the source snippet, edit any field in one click, and every override is logged." |
