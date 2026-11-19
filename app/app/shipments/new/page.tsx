'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  FileText, 
  FileUp, 
  Loader2, 
  ShieldCheck, 
  Sparkles, 
  Upload, 
  X 
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  PageHeader, 
  Badge 
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { DocumentType } from '@/types';

const REQUIRED_DOCS: DocumentType[] = [
  'PO',
  'LC',
  'Commercial Invoice',
  'Packing List',
  'Certificate of Origin'
];

interface UploadedDocState {
  type: DocumentType;
  fileName: string;
  status: 'idle' | 'uploading' | 'extracted';
  fieldsCount: number;
}

export default function NewShipmentWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [buyer, setBuyer] = useState('Inditex / Zara S.A.');
  const [supplier, setSupplier] = useState('Apex Holdings Ltd.');
  const [poNumber, setPoNumber] = useState('PO-99201-IND');
  const [lcId, setLcId] = useState('LC-2026-DH-88102');
  const [containerNumber, setContainerNumber] = useState('MSKU-991204-1');
  const [vesselCutoff, setVesselCutoff] = useState('2026-11-25T18:00');

  // Documents state
  const [docs, setDocs] = useState<UploadedDocState[]>([
    { type: 'PO', fileName: '', status: 'idle', fieldsCount: 0 },
    { type: 'LC', fileName: '', status: 'idle', fieldsCount: 0 },
    { type: 'Commercial Invoice', fileName: '', status: 'idle', fieldsCount: 0 },
    { type: 'Packing List', fileName: '', status: 'idle', fieldsCount: 0 },
    { type: 'Certificate of Origin', fileName: '', status: 'idle', fieldsCount: 0 },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  // Quick Demo Pre-fill
  const handlePreFillDemo = () => {
    setBuyer('Nordic Retailers A/S');
    setSupplier('Northfield Apparel Ltd.');
    setPoNumber('PO-88219-NR');
    setLcId('LC-2026-DH-90112');
    setContainerNumber('MSKU-781920-4');
    setVesselCutoff('2026-11-23T18:00');

    setDocs([
      { type: 'PO', fileName: 'PO_88219_Nordic.pdf', status: 'extracted', fieldsCount: 3 },
      { type: 'LC', fileName: 'Export_LC_90112_SCB.pdf', status: 'extracted', fieldsCount: 4 },
      { type: 'Commercial Invoice', fileName: 'Commercial_Invoice_INV0412.pdf', status: 'extracted', fieldsCount: 5 },
      { type: 'Packing List', fileName: 'Packing_List_PL0412.pdf', status: 'extracted', fieldsCount: 5 },
      { type: 'Certificate of Origin', fileName: 'COO_BGMEA_Cert_8891.pdf', status: 'extracted', fieldsCount: 2 },
    ]);
    setStep(2);
  };

  const simulateDocUpload = (type: DocumentType) => {
    setDocs(prev => prev.map(d => {
      if (d.type === type) {
        return {
          ...d,
          fileName: `${type.replace(/\s+/g, '_')}_Draft_v1.pdf`,
          status: 'extracted',
          fieldsCount: 4
        };
      }
      return d;
    }));
  };

  const handleRunEvaluation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push('/app/shipments/EXP-001');
    }, 1200);
  };

  const allDocsReady = docs.every(d => d.status === 'extracted');

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      <PageHeader
        title="New Pre-Shipment Compliance Check"
        description="Run an automated cross-document validation audit before port gate-in at Chittagong."
        actions={
          <Button variant="secondary" onClick={handlePreFillDemo}>
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Pre-fill Sample Data</span>
          </Button>
        }
      />

      {/* Stepper Header */}
      <div className="grid grid-cols-3 gap-3">
        <div className={cn(
          'p-3.5 rounded-xl border text-xs transition-all',
          step === 1 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-surface-1 border-line text-ink-3'
        )}>
          <span className="font-mono font-bold text-ink-1">STEP 1</span>
          <p className="font-semibold text-sm mt-0.5 text-ink-1">Shipment & LC Details</p>
        </div>

        <div className={cn(
          'p-3.5 rounded-xl border text-xs transition-all',
          step === 2 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-surface-1 border-line text-ink-3'
        )}>
          <span className="font-mono font-bold text-ink-1">STEP 2</span>
          <p className="font-semibold text-sm mt-0.5 text-ink-1">Upload 5 Trade Docs</p>
        </div>

        <div className={cn(
          'p-3.5 rounded-xl border text-xs transition-all',
          step === 3 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-surface-1 border-line text-ink-3'
        )}>
          <span className="font-mono font-bold text-ink-1">STEP 3</span>
          <p className="font-semibold text-sm mt-0.5 text-ink-1">Review & Verify Rules</p>
        </div>
      </div>

      {/* STEP 1: Details */}
      {step === 1 && (
        <Card className="p-6 space-y-5">
          <CardHeader
            title="Shipment Header & Commercial Baseline"
            description="Enter the core export metadata from your ERP or purchase order."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">International Buyer</label>
              <input
                type="text"
                value={buyer}
                onChange={e => setBuyer(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Manufacturer / Supplier</label>
              <input
                type="text"
                value={supplier}
                onChange={e => setSupplier(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Buyer PO Number</label>
              <input
                type="text"
                value={poNumber}
                onChange={e => setPoNumber(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 font-mono outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Export LC Number</label>
              <input
                type="text"
                value={lcId}
                onChange={e => setLcId(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 font-mono outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Shipping Container Number</label>
              <input
                type="text"
                value={containerNumber}
                onChange={e => setContainerNumber(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 font-mono outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Vessel Cut-off Date & Time</label>
              <input
                type="datetime-local"
                value={vesselCutoff}
                onChange={e => setVesselCutoff(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 font-mono outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-line">
            <Button variant="primary" onClick={() => setStep(2)}>
              <span>Continue to Document Upload</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: Document Upload Slots */}
      {step === 2 && (
        <Card className="p-6 space-y-5">
          <CardHeader
            title="Upload Required Commercial Documents"
            description="The 8-point engine cross-checks all 5 documents for consistency under UCP 600 rules."
          />

          <div className="space-y-3">
            {docs.map((doc) => (
              <div
                key={doc.type}
                className={cn(
                  'p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all',
                  doc.status === 'extracted'
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-app border-line-strong'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs',
                    doc.status === 'extracted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-surface-2 text-ink-3'
                  )}>
                    {doc.status === 'extracted' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-1">{doc.type}</p>
                    <p className="text-xs text-ink-3">
                      {doc.status === 'extracted'
                        ? `${doc.fileName} (${doc.fieldsCount} schema fields verified)`
                        : 'Required for ASYCUDA and customs clearance'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {doc.status === 'extracted' ? (
                    <Badge tone="success">Verified</Badge>
                  ) : (
                    <button
                      onClick={() => simulateDocUpload(doc.type)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 hover:bg-white/[0.08] text-ink-1 border border-line-strong rounded-lg text-xs font-medium transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload / Scan</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-line">
            <Button variant="secondary" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Details</span>
            </Button>

            <Button
              variant="primary"
              disabled={!allDocsReady}
              onClick={() => setStep(3)}
            >
              <span>Review Extracted Schema</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: Review & Run */}
      {step === 3 && (
        <Card className="p-6 space-y-5">
          <CardHeader
            title="Pre-Flight Extraction Summary"
            description="All trade documents have been mapped into normalized schemas with >98% confidence."
          />

          <div className="bg-app rounded-xl p-4 border border-line space-y-3 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-ink-3 uppercase text-[10px]">Buyer</span>
                <p className="font-semibold text-ink-1 mt-0.5">{buyer}</p>
              </div>
              <div>
                <span className="text-ink-3 uppercase text-[10px]">PO Number</span>
                <p className="font-mono font-semibold text-ink-1 mt-0.5">{poNumber}</p>
              </div>
              <div>
                <span className="text-ink-3 uppercase text-[10px]">LC Reference</span>
                <p className="font-mono font-semibold text-ink-1 mt-0.5">{lcId}</p>
              </div>
              <div>
                <span className="text-ink-3 uppercase text-[10px]">Container</span>
                <p className="font-mono font-semibold text-ink-1 mt-0.5">{containerNumber}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-line flex items-center justify-between">
              <span className="text-ink-3">Documents Loaded: 5 / 5 Complete</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Zero ASYCUDA Hold Schema Ready
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-ink-1 text-sm">Deterministic Verification Ready</p>
              <p className="mt-0.5 text-emerald-300">
                Clicking the button below will execute the 8 compliance functions: R1 (Quantity), R2 (Value Tolerance), R3 (Consignee), R4 (Shipment Window), R5 (Completeness), R6 (Container Assigned), R7 (HS Code), and R8 (Bonded Fabric Quota).
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-line">
            <Button variant="secondary" onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Documents</span>
            </Button>

            <Button
              variant="primary"
              disabled={isProcessing}
              onClick={handleRunEvaluation}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating 8 Rules Engine...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Execute 8-Point Compliance Engine</span>
                </>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
