# Product Requirements Document (PRD): ExportOps AI Enterprise

**Version:** 2.0 (Enterprise Commercial Release)  
**Author:** ExportOps AI Product & Engineering Team  
**Domain:** TradeTech, Supply Chain Nexus, Garment Manufacturing (RMG)  
**Target Market:** Bangladesh RMG Exporters ($47B+ annual export market), C&F Clearing Agents, Buying Houses, and Trade Banks.

---

## 1. Executive Summary & Product Vision

**ExportOps AI** is the enterprise pre-shipment control tower for the garment export industry. It sits between factory merchandising, production, clearing agents, and trade finance banks. 

By autonomously reconciling commercial invoices, packing lists, export LCs, certificate of origin documents, and bonded fabric quotas (UDs) before port gate-in, ExportOps AI prevents costly container delays, demurrage, and bank discrepancies.

### The Problem It Solves
- **Demurrage & Container Detention:** A container held for 5 days at Chittagong Port costs upwards of $8,500 in port fees and shipping line penalties.
- **Air-Freight Penalties:** When paperwork delays miss the vessel cut-off, global buyers (e.g., Zara, H&M) enforce air-freight shipment at the factory's expense ($15,000 to $50,000+ per order).
- **Customs Bond Quota Audits:** Unlinked fabric consumption results in immediate customs holds, duty escrow demands, and suspension of duty-free import licenses.

### The Core Promise
> **"Zero paperwork delays at port gate-in. Clean bank presentation on the first attempt."**

---

## 2. Target Personas & Daily Workflows

| Persona | Role | Primary Pain Point | What ExportOps Delivers |
| --- | --- | --- | --- |
| **Tariqul Islam** | Export Documentation Manager | Cross-referencing 20-page packing lists with commercial invoices in Excel under midnight vessel cut-off pressure. | Side-by-side Inspection Studio, automated 8-point rule validation, 1-click discrepancy resolution. |
| **Nazrul Huda** | Commercial Director & CFO | Unbudgeted demurrage charges ($30k+/mo) and delayed payment realization from foreign banks due to LC discrepancies. | Executive Cost Attribution Dashboard, measurable ROI tracking, pre-cleared Bank-Ready score. |
| **Shamima Akter** | Compliance & Bond Officer | Fear of Customs Bond audits caused by fabric consumption exceeding approved BGMEA UD entitlement quotas. | BondIQ Fabric Ledger with cutting wastage math and live UD quota balancer. |
| **Rafiqul Karim** | C&F Clearing Agent | Re-typing document data into ASYCUDA World while chasing factories over WhatsApp for missing container numbers. | Instant WhatsApp dispatch alerts in Bangla/English, verified Customs Gate-In Pass. |

---

## 3. Core Functional Modules

### Module 1: Pre-Shipment Control Tower & Rules Engine
- Evaluates 8 deterministic compliance rules (R1 to R8) with zero hallucination.
- Computes real-time **Shipment Status** (`Blocked`, `At risk`, `Customs-ready`) and **Bank-Ready Score** (0-100).
- Pure TypeScript implementation with 100% test coverage.

### Module 2: Document Inspection Studio (Split-Screen)
- Side-by-side document viewer showing the trade document snippet alongside extracted fields, discrepancy flags, and confidence scores.
- Real text / PDF file drag-and-drop parsing with automated confidence scoring.

### Module 3: Floor & C&F Dispatcher (Bilingual WhatsApp / Email)
- Generates actionable, formatted resolution notices in **Bangla and English** when mismatches are detected.
- One-click copy for WhatsApp factory groups and email dispatch to C&F agents.

### Module 4: BondIQ Fabric Ledger & UD Balancer
- Industrial fabric consumption math:
  $$\text{Fabric Required (kg)} = \left(\frac{\text{Order Qty} \times \text{GSM} \times \text{Consumption per Dozen}}{12}\right) \times (1 + \text{Wastage \%})$$
- Compares required fabric against BGMEA-approved Utilization Declaration (UD) quota.
- Enforces R8: Blocks shipment if unlinked fabric usage is detected.

### Module 5: Global Buyer Compliance Rulebook
- Specialized rule profiles for international apparel retailers:
  - **H&M:** Ratio pack integrity, polybag barcode compliance, hanger carton ratio.
  - **Zara (Inditex):** RFID tag verification, solid size breakdown per carton.
  - **Target / Walmart:** UCC-128 shipping container labels, master carton weight limit (< 20 kg).

### Module 6: Commercial ROI & Monetization Engine
- Dynamic ROI calculator demonstrating cost savings:
  - Input: Monthly container export volume ($N$).
  - Calculation: $\text{Avoidable Demurrage Saved} = N \times \$2,125$.
  - Subscription cost: BDT 30,000 - 75,000 / month ($250 - $625 USD).
  - Target: $18.5\times$ ROI for the factory.

---

## 4. Monetization Strategy & Path to $5,000 / Month

```
+-------------------------------------------------------------------------+
| Target: $5,000 / Month Recurring Revenue (approx. BDT 600,000 / Month)  |
+-------------------------------------------------------------------------+
| Option A: 8 Factories on Growth Plan (BDT 75,000 / month)               |
| Option B: 3 Enterprise Garment Groups (BDT 200,000 / month)             |
| Option C: 12 Mid-Size Exporters (BDT 50,000 / month)                   |
+-------------------------------------------------------------------------+
```

### Pricing Tiers
1. **Starter (BDT 30,000 / mo):** Up to 10 shipments/month, core R1-R8 rules engine, document validation.
2. **Growth (BDT 75,000 / mo):** Unlimited shipments, BondIQ fabric ledger, WhatsApp floor alerts, buyer compliance pack.
3. **Enterprise (BDT 200,000+ / mo):** Multi-factory group management, custom ERP/ASYCUDA API integration, dedicated account compliance officer.

---

## 5. Non-Functional & Ethical AI Requirements

1. **Deterministic Authority:** AI reads and explains; pure code determines pass/fail. No AI model has unilateral authority to clear a shipment.
2. **Confidence-Driven Human Review:** Any field extracted with $< 90\%$ confidence triggers mandatory human sign-off.
3. **Immutable Audit Trail:** Every field modification, validation run, and override is permanently logged with the user's role and timestamp.
4. **Resilient Offline Architecture:** Critical demo and presentation paths feature verified fallback fixtures, ensuring zero downtime even during live pitch events without internet access.
