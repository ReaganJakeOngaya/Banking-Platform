import type { Metadata } from 'next';
import { Syne, DM_Mono } from 'next/font/google';
import './../styles/global.css';
import Providers from './providers';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'NovaPay | Modern Banking API',
  description: 'Secure, reliable payment infrastructure for your business. Accept payments, manage transactions, and scale globally.',
  keywords: ['payments', 'API', 'banking', 'fintech', 'transactions'],
  openGraph: {
    title: 'NovaPay | Modern Banking API',
    description: 'Secure, reliable payment infrastructure for your business.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} scroll-smooth`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}