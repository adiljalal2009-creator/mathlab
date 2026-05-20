import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mathlab.app'),
  title: {
    default: 'MathLab — Free Online Math Tools & Step-by-Step Calculators',
    template: '%s | MathLab',
  },
  description:
    'Free, fast, modern math calculators with step-by-step explanations. Scientific, graphing, fraction, percentage, matrix, equation solver, unit converter, GPA.',
  applicationName: 'MathLab',
  authors: [{ name: 'MathLab' }],
  generator: 'Next.js',
  keywords: ['calculator', 'math', 'graphing calculator', 'equation solver', 'fraction', 'GPA', 'unit converter'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'MathLab',
    title: 'MathLab — Free Online Math Tools',
    description: 'Step-by-step math calculators for students.',
  },
  twitter: { card: 'summary_large_image', title: 'MathLab', description: 'Free math tools.' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
