# ExportOps AI: Prototype Build Plan & Roadmap

A comprehensive guide for building and shipping the hackathon prototype.

## 1. Goal and Definition of Done

A fully functional, deployable web application demonstrating the end-to-end workflow: messy shipment input -> rule mismatches flagged -> user fix applied -> shipment cleared for customs.

### Definition of Done Checklist:
- [ ] **Shipment List:** 5 seeded shipments with live status badges (`Blocked`, `At risk`, `Customs-ready`) and Bank-Ready Scores (0-100).
- [ ] **Shipment Detail:** Document repository, milestone timeline, exceptions panel, BondIQ card, and audit log.
- [ ] **Rules Engine:** 8 deterministic rules (R1 to R8) with plain-language explanations, severity levels, and source field citations.
- [ ] **AI Extraction:** Server route extracting structured data with confidence scores from document inputs (with seamless cached fallback).
- [ ] **Interactive Remediation:** Fixing a field and re-running validation dynamically transitions status from `Blocked` to `Customs-ready`.
- [ ] **BondIQ Check:** Visual comparison of consumed fabric vs approved UD-linked quota (R8).
- [ ] **Management Dashboard:** Top delay causes and estimated avoidable cost calculations.
- [ ] **Automated Tests:** Unit tests verifying rules pass/fail for all 5 synthetic shipments.
- [ ] **Documentation:** `docs/` folder complete with architecture, concept note, logs, and presentation scripts.

---

## 2. Technical Stack

| Component | Technology | Rationale |
| --- | --- | --- |
| **Framework** | Next.js 15+ (App Router) | High performance, server routes, rapid deployment on Vercel |
| **Language** | TypeScript | Type safety across rules, document models, and extraction schemas |
| **Styling** | Tailwind CSS | Fast, clean, modern UI styling |
| **Icons & UI** | Lucide React | High-quality icons for status, documents, and alerts |
| **Validation & Schema** | Zod | Strict schema validation for AI JSON extraction |
| **Testing** | Vitest / Node Test Runner | Fast deterministic testing of compliance rules R1 to R8 |
| **AI Extraction** | Google Gemini API / Fetch | Multimodal & structured document reasoning with fallback |

---

## 3. Strict Cut List (Contingency Management)

If time runs tight, cut features in this strict order:
1. Management dashboard advanced charts (replace with simple summary metrics).
2. Timeline drag-and-drop / manual event adding.
3. Live LLM API call (gracefully rely on cached extractions with honest disclosure).
4. Bank-Ready Score calculation (rely strictly on Status badge).

**Never Cut:**
- Rules engine evaluation (R1 - R8).
- The core interactive fix loop (`Blocked` -> `Customs-ready`).
- The BondIQ fabric check (R8).
- Clean deploy on Vercel.
