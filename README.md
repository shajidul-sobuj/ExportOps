# ExportOps AI: RMG Pre-Shipment Control Tower & Compliance Engine

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38bdf8.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-11%2F11_Passing-emerald.svg)](https://vitest.dev/)
[![Zero ASYCUDA Holds](https://img.shields.io/badge/Customs-Zero_ASYCUDA_Hold-10b981.svg)]()

> **ExportOps AI** is an enterprise pre-shipment control tower and B2B SaaS platform engineered specifically for the Bangladeshi Ready-Made Garments (RMG) export industry. It validates trade documents across Purchase Orders (PO), Letters of Credit (LC), Commercial Invoices, Packing Lists, Certificates of Origin (COO), and Utilization Declaration (UD) fabric entitlements before vessel cut-off at Chittagong Port.

---

## 📌 The $47 Billion Paperwork Friction Problem

Bangladesh exports over **$47.38 Billion** in garments annually, with **84% of maritime cargo** moving through Chittagong Port. Over **15% of garment export containers** face documentation holds at customs, banks, or shipping lines due to simple paperwork mismatches.

| Risk Dimension | Financial Impact | Cause |
| --- | --- | --- |
| **Port Demurrage & Detention** | **$8,500+ / container** | Commercial Invoice quantity != Packing List quantity |
| **Emergency Air-Freight** | **$30,000+ margin wipeout** | Missed mother vessel cut-off window due to customs holds |
| **Customs Bond Penalties** | **Audit hold & duty escrow** | Raw material consumed exceeds BGMEA/BKMEA approved UD quota |
| **Bank Discrepancies** | **Cashflow frozen for weeks** | Discrepancies under ICC Uniform Customs & Practice (UCP 600) |

---

## ⚡ Key Capabilities & Enterprise Modules

### 1. Deterministic 8-Point Compliance Rules Engine (`lib/rules.ts`)
Zero hallucination guarantee. While AI extracts text, strict, unit-tested TypeScript functions make all pass/fail determinations:
- **R1: Quantity Match** — Invoice total pieces == Packing List total pieces.
- **R2: Value Tolerance** — Invoice value <= LC credit amount * (1 + tolerance %).
- **R3: Entity Match** — PO Buyer consignee == Commercial Invoice consignee.
- **R4: LC Shipment Window** — Shipment departure <= LC latest shipment date.
- **R5: Document Completeness** — Presence check for PO, LC, Invoice, Packing List, and COO.
- **R6: Container Assignment** — Container number assigned on packing list.
- **R7: HS Code Uniformity** — Harmonized System (HS) code identical across all documents.
- **R8: BondIQ Fabric Quota** — Fabric consumed <= approved UD entitlement quota.

### 2. BondIQ Industrial Fabric Consumption Ledger (`lib/bond-ledger.ts`)
Calculates net fabric requirements for Knit T-Shirts, Fleece Hoodies, and Stretch Denim using the official industrial formula:
$$\text{Fabric (kg)} = \left(\frac{\text{L (cm)} \times \text{W (cm)} \times 2 \times \text{GSM}}{10{,}000{,}000}\right) \times \left(\frac{\text{Qty}}{12}\right) \times 1.05$$
Flags raw material deficits before customs audits bond quotas.

### 3. Side-by-Side Dual-Window Document Inspection Studio (`/shipments/[id]`)
- Synchronized dual-window document inspector with interactive line-item highlights.
- **1-Click Auto-Fix Simulator**: Instantly resolve carton count discrepancies with re-validation.
- **Official Chittagong Port Gate-In Pass**: Printable customs gate pass with QR code and cryptographic verification hash.
- **Bilingual Floor WhatsApp Dispatch**: Automated alert generator in Bengali & English for Gazipur/Savar factory floors.

### 4. Separate Marketing Portal vs. Enterprise WebApp Console
- **Public Marketing Portal (`/`)**: Storytelling hero, animated Chittagong Port Berth 4 Radar, interactive simulators, ROI calculator, and full animated marketing footer.
- **Enterprise WebApp Console (`/dashboard`, `/shipments/*`, `/compliance`, `/roi`, `/docs`)**: Dedicated app header with factory/tenant switcher (`Apex Textile Holdings Ltd. • Unit 02`), live ASYCUDA 24ms telemetry, and compact industrial status dock.

---

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: TypeScript 5.0+ (Strict Type Safety)
- **Styling & Motion**: Tailwind CSS with custom GPU-accelerated keyframe animations (`border-beam`, `electric-stream`, `hover-card-lift`, `ambient-pulse`)
- **Icons**: Lucide React
- **Validation**: Zod Schemas
- **Testing**: Vitest (`11 of 11 passing`)
- **Fonts**: Plus Jakarta Sans, JetBrains Mono, Noto Sans Bengali

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18.x or 20.x
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/shajidul-sobuj/ExportOps.git
cd ExportOps

# Install dependencies
npm install

# Run automated test suite
npm test

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to launch ExportOps AI.

---

## 🧪 Testing & Verification

ExportOps AI maintains 100% test coverage on its core compliance engine and enterprise business logic:

```bash
npm test
```

```
✓ tests/rules.test.ts (6 tests)
  ✓ EXP-001 must be BLOCKED due to R1 Quantity Discrepancy
  ✓ EXP-002 must be BLOCKED due to R4 LC date expiration and R5 missing COO
  ✓ EXP-003 must be BLOCKED due to R8 BondIQ fabric quota exceedance
  ✓ EXP-004 must be AT RISK due to R6 unassigned container number
  ✓ EXP-005 must be CUSTOMS-READY with all 8 rules passed
  ✓ Bank-ready score accurately computes weighted compliance index

✓ tests/enterprise.test.ts (5 tests)
  ✓ BondIQ: calculates fabric requirements with 5% cutting wastage
  ✓ BondIQ: blocks shipment when fabric consumption exceeds approved UD quota
  ✓ Buyer Compliance: validates H&M ratio pack specifications
  ✓ Buyer Compliance: validates Zara Inditex UHF Gen2 RFID inlay rules
  ✓ Customs Gate-In Pass: generates verifiable cryptographic SHA-256 hash
```

---

## 📂 Repository Structure

```
├── app/
│   ├── layout.tsx                # Root layout with route-aware AppShell
│   ├── page.tsx                  # Marketing Landing Page with Port Radar
│   ├── dashboard/page.tsx        # Management Delay & Cost Dashboard
│   ├── compliance/page.tsx       # Global Buyer Compliance Rulebook
│   ├── roi/page.tsx              # Interactive Factory Savings Calculator
│   ├── docs/page.tsx             # Hackathon Pitch & Documentation Vault
│   └── shipments/[id]/page.tsx   # Side-by-Side Document Inspection Studio
├── components/
│   ├── AppHeader.tsx             # Enterprise WebApp Header with Tenant Switcher
│   ├── AppShell.tsx              # Route-aware Layout Manager
│   ├── AppStatusDock.tsx         # Sleek 1-row Industrial Status Dock
│   ├── Navbar.tsx                # Marketing Portal Navigation Bar
│   └── Footer.tsx                # Premium Animated Marketing Footer
├── data/
│   └── shipments.json            # 5 synthetic enterprise RMG shipments (EXP-001 to EXP-005)
├── docs/
│   ├── 01_CONCEPT_NOTE.md        # Commercial problem & market size
│   ├── 02_BUILD_PLAN.md          # Implementation phases & roadmap
│   ├── 03_ARCHITECTURE_AND_RULES.md # 8-point rule definitions
│   ├── 04_LOGS_AND_PROGRESS.md   # Chronological development tracker
│   ├── 05_DEMO_SCRIPT_AND_PITCH.md # 3-minute hackathon pitch script
│   └── PRD.md                    # Enterprise Product Requirements Document
├── lib/
│   ├── rules.ts                  # Pure TypeScript Deterministic Rules Engine (R1 - R8)
│   ├── bond-ledger.ts            # BondIQ Raw Material Consumption Calculator
│   └── buyer-rules.ts            # H&M, Zara, Target, Walmart Buyer Compliance
└── tests/
    ├── rules.test.ts             # Rules engine unit tests
    └── enterprise.test.ts        # Enterprise modules unit tests
```

---

## 💼 Business Model & Path to $5,000 / Month

ExportOps AI operates on a B2B SaaS tiered subscription model for garment exporters:
- **Starter Exporter (৳30,000 / mo | ~$250 USD)**: Single factories up to 10 shipments/month.
- **Growth Manufacturer (৳75,000 / mo | ~$625 USD)**: Unlimited shipments, BondIQ UD ledger, WhatsApp alerts, Gate-Pass generator.
- **Enterprise Group (৳200,000+ / mo | ~$1,650 USD)**: Multi-factory groups, buying houses, ASYCUDA webhooks, custom buyer rulebooks.

Preventing a **single delayed container** ($8,500+ demurrage) pays for **more than an entire year** of ExportOps AI. Reaching **$5,000/month** requires just **8 factories** on the Growth plan in Bangladesh's ecosystem of 4,000+ active apparel manufacturing units.

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
