#!/usr/bin/env python3
"""
ExportOps AI — 170-Second Story-Led Explainer Video Compiler
Renders 10 Full HD scene slides and concatenates with exact second-by-second timings.
Total Duration: 170 seconds (02:50.00).
"""

import os
import subprocess
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(BASE_DIR, "public", "video-assets")
SCENES_DIR = os.path.join(ASSETS_DIR, "scenes")
OUT_MP4 = os.path.join(ASSETS_DIR, "exportops_explainer_170s.mp4")

os.makedirs(SCENES_DIR, exist_ok=True)

SCENES = [
    {
        "id": 1,
        "name": "The Stuck Shipment",
        "duration": 12,
        "time_str": "0:00 - 0:12 (12s)",
        "onscreen": "12,000 garments. Ready on time. Stuck.",
        "sfx": "Phone buzz at 0:06 • Stamp thud at 0:08",
        "voiceover": "Meet Rafi. His factory finished twelve thousand garments right on time. But at the port, his shipment is stuck. Not because of the product. Because of paperwork.",
        "html_body": """
        <div style="display: flex; align-items: center; justify-content: center; gap: 80px; width: 100%; max-width: 1400px;">
            <img src="../character/rafi_shocked_stuck.svg" style="width: 520px; height: 520px; object-fit: contain;" />
            <div style="max-width: 650px;">
                <div style="display: inline-block; background: #fee2e2; border: 2px solid #ef4444; color: #b91c1c; font-family: monospace; font-size: 18px; font-weight: 800; padding: 6px 16px; border-radius: 8px; margin-bottom: 20px;">
                    PORT GATE-IN QUERY // BERTH 4
                </div>
                <h1 style="font-size: 64px; font-weight: 900; line-height: 1.1; margin-bottom: 24px; color: #0f172a;">
                    12,000 Garments Ready.<br>
                    <span style="color: #ef4444;">Container Held at Port.</span>
                </h1>
                <p style="font-size: 26px; color: #475569; line-height: 1.5;">
                    Rafi flexes proudly beside his order. But a commercial invoice mismatch halts the trailer at the gate.
                </p>
            </div>
        </div>
        """
    },
    {
        "id": 2,
        "name": "Everything That Goes Wrong",
        "duration": 18,
        "time_str": "0:12 - 0:30 (18s)",
        "onscreen": "Quantity Mismatch • LC Passed • Missing COO • UD Quota Breach • $8,500 Demurrage",
        "sfx": "5 Warning pings • Low tense music",
        "voiceover": "The invoice says twelve thousand pieces. The packing list says eleven thousand four hundred. The LC date has passed. A certificate is missing. And the bonded fabric doesn't match the UD. Each mismatch means delay, bank queries, and late payment.",
        "html_body": """
        <div style="width: 100%; max-width: 1500px; text-align: center;">
            <div style="display: inline-block; background: #fee2e2; border: 2px solid #ef4444; color: #b91c1c; font-family: monospace; font-size: 20px; font-weight: 800; padding: 8px 24px; border-radius: 9999px; margin-bottom: 30px;">
                5 CRITICAL DOCUMENT DISCREPANCIES DETECTED
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px;">
                <div style="background: white; border: 3px solid #ef4444; border-radius: 20px; padding: 30px 20px; box-shadow: 0 10px 25px rgba(239,68,68,0.15);">
                    <div style="font-size: 16px; font-family: monospace; font-weight: 900; color: #ef4444; margin-bottom: 12px;">01. QUANTITY</div>
                    <div style="font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">12k vs 11.4k</div>
                    <div style="font-size: 16px; color: #64748b;">-600 pcs carton deficit</div>
                </div>
                <div style="background: white; border: 3px solid #ef4444; border-radius: 20px; padding: 30px 20px; box-shadow: 0 10px 25px rgba(239,68,68,0.15);">
                    <div style="font-size: 16px; font-family: monospace; font-weight: 900; color: #ef4444; margin-bottom: 12px;">02. LC CUTOFF</div>
                    <div style="font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">Date Passed</div>
                    <div style="font-size: 16px; color: #64748b;">Vessel departs after LC</div>
                </div>
                <div style="background: white; border: 3px solid #ef4444; border-radius: 20px; padding: 30px 20px; box-shadow: 0 10px 25px rgba(239,68,68,0.15);">
                    <div style="font-size: 16px; font-family: monospace; font-weight: 900; color: #ef4444; margin-bottom: 12px;">03. ORIGIN COO</div>
                    <div style="font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">Empty Slot</div>
                    <div style="font-size: 16px; color: #64748b;">Missing certificate</div>
                </div>
                <div style="background: white; border: 3px solid #ef4444; border-radius: 20px; padding: 30px 20px; box-shadow: 0 10px 25px rgba(239,68,68,0.15);">
                    <div style="font-size: 16px; font-family: monospace; font-weight: 900; color: #ef4444; margin-bottom: 12px;">04. BOND QUOTA</div>
                    <div style="font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">UD Exceeded</div>
                    <div style="font-size: 16px; color: #64748b;">+350 kg unlinked fabric</div>
                </div>
                <div style="background: white; border: 3px solid #ef4444; border-radius: 20px; padding: 30px 20px; box-shadow: 0 10px 25px rgba(239,68,68,0.15);">
                    <div style="font-size: 16px; font-family: monospace; font-weight: 900; color: #ef4444; margin-bottom: 12px;">05. PENALTIES</div>
                    <div style="font-size: 26px; font-weight: 900; color: #ef4444; margin-bottom: 8px;">$8,500+</div>
                    <div style="font-size: 16px; color: #64748b;">Port demurrage hold</div>
                </div>
            </div>
        </div>
        """
    },
    {
        "id": 3,
        "name": "Why Today's Way Fails",
        "duration": 12,
        "time_str": "0:30 - 0:42 (12s)",
        "onscreen": "Spreadsheets. Chat groups. Manual checks. Too late.",
        "sfx": "Paper rustles • Rejection thud",
        "voiceover": "Today, teams check this by hand, in spreadsheets and chat groups. Government systems verify after filing, but nobody fixes the data before it goes in.",
        "html_body": """
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; width: 100%; max-width: 1400px;">
            <div style="background: white; border: 3px solid #cbd5e1; border-radius: 24px; padding: 45px; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
                <div style="font-family: monospace; font-size: 18px; font-weight: 900; color: #d97706; margin-bottom: 14px;">THE MANUAL REALITY</div>
                <h2 style="font-size: 38px; font-weight: 900; color: #0f172a; margin-bottom: 16px;">Excel & WhatsApp Chaos</h2>
                <p style="font-size: 20px; color: #475569; line-height: 1.6;">
                    Commercial teams juggle 5 PDF windows and midnight WhatsApp messages. A 600-piece deficit slips past tired human eyes.
                </p>
            </div>
            <div style="background: white; border: 3px solid #ef4444; border-radius: 24px; padding: 45px; box-shadow: 0 10px 30px rgba(239,68,68,0.1);">
                <div style="font-family: monospace; font-size: 18px; font-weight: 900; color: #ef4444; margin-bottom: 14px;">THE GOVERNMENT GAP</div>
                <h2 style="font-size: 38px; font-weight: 900; color: #0f172a; margin-bottom: 16px;">Verified Only After Filing</h2>
                <p style="font-size: 20px; color: #475569; line-height: 1.6;">
                    Customs systems check after submission. By the time a discrepancy is flagged, the container is impounded at port.
                </p>
            </div>
        </div>
        """
    },
    {
        "id": 4,
        "name": "Enter ExportOps AI",
        "duration": 8,
        "time_str": "0:42 - 0:50 (8s)",
        "onscreen": "ExportOps AI. Ship ready.",
        "sfx": "Teal light whoosh • Uplifting chime",
        "voiceover": "Meet ExportOps AI. The control tower that makes every shipment ready before it moves.",
        "html_body": """
        <div style="text-align: center; max-width: 1100px;">
            <div style="width: 130px; height: 130px; border-radius: 32px; background: #0d9488; color: white; display: flex; align-items: center; justify-content: center; font-size: 64px; font-weight: 900; margin: 0 auto 30px; box-shadow: 0 20px 50px rgba(13,148,136,0.35);">
                ⚓
            </div>
            <h1 style="font-size: 78px; font-weight: 900; color: #0f172a; letter-spacing: -2px; margin-bottom: 20px;">
                Enter ExportOps <span style="color: #0d9488;">AI</span>
            </h1>
            <p style="font-size: 32px; font-weight: 700; color: #0d9488; font-family: monospace;">
                The Pre-Shipment Control Tower // Ship Ready Before Moving
            </p>
        </div>
        """
    },
    {
        "id": 5,
        "name": "Rafi's Problem, Solved",
        "duration": 35,
        "time_str": "0:50 - 1:25 (35s)",
        "onscreen": "Read. Check. Explain. Fix. ➔ Blocked to Customs-Ready.",
        "sfx": "Soft UI clicks • Success chime at 1:22",
        "voiceover": "Rafi uploads his documents. ExportOps reads them in seconds, and shows where each value came from. Eight rules check every document against the others, and against the bond ledger. Three problems appear, each explained in plain language. Rafi fixes them and re-runs. Blocked turns to customs-ready, and his container sails.",
        "html_body": """
        <div style="display: flex; align-items: center; justify-content: center; gap: 50px; width: 100%; max-width: 1600px;">
            <img src="../character/rafi_celebrating_fistpump.svg" style="width: 440px; height: 440px; object-fit: contain;" />
            <div style="flex: 1; background: #070b14; border: 2px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 35px; color: white; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px; font-family: monospace;">
                    <span style="color: #34d399; font-weight: 800; font-size: 16px;">// DUAL-WINDOW INSPECTION STUDIO: EXP-001</span>
                    <span style="background: #065f46; color: #34d399; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 800;">100% RECONCILED</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; font-family: monospace;">
                    <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 14px;">
                        <span style="color: #94a3b8; font-size: 13px;">COMMERCIAL INVOICE:</span>
                        <div style="font-size: 26px; font-weight: 900; margin-top: 6px;">12,000 PCS ($72,000)</div>
                    </div>
                    <div style="background: rgba(16,185,129,0.15); border: 2px solid #10b981; padding: 20px; border-radius: 14px;">
                        <span style="color: #6ee7b7; font-size: 13px;">PACKING LIST SCAN:</span>
                        <div style="font-size: 26px; font-weight: 900; color: #34d399; margin-top: 6px;">12,000 PCS (MATCHED)</div>
                    </div>
                </div>
                <div style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); padding: 18px 24px; border-radius: 14px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 18px; color: #6ee7b7; font-weight: 700;">✓ 8/8 Deterministic Rules Passed • Cryptographic QR Gate Pass Issued</span>
                    <span style="font-family: monospace; font-size: 20px; font-weight: 900; color: #34d399;">SCORE: 100/100</span>
                </div>
            </div>
        </div>
        """
    },
    {
        "id": 6,
        "name": "Why This and Not the Others",
        "duration": 20,
        "time_str": "1:25 - 1:45 (20s)",
        "onscreen": "Pre-Filing Intelligence. Documents + Bond + Bank in One View.",
        "sfx": "Wood-block ticks • Resonant confirmation",
        "voiceover": "Why not the other tools? Customs systems file and verify, after the data is final. Defect-inspection AI checks fabric quality, not documents. ERPs and spreadsheets have no rules and no audit trail. ExportOps works before filing, and joins documents, bond, and bank readiness in one view.",
        "html_body": """
        <div style="width: 100%; max-width: 1550px;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: left;">
                <div style="background: white; border: 2px solid #cbd5e1; border-radius: 20px; padding: 35px 25px;">
                    <div style="color: #ef4444; font-family: monospace; font-weight: 900; font-size: 18px; margin-bottom: 12px;">✕ CUSTOMS (ASYCUDA)</div>
                    <div style="font-size: 22px; font-weight: 800; margin-bottom: 12px; color: #0f172a;">Post-Filing Only</div>
                    <p style="font-size: 16px; color: #64748b; line-height: 1.5;">Files and checks after data is locked; no proactive guidance.</p>
                </div>
                <div style="background: white; border: 2px solid #cbd5e1; border-radius: 20px; padding: 35px 25px;">
                    <div style="color: #d97706; font-family: monospace; font-weight: 900; font-size: 18px; margin-bottom: 12px;">⚠ DEFECT AI</div>
                    <div style="font-size: 22px; font-weight: 800; margin-bottom: 12px; color: #0f172a;">Fabric Flaws Only</div>
                    <p style="font-size: 16px; color: #64748b; line-height: 1.5;">Computer vision scans physical stitches; ignores trade paperwork.</p>
                </div>
                <div style="background: white; border: 2px solid #cbd5e1; border-radius: 20px; padding: 35px 25px;">
                    <div style="color: #ef4444; font-family: monospace; font-weight: 900; font-size: 18px; margin-bottom: 12px;">✕ ERP / SPREADSHEETS</div>
                    <div style="font-size: 22px; font-weight: 800; margin-bottom: 12px; color: #0f172a;">No Rules Engine</div>
                    <p style="font-size: 16px; color: #64748b; line-height: 1.5;">Static data dump with zero cross-checking and no audit trail.</p>
                </div>
                <div style="background: #f0fdf4; border: 3px solid #10b981; border-radius: 20px; padding: 35px 25px; box-shadow: 0 15px 35px rgba(16,185,129,0.15);">
                    <div style="color: #059669; font-family: monospace; font-weight: 900; font-size: 18px; margin-bottom: 12px;">✓ EXPORTOPS AI</div>
                    <div style="font-size: 22px; font-weight: 900; margin-bottom: 12px; color: #065f46;">Pre-Filing Shield</div>
                    <p style="font-size: 16px; color: #065f46; font-weight: 600; line-height: 1.5;">Fixes before filing. Documents + Bond + Bank in one view.</p>
                </div>
            </div>
        </div>
        """
    },
    {
        "id": 7,
        "name": "How It Works",
        "duration": 20,
        "time_str": "1:45 - 2:05 (20s)",
        "onscreen": "AI reads. Rules decide. Humans approve. Everything is logged.",
        "sfx": "Pipeline harmonic notes",
        "voiceover": "How it works. AI reads and explains. Fixed rules decide pass or fail. A human approves, and every step is logged. So AI never approves a shipment on its own.",
        "html_body": """
        <div style="width: 100%; max-width: 1500px; text-align: center;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: white; padding: 18px 40px; border-radius: 16px; font-family: monospace; font-size: 18px; font-weight: 800; margin-bottom: 40px;">
                <span>01. PO & LC</span> ➔ 
                <span>02. Production & Bond</span> ➔ 
                <span>03. Invoice & Packing</span> ➔ 
                <span>04. C&F Bill of Export</span> ➔ 
                <span style="color: #34d399;">05. Customs Gate-In Pass</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
                <div style="background: white; border: 3px solid #0f172a; border-radius: 20px; padding: 35px;">
                    <div style="font-size: 32px; font-weight: 900; color: #0d9488; margin-bottom: 10px;">1. AI Reads</div>
                    <p style="font-size: 18px; color: #475569;">Extracts messy PDFs and cites exact source quotations.</p>
                </div>
                <div style="background: white; border: 3px solid #0f172a; border-radius: 20px; padding: 35px;">
                    <div style="font-size: 32px; font-weight: 900; color: #0f172a; margin-bottom: 10px;">2. Rules Decide</div>
                    <p style="font-size: 18px; color: #475569;">Deterministic TypeScript engine verifies R1 to R8.</p>
                </div>
                <div style="background: white; border: 3px solid #0f172a; border-radius: 20px; padding: 35px;">
                    <div style="font-size: 32px; font-weight: 900; color: #059669; margin-bottom: 10px;">3. Human Approves</div>
                    <p style="font-size: 18px; color: #475569;">Human-in-the-loop control; every change logged.</p>
                </div>
            </div>
        </div>
        """
    },
    {
        "id": 8,
        "name": "What Else It Does",
        "duration": 15,
        "time_str": "2:05 - 2:20 (15s)",
        "onscreen": "BondIQ Ledger • Shipment Timeline • Bank-Ready Score • Delay Analytics",
        "sfx": "Rapid card-flip pops",
        "voiceover": "Beyond documents: bond and UD reconciliation, a live shipment timeline, trade-finance readiness, and a dashboard of the top causes of delay and avoidable cost.",
        "html_body": """
        <div style="width: 100%; max-width: 1500px;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center;">
                <div style="background: white; border: 2px solid #cbd5e1; border-radius: 20px; padding: 35px 20px;">
                    <div style="font-size: 36px; margin-bottom: 12px;">⚖️</div>
                    <div style="font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">BondIQ Ledger</div>
                    <p style="font-size: 15px; color: #64748b;">BGMEA UD fabric quota balance math</p>
                </div>
                <div style="background: white; border: 2px solid #cbd5e1; border-radius: 20px; padding: 35px 20px;">
                    <div style="font-size: 36px; margin-bottom: 12px;">⏱️</div>
                    <div style="font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">Shipment Timeline</div>
                    <p style="font-size: 15px; color: #64748b;">Vessel cut-off countdowns</p>
                </div>
                <div style="background: white; border: 2px solid #cbd5e1; border-radius: 20px; padding: 35px 20px;">
                    <div style="font-size: 36px; margin-bottom: 12px;">🛡️</div>
                    <div style="font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">Bank-Ready Score</div>
                    <p style="font-size: 15px; color: #64748b;">UCP 600 clean payment guarantee</p>
                </div>
                <div style="background: white; border: 2px solid #cbd5e1; border-radius: 20px; padding: 35px 20px;">
                    <div style="font-size: 36px; margin-bottom: 12px;">📊</div>
                    <div style="font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">Delay Analytics</div>
                    <p style="font-size: 15px; color: #64748b;">Avoidable demurrage costs</p>
                </div>
            </div>
        </div>
        """
    },
    {
        "id": 9,
        "name": "Business and Scale",
        "duration": 15,
        "time_str": "2:20 - 2:35 (15s)",
        "onscreen": "Subscription. Paid pilots. Garments first, then global trade.",
        "sfx": "Upbeat building swell",
        "voiceover": "Factories pay a monthly subscription, starting with a paid pilot. One prevented delay pays for it. Garments first, then leather, jute, and pharma. Built with human review and audit logs.",
        "html_body": """
        <div style="width: 100%; max-width: 1400px; text-align: center;">
            <div style="display: inline-block; background: #ccfbf1; color: #0f766e; font-family: monospace; font-size: 18px; font-weight: 800; padding: 8px 24px; border-radius: 9999px; margin-bottom: 24px;">
                COMMERCIAL SUBSCRIPTION MODEL
            </div>
            <h1 style="font-size: 56px; font-weight: 900; color: #0f172a; margin-bottom: 20px;">
                Monthly Subscription • 90-Day Factory Pilot
            </h1>
            <p style="font-size: 26px; color: #475569; max-w: 900px; margin: 0 auto 35px;">
                Preventing just <strong>one demurrage hold ($8,500)</strong> pays for the software for a full year.
            </p>
            <div style="display: flex; justify-content: center; gap: 20px; font-family: monospace; font-size: 18px; font-weight: 800;">
                <span style="background: #0f172a; color: white; padding: 12px 24px; border-radius: 12px;">Garments (Live)</span>
                <span style="background: #e2e8f0; color: #334155; padding: 12px 24px; border-radius: 12px;">➔ Leather</span>
                <span style="background: #e2e8f0; color: #334155; padding: 12px 24px; border-radius: 12px;">➔ Jute</span>
                <span style="background: #e2e8f0; color: #334155; padding: 12px 24px; border-radius: 12px;">➔ Pharma</span>
            </div>
        </div>
        """
    },
    {
        "id": 10,
        "name": "Close & Payoff",
        "duration": 15,
        "time_str": "2:35 - 2:50 (15s)",
        "onscreen": "ExportOps AI. Ship ready. Ship on time. Team Extokened.",
        "sfx": "Triumphant final chime",
        "voiceover": "ExportOps AI. Ship ready. Ship on time. Team Extokened, for the International AI Builders Congress.",
        "html_body": """
        <div style="display: flex; align-items: center; justify-content: center; gap: 80px; width: 100%; max-width: 1400px;">
            <img src="../character/rafi_celebrating_fistpump.svg" style="width: 500px; height: 500px; object-fit: contain;" />
            <div style="max-width: 650px;">
                <div style="display: inline-block; background: #d1fae5; border: 2px solid #10b981; color: #065f46; font-family: monospace; font-size: 18px; font-weight: 800; padding: 6px 16px; border-radius: 8px; margin-bottom: 20px;">
                    TEAM EXTOKENED // CONGRESS 2026
                </div>
                <h1 style="font-size: 72px; font-weight: 900; line-height: 1.1; margin-bottom: 16px; color: #0f172a;">
                    ExportOps <span style="color: #0d9488;">AI</span>
                </h1>
                <p style="font-size: 32px; font-weight: 800; color: #0d9488; font-family: monospace; margin-bottom: 24px;">
                    Ship ready. Ship on time.
                </p>
                <div style="font-family: monospace; font-size: 16px; color: #64748b; line-height: 1.8;">
                    <div>• International AI Builders Congress</div>
                    <div>• Interactive Prototype: localhost:3000</div>
                    <div>• Codebase: github.com/shajidul-sobuj/ExportOps</div>
                </div>
            </div>
        </div>
        """
    }
]

