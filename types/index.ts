export type ShipmentStatus = 'Blocked' | 'At risk' | 'Customs-ready';
export type Severity = 'Critical' | 'Warning';

export type DocumentType = 
  | 'PO' 
  | 'LC' 
  | 'Commercial Invoice' 
  | 'Packing List' 
  | 'Certificate of Origin';

export interface ExtractedField {
  name: string;
  value: string | number;
  confidence: number; // 0.0 - 1.0
  sourceSnippet: string;
}

export interface Document {
  id: string;
  shipmentId: string;
  type: DocumentType;
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

export interface RuleSourceField {
  field: string;
  docType: string;
  value: string | number | null;
}

export interface RuleResult {
  ruleId: string;
  name: string;
  passed: boolean;
  severity: Severity;
  explanation: string;
  sourceFields: RuleSourceField[];
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
  shipmentDate: string;
  status: ShipmentStatus;
  bankReadyScore: number;
  bondRecord: BondRecord;
  documents: Document[];
  timeline: TimelineEvent[];
  auditLog: AuditEntry[];
  ruleResults?: RuleResult[];
}

// Enterprise Additions:

export interface BuyerComplianceRule {
  id: string;
  buyer: 'H&M' | 'Zara / Inditex' | 'Target' | 'Walmart' | 'General';
  ruleName: string;
  category: 'Carton Specs' | 'Labeling & RFID' | 'Ratio Packing' | 'Documentation';
  passed: boolean;
  requirement: string;
  actual: string;
  severity: Severity;
}

export interface FabricCalculationParams {
  orderQuantityPcs: number;
  gsm: number;
  consumptionPerDznKg: number; // e.g. 2.4 kg per dozen
  wastagePercent: number; // e.g. 5%
  approvedUdQuotaKg: number;
}

export interface FabricCalculationResult {
  fabricNetKg: number;
  wastageKg: number;
  totalFabricRequiredKg: number;
  approvedUdQuotaKg: number;
  quotaBalanceKg: number;
  isExceeded: boolean;
  utilizationRatePercent: number;
  summary: string;
}

export interface DiscrepancyDispatchAlert {
  shipmentId: string;
  severity: Severity;
  titleEn: string;
  titleBn: string;
  messageEn: string;
  messageBn: string;
  whatsappFormatted: string;
  emailFormatted: string;
  suggestedActionEn: string;
  suggestedActionBn: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceBdt: number;
  priceUsd: number;
  billingPeriod: string;
  shipmentLimit: string;
  features: string[];
  recommended?: boolean;
}
