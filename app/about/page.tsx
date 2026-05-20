import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — MathLab',
  description: 'MathLab is a free student math toolkit built by Adil Jalal — a web developer focused on fast, modern, step-by-step learning tools.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>About MathLab</h1>
      <p>
        <strong>MathLab</strong> is a free, modern student math toolkit — scientific
        and graphing calculators, step-by-step equation solvers, fraction and
        percentage helpers, matrix tools, unit conversion, GPA, and more.
      </p>
      <h2>Built by Adil Jalal</h2>
      <p>
        Hi — I&apos;m <strong>Adil Jalal</strong>, a web developer building MathLab as
        a fast, original, mobile-first alternative to legacy calculator sites.
        Everything here is built from scratch: no TI / Casio / HP / Desmos ROMs,
        emulators, fonts, or trademarks. Just clean web tools that work.
      </p>
      <p>
        Source code (MIT): <a href="https://github.com/adiljalal2009-creator/mathlab">github.com/adiljalal2009-creator/mathlab</a>
      </p>
      <h2>Principles</h2>
      <ul>
        <li>Fast — Core Web Vitals first, server-rendered, offline-capable.</li>
        <li>Honest — show the math, show the steps, show the source.</li>
        <li>Original — no copied UIs, no protected marks, no scraped content.</li>
        <li>Privacy-respecting — cookieless analytics, COPPA-aware.</li>
      </ul>
    </main>
  );
}