def main():
    print("🎬 Generating 10 scene frames for 170s explainer video...")
    
    template_path = os.path.join(SCENES_DIR, "scene_template.html")
    with open(template_path, "r", encoding="utf-8") as f:
        template_html = f.read()

    ffmpeg_inputs = []
    
    for s in SCENES:
        scene_html = template_html.replace(
            '<!-- Clean Dynamic Visual Stage Content (No Corner Time Badge, No Subtitle Text Bar) -->',
            s["html_body"]
        )

        out_html = os.path.join(SCENES_DIR, f"scene_{s['id']:02d}.html")
        out_png = os.path.join(SCENES_DIR, f"scene_{s['id']:02d}.png")
        
        with open(out_html, "w", encoding="utf-8") as f:
            f.write(scene_html)
            
        print(f"📸 Capturing Scene {s['id']}: {s['name']} (Duration: {s['duration']}s)...")
        chrome_cmd = [
            "/usr/bin/google-chrome",
            "--headless",
            "--disable-gpu",
            "--window-size=1920,1080",
            f"--screenshot={out_png}",
            f"file://{out_html}"
        ]
        subprocess.run(chrome_cmd, check=True)
        ffmpeg_inputs.append((out_png, s["duration"]))

    print("🎞️ Generating concat demuxer file for FFmpeg...")
    concat_txt_path = os.path.join(SCENES_DIR, "scenes_concat.txt")
    with open(concat_txt_path, "w", encoding="utf-8") as f:
        for png_path, dur in ffmpeg_inputs:
            f.write(f"file '{png_path}'\n")
            f.write(f"duration {dur}\n")
        # Repeat last file for ffmpeg concat bug workaround
        f.write(f"file '{ffmpeg_inputs[-1][0]}'\n")

    print("📽️ Encoding 170-second 1080p MP4 with FFmpeg...")
    # Generate MP4 with an exact 170s audio track (sine tone or silent stream)
    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_txt_path,
        "-f", "lavfi",
        "-i", "anullsrc=r=44100:cl=stereo",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-r", "30",
        "-c:a", "aac",
        "-t", "170",
        "-movflags", "+faststart",
        OUT_MP4
    ]
    subprocess.run(ffmpeg_cmd, check=True)
    
    size_mb = os.path.getsize(OUT_MP4) / (1024 * 1024)
    print(f"✅ Video render complete! File: {OUT_MP4} ({size_mb:.2f} MB, 170.0 seconds)")

if __name__ == "__main__":
    main()
