import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />
      <main className="flex-1 relative overflow-hidden bg-[#030712]">
        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
