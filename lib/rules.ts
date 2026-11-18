import { Shipment, RuleResult, ShipmentStatus, Severity, Document } from '../types';

export function getDocumentByType(shipment: Shipment, type: string): Document | undefined {
  return shipment.documents.find((d) => d.type === type);
}

export function getFieldValue(doc: Document | undefined, fieldName: string): any {
  if (!doc || !doc.fields || !doc.fields[fieldName]) return null;
  return doc.fields[fieldName].value;
}

/**
 * R1 (Critical): Invoice quantity equals packing-list quantity
 */
export function checkR1_QuantityMatch(shipment: Shipment): RuleResult {
  const inv = getDocumentByType(shipment, 'Commercial Invoice');
  const pl = getDocumentByType(shipment, 'Packing List');

  const invQty = inv ? Number(getFieldValue(inv, 'totalQuantity')) : null;
  const plQty = pl ? Number(getFieldValue(pl, 'totalQuantity')) : null;

  const passed = invQty !== null && plQty !== null && invQty === plQty;

  let explanation = '';
  if (invQty === null || plQty === null) {
    explanation = 'Quantity missing in Commercial Invoice or Packing List.';
  } else if (!passed) {
    explanation = `Invoice specifies ${invQty.toLocaleString()} pcs, but Packing List specifies ${plQty.toLocaleString()} pcs (discrepancy of ${Math.abs(invQty - plQty).toLocaleString()} pcs).`;
  } else {
    explanation = `Commercial Invoice quantity (${invQty.toLocaleString()} pcs) exactly matches Packing List.`;
  }

  return {
    ruleId: 'R1',
    name: 'Invoice & Packing List Quantity Match',
    severity: 'Critical',
    passed,
    explanation,
    sourceFields: [
      { field: 'totalQuantity', docType: 'Commercial Invoice', value: invQty },
      { field: 'totalQuantity', docType: 'Packing List', value: plQty },
    ],
  };
}

/**
 * R2 (Critical): Invoice value does not exceed LC value plus tolerance
 */
export function checkR2_ValueTolerance(shipment: Shipment): RuleResult {
  const inv = getDocumentByType(shipment, 'Commercial Invoice');
  const lc = getDocumentByType(shipment, 'LC');

  const invVal = inv ? Number(getFieldValue(inv, 'invoiceAmount')) : null;
  const lcVal = lc ? Number(getFieldValue(lc, 'lcAmount')) : null;
  const tolerancePct = lc ? Number(getFieldValue(lc, 'tolerancePercentage') || 5) : 5;

  let passed = true;
  let explanation = '';

  if (invVal === null || lcVal === null) {
    passed = false;
    explanation = 'Invoice amount or LC value not found in documents.';
  } else {
    const maxAllowed = lcVal * (1 + tolerancePct / 100);
    passed = invVal <= maxAllowed;
    if (passed) {
      explanation = `Invoice amount ($${invVal.toLocaleString()}) is within LC ceiling ($${maxAllowed.toLocaleString()} with ${tolerancePct}% tolerance).`;
    } else {
      explanation = `Invoice amount ($${invVal.toLocaleString()}) exceeds LC ceiling ($${maxAllowed.toLocaleString()} with ${tolerancePct}% tolerance).`;
    }
  }

  return {
    ruleId: 'R2',
    name: 'Invoice Value vs LC Value & Tolerance',
    severity: 'Critical',
    passed,
    explanation,
    sourceFields: [
      { field: 'invoiceAmount', docType: 'Commercial Invoice', value: invVal },
      { field: 'lcAmount', docType: 'LC', value: lcVal },
    ],
  };
}

/**
 * R3 (Critical): Buyer on PO matches consignee on invoice
 */
export function checkR3_BuyerConsigneeMatch(shipment: Shipment): RuleResult {
  const po = getDocumentByType(shipment, 'PO');
  const inv = getDocumentByType(shipment, 'Commercial Invoice');

  const poBuyer = po ? String(getFieldValue(po, 'buyerName') || '').trim() : '';
  const invConsignee = inv ? String(getFieldValue(inv, 'consigneeName') || '').trim() : '';

  const cleanPo = poBuyer.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanInv = invConsignee.toLowerCase().replace(/[^a-z0-9]/g, '');

  const passed = cleanPo.length > 0 && cleanInv.length > 0 && cleanPo === cleanInv;

  let explanation = '';
  if (!poBuyer || !invConsignee) {
    explanation = 'Buyer on PO or Consignee on Invoice is unspecified.';
  } else if (!passed) {
    explanation = `PO buyer ("${poBuyer}") does not match Invoice consignee ("${invConsignee}").`;
  } else {
    explanation = `Buyer entity matches across PO and Commercial Invoice ("${poBuyer}").`;
  }

  return {
    ruleId: 'R3',
    name: 'Buyer & Consignee Entity Match',
    severity: 'Critical',
    passed,
    explanation,
    sourceFields: [
      { field: 'buyerName', docType: 'PO', value: poBuyer },
      { field: 'consigneeName', docType: 'Commercial Invoice', value: invConsignee },
    ],
  };
}

