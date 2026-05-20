import type { Metadata } from 'next';
import ScientificCalculator from '@/components/tools/ScientificCalculator';

export const metadata: Metadata = {
  title: 'Scientific Calculator — Step-by-Step',
  description: 'Free online scientific calculator with step-by-step solutions for linear equations. Supports sin, cos, tan, ln, log, sqrt, exponents. Built by Adil Jalal.',
  alternates: { canonical: '/tools/scientific' },
};

export default function ScientificPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">Scientific Calculator</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        Type an expression like <code className="font-mono">sin(pi/4) + sqrt(2)</code> or an equation like <code className="font-mono">2*x + 3 = 11</code>.
      </p>
      <div className="mt-8">
        <ScientificCalculator />
      </div>
      <section className="prose dark:prose-invert mt-12 max-w-none">
        <h2>How it works</h2>
        <p>This calculator uses a Pratt parser to build an AST from your expression, evaluates it with <code>decimal.js</code> (40-digit precision), and solves linear equations step-by-step using symbolic coefficient collection.</p>
        <h2>Examples</h2>
        <ul>
          <li><code>2*x + 3 = 11</code> → solves for x with steps</li>
          <li><code>(3 + 4) * 5</code> → arithmetic</li>
          <li><code>sin(pi/2)</code> → trig</li>
          <li><code>sqrt(2)^2</code> → roots and powers</li>
        </ul>
        <p className="text-sm text-neutral-500">Built by <a href="https://github.com/adiljalal2009-creator">Adil Jalal</a>.</p>
      </section>
    </main>
  );
}
