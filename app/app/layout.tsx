import type { Metadata } from 'next';
import AppFrame from '@/components/app/AppFrame';

export const metadata: Metadata = {
  title: 'Console',
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return <AppFrame>{children}</AppFrame>;
}
