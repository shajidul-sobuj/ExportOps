# ExportOps AI: Concept Note (A to Z)

A pitch-ready explanation of what ExportOps is, why it matters, and how it makes money.

## 1. The Pitch

ExportOps AI is the control tower that tells a Bangladeshi garment exporter, before the vessel cut-off, whether a shipment is truly ready: documents match, bonded fabric is reconciled, and the bank will accept the paperwork.

### 30-Second Version
> "Every garment shipment leaving Bangladesh depends on a dozen documents that live in spreadsheets, PDFs, and WhatsApp groups. One mismatch between the invoice, the packing list, the LC, or the bond record can delay a container or trigger a bank query. ExportOps AI reads those documents, checks them against each other and against the bond ledger, and gives every shipment a live customs-ready status. AI extracts and explains; fixed rules decide. Factories pay a monthly subscription, and one prevented delay pays for it."

### 3-Minute Story Arc (Judging Slot)
1. **Hook (20 s):** A container is stuck at Chittagong Port because the quantity on the commercial invoice differs from the packing list by just 600 pieces.
2. **Problem (30 s):** Ready-Made Garments (RMG) is Bangladesh's $47B+ export engine. Each shipment crosses PO, LC, bonded warehouse, customs, and bank with no single unified view.
3. **Live Demo (80 s):** Upload documents, watch mismatches appear in real time, fix the field, and see the shipment turn from `Blocked` to `Customs-ready`.
4. **Why Trustworthy (20 s):** AI reads and explains, deterministic rules decide pass/fail, humans approve, and every action is logged in an audit trail.
5. **Business (20 s):** Subscription per factory (BDT 30k-75k/mo), paid 90-day pilot, fast path to $5k/mo recurring revenue.
6. **Ask and Close (10 s):** Design-partner factories, mentor guidance in trade finance, and winning the Supply Chain Nexus challenge.

---

## 2. The Problem

A garment shipment fails on paperwork, not only on production, and nobody sees the failure until it is expensive.

### What One Shipment Goes Through
- Buyer PO and Export LC
- Merchandising & Raw Material Sourcing
- Bonded Fabric Imports (Utilization Declaration / UD entitlement)
- Production & Quality Check
- Commercial Invoice & Packing List preparation
- C&F Agent's Bill of Export (BOE) filing
- Customs inspection (ASYCUDA World)
- Shipping line container loading & port cutoff
- Bank document negotiation & payment realization
- Post-export Bond & UD reconciliation

### What Breaks
- Invoice quantity or value differs from the packing list or LC.
- Buyer on PO does not match consignee on invoice.
- Shipment date falls outside the LC latest shipment window.
- HS code, container number, or weight data is missing or mismatched.
- Bonded fabric consumption is not linked to an approved UD quota.
- Bank-required documents (e.g. Certificate of Origin) are missing at cutoff.

### Who Suffers
| Persona | Daily Pain |
| --- | --- |
| **Export Documentation Manager** | Manual cross-checking across PDFs and Excel, repeated revisions under port-cutoff stress |
| **Compliance Manager** | UD quota over-consumption, bond license audit exposure, customs penalties |
| **Commercial Director** | Vessel cut-off missed, delayed shipments, unhappy global buyers (H&M, Zara, Walmart) |
| **C&F Agent** | Chasing missing paperwork over WhatsApp, manual re-typing into customs portals |
| **Finance Controller** | Bank discrepancies, payment delays, expensive demurrage & container detention fees |

---

## 3. The Solution

ExportOps AI sits between the factory, C&F agent, customs, and the bank, checking every shipment before hand-off. It does not replace ASYCUDA, BGMEA e-UD, or ERPs; it ensures clean data before submission.

### Modules in Prototype
- **Document Intelligence:** AI-powered extraction from PO, LC, Invoice, Packing List, and Certificate of Origin with confidence metrics.
- **BondIQ (Bond & UD Reconciliation):** Tracks consumed fabric vs. approved UD quantity to prevent unlinked usage.
- **Shipment Control Tower:** Live status (`Blocked`, `At risk`, `Customs-ready`), Bank-Ready Score (0-100), and milestone timeline.
- **Delay & Cost Attribution Dashboard:** Aggregates top delay reasons and calculated avoidable costs.

### The Signature Sentence
> *"This shipment cannot be declared export-ready because 1,250 kg of fabric consumption is unlinked to any approved UD."*

---

## 4. AI Design: Division of Labor

| Step | Engine | Function |
| --- | --- | --- |
| Read Document | Multimodal LLM / OCR | Extract buyer, PO, LC, quantities, values, HS codes, container numbers |
| Normalize Fields | Code | Clean text, convert units, parse dates, align currencies |
| Cross-Check | Rules Engine (Pure TS) | Deterministic evaluation of R1 through R8 |
| Explain Problem | LLM | Plain-language explanation with source field citations |
| Approve / Override | Human Specialist | Documentation manager signs off; logged in immutable audit trail |

---

## 5. Market & Business Model

- **Target Customers:** Bangladesh RMG exporters (over 4,000 active factories), C&F agents, and buying houses.
- **Tiers:**
  - *Starter (Single Factory):* BDT 30,000 / month
  - *Growth (Mid-Sized Exporter):* BDT 75,000 / month
  - *Enterprise (Large Group):* BDT 200,000+ / month
- **Target $5k/month:** Approx. BDT 600,000/month (~8 Growth tier factories or 3 Enterprise groups).
