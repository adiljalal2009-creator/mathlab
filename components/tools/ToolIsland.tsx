'use client';

import { useState } from 'react';

export default function ToolIsland({ slug }: { slug: string }) {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState<string>('');

  async function handleEvaluate() {
    if (!expr.trim()) return;
    const { evaluate } = await import('mathjs');
    try {
      const value = evaluate(expr);
      setResult(String(value));
    } catch (err) {
      setResult(`Error: ${(err as Error).message}`);
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
      <label className="block text-sm font-medium" htmlFor="expr">
        Expression
      </label>
      <input
        id="expr"
        type="text"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleEvaluate()}
        placeholder="e.g. 2 + 3 * sin(pi/4)"
        className="mt-2 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-base focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
      />
      <button
        type="button"
        onClick={handleEvaluate}
        className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
      >
        Evaluate
      </button>
      {result && (
        <div className="mt-4 rounded-md bg-neutral-50 p-4 font-mono text-lg dark:bg-neutral-900">
          = {result}
        </div>
      )}
      <p className="mt-4 text-xs text-neutral-500">
        Tool: <code>{slug}</code> · Placeholder UI. Week 2: Web Worker + CAS engine + step-by-step.
      </p>
    </div>
  );
}