/**
 * R4 (Critical): Shipment date is on or before the LC latest shipment date
 */
export function checkR4_ShipmentWindow(shipment: Shipment): RuleResult {
  const lc = getDocumentByType(shipment, 'LC');
  const inv = getDocumentByType(shipment, 'Commercial Invoice');

  const lcLatestStr = lc ? String(getFieldValue(lc, 'latestShipmentDate') || '') : '';
  const actualShipStr = inv ? String(getFieldValue(inv, 'shipmentDate') || shipment.shipmentDate || '') : shipment.shipmentDate;

  let passed = false;
  let explanation = '';

  if (!lcLatestStr || !actualShipStr) {
    passed = false;
    explanation = 'Missing shipment date or LC latest shipment date.';
  } else {
    const lcLatest = new Date(lcLatestStr);
    const actualShip = new Date(actualShipStr);

    if (isNaN(lcLatest.getTime()) || isNaN(actualShip.getTime())) {
      passed = false;
      explanation = `Invalid date format in LC (${lcLatestStr}) or Invoice (${actualShipStr}).`;
    } else {
      passed = actualShip <= lcLatest;
      if (passed) {
        explanation = `Shipment date (${actualShipStr}) is within LC allowed cutoff (${lcLatestStr}).`;
      } else {
        explanation = `Shipment date (${actualShipStr}) is past the LC cutoff date (${lcLatestStr}). Delayed delivery risks LC rejection!`;
      }
    }
  }

  return {
    ruleId: 'R4',
    name: 'LC Latest Shipment Date Compliance',
    severity: 'Critical',
    passed,
    explanation,
    sourceFields: [
      { field: 'shipmentDate', docType: 'Commercial Invoice', value: actualShipStr },
      { field: 'latestShipmentDate', docType: 'LC', value: lcLatestStr },
    ],
  };
}

/**
 * R5 (Critical): Required documents are present (PO, LC, invoice, packing list, COO)
 */
export function checkR5_RequiredDocuments(shipment: Shipment): RuleResult {
  const requiredTypes = [
    'PO',
    'LC',
    'Commercial Invoice',
    'Packing List',
    'Certificate of Origin',
  ];

  const presentTypes = new Set(shipment.documents.map((d) => d.type));
  const missing = requiredTypes.filter((t) => !presentTypes.has(t as any));

  const passed = missing.length === 0;
  const explanation = passed
    ? 'All 5 mandatory documents (PO, LC, Invoice, Packing List, Certificate of Origin) are attached.'
    : `Missing mandatory export document(s): ${missing.join(', ')}.`;

  return {
    ruleId: 'R5',
    name: 'Mandatory Export Document Completeness',
    severity: 'Critical',
    passed,
    explanation,
    sourceFields: [
      { field: 'documentsCount', docType: 'Shipment', value: `${presentTypes.size}/5 Present` },
    ],
  };
}

/**
 * R6 (Warning): Container number appears on the packing list
 */
export function checkR6_ContainerOnPackingList(shipment: Shipment): RuleResult {
  const pl = getDocumentByType(shipment, 'Packing List');
  const container = pl ? String(getFieldValue(pl, 'containerNumber') || '').trim() : '';

  const passed = container.length > 0 && container !== 'TBD' && container !== 'N/A';
  const explanation = passed
    ? `Container number "${container}" is recorded on Packing List.`
    : 'Container number is missing or unassigned on Packing List. Customs inspection delay risk!';

  return {
    ruleId: 'R6',
    name: 'Container Number on Packing List',
    severity: 'Warning',
    passed,
    explanation,
    sourceFields: [
      { field: 'containerNumber', docType: 'Packing List', value: container || 'Missing' },
    ],
  };
}

/**
 * R7 (Warning): HS code is present and consistent across documents
 */
