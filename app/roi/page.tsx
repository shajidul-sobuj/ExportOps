'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Calculator,
  Building,
  CheckCircle2,
  FileCheck,
  CreditCard,
  X
} from 'lucide-react';
import { PricingPlan } from '@/types';

export default function FactoryRoiPage() {
  const [monthlyContainers, setMonthlyContainers] = useState<number>(20);
  const [avgDemurrageCost, setAvgDemurrageCost] = useState<number>(3500);
  const [errorRatePercent, setErrorRatePercent] = useState<number>(15);
  const [selectedPlan, setSelectedPlan] = useState<string>('growth');
  const [showPilotModal, setShowPilotModal] = useState<boolean>(false);
  const [pilotSuccess, setPilotSuccess] = useState<boolean>(false);

  // ROI Math
  const delayedShipmentsPerMonth = Math.max(1, Math.round(monthlyContainers * (errorRatePercent / 100)));
  const monthlySavings = delayedShipmentsPerMonth * avgDemurrageCost;
  const annualSavings = monthlySavings * 12;
  const annualHoursSaved = Math.round(monthlyContainers * 4.5 * 12);

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter Exporter',
      tagline: 'Ideal for single factories managing up to 10 export containers/month.',
      priceBdt: 30000,
      priceUsd: 250,
      billingPeriod: 'month',
      shipmentLimit: 'Up to 10 Shipments / Month',
      features: [
        '8-point compliance rules engine',
        'Commercial Invoice & Packing list validation',
        'Basic document extraction (PDF/text)',
        'Bank-Ready scoring & status badges',
        'Standard email support',
      ],
    },
    {
      id: 'growth',
      name: 'Growth Manufacturer',
      tagline: 'Best for mid-to-large garment factories and active C&F clearing agents.',
      priceBdt: 75000,
      priceUsd: 625,
      billingPeriod: 'month',
      shipmentLimit: 'Unlimited Shipments',
      recommended: true,
      features: [
        'Everything in Starter',
        'BondIQ Raw Material & UD Quota Ledger',
        'Instant WhatsApp & Email floor dispatch alerts',
        'Global Buyer Compliance Rulebook (H&M, Zara, Target)',
        'Side-by-side Document Inspection Studio',
        'Customs Gate-In Pass generation & printing',
        'Priority phone & WhatsApp onboarding',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Apparel Group',
      tagline: 'For garment conglomerates, buying houses, and multi-unit factory groups.',
      priceBdt: 200000,
      priceUsd: 1650,
      billingPeriod: 'month',
      shipmentLimit: 'Multi-Factory Group Access',
      features: [
        'Everything in Growth',
        'Multi-tenant factory management (up to 10 units)',
        'Custom ASYCUDA World & ERP API webhooks',
        'Dedicated trade compliance account manager',
        'Custom buyer rulebook creation',
        'SLA 99.9% uptime guarantee with on-premise option',
      ],
    },
  ];

  const activePlanObj = plans.find((p) => p.id === selectedPlan) || plans[1];
  const annualCostUsd = activePlanObj.priceUsd * 12;
  const netRoiMultiple = Math.max(1, Math.round(annualSavings / annualCostUsd));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Proven Factory ROI & Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          One Avoided Delay Pays For An Entire Year
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Garment export delays at Chittagong Port cost thousands in demurrage, air-freight penalties, and bank disputes. 
          See how much your factory saves every single month with ExportOps AI.
        </p>
      </div>

      {/* Interactive ROI Calculator */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Interactive Factory Savings Calculator</h2>
            <p className="text-xs text-slate-500">Adjust the sliders to match your factory's monthly shipment volume.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Monthly Shipments */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Monthly Export Containers:</span>
                <span className="font-mono font-bold text-base text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {monthlyContainers} Containers / Mo
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={monthlyContainers}
                onChange={(e) => setMonthlyContainers(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 Containers (Small)</span>
                <span>40 Containers (Mid-Size)</span>
                <span>80+ Containers (Group)</span>
              </div>
            </div>

            {/* Slider 2: Average Demurrage / Penalty Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Avg Cost per Delayed Container:</span>
                <span className="font-mono font-bold text-base text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  ${avgDemurrageCost.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="7500"
                step="500"
                value={avgDemurrageCost}
                onChange={(e) => setAvgDemurrageCost(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Includes shipping line demurrage, port storage, re-inspection, and detention.
              </p>
            </div>

            {/* Slider 3: Error Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Historical Paperwork Friction Rate:</span>
                <span className="font-mono font-bold text-base text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  {errorRatePercent}% of shipments
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={errorRatePercent}
                onChange={(e) => setErrorRatePercent(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Industry average: 12-18% of RMG shipments face paperwork discrepancies or bond queries.
              </p>
            </div>
          </div>

          {/* Savings Result Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 rounded-2xl text-white shadow-xl space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Projected Annual Impact
              </span>
              <p className="text-4xl font-extrabold font-mono text-emerald-400 mt-1">
                ${annualSavings.toLocaleString()}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Estimated avoidable demurrage & air-freight penalties saved.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/60 text-xs">
              <div>
                <p className="text-slate-400 text-[11px]">Monthly Savings</p>
                <p className="text-lg font-bold font-mono text-white mt-0.5">
                  ${monthlySavings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-[11px]">Hours Saved / Year</p>
                <p className="text-lg font-bold font-mono text-white mt-0.5">
                  {annualHoursSaved.toLocaleString()} hrs
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-400/40 p-3.5 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-emerald-300 font-semibold block">Net Return on Investment</span>
                <span className="text-slate-300 text-[10px]">Based on {activePlanObj.name}</span>
              </div>
              <span className="text-2xl font-extrabold font-mono text-emerald-300">
                {netRoiMultiple}x ROI
              </span>
            </div>

            <button
              onClick={() => setShowPilotModal(true)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Apply for 90-Day Factory Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Pricing Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Transparent Subscription Plans</h2>
          <p className="text-xs text-slate-500">
            Priced in Bangladeshi Taka (BDT) for local factories with international USD billing option.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`rounded-2xl p-6 sm:p-8 border cursor-pointer transition-all flex flex-col justify-between space-y-6 ${
                  plan.recommended
                    ? 'border-2 border-emerald-500 bg-white shadow-xl relative'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Most Popular for Exporters
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{plan.tagline}</p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold font-mono text-slate-900">
                        ৳{plan.priceBdt.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">/ {plan.billingPeriod}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      (~${plan.priceUsd} USD / month)
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {plan.shipmentLimit}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(plan.id);
                    setShowPilotModal(true);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    plan.recommended
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Select {plan.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 90-Day Pilot Modal */}
      {showPilotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              onClick={() => { setShowPilotModal(false); setPilotSuccess(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!pilotSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Activate 90-Day Factory Pilot
                    </h3>
                    <p className="text-xs text-slate-500">Plan: {activePlanObj.name}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl text-xs space-y-1.5 border border-slate-200">
                  <p className="font-semibold text-slate-800">What the 90-Day Pilot includes:</p>
                  <p className="text-slate-600 text-[11px]">• Pre-clearance on your next 50-200 export shipments.</p>
                  <p className="text-slate-600 text-[11px]">• Complete BondIQ raw material audit setup for your merchandisers.</p>
                  <p className="text-slate-600 text-[11px]">• WhatsApp alert group integration with your packaging floor.</p>
                  <p className="text-slate-600 text-[11px]">• Full refund guarantee if no document errors are caught.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Factory Name</label>
                    <input
                      type="text"
                      defaultValue="Northfield Apparel Ltd."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="commercial@northfield-apparel.com"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Export Sector</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                      <option>Knitwear (T-Shirts, Polos, Sweaters)</option>
                      <option>Woven (Shirts, Trousers, Denim)</option>
                      <option>Home Textile & Towels</option>
                      <option>Clearing & Forwarding (C&F Agency)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setPilotSuccess(true)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Confirm Pilot Activation (৳{activePlanObj.priceBdt.toLocaleString()} / mo)
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Pilot Application Registered!</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    A dedicated Trade Compliance Specialist from ExportOps AI will contact your commercial team within 2 hours to configure your factory's BGMEA e-UD sync.
                  </p>
                </div>
                <button
                  onClick={() => { setShowPilotModal(false); setPilotSuccess(false); }}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
