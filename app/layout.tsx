import type { Metadata, Viewport } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mathlab.app'),
  title: {
    default: 'MathLab — Free Online Math Tools & Step-by-Step Calculators',
    template: '%s | MathLab',
  },
  description:
    'Free, fast, modern math calculators with step-by-step explanations. Scientific, graphing, fraction, percentage, matrix, equation solver, unit converter, GPA. Built by Adil Jalal.',
  applicationName: 'MathLab',
  authors: [{ name: 'Adil Jalal', url: 'https://github.com/adiljalal2009-creator' }],
  creator: 'Adil Jalal',
  publisher: 'Adil Jalal',
  generator: 'Next.js',
  keywords: ['calculator', 'math', 'graphing calculator', 'equation solver', 'fraction', 'GPA', 'unit converter', 'Adil Jalal', 'MathLab'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'MathLab',
    title: 'MathLab — Free Online Math Tools',
    description: 'Step-by-step math calculators for students. Built by Adil Jalal.',
  },
  twitter: { card: 'summary_large_image', title: 'MathLab', description: 'Free math tools by Adil Jalal.' },
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
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-display text-lg font-semibold">MathLab</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/" className="hover:underline">Tools</Link>
              <Link href="/about" className="hover:underline">About</Link>
            </div>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p>
              © 2026 <a href="https://github.com/adiljalal2009-creator" className="font-medium hover:underline">Adil Jalal</a>. MIT Licensed.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
              <a href="https://github.com/adiljalal2009-creator/mathlab" className="hover:underline">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
