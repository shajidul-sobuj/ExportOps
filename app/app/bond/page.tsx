'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Calculator, CheckCircle2, Scale } from 'lucide-react';
import { getShipments } from '@/lib/data';
import { calculateFabricConsumption, GARMENT_FABRIC_PRESETS } from '@/lib/bond-ledger';
import { Badge, Card, CardHeader, KPIStat, PageHeader, UtilizationBar } from '@/components/ui';
import { cn, formatNumber } from '@/lib/utils';

function NumberField({
  label,
  value,
  onChange,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="text-[13px] text-ink-3">{label}</span>
      <div className="mt-1 relative">
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full h-9 px-3 pr-12 rounded-lg bg-app border border-line-strong text-sm text-ink-1 tabular-nums outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-3">{suffix}</span>}
      </div>
    </label>
  );
}

export default function BondIQPage() {
  const shipments = useMemo(() => getShipments(), []);
  const ledger = shipments.map((s) => {
    const b = s.bondRecord;
    const pct = (b.fabricConsumedKg / b.udLinkedQuantityKg) * 100;
    return { ...b, buyer: s.buyer, pct, balance: b.udLinkedQuantityKg - b.fabricConsumedKg };
  });

  const totals = ledger.reduce(
    (a, r) => ({ approved: a.approved + r.udLinkedQuantityKg, consumed: a.consumed + r.fabricConsumedKg }),
    { approved: 0, consumed: 0 }
  );
  const exceeded = ledger.filter((r) => r.pct > 100).length;
  const nearLimit = ledger.filter((r) => r.pct > 90 && r.pct <= 100).length;

  // Calculator state
  const [presetIdx, setPresetIdx] = useState(0);
  const [qty, setQty] = useState(12000);
  const [consumption, setConsumption] = useState(GARMENT_FABRIC_PRESETS[0].consumptionPerDznKg);
  const [wastage, setWastage] = useState(GARMENT_FABRIC_PRESETS[0].defaultWastage);
  const [quota, setQuota] = useState(2600);

  const result = calculateFabricConsumption({
    orderQuantityPcs: qty,
    gsm: 0,
    consumptionPerDznKg: consumption,
    wastagePercent: wastage,
    approvedUdQuotaKg: quota || 1,
  });

  const applyPreset = (i: number) => {
    setPresetIdx(i);
    setConsumption(GARMENT_FABRIC_PRESETS[i].consumptionPerDznKg);
    setWastage(GARMENT_FABRIC_PRESETS[i].defaultWastage);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <PageHeader
        title="BondIQ"
        description="Bonded fabric against approved BGMEA Utilization Declaration (UD) quotas. Rule R8 blocks any shipment that goes over quota."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPIStat label="Approved UD quota" value={`${formatNumber(totals.approved)} kg`} icon={Scale} />
        <KPIStat label="Fabric consumed" value={`${formatNumber(totals.consumed)} kg`} hint={`${Math.round((totals.consumed / totals.approved) * 100)}% of total quota`} />
        <KPIStat label="Near limit (> 90%)" value={nearLimit} tone="warning" icon={AlertTriangle} />
        <KPIStat label="Exceeded" value={exceeded} tone={exceeded ? 'danger' : 'success'} icon={exceeded ? AlertTriangle : CheckCircle2} hint="Customs bond penalty risk" />
      </div>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Ledger */}
        <Card className="xl:col-span-3 overflow-hidden">
          <CardHeader title="UD ledger" description="One row per Utilization Declaration" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-3 border-y border-line">
                  <th className="px-5 py-2.5 font-medium">UD number</th>
                  <th className="px-3 py-2.5 font-medium">Shipment</th>
                  <th className="px-3 py-2.5 font-medium text-right">Approved</th>
                  <th className="px-3 py-2.5 font-medium text-right">Consumed</th>
                  <th className="px-3 py-2.5 font-medium text-right hidden md:table-cell">Balance</th>
                  <th className="px-5 py-2.5 font-medium w-[180px]">Utilisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ledger.map((r) => (
                  <tr key={r.udNumber} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-mono text-xs text-ink-1">{r.udNumber}</td>
                    <td className="px-3 py-3">
                      <Link href={`/app/shipments/${r.shipmentId}`} className="font-mono text-xs text-ink-2 hover:text-emerald-300">{r.shipmentId}</Link>
                      <div className="text-xs text-ink-3 truncate max-w-[160px]">{r.buyer}</div>
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums text-ink-2">{formatNumber(r.udLinkedQuantityKg)}</td>
                    <td className="px-3 py-3 text-right tabular-nums text-ink-2">{formatNumber(r.fabricConsumedKg)}</td>
                    <td className={cn('px-3 py-3 text-right tabular-nums hidden md:table-cell', r.balance < 0 ? 'text-rose-300' : 'text-ink-2')}>
                      {r.balance < 0 ? '−' : ''}{formatNumber(Math.abs(r.balance))}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <UtilizationBar percent={r.pct} />
                        <span className={cn('text-xs tabular-nums w-10 text-right', r.pct > 100 ? 'text-rose-300' : r.pct > 90 ? 'text-amber-300' : 'text-ink-3')}>
                          {Math.round(r.pct)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Calculator */}
        <Card className="xl:col-span-2">
          <CardHeader title="Fabric requirement calculator" description="Check an order against its UD before cutting starts" action={<Calculator className="w-4 h-4 text-ink-3" />} />
          <div className="px-5 pb-5 space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {GARMENT_FABRIC_PRESETS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(i)}
                  className={cn(
                    'h-7 px-2.5 rounded-md text-xs border transition-colors',
                    presetIdx === i ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-line-strong text-ink-3 hover:text-ink-1'
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <NumberField label="Order quantity" value={qty} onChange={setQty} suffix="pcs" step={100} />
              <NumberField label="Consumption / dozen" value={consumption} onChange={setConsumption} suffix="kg" step={0.1} />
              <NumberField label="Wastage" value={wastage} onChange={setWastage} suffix="%" step={0.5} />
              <NumberField label="Approved UD quota" value={quota} onChange={setQuota} suffix="kg" step={50} />
            </div>

            <div className="rounded-lg border border-line bg-app p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-ink-3">Net fabric ({formatNumber(Math.round(qty / 12))} dz × {consumption} kg)</span><span className="tabular-nums text-ink-1">{formatNumber(result.fabricNetKg)} kg</span></div>
              <div className="flex justify-between"><span className="text-ink-3">+ Wastage {wastage}%</span><span className="tabular-nums text-ink-1">{formatNumber(result.wastageKg)} kg</span></div>
              <div className="flex justify-between pt-2 border-t border-line font-medium"><span className="text-ink-2">Total required</span><span className="tabular-nums text-ink-1">{formatNumber(result.totalFabricRequiredKg)} kg</span></div>
              <div className="pt-2">
                <UtilizationBar percent={result.utilizationRatePercent} />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-ink-3">{result.utilizationRatePercent}% of quota</span>
                  {result.isExceeded ? (
                    <Badge tone="danger"><AlertTriangle className="w-3.5 h-3.5" /> Over by {formatNumber(Math.abs(result.quotaBalanceKg))} kg</Badge>
                  ) : (
                    <Badge tone="success"><CheckCircle2 className="w-3.5 h-3.5" /> {formatNumber(result.quotaBalanceKg)} kg reserve</Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-ink-3">Formula: (pieces ÷ 12) × consumption per dozen × (1 + wastage %). The same formula as <code className="font-mono">lib/bond-ledger.ts</code>, so results match rule R8.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
