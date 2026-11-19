'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  AlertOctagon, 
  MessageSquare, 
  Layers 
} from 'lucide-react';

export default function Showcase() {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'studio' | 'bond' | 'alerts' | 'compliance'>('studio');
  const [studioResolved, setStudioResolved] = useState(false);
  const [bondGarmentType, setBondGarmentType] = useState<'tshirt' | 'hoodie' | 'denim'>('tshirt');
  const [alertLanguage, setAlertLanguage] = useState<'bn' | 'en'>('bn');

  const garmentPresets = {
    tshirt: {
      name: "Men's Basic Crewneck (160 GSM)",
      gsm: 160,
      dznCons: "2.40 kg / dzn",
      orderQty: "12,000 pcs (1,000 dzn)",
      wastage: "+120 kg (5% allowance)",
      totalFabric: "2,520 kg Single Jersey",
      udQuota: "2,600 kg (UD #4410)",
      status: "APPROVED • 80 kg Quota Reserve"
    },
    hoodie: {
      name: "Fleece Zip Hoodie (320 GSM)",
      gsm: 320,
      dznCons: "7.20 kg / dzn",
      orderQty: "5,000 pcs (416.7 dzn)",
      wastage: "+210 kg (7% allowance)",
      totalFabric: "3,210 kg CVC Fleece",
      udQuota: "3,300 kg (UD #3982)",
      status: "APPROVED • 90 kg Quota Reserve"
    },
    denim: {
      name: "Stretch Denim 5-Pocket (12 oz)",
      gsm: 410,
      dznCons: "8.50 kg / dzn",
      orderQty: "8,000 pcs (666.7 dzn)",
      wastage: "+453 kg (8% allowance)",
      totalFabric: "6,120 kg Twill Denim",
      udQuota: "5,800 kg (UD #7712)",
      status: "EXCEEDED • 320 kg Deficit Risk"
    }
  };

  return (
    <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase font-mono tracking-wider">Product Deep-Dive</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">Enterprise Suite Modules</h2>
        <p className="text-sm sm:text-base text-slate-300">Built specifically for Bangladeshi garment factories and clearing agents.</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 text-sm font-bold">
        <button
          onClick={() => setActiveFeatureTab('studio')}
          className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
            activeFeatureTab === 'studio' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Inspection Studio
        </button>
        <button
          onClick={() => setActiveFeatureTab('bond')}
          className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
            activeFeatureTab === 'bond' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          BondIQ Fabric Ledger
        </button>
        <button
          onClick={() => setActiveFeatureTab('alerts')}
          className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
            activeFeatureTab === 'alerts' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Floor WhatsApp Alerts
        </button>
        <button
          onClick={() => setActiveFeatureTab('compliance')}
          className={`px-5 py-3 rounded-2xl transition-all shrink-0 ${
            activeFeatureTab === 'compliance' ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-[#0b101a] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Buyer Compliance (H&M, Zara)
        </button>
      </div>

      {/* Feature Tab Card */}
      <div className="bg-[#0b101a] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-fade-in">
        {/* TAB 1: Inspection Studio */}
        {activeFeatureTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                <span>MODULE 01: DUAL-WINDOW AUDITOR</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">Side-by-Side Document Inspection Studio</h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                No more switching between 5 different PDF windows and printed Excel sheets. ExportOps AI aligns the Commercial Invoice, Packing List, and LC side-by-side with line-item discrepancy highlighting.
              </p>
              <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Real-time OCR extraction with 99% confidence tagging</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Interactive 1-click quantity reconciliation demo</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/app/shipments/EXP-001"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-colors font-display shadow-md shadow-emerald-500/20"
                >
                  <span>Open Live Studio (EXP-001)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Diff Simulator */}
            <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-slate-800 text-sm font-mono shadow-inner space-y-4 hover-card-lift">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400 text-xs font-semibold">// Interactive Audit Simulator</span>
                <button
                  onClick={() => setStudioResolved(!studioResolved)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all transform active:scale-95 shadow-sm"
                >
                  {studioResolved ? 'Reset to Mismatch' : 'Simulate 1-Click Fix'}
                </button>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="p-3 bg-slate-900/80 rounded-xl flex justify-between">
                  <span className="text-slate-400">COMMERCIAL INVOICE:</span>
                  <span className="text-white font-bold">12,000 PCS ($72,000)</span>
                </div>
                <div className={`p-3 rounded-xl flex justify-between transition-colors duration-300 ${
                  studioResolved ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border border-red-500/40 text-red-300'
                }`}>
                  <span>PACKING LIST:</span>
                  <span className="font-bold">{studioResolved ? '12,000 PCS (500 Ctns)' : '11,400 PCS (475 Ctns)'}</span>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                studioResolved
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950'
                  : 'bg-red-950/40 border-red-500/50 text-red-300 shadow-md shadow-red-950'
              }`}>
                {studioResolved ? (
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>RULE R1 PASSED: Quantities match exactly (12,000 pcs). Gate-In Pass Ready!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
                    <span>RULE R1 FAILED: 600 PCS Deficit detected between Invoice and Packing List.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BondIQ Fabric Ledger */}
        {activeFeatureTab === 'bond' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold border border-indigo-500/20">
                <span>MODULE 02: CUSTOMS BOND COMPLIANCE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">BondIQ: Fabric Math & UD Quota Ledger</h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                Bonded raw material audits are Bangladesh's biggest export compliance hazard. BondIQ automatically computes fabric consumption per dozen, adds cutting wastage, and balances usage against approved BGMEA Utilization Declaration (UD) quotas.
              </p>
              <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Calculates fabric required across Knit, Woven, and Denim presets</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Prevents export declaration if unlinked fabric usage is found (Rule R8)</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/app/bond"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-xl transition-colors font-mono shadow-md"
                >
                  <span>Open Full BondIQ Ledger</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Garment Math Preset Selector */}
            <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-slate-800 text-sm font-mono text-slate-200 shadow-inner space-y-4 hover-card-lift">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400 text-xs font-semibold">// Select Garment Preset</span>
                <div className="flex items-center gap-1.5">
                  {(['tshirt', 'hoodie', 'denim'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setBondGarmentType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        bondGarmentType === type
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm animate-fade-in">
                <div className="text-indigo-300 font-bold text-sm sm:text-base">{garmentPresets[bondGarmentType].name}</div>
                <div className="flex justify-between text-slate-300">
                  <span>Fabric Weight (GSM):</span>
                  <span className="text-white font-bold">{garmentPresets[bondGarmentType].gsm} GSM</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Consumption Formula:</span>
                  <span className="text-white font-bold">{garmentPresets[bondGarmentType].dznCons}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Order Batch Size:</span>
                  <span className="text-white font-bold">{garmentPresets[bondGarmentType].orderQty}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Cutting Wastage (5%):</span>
                  <span className="text-amber-400 font-bold">{garmentPresets[bondGarmentType].wastage}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-800 text-sm sm:text-base">
                  <span>Total Required Fabric:</span>
                  <span className="text-indigo-400 font-black">{garmentPresets[bondGarmentType].totalFabric}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Allocated BGMEA UD Quota:</span>
                  <span className="text-emerald-400 font-bold">{garmentPresets[bondGarmentType].udQuota}</span>
                </div>
              </div>

              <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs font-bold text-indigo-300 flex items-center justify-between">
                <span>RECONCILIATION RESULT:</span>
                <span>{garmentPresets[bondGarmentType].status}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Floor WhatsApp Alerts */}
        {activeFeatureTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                <span>MODULE 03: INSTANT OPERATIONAL DISPATCH</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">Bilingual Floor WhatsApp & SMS Alerts</h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                Discrepancy notices shouldn't get buried in corporate email inboxes. ExportOps AI instantly generates bilingual (Bangla & English) WhatsApp instructions for packaging supervisors on the factory floor in Savar or Gazipur.
              </p>
              <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Immediate notification to factory floor supervisors and C&F clearing agents</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Provides actionable guidance in clear Bengali for physical carton re-counts</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/app/shipments/EXP-001"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-colors font-display shadow-md shadow-emerald-500/20"
                >
                  <span>Test Dispatch in EXP-001</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Simulated WhatsApp Phone Mockup */}
            <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-slate-800 space-y-4 hover-card-lift">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-emerald-400 font-bold text-xs sm:text-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  WhatsApp Discrepancy Dispatch
                </span>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setAlertLanguage('bn')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      alertLanguage === 'bn' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => setAlertLanguage('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      alertLanguage === 'en' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <div className="p-5 bg-[#0a1410] border border-emerald-500/20 rounded-2xl space-y-2.5 text-xs sm:text-sm animate-fade-in">
                <p className="text-emerald-400 font-extrabold text-sm sm:text-base">🚨 EXPORTOPS AI: URGENT COMPLIANCE ALERT</p>
                <p className="text-slate-200">📦 Shipment: <strong className="text-white">EXP-001 (Nordic Retailers)</strong></p>
                <p className="text-red-400 font-bold">⚠️ Issue: Quantity Mismatch (-600 PCS vs Invoice)</p>
                
                {alertLanguage === 'bn' ? (
                  <div className="pt-2.5 text-slate-100 font-bengali text-sm sm:text-base leading-relaxed border-t border-emerald-950">
                    ❗ <strong>জরুরি অ্যাকশন:</strong> ফ্লোরে প্যাকিং লিস্টের কার্টন সংখ্যা রি-চেক করুন। ৫০০ কার্টন রেডি থাকলে প্যাকিং লিস্ট আপডেট করে দ্রুত ক্লিয়ারিং এজেন্টের কাছে পাঠান। জাহাজ কাট-অফ বাকি: ৪৮ ঘণ্টা।
                  </div>
                ) : (
                  <div className="pt-2.5 text-slate-100 font-sans text-xs sm:text-sm leading-relaxed border-t border-emerald-950">
                    ❗ <strong>URGENT ACTION:</strong> Verify carton counts on factory packing floor. If 500 cartons are verified, update packing list and transmit to Chittagong C&F agent. Remaining vessel cut-off: 48h.
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-400 flex justify-between font-mono pt-1">
                <span>Priority: <strong className="text-amber-400">HIGH • CUT-OFF RISK</strong></span>
                <span>Recipient: Factory Ops + C&F Lead</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Buyer Compliance */}
        {activeFeatureTab === 'compliance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-mono font-bold border border-blue-500/20">
                <span>MODULE 04: RETAIL CHARGEBACK SHIELD</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">Global Buyer Compliance Rulebook</h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                Go beyond customs. International retail giants enforce strict packaging, barcode, and RFID rules. Prevent expensive $1.50 - $3.00 per-carton retailer chargebacks at European and American distribution hubs.
              </p>
              <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>H&M Ratio Pack & Polybag warning validation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Zara / Inditex UHF Gen2 RFID source tagging audits</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Target & Walmart GS1-128 barcode and carton weight checks</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/app/compliance"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-colors font-mono shadow-md"
                >
                  <span>Explore Buyer Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Retailer Rulebook Matrix Preview */}
            <div className="p-6 sm:p-7 bg-[#070b13] rounded-3xl border border-slate-800 text-sm space-y-3 font-mono hover-card-lift">
              <p className="text-slate-400 text-xs pb-2 border-b border-slate-800">// Retailer Compliance Matrix</p>
              
              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                <div>
                  <span className="font-bold text-white text-sm sm:text-base">H&M Group (HM-01)</span>
                  <p className="text-xs text-slate-400 mt-0.5">Ratio Pack & Suffocation Warning</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-xs">
                  PASSED
                </span>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                <div>
                  <span className="font-bold text-white text-sm sm:text-base">Inditex / Zara (ZRA-01)</span>
                  <p className="text-xs text-slate-400 mt-0.5">UHF Gen2 EPC RFID Inlay Audit</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-xs">
                  PASSED
                </span>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/40 transition-colors">
                <div>
                  <span className="font-bold text-white text-sm sm:text-base">Target US (TGT-02)</span>
                  <p className="text-xs text-slate-400 mt-0.5">Max Carton Gross Weight &lt; 20kg</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-xs">
                  PASSED
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
