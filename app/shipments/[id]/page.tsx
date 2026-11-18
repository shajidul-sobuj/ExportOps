'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  RefreshCw, 
  Upload, 
  Clock, 
  Check, 
  Edit3, 
  Sparkles, 
  Layers, 
  Flame,
  Printer,
  X,
  FileCheck2,
  FileUp,
  Download,
  QrCode
} from 'lucide-react';
import initialShipments from '@/data/shipments.json';
import { 
  Shipment, 
  RuleResult, 
  AuditEntry, 
  ShipmentStatus 
} from '@/types';
import { 
  evaluateShipmentRules, 
  computeShipmentStatus, 
  computeBankReadyScore 
} from '@/lib/rules';

export default function ShipmentDetailPage() {
  const params = useParams();
  const shipmentId = (params?.id as string) || 'EXP-001';

  // Find initial shipment
  const baseShipment = (initialShipments as unknown as Shipment[]).find(
    (s) => s.id === shipmentId
  ) || (initialShipments[0] as unknown as Shipment);

  const [shipment, setShipment] = useState<Shipment>(() => JSON.parse(JSON.stringify(baseShipment)));
  const [ruleResults, setRuleResults] = useState<RuleResult[]>(() => evaluateShipmentRules(baseShipment));
  const [status, setStatus] = useState<ShipmentStatus>(() => computeShipmentStatus(ruleResults));
  const [score, setScore] = useState<number>(() => computeBankReadyScore(ruleResults));
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(baseShipment.auditLog || []);

  // Extraction & Remediation state
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionNotice, setExtractionNotice] = useState<string | null>(null);
  const [editableQuantity, setEditableQuantity] = useState<number>(11400);
  const [activeDocTab, setActiveDocTab] = useState<string>('Packing List');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showGatePass, setShowGatePass] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial fields if Packing list exists
  useEffect(() => {
    const pl = shipment.documents.find((d) => d.type === 'Packing List');
    if (pl && pl.fields.totalQuantity) {
      setEditableQuantity(Number(pl.fields.totalQuantity.value));
    }
  }, [shipmentId]);

  // Handle re-running validation
  const handleRevalidate = (updatedQty?: number) => {
    const qtyToUse = updatedQty !== undefined ? updatedQty : editableQuantity;
    const updatedShipment = JSON.parse(JSON.stringify(shipment)) as Shipment;

    // Update Packing List quantity
    const pl = updatedShipment.documents.find((d) => d.type === 'Packing List');
    if (pl && pl.fields.totalQuantity) {
      pl.fields.totalQuantity.value = qtyToUse;
      pl.fields.totalQuantity.sourceSnippet = `VERIFIED REVISION: Total ${qtyToUse.toLocaleString()} pcs in 500 cartons`;
      pl.fields.totalQuantity.confidence = 0.99;
    }

    const newResults = evaluateShipmentRules(updatedShipment);
    const newStatus = computeShipmentStatus(newResults);
    const newScore = computeBankReadyScore(newResults);

    const newAuditEntry: AuditEntry = {
      id: `AUD-${Date.now()}`,
      shipmentId: shipment.id,
      actor: 'Export Documentation Manager',
      action: 'Corrected Packing List Quantity & Re-validated',
      timestamp: new Date().toISOString(),
      details: `Updated Packing List total quantity to ${qtyToUse.toLocaleString()} pcs. Evaluation score changed from ${score} to ${newScore} (${newStatus}).`,
    };

    setShipment(updatedShipment);
    setRuleResults(newResults);
    setStatus(newStatus);
    setScore(newScore);
    setAuditLog([newAuditEntry, ...auditLog]);

    if (newStatus === 'Customs-ready') {
      setShowCelebration(true);
    }
  };

  // Simulate AI document upload & extraction
  const handleSimulateAiUpload = async (fixed: boolean, customText?: string) => {
    setIsExtracting(true);
    setExtractionNotice('Calling Document Intelligence API (/api/extract)...');

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: 'Packing List',
          shipmentId: shipment.id,
          documentText: customText,
          isFixDemo: fixed,
        }),
      });

      const data = await res.json();
      setIsExtracting(false);

      if (data.success && data.fields) {
        const qtyField = data.fields.find((f: any) => f.name === 'totalQuantity');
        const extractedQty = qtyField ? Number(qtyField.value) : fixed ? 12000 : 11400;

        setEditableQuantity(extractedQty);
        setExtractionNotice(
          `AI Extracted: ${extractedQty.toLocaleString()} pcs (Confidence: 99%). Status re-evaluated automatically.`
        );

        if (fixed || extractedQty === 12000) {
          handleRevalidate(12000);
        }
      }
    } catch (err) {
      setIsExtracting(false);
      if (fixed) {
        setEditableQuantity(12000);
        handleRevalidate(12000);
      }
    }
  };

  // Real file drop handler
  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processRealFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processRealFile(e.target.files[0]);
    }
  };

  const processRealFile = async (file: File) => {
    try {
      const text = await file.text();
      // If the file contains 12000 or Revised, treat as fixed
      const isFixed = text.includes('12,000') || text.includes('12000') || file.name.toLowerCase().includes('revised');
      handleSimulateAiUpload(isFixed, text);
    } catch {
      handleSimulateAiUpload(true);
    }
  };

  const selectedDocument = shipment.documents.find((d) => d.type === activeDocTab) || shipment.documents[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shipments Control Tower</span>
        </Link>

        <div className="flex items-center gap-3">
          {status === 'Customs-ready' && (
            <button
              onClick={() => setShowGatePass(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>View Customs Clearance Gate-Pass</span>
            </button>
          )}

          <button
            onClick={() => handleRevalidate()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-evaluate Rules</span>
          </button>
        </div>
      </div>

      {/* Shipment Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                {shipment.id}
              </h1>
              {/* Dynamic Status Badge */}
              {status === 'Blocked' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse-subtle">
                  <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
                  BLOCKED AT PORT
                </span>
              )}
              {status === 'At risk' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  AT RISK (WARNINGS)
                </span>
              )}
              {status === 'Customs-ready' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  CUSTOMS-READY & CLEARED
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600">
              Buyer: <span className="font-semibold text-slate-900">{shipment.buyer}</span> • Supplier: <span className="text-slate-800">{shipment.supplier}</span>
            </p>
            <p className="text-xs font-mono text-slate-400">
              PO: {shipment.poNumber} • Export LC: {shipment.lcId} • Container: {shipment.containerNumber}
            </p>
          </div>

          {/* Bank-Ready Score Display */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Bank-Ready Score
              </p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-3xl font-extrabold font-mono ${
                  score >= 90 ? 'text-emerald-600' : score >= 75 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {score}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="w-24 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  score >= 90 ? 'bg-emerald-500' : score >= 75 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Celebration Banner */}
        {showCelebration && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-900 text-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">
                ✓
              </div>
              <div>
                <p className="font-bold">Shipment Successfully Cleared for Port Gate-In!</p>
                <p className="text-xs text-emerald-700">
                  All 8 deterministic rules passed. Bank-Ready Score is 100/100. Commercial documents are aligned.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGatePass(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Open Gate-Pass
              </button>
              <button
                onClick={() => setShowCelebration(false)}
                className="text-xs text-emerald-700 hover:text-emerald-950 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Documents & Interactive Remediation & BondIQ (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Remediation & Document Intelligence Hub */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h2 className="font-bold text-slate-900 text-base">
                  Document Intelligence & Interactive Remediation
                </h2>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {shipment.documents.length} Trade Docs Ingested
              </span>
            </div>

            {/* Document Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {shipment.documents.map((doc) => (
                <button
                  key={doc.type}
                  onClick={() => setActiveDocTab(doc.type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                    activeDocTab === doc.type
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {doc.type}
                  {doc.type === 'Packing List' && status === 'Blocked' && (
                    <span className="ml-1.5 w-2 h-2 rounded-full bg-red-400 inline-block" />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Document Details & Extracted Fields */}
            {selectedDocument && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">{selectedDocument.fileName}</span>
                    <p className="text-[11px] text-slate-400">Uploaded {selectedDocument.uploadedAt.split('T')[0]}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-800">
                    AI Parsed
                  </span>
                </div>

                {/* Interactive Demo Fix Trigger for EXP-001 Packing List */}
                {shipment.id === 'EXP-001' && selectedDocument.type === 'Packing List' && (
                  <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-4 space-y-3.5">
                    <div className="flex items-start gap-2.5">
                      <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-amber-900 text-sm">
                          Interactive Demo: Remediation Loop
                        </p>
                        <p className="text-amber-800 text-xs mt-0.5">
                          Commercial Invoice specifies <strong>12,000 pcs</strong>, but Packing List specifies only <strong>{editableQuantity.toLocaleString()} pcs</strong>. 
                          Upload a revised document or apply the fix to clear the shipment!
                        </p>
                      </div>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                        dragActive ? 'border-emerald-500 bg-emerald-50/50' : 'border-amber-300 bg-white hover:bg-amber-50/40'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        className="hidden"
                        accept=".txt,.pdf,.csv"
                      />
                      <FileUp className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
                      <p className="text-xs font-semibold text-slate-800">
                        Drag & drop corrected trade document here, or <span className="text-amber-700 underline">browse file</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Accepts text, PDF, or sample trade files (.txt, .pdf)
                      </p>
                    </div>

                    {/* Quick Demo Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => handleSimulateAiUpload(true)}
                        disabled={isExtracting}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isExtracting ? 'AI Extracting...' : 'Upload Revised Packing List (12,000 pcs)'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditableQuantity(12000);
                          handleRevalidate(12000);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Set 12,000 & Re-validate</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditableQuantity(11400);
                          handleRevalidate(11400);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline px-2"
                      >
                        Reset to 11,400 (Blocked)
                      </button>
                    </div>

                    {/* Sample Documents Link */}
                    <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-800">
                      <span>Realistic test files available in project:</span>
                      <a
                        href="/sample-docs/EXP-001-Packing-List-Revised.txt"
                        download
                        className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:underline"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download Sample Revised File</span>
                      </a>
                    </div>

                    {extractionNotice && (
                      <p className="text-[11px] text-emerald-800 font-medium bg-emerald-100/70 p-2.5 rounded-md">
                        {extractionNotice}
                      </p>
                    )}
                  </div>
                )}

                {/* Fields Grid */}
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                    Extracted Document Fields (Strict Schema & Confidence)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(selectedDocument.fields).map(([key, field]) => {
                      const isQty = key === 'totalQuantity' && selectedDocument.type === 'Packing List';

                      return (
                        <div key={key} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-600">{field.name}</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                              {Math.round(field.confidence * 100)}% conf
                            </span>
                          </div>

                          {isQty ? (
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="number"
                                value={editableQuantity}
                                onChange={(e) => setEditableQuantity(Number(e.target.value))}
                                className="w-28 px-2 py-1 text-xs border border-slate-300 rounded font-bold font-mono focus:ring-1 focus:ring-emerald-500"
                              />
                              <span className="text-[11px] text-slate-500">pcs</span>
                            </div>
                          ) : (
                            <p className="font-bold text-slate-900 font-mono text-sm">
                              {typeof field.value === 'number' ? field.value.toLocaleString() : field.value || 'N/A'}
                            </p>
                          )}

                          <p className="text-[10px] text-slate-400 italic truncate" title={field.sourceSnippet}>
                            "{field.sourceSnippet}"
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BondIQ: Bonded Raw Material & UD Check Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  BondIQ: Bonded Fabric & UD Quota Reconciliation
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                shipment.bondRecord.status === 'Approved' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                UD Status: {shipment.bondRecord.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-[11px] text-slate-500">Utilization Declaration (UD)</p>
                <p className="font-mono font-bold text-slate-900 mt-1">{shipment.bondRecord.udNumber}</p>
                <p className="text-[10px] text-slate-400">Issued by BGMEA</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-[11px] text-slate-500">UD-Linked Entitlement</p>
                <p className="font-mono font-bold text-slate-900 mt-1">
                  {shipment.bondRecord.udLinkedQuantityKg.toLocaleString()} kg
                </p>
                <p className="text-[10px] text-slate-400">Approved import quota</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-[11px] text-slate-500">Actual Fabric Consumed</p>
                <p className={`font-mono font-bold mt-1 ${
                  shipment.bondRecord.fabricConsumedKg > shipment.bondRecord.udLinkedQuantityKg
                    ? 'text-red-600'
                    : 'text-slate-900'
                }`}>
                  {shipment.bondRecord.fabricConsumedKg.toLocaleString()} kg
                </p>
                <p className="text-[10px] text-slate-400">Factory cutting log</p>
              </div>
            </div>

            {/* Visual Quota Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Quota Utilization</span>
                <span>
                  {Math.round((shipment.bondRecord.fabricConsumedKg / shipment.bondRecord.udLinkedQuantityKg) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    shipment.bondRecord.fabricConsumedKg > shipment.bondRecord.udLinkedQuantityKg
                      ? 'bg-red-500'
                      : 'bg-indigo-600'
                  }`}
                  style={{
                    width: `${Math.min(100, Math.round((shipment.bondRecord.fabricConsumedKg / shipment.bondRecord.udLinkedQuantityKg) * 100))}%`
                  }}
                />
              </div>
            </div>

            {/* If Exceeded Callout */}
            {shipment.bondRecord.fabricConsumedKg > shipment.bondRecord.udLinkedQuantityKg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 font-medium">
                ⚠️ <strong>The Signature Rule Violation:</strong> "This shipment cannot be declared export-ready because {(shipment.bondRecord.fabricConsumedKg - shipment.bondRecord.udLinkedQuantityKg).toLocaleString()} kg of fabric consumption is unlinked to any approved UD."
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Exceptions Panel (Rules Engine), Timeline & Audit Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Exceptions Panel: 8 Validation Rules */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  8-Point Compliance Rules Engine
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {ruleResults.filter((r) => r.passed).length} / 8 Passed
              </span>
            </div>

            <div className="space-y-2.5">
              {ruleResults.map((rule) => {
                const isPassed = rule.passed;
                const isCritical = rule.severity === 'Critical';

                return (
                  <div
                    key={rule.ruleId}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isPassed
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : isCritical
                        ? 'bg-red-50/70 border-red-300'
                        : 'bg-amber-50/70 border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isCritical ? (
                          <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                        <span>{rule.ruleId}: {rule.name}</span>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isPassed 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isCritical 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isPassed ? 'Passed' : rule.severity}
                      </span>
                    </div>

                    <p className={`mt-1.5 text-[11px] leading-relaxed ${
                      isPassed ? 'text-slate-600' : isCritical ? 'text-red-900 font-medium' : 'text-amber-900 font-medium'
                    }`}>
                      {rule.explanation}
                    </p>

                    {/* Source citations */}
                    {rule.sourceFields && rule.sourceFields.length > 0 && (
                      <div className="mt-2 pt-1.5 border-t border-slate-200/50 flex flex-wrap gap-2 text-[10px] text-slate-500">
                        {rule.sourceFields.map((sf, idx) => (
                          <span key={idx} className="bg-white/80 px-1.5 py-0.5 rounded border border-slate-200">
                            {sf.docType} • {sf.field}: <strong>{String(sf.value)}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Shipment Milestones</span>
            </h3>

            <div className="space-y-3">
              {shipment.timeline.map((event, index) => (
                <div key={event.id} className="flex items-start gap-3 text-xs">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    event.completed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {event.completed ? <Check className="w-3 h-3" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${event.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                      {event.milestone}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Owner: {event.owner} • Due: {event.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Immutable Audit Trail Log */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                Compliance Audit Trail
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Logged</span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {auditLog.map((log) => (
                <div key={log.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {log.timestamp.includes('T') ? log.timestamp.split('T')[1].slice(0, 5) : 'Just now'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{log.details}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Actor: {log.actor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customs Clearance Gate-Pass Modal */}
      {showGatePass && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowGatePass(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Government of the People's Republic of Bangladesh
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                CHITTAGONG CUSTOMS HOUSE • PORT GATE-IN PERMIT
              </h2>
              <p className="text-xs text-slate-600">
                ExportOps AI Automated Pre-Filing Clearance • ASYCUDA World Pre-Verification
              </p>
            </div>

            {/* Permit Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Permit No</span>
                <p className="font-mono font-bold text-slate-900">EXP-CLR-7819-2026</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Shipment ID</span>
                <p className="font-mono font-bold text-slate-900">{shipment.id}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Vessel & Voyage</span>
                <p className="font-bold text-slate-900">MAERSK HAVEN / V-419W</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Exporter</span>
                <p className="font-semibold text-slate-800">{shipment.supplier}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Buyer / Consignee</span>
                <p className="font-semibold text-slate-800">{shipment.buyer}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Container Number</span>
                <p className="font-mono font-bold text-slate-900">{shipment.containerNumber}</p>
              </div>
            </div>

            {/* Verification Checklist Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Reconciliation Compliance Audit
              </span>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 font-semibold">
                    <tr>
                      <th className="p-2.5">Verification Point</th>
                      <th className="p-2.5">Evaluated Metric</th>
                      <th className="p-2.5 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-medium">Quantity Cross-Check (R1)</td>
                      <td className="p-2.5 text-slate-600">Invoice: 12,000 pcs == Packing List: 12,000 pcs</td>
                      <td className="p-2.5 text-right font-bold text-emerald-600">PASSED</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">LC Window & Entity (R2-R4)</td>
                      <td className="p-2.5 text-slate-600">Within LC Cutoff (2026-11-25), Entity Aligned</td>
                      <td className="p-2.5 text-right font-bold text-emerald-600">PASSED</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">BondIQ UD Quota (R8)</td>
                      <td className="p-2.5 text-slate-600">UD #UD-2026-BGMEA-4410 (Fabric Reconciled)</td>
                      <td className="p-2.5 text-right font-bold text-emerald-600">PASSED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* QR Code and Official Stamp */}
            <div className="flex items-center justify-between p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-emerald-300">
                  <QrCode className="w-12 h-12 text-emerald-700" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-emerald-950">Cryptographic Seal Verified</p>
                  <p className="text-[11px] text-emerald-800">
                    Scan at Chittagong Port Access Gate 4 for immediate automated gate-in.
                  </p>
                  <p className="font-mono text-[10px] text-emerald-700 mt-0.5">
                    HASH: SHA256:7b90f48819a022
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed border-emerald-600 rounded-xl p-2 text-center text-emerald-700 rotate-[-4deg]">
                <span className="text-[10px] font-extrabold uppercase block">ExportOps AI</span>
                <span className="text-xs font-black block">CUSTOMS READY</span>
                <span className="text-[9px] block">CLEARED FOR GATE-IN</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowGatePass(false)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Gate-In Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
