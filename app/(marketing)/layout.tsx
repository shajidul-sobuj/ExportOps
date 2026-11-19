import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-slate-100">
      <Navbar />
      <main className="flex-1 bg-mesh-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-modern pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
