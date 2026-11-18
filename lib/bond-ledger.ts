import { FabricCalculationParams, FabricCalculationResult } from '../types';

/**
 * Calculates industrial fabric consumption for RMG exports based on
 * garment dozens, GSM, consumption rate, and standard cutting wastage.
 */
export function calculateFabricConsumption(params: FabricCalculationParams): FabricCalculationResult {
  const {
    orderQuantityPcs,
    consumptionPerDznKg,
    wastagePercent = 5,
    approvedUdQuotaKg,
  } = params;

  // Garment dozens: pieces / 12
  const dozens = orderQuantityPcs / 12;

  // Net fabric required without cutting allowance
  const fabricNetKg = Math.round(dozens * consumptionPerDznKg * 100) / 100;

  // Standard cutting & knitting wastage allowance (e.g. 5%)
  const wastageKg = Math.round(fabricNetKg * (wastagePercent / 100) * 100) / 100;

  // Total fabric required
  const totalFabricRequiredKg = Math.round((fabricNetKg + wastageKg) * 100) / 100;

  // Quota comparison
  const quotaBalanceKg = Math.round((approvedUdQuotaKg - totalFabricRequiredKg) * 100) / 100;
  const isExceeded = totalFabricRequiredKg > approvedUdQuotaKg;
  const utilizationRatePercent = Math.round((totalFabricRequiredKg / approvedUdQuotaKg) * 100);

  let summary = '';
  if (isExceeded) {
    const deficit = Math.abs(quotaBalanceKg);
    summary = `OVER-CONSUMPTION: Total required fabric (${totalFabricRequiredKg.toLocaleString()} kg) exceeds approved UD entitlement (${approvedUdQuotaKg.toLocaleString()} kg) by ${deficit.toLocaleString()} kg (${utilizationRatePercent}% quota utilized). Customs hold risk!`;
  } else {
    summary = `RECONCILED: Fabric consumption (${totalFabricRequiredKg.toLocaleString()} kg) is within approved BGMEA UD quota (${approvedUdQuotaKg.toLocaleString()} kg) with ${quotaBalanceKg.toLocaleString()} kg reserve remaining (${utilizationRatePercent}% utilized).`;
  }

  return {
    fabricNetKg,
    wastageKg,
    totalFabricRequiredKg,
    approvedUdQuotaKg,
    quotaBalanceKg,
    isExceeded,
    utilizationRatePercent,
    summary,
  };
}

/**
 * Default garment type presets for rapid factory estimation
 */
export const GARMENT_FABRIC_PRESETS = [
  { name: "Basic T-Shirt (160 GSM)", consumptionPerDznKg: 2.4, defaultWastage: 5 },
  { name: "Polo Shirt (220 GSM Pique)", consumptionPerDznKg: 3.8, defaultWastage: 6 },
  { name: "Hoodie / Sweatshirt (320 GSM Fleece)", consumptionPerDznKg: 7.2, defaultWastage: 7 },
  { name: "Denim Jeans (12 oz Woven)", consumptionPerDznKg: 8.5, defaultWastage: 8 },
  { name: "Men's Woven Dress Shirt", consumptionPerDznKg: 2.1, defaultWastage: 5 },
];
