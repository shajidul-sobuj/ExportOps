import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ExportOps AI — RMG Pre-Shipment Control Tower',
    template: '%s · ExportOps AI',
  },
  description:
    'Validate export documents, reconcile bonded fabric, and clear Bangladesh RMG shipments before vessel cut-off.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-canvas text-slate-100 antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
