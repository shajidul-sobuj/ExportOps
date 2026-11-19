'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Bell, 
  Sliders, 
  ShieldCheck, 
  Check, 
  Plus, 
  Trash2, 
  Save, 
  Smartphone, 
  Mail,
  Globe
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  PageHeader, 
  Badge 
} from '@/components/ui';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'org' | 'team' | 'alerts' | 'appearance'>('org');
  const [saved, setSaved] = useState(false);

  // Form states
  const [factoryName, setFactoryName] = useState('Apex Holdings Ltd.');
  const [binNumber, setBinNumber] = useState('BIN-002910482-0101');
  const [bgmeaNumber, setBgmeaNumber] = useState('BGMEA-REG-8821');
  const [bondLicense, setBondLicense] = useState('CWH-DH-2018-9941');

  // WhatsApp Alert Numbers
  const [phoneNumbers, setPhoneNumbers] = useState([
    { name: 'Rahim Ahmed (Commercial Head)', phone: '+880 1711 002918', role: 'Commercial' },
    { name: 'Kamal Hossain (Packaging Floor Supervisor)', phone: '+880 1819 448291', role: 'Floor' },
    { name: 'Mohiuddin C&F (Chittagong Port Agent)', phone: '+880 1912 334901', role: 'C&F' }
  ]);

  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');

  const handleAddPhone = () => {
    if (newPhone && newName) {
      setPhoneNumbers([...phoneNumbers, { name: newName, phone: newPhone, role: 'Floor' }]);
      setNewName('');
      setNewPhone('');
    }
  };

  const handleRemovePhone = (idx: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      <PageHeader
        title="Settings & Configurations"
        description="Manage factory credentials, customs bonded warehouse licenses, and automated floor notification channels."
        actions={
          <Button variant="primary" onClick={handleSave}>
            {saved ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved' : 'Save Changes'}</span>
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-line pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('org')}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all',
            activeTab === 'org' ? 'bg-surface-2 text-ink-1 border border-line-strong' : 'text-ink-3 hover:text-ink-1'
          )}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Factory & Customs</span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all',
            activeTab === 'team' ? 'bg-surface-2 text-ink-1 border border-line-strong' : 'text-ink-3 hover:text-ink-1'
          )}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team Members</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all',
            activeTab === 'alerts' ? 'bg-surface-2 text-ink-1 border border-line-strong' : 'text-ink-3 hover:text-ink-1'
          )}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Alert Channels (WhatsApp)</span>
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all',
            activeTab === 'appearance' ? 'bg-surface-2 text-ink-1 border border-line-strong' : 'text-ink-3 hover:text-ink-1'
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Preferences & Language</span>
        </button>
      </div>

      {/* TAB 1: Organization */}
      {activeTab === 'org' && (
        <Card className="p-6 space-y-5">
          <CardHeader
            title="Customs House & BGMEA Registry"
            description="Used for automated ASYCUDA World Bill of Export pre-validation and cryptographic QR gate passes."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Registered Factory Name</label>
              <input
                type="text"
                value={factoryName}
                onChange={e => setFactoryName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Business Identification Number (BIN)</label>
              <input
                type="text"
                value={binNumber}
                onChange={e => setBinNumber(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 font-mono outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">BGMEA / BKMEA Membership Number</label>
              <input
                type="text"
                value={bgmeaNumber}
                onChange={e => setBgmeaNumber(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 font-mono outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Customs Bonded Warehouse License</label>
              <input
                type="text"
                value={bondLicense}
                onChange={e => setBondLicense(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-app border border-line-strong text-ink-1 font-mono outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </Card>
      )}

      {/* TAB 2: Team Members */}
      {activeTab === 'team' && (
        <Card className="p-6 space-y-5">
          <CardHeader
            title="Commercial & Compliance Team"
            description="Users authorized to remediate document mismatches and issue port gate-in permits."
          />

          <div className="space-y-3">
            {[
              { name: 'Rahim Ahmed', email: 'rahim@apexholdings.com', role: 'Commercial Head', status: 'Active' },
              { name: 'Farzana Yasmin', email: 'farzana@apexholdings.com', role: 'Documentation Officer', status: 'Active' },
              { name: 'Kamal Hossain', email: 'kamal.floor@apexholdings.com', role: 'Packaging In-Charge', status: 'Floor Access' },
              { name: 'Chittagong C&F Liaison', email: 'ops@chittagongforwarders.com', role: 'Clearing Agent', status: 'Read Only' }
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-app border border-line text-xs">
                <div>
                  <p className="font-semibold text-ink-1 text-sm">{member.name}</p>
                  <p className="text-ink-3">{member.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone="neutral">{member.role}</Badge>
                  <Badge tone="success">{member.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: Alert Channels */}
      {activeTab === 'alerts' && (
        <Card className="p-6 space-y-5">
          <CardHeader
            title="Automated Floor & WhatsApp Dispatch"
            description="When Rule R1 (Quantity Discrepancy) or Rule R8 (UD Quota) fails, instant bilingual notices are dispatched."
          />

          <div className="space-y-3">
            {phoneNumbers.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-app border border-line text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink-1">{p.name}</p>
                    <p className="font-mono text-ink-3">{p.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="info">{p.role}</Badge>
                  <button
                    onClick={() => handleRemovePhone(idx)}
                    className="p-1 text-ink-3 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Contact */}
          <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Contact Name & Role (e.g. Floor Incharge)"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full sm:flex-1 h-9 px-3 rounded-lg bg-app border border-line-strong text-xs text-ink-1 outline-none"
            />
            <input
              type="text"
              placeholder="+880 1711..."
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)}
              className="w-full sm:w-48 h-9 px-3 rounded-lg bg-app border border-line-strong text-xs text-ink-1 font-mono outline-none"
            />
            <Button variant="secondary" onClick={handleAddPhone} className="w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              <span>Add Recipient</span>
            </Button>
          </div>
        </Card>
      )}

      {/* TAB 4: Appearance */}
      {activeTab === 'appearance' && (
        <Card className="p-6 space-y-5">
          <CardHeader
            title="UI Preferences & Language Settings"
            description="Configure display density and language settings for export documentation alerts."
          />

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-app border border-line flex items-center justify-between">
              <div>
                <p className="font-semibold text-ink-1 text-sm">Theme Mode</p>
                <p className="text-ink-3">Obsidian Enterprise Dark Mode (Optimized for control tower displays)</p>
              </div>
              <Badge tone="success">Obsidian Active</Badge>
            </div>

            <div className="p-4 rounded-xl bg-app border border-line flex items-center justify-between">
              <div>
                <p className="font-semibold text-ink-1 text-sm">Alert Dispatch Language</p>
                <p className="text-ink-3">Automatic English and বাংলা bilingual generation for factory floor clarity</p>
              </div>
              <Badge tone="info">Bilingual (EN + বাংলা)</Badge>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
