import './globals.css';
import type { Metadata } from 'next';
import { GlobalNav } from '@/components/GlobalNav';

export const metadata: Metadata = {
  title: 'Web Tin Tức',
  description: 'News + e-commerce app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
  <main style={{ padding: 16 }}>{children}</main>
  <GlobalNav />
      </body>
    </html>
  );
}