export function checkR7_HsCodeConsistency(shipment: Shipment): RuleResult {
  const inv = getDocumentByType(shipment, 'Commercial Invoice');
  const pl = getDocumentByType(shipment, 'Packing List');
  const coo = getDocumentByType(shipment, 'Certificate of Origin');

  const invHs = inv ? String(getFieldValue(inv, 'hsCode') || '').trim() : '';
  const plHs = pl ? String(getFieldValue(pl, 'hsCode') || '').trim() : '';
  const cooHs = coo ? String(getFieldValue(coo, 'hsCode') || '').trim() : '';

  const codes = [invHs, plHs, cooHs].filter(Boolean);
  const allPresent = Boolean(invHs && plHs);
  const allMatch = codes.length > 0 && codes.every((c) => c === codes[0]);

  const passed = Boolean(allPresent && allMatch);
  let explanation = '';

  if (!invHs || !plHs) {
    explanation = 'HS Code is missing from Invoice or Packing List.';
  } else if (!allMatch) {
    explanation = `HS Code mismatch across documents: Invoice (${invHs}), Packing List (${plHs})${cooHs ? `, COO (${cooHs})` : ''}.`;
  } else {
    explanation = `HS Code (${invHs}) is consistent across all documents.`;
  }

  return {
    ruleId: 'R7',
    name: 'HS Code Uniformity Across Trade Documents',
    severity: 'Warning',
    passed,
    explanation,
    sourceFields: [
      { field: 'hsCode', docType: 'Commercial Invoice', value: invHs || null },
      { field: 'hsCode', docType: 'Packing List', value: plHs || null },
    ],
  };
}

/**
 * R8 (Critical): Bond: fabric consumed does not exceed quantity linked to an approved UD
 */
export function checkR8_BondUdQuota(shipment: Shipment): RuleResult {
  const bond = shipment.bondRecord;

  if (!bond) {
    return {
      ruleId: 'R8',
      name: 'BondIQ Raw Material & UD Quota Entitlement',
      severity: 'Critical',
      passed: false,
      explanation: 'No bonded warehouse record associated with this shipment.',
      sourceFields: [],
    };
  }

  const consumed = bond.fabricConsumedKg;
  const linked = bond.udLinkedQuantityKg;
  const diff = consumed - linked;

  const passed = consumed <= linked;
  let explanation = '';

  if (passed) {
    explanation = `Fabric consumption (${consumed.toLocaleString()} kg) is fully reconciled within approved UD #${bond.udNumber} (${linked.toLocaleString()} kg entitlement).`;
  } else {
    explanation = `This shipment cannot be declared export-ready because ${diff.toLocaleString()} kg of fabric consumption is unlinked to any approved UD! (Used: ${consumed.toLocaleString()} kg, Approved: ${linked.toLocaleString()} kg)`;
  }

  return {
    ruleId: 'R8',
    name: 'BondIQ Raw Material & UD Quota Entitlement',
    severity: 'Critical',
    passed,
    explanation,
    sourceFields: [
      { field: 'fabricConsumedKg', docType: 'BondRecord', value: `${consumed.toLocaleString()} kg` },
      { field: 'udLinkedQuantityKg', docType: 'BondRecord', value: `${linked.toLocaleString()} kg` },
      { field: 'udNumber', docType: 'BondRecord', value: bond.udNumber },
    ],
  };
}

/**
 * Run all 8 rules on a shipment
 */
export function evaluateShipmentRules(shipment: Shipment): RuleResult[] {
  return [
    checkR1_QuantityMatch(shipment),
    checkR2_ValueTolerance(shipment),
    checkR3_BuyerConsigneeMatch(shipment),
    checkR4_ShipmentWindow(shipment),
    checkR5_RequiredDocuments(shipment),
    checkR6_ContainerOnPackingList(shipment),
    checkR7_HsCodeConsistency(shipment),
    checkR8_BondUdQuota(shipment),
  ];
}

/**
 * Compute overall status based on rule results
 */
export function computeShipmentStatus(results: RuleResult[]): ShipmentStatus {
  const hasCriticalFailure = results.some((r) => !r.passed && r.severity === 'Critical');
  if (hasCriticalFailure) return 'Blocked';

  const hasWarningFailure = results.some((r) => !r.passed && r.severity === 'Warning');
  if (hasWarningFailure) return 'At risk';

  return 'Customs-ready';
}

/**
 * Compute Bank-Ready Score (0-100)
 */
export function computeBankReadyScore(results: RuleResult[]): number {
  let score = 100;
  for (const r of results) {
    if (!r.passed) {
      if (r.severity === 'Critical') {
        score -= 25;
      } else if (r.severity === 'Warning') {
        score -= 10;
      }
    }
  }
  return Math.max(0, Math.min(100, score));
}
