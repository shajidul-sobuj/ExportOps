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
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>PROVEN FACTORY ROI & COMMERCIAL TIERS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          One Avoided Delay Pays For An Entire Year
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Garment export delays at Chittagong Port cost thousands in demurrage, air-freight penalties, and bank disputes. 
          See how much your factory saves every single month with ExportOps AI.
        </p>
      </div>

      {/* Interactive ROI Calculator */}
      <div className="bg-[#0c121e] rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
            <Calculator className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Factory Savings Calculator</h2>
            <p className="text-xs text-slate-400">Adjust the sliders to match your factory's monthly shipment volume.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Monthly Shipments */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Monthly Export Containers:</span>
                <span className="font-mono font-bold text-base text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
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
                className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer border border-slate-800"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>5 Containers (Single Unit)</span>
                <span>40 Containers (Mid-Size)</span>
                <span>80+ Containers (Group)</span>
              </div>
            </div>

            {/* Slider 2: Average Demurrage / Penalty Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Avg Cost per Delayed Container:</span>
                <span className="font-mono font-bold text-base text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
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
                className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer border border-slate-800"
              />
              <p className="text-[11px] text-slate-500">
                Includes shipping line demurrage, port storage, re-inspection, and trailer detention.
              </p>
            </div>

            {/* Slider 3: Error Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Historical Paperwork Friction Rate:</span>
                <span className="font-mono font-bold text-base text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
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
                className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer border border-slate-800"
              />
              <p className="text-[11px] text-slate-500">
                Industry average: 12-18% of RMG shipments face paperwork discrepancies or bond queries.
              </p>
            </div>
          </div>

          {/* Savings Result Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0b101a] via-slate-900 to-emerald-950/80 p-6 sm:p-8 rounded-2xl text-white shadow-2xl border border-emerald-500/40 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider font-mono">
                Projected Annual Impact
              </span>
              <p className="text-4xl font-extrabold font-mono text-emerald-400 mt-1">
                ${annualSavings.toLocaleString()}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Estimated avoidable demurrage & air-freight penalties saved.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
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

            <div className="bg-emerald-950/50 border border-emerald-500/40 p-3.5 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-emerald-300 font-semibold block">Net Return on Investment</span>
                <span className="text-slate-400 text-[10px]">Based on {activePlanObj.name}</span>
              </div>
              <span className="text-2xl font-extrabold font-mono text-emerald-300">
                {netRoiMultiple}x ROI
              </span>
            </div>

            <button
              onClick={() => setShowPilotModal(true)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5"
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
          <h2 className="text-2xl font-bold text-white">Transparent Subscription Plans</h2>
          <p className="text-xs text-slate-400">
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
                className={`rounded-2xl p-6 sm:p-8 border cursor-pointer transition-all flex flex-col justify-between space-y-6 hover-card-lift ${
                  plan.recommended
                    ? 'border-2 border-emerald-500 bg-[#0c121e] shadow-2xl relative shadow-emerald-500/10'
                    : 'border-slate-800 bg-[#0c121e] hover:border-slate-700 shadow-xl'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-md font-mono">
                    Most Popular for Exporters
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.tagline}</p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold font-mono text-white">
                        ৳{plan.priceBdt.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">/ {plan.billingPeriod}</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400/80">
                      (~${plan.priceUsd} USD / month)
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                      {plan.shipmentLimit}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    plan.recommended
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-850 hover:bg-slate-800 text-white border border-slate-700'
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0b101a] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6 relative animate-scale-up">
            <button
              onClick={() => { setShowPilotModal(false); setPilotSuccess(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!pilotSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Activate 90-Day Factory Pilot
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">Plan: {activePlanObj.name}</p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl text-xs space-y-1.5 border border-slate-800">
                  <p className="font-semibold text-emerald-400">What the 90-Day Pilot includes:</p>
                  <p className="text-slate-300 text-[11px]">• Pre-clearance on your next 50-200 export shipments.</p>
                  <p className="text-slate-300 text-[11px]">• Complete BondIQ raw material audit setup for your merchandisers.</p>
                  <p className="text-slate-300 text-[11px]">• WhatsApp alert group integration with your packaging floor.</p>
                  <p className="text-slate-300 text-[11px]">• Full refund guarantee if no document errors are caught.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Factory Name</label>
                    <input
                      type="text"
                      defaultValue="Northfield Apparel Ltd."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="commercial@northfield-apparel.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Export Sector</label>
                    <select className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer">
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
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    Confirm Pilot Activation (৳{activePlanObj.priceBdt.toLocaleString()} / mo)
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Pilot Application Registered!</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                    A dedicated Trade Compliance Specialist from ExportOps AI will contact your commercial team within 2 hours to configure your factory's BGMEA e-UD sync.
                  </p>
                </div>
                <button
                  onClick={() => { setShowPilotModal(false); setPilotSuccess(false); }}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
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
