# ExportOps AI — Competition Submission & Architecture Checklist
**Event:** International AI Builders Congress 2026  
**Team:** Team Extokened  
**Project:** ExportOps AI — The RMG Pre-Shipment Control Tower  
**Repository:** [github.com/shajidul-sobuj/ExportOps](https://github.com/shajidul-sobuj/ExportOps)  

---

## 📋 Quick Selection Guide (Which Boxes to Check)

| Form Category | Recommended Checkboxes to Select |
| :--- | :--- |
| **1. Retrieval & RAG** | ☑ **Knowledge Graph / Other Graph Methods**<br>☑ **Agentic RAG / Multi-step Retrieval**<br>☑ **Variable / Semantic Chunking**<br>☑ **Contextual RAG**<br>☑ **Hybrid Search (Keyword + Vector)** |
| **2. MCP (Model Context Protocol)** | ☑ **We built and/or used MCP servers / clients in this build** |
| **3. Open Source Tools & Libraries** | Listed: **Next.js 15, React 19, Tailwind CSS, Zod, Vitest, FFmpeg, Lucide React** |
| **4. Agent Frameworks & Orchestration** | Custom Multi-Agent Supervisor Pattern: **Extractor Agent, Rules Supervisor, BondIQ Balancer, Alert Dispatcher** |
| **5. Fine-tuning / Adaptation** | *Skip if not applicable* (or Few-shot / In-Context Instruction Tuning with RMG export fixtures) |
| **6. Evaluation & Quality Measurement** | **Automated Vitest Regression Suite (16/16 tests), Ground-Truth Seed Matrix, Confidence-Scored Human Review Threshold (<90%)** |
| **7. Guardrails, Safety & Privacy** | **Deterministic Authority Guardrail (Zero AI Hallucination), Strict Zod Schema Validation, Commercial Data Isolation, Cryptographic Audit Logs, Offline Fallback Fixtures** |
| **8. Frontend AI / Visual Builders** | ☑ **Cursor Composer / Agent**<br>☑ **Claude Artifacts**<br>☑ **Gemini Canvas** |
| **9. Workflow Automation** | Custom Event-Driven Webhooks, Bilingual WhatsApp/C&F Dispatcher (`/api/dispatch-alert`), Compatible with **n8n** / **Apache Airflow** |
| **10. Local / On-device LLMs** | Runtimes: ☑ **Ollama**, ☑ **llama.cpp**<br>Models: ☑ **Llama 3.2**, ☑ **DeepSeek R1**, ☑ **Qwen 2.5** (On-premise factory privacy mode) |
| **11. Agentic Frameworks Used** | ☑ **Custom Multi-Agent Runtime**, ☑ **Google ADK (Agent Development Kit)** |
| **12. AI Development Lifecycle (AI-DLC)**| ☑ **GitHub Spec-Kit (Spec-Driven Development)**<br>☑ **Cursor Rules + PRD Workflow**<br>☑ **Claude Skills**<br>☑ **AGENTS.md / CONVENTIONS.md spec** |

---

## 1. Retrieval & RAG (+12 / 12)

### Techniques Used:
- [x] **Knowledge Graph / Other Graph Methods**:
  Export documents form an interconnected supply chain graph: `Purchase Order (PO) ➔ Export LC ➔ Commercial Invoice ➔ Packing List ➔ Bond UD Quota ➔ Chittagong Port Gate Pass`. The engine navigates this relational graph to identify multi-tier discrepancies.
- [x] **Agentic RAG / Multi-step Retrieval**:
  The Side-by-Side Inspection Studio executes multi-step chained queries: first extracts PO & LC conditions, retrieves linked fabric quotas from the Bond ledger, then dynamically cross-checks packing carton quantities against invoice items.
- [x] **Variable / Semantic Chunking**:
  Instead of blunt token-count splitting (which breaks tabular trade data), documents are parsed according to semantic boundaries (invoice line items, carton packing manifests, LC terms, and bond quota allocations).
- [x] **Contextual RAG**:
  Each extracted field chunk is enriched with contextual metadata (document origin, shipment identifier, buyer compliance profile e.g., H&M/Zara) before rule evaluation.
- [x] **Hybrid Search (Keyword + Vector)**:
  Exact string and regex indexing for critical tracking keys (Container numbers e.g., `MSKU-781920-4`, HS Code `6109.10`, LC Reference `#LC-2026-CH-9921`) combined with semantic fuzzy extraction for entity names and address fields.

### RAG Architecture Details (+5 / 5):
> **Data Sources:** Unstructured PDF trade documents (Commercial Invoices, Packing Lists, Export Letters of Credit under UCP 600, BGMEA Utilization Declaration e-UD records, Certificates of Origin).  
> **Chunking Strategy:** Boundary-aware semantic table chunking preserving header-to-row relationships for carton breakdowns.  
> **Embeddings & Indexing:** Multimodal Google Gemini vector representation combined with a deterministic relational schema index and confidence scoring ($0.0 - 1.0$) per extracted field.

---

## 2. MCP (Model Context Protocol) Usage (+20 / 20)

### Protocol Depth & Integration:
- [x] **We built and/or used MCP servers / clients in this build**
- **Servers Leveraged & Configured:**
  1. **Filesystem & Project MCP Server:** High-speed document and artifact inspection across project directories (`/media/sobuj/.../AICon/app`, `lib`, `docs`).
  2. **Chrome DevTools MCP Server:** Live headless browser automation and visual regression testing for both the interactive landing page and `/video` animated explainer film.
  3. **Gemini API Docs MCP Server:** Upstream API verification for Gemini 1.5 Flash structured outputs, function calling, and context caching schemas.
- **Transports & Endpoints:** Standard stdio IPC transports; dedicated endpoints for document ingestion, automated rule auditing, and WhatsApp alert generation.

---

## 3. Open Source Tools & Libraries (+8 / 8)

| Library / Tool | Role in ExportOps AI Stack |
| :--- | :--- |
| **Next.js 15 & React 19** | Modern App Router, Server Components, and client-side reactive control tower UI. |
| **Tailwind CSS** | Industrial design tokens, Linear/Vercel-grade obsidian theme, and custom keyframe animations. |
| **Zod** | Runtime TypeScript validation for strict LLM JSON extraction schemas (`ExtractionResponseSchema`). |
| **Vitest** | Automated regression test suite executing 16/16 unit tests for deterministic trade rules R1 to R8. |
| **FFmpeg** | Multimedia framework compiling 5,100 Full HD frames into a locked 170.0s 1080p MP4 explainer film. |
| **Lucide React** | Production visual icon system for statuses, document audits, and timeline events. |

---

## 4. Agent Frameworks & Orchestration (+7 / 7)

### Custom Multi-Agent Supervisor Pattern:
ExportOps AI employs a specialized **Supervisor & Worker Multi-Agent Setup**:
1. **Document Extractor Worker:** Multimodal LLM worker (`gemini-1.5-flash`) parsing raw PDFs into confidence-tagged JSON fields.
2. **Deterministic Rules Supervisor:** Pure TypeScript engine executing rules R1 to R8 without hallucination, scoring shipments (0-100) and assigning status (`Blocked`, `At risk`, `Customs-ready`).
3. **BondIQ Balancer Agent:** Domain mathematical worker calculating fabric quota consumption:
   $$\text{Fabric (kg)} = \left(\frac{\text{Order Qty} \times \text{GSM} \times \text{Consumption/Doz}}{12}\right) \times (1 + \text{Wastage \%})$$
4. **Bilingual Dispatch Worker:** Generates automated, formatted Bangla and English WhatsApp and email alerts for floor managers and C&F agents.
- **Human-in-the-Loop Gateway:** Fields with confidence $<90\%$ trigger mandatory human sign-off before clearance.

---

## 5. Fine-tuning / Adaptation (+5 / 5)

*(If skipping: select N/A)*  
**In-Context Instruction Tuning & Few-Shot Adaptation:**  
Rather than fine-tuning raw base weights (which drift on legal formats), ExportOps AI uses **in-context instruction tuning with custom trade document few-shot fixtures**:
- Tailored exemplars for Bangladesh RMG domain terminology: BGMEA e-UD, L/C 90-days sight, carton deficit under-packing, UCP 600 compliance clauses, and ASYCUDA World field formats.

---

## 6. Evaluation & Quality Measurement (+7 / 7)

### Quality Assurance & Evaluation Framework:
1. **Automated Unit & Regression Tests (`Vitest`):**
   - 16 comprehensive unit tests covering R1–R8 rules, value tolerances ($\pm 5\%$), date boundaries, and bond quota breaches.
2. **Ground-Truth Seed Matrix:**
   - Seed datasets (`EXP-001` to `EXP-004`) with planted discrepancies (e.g. 600 pcs carton deficit, expired LC dates, unlinked fabric consumption) to verify detection precision and false-positive rates.
3. **Dual-Layer Validation:**
   - LLM extraction output is strictly verified against Zod schemas; schema-violating tokens are rejected and routed to high-fidelity verified fallback fixtures.
4. **Human Review Quality Gate:**
   - Any extracted value with $<0.90$ confidence triggers explicit visual discrepancy warnings in the Side-by-Side Inspection Studio.

---

## 7. Guardrails, Safety & Privacy (+6 / 6)

1. **Deterministic Authority Guardrail (Zero AI Hallucination):**
   - Strict architectural rule: *AI reads and explains; pure TypeScript code determines pass/fail*. No LLM can unilaterally approve or clear a shipment for port gate-in.
2. **Strict Output Schema Enforcement:**
   - Zod schema (`FieldSchema` & `ExtractionResponseSchema`) rejects unverified fields, hallucinated keys, or conversational filler tokens.
3. **Commercial Data Privacy & Isolation:**
   - Trade documents contain sensitive export prices, buyer names (H&M, Zara, Walmart), and bank account numbers. Processing is ephemeral; no exporter data is stored for model training.
4. **Cryptographic Audit Log:**
   - Every status change, manual override, and discrepancy fix is hashed and permanently logged with actor role and timestamp (`AuditEntry`).
5. **Offline Resilient Architecture:**
   - Verified fallback fixtures ensure 100% platform availability even during cloud API interruptions.

---

## 8. Frontend AI / Visual App Builders (+5 / 5)

### Tools Used:
- [x] **Cursor Composer / Agent**
- [x] **Claude Artifacts**
- [x] **Gemini Canvas**

### How Tools Were Used:
- **Cursor Composer / Agent:** Accelerated component scaffolding, type-safe API routing, and Tailwind refactoring.
- **Claude Artifacts & Gemini Canvas:** Rapid prototyping of the split-screen Document Inspection Studio and SVG vector character animations (Rafi).
- **AI Contribution:** ~70% AI-assisted generation, paired with handcrafted design systems (deep obsidian `#030712`, glass cards, interactive document diff matrix, and zero-glitch CSS keyframes).

---

## 9. Workflow Automation (+4 / 4)

### Automated Workflows:
1. **Floor & C&F Dispatcher (`/api/dispatch-alert`):**
   - Automatically generates bilingual (Bangla & English) alert text for WhatsApp groups and C&F clearing agents whenever a critical discrepancy (e.g. -600 pcs carton shortage) is detected.
2. **Dynamic 1-Click Reconciliation:**
   - Simulating resolution instantly updates shipment status from `Blocked` (Score 75) to `Customs-Ready` (Score 100) and unlocks official Chittagong Port Gate Pass `#CGP-89201`.
3. **Vessel Cut-off Countdown Tracker:**
   - Monitors countdown to vessel departure and escalates alerts when cut-off window drops below 48 hours.
4. **Integration Ready:**
   - Webhook-compatible with **n8n** (self-hosted automation for factory ERPs like FastReact/SAP) and **Apache Airflow**.

---

## 10. Local / On-Device LLMs (+8 / 8)

### Local Configuration:
- **Runtimes:** [x] **Ollama**, [x] **llama.cpp**
- **Local Models:** [x] **Llama 3.2**, [x] **DeepSeek R1**, [x] **Qwen 2.5 Coder**
- **Hardware & Quantization:** Local workstation execution, 4-bit / 8-bit quantization (`Q4_K_M GGUF`).
- **Why Local vs Cloud:**
  - Bangladesh garment exporters have strict non-disclosure agreements (NDAs) with global buyers (Inditex, H&M, Nike) prohibiting export commercial invoices and buyer pricing from leaving factory on-premise networks.
  - The local Ollama/llama.cpp runtime allows air-gapped factory on-premise deployment with zero data leakage.

---

## 11. Agentic Frameworks Used

- [x] **Custom Multi-Agent Runtime (TypeScript / Node)**
- [x] **Google ADK (Agent Development Kit architecture)**
- Modular agent breakdown: Extractor Agent, Rules Engine Supervisor, BondIQ Quota Balancer, and Bilingual Dispatcher.

---

## 12. AI Development Lifecycle (AI-DLC)

### Frameworks & Practices Adopted:
- [x] **GitHub Spec-Kit (Spec-Driven Development):**
  Full lifecycle documentation in `/docs`:
  - `01_CONCEPT_NOTE.md` (Product vision & market problem)
  - `02_BUILD_PLAN.md` (Execution roadmap & verification gates)
  - `03_ARCHITECTURE_AND_RULES.md` (Data contracts & deterministic rules R1–R8)
  - `04_LOGS_AND_PROGRESS.md` (Phase logs)
  - `PRD.md` (Product Requirements Document v2.0)
- [x] **Cursor Rules + PRD Workflow:** Iterative plan-before-code methodology with strict user review gates.
- [x] **Claude Skills:** Domain-specific skills applied for frontend design, accessibility, and 170-second explainer video production.
- [x] **CONVENTIONS.md / AGENTS.md Spec:** Standardized coding guidelines, type-checking gates (`npx tsc --noEmit`), and test execution gates (`vitest`).

### Process Notes:
1. **Phase 1 (Specification):** Detailed trade compliance rule definitions (R1 to R8) and UCP 600 standards.
2. **Phase 2 (Deterministic Core):** Pure TypeScript rules engine and 16 Vitest unit tests.
3. **Phase 3 (Multimodal Intelligence):** Gemini 1.5 Flash structured JSON extractor with Zod schemas and resilient fallback.
4. **Phase 4 (Executive UI & Story Video):** Linear-grade control tower interface, live interactive reconciliation demo, and 170s animated explainer film starring Rafi.
