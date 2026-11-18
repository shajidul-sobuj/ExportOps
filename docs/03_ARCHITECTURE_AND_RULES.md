# ExportOps AI: Architecture & Rules Engine Specification

## 1. Data Models

```typescript
export type ShipmentStatus = 'Blocked' | 'At risk' | 'Customs-ready';
export type Severity = 'Critical' | 'Warning';

export interface ExtractedField {
  name: string;
  value: string | number;
  confidence: number; // 0.0 - 1.0
  sourceSnippet: string;
}

export interface Document {
  id: string;
  shipmentId: string;
  type: 'PO' | 'LC' | 'Commercial Invoice' | 'Packing List' | 'Certificate of Origin';
  fileName: string;
  uploadedAt: string;
  fields: Record<string, ExtractedField>;
}

export interface BondRecord {
  shipmentId: string;
  udNumber: string;
  fabricConsumedKg: number;
  udLinkedQuantityKg: number;
  status: 'Approved' | 'Pending' | 'Exceeded';
}

export interface RuleResult {
  ruleId: string;
  name: string;
  passed: boolean;
  severity: Severity;
  explanation: string;
  sourceFields: {
    field: string;
    docType: string;
    value: string | number | null;
  }[];
}

export interface TimelineEvent {
  id: string;
  shipmentId: string;
  milestone: string;
  owner: string;
  due: string;
  completed: boolean;
}

export interface AuditEntry {
  id: string;
  shipmentId: string;
  actor: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface Shipment {
  id: string;
  buyer: string;
  supplier: string;
  poNumber: string;
  lcId: string;
  containerNumber: string;
  vesselCutoff: string;
  status: ShipmentStatus;
  bankReadyScore: number;
  bondRecord: BondRecord;
  documents: Document[];
  timeline: TimelineEvent[];
  auditLog: AuditEntry[];
  ruleResults?: RuleResult[];
}
```

---

## 2. Rules Specification (R1 - R8)

| ID | Name | Severity | Condition for Pass |
| --- | --- | --- | --- |
| **R1** | Quantity Reconciliation | Critical | Commercial Invoice Quantity == Packing List Total Quantity |
| **R2** | Value & LC Tolerance | Critical | Commercial Invoice Total Value <= LC Amount * (1 + Tolerance %) |
| **R3** | Entity Alignment | Critical | Buyer specified on PO == Consignee on Commercial Invoice |
| **R4** | Shipment Window Validity | Critical | Actual/Planned Shipment Date <= LC Latest Shipment Date |
| **R5** | Document Completeness | Critical | All mandatory documents present: PO, LC, Invoice, Packing List, COO |
| **R6** | Container Verification | Warning | Container number explicitly specified on Packing List |
| **R7** | HS Code Consistency | Warning | HS Code present and identical across Invoice, Packing List, and COO |
| **R8** | BondIQ Entitlement Check | Critical | Fabric Consumed (kg) <= Approved UD-Linked Entitlement Quantity (kg) |

---

## 3. Status & Scoring Engine

### Status Logic:
- **`Blocked`**: Any failed rule with `Critical` severity.
- **`At risk`**: Zero critical failures, but 1 or more failed rules with `Warning` severity.
- **`Customs-ready`**: 100% of evaluated rules passed.

### Bank-Ready Score:
- Base: 100 points
- Deductions:
  - `-25 points` per failed `Critical` rule.
  - `-10 points` per failed `Warning` rule.
- Minimum score: `0`.
- Max score: `100`.

---

## 4. Seed Data Matrix

| Shipment ID | Planted Issue | Expected Status | Expected Score |
| --- | --- | --- | --- |
| `EXP-001` | Invoice Qty (12,000 pcs) != Packing List (11,400 pcs) | **Blocked** | 75 |
| `EXP-002` | Shipment Date (Nov 24) > LC Cutoff (Nov 15) & Missing COO | **Blocked** | 50 |
| `EXP-003` | Fabric Consumed (18,500 kg) > UD Quota (16,000 kg) | **Blocked** | 75 |
| `EXP-004` | Container Number missing on Packing List | **At risk** | 90 |
| `EXP-005` | Clean documentation, all matched | **Customs-ready** | 100 |
