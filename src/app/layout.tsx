import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from '@/app/components/providers';
import './globals.css';
import { Metadata, Viewport } from 'next'; // Додали імпорт Viewport

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'CRM Dashboard | Manage Companies & Promotions',
  description:
    'Professional CRM dashboard for managing companies, promotions, and sales data. Secure admin panel with modern UI.',
  keywords: [
    'CRM',
    'dashboard',
    'companies',
    'promotions',
    'admin',
    'management',
    'sales analytics',
    'secure login',
  ],
  authors: [{ name: 'CRM Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'CRM Dashboard | CRM Admin Portal',
    description:
      'Professional CRM dashboard for managing companies, promotions, and sales data. Secure admin panel with modern UI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRM Dashboard | CRM Admin Portal',
    description:
      'Professional CRM dashboard for managing companies, promotions, and sales data. Secure admin panel with modern UI.',
  },
};

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${font.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
