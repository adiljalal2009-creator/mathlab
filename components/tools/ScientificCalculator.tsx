'use client';
import { useState } from 'react';
import { parse, evaluate, solveLinear, toLatex } from '@/lib/cas';

export default function ScientificCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<{ description: string; expression: string }[]>([]);
  const [error, setError] = useState<string>('');

  function run() {
    setError(''); setResult(''); setSteps([]);
    try {
      const node = parse(input);
      if (node.type === 'eq') {
        const sol = solveLinear(node);
        setResult(`${sol.variable} = ${sol.value}`);
        setSteps(sol.steps);
      } else {
        const v = evaluate(node);
        setResult(v.toString());
      }
    } catch (e: any) {
      setError(e.message ?? 'Error');
    }
  }

  const keys = ['7','8','9','/','sin(','cos(',
                '4','5','6','*','tan(','sqrt(',
                '1','2','3','-','ln(','log(',
                '0','.','(',')','^','pi',
                '+','x','=','C','⌫','='];

  return (
    <div className="mx-auto max-w-md rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') run(); }}
        placeholder="e.g. 2*x + 3 = 11   or   sin(pi/4) + sqrt(2)"
        className="w-full rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 font-mono text-lg"
        autoFocus
      />
      <div className="mt-3 grid grid-cols-6 gap-2">
        {keys.map((k, i) => (
          <button
            key={i}
            onClick={() => {
              if (k === 'C') setInput('');
              else if (k === '⌫') setInput(s => s.slice(0, -1));
              else if (k === '=') run();
              else setInput(s => s + k);
            }}
            className="rounded border border-neutral-300 dark:border-neutral-700 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >{k}</button>
        ))}
      </div>
      {result && (
        <div className="mt-4 rounded bg-emerald-50 dark:bg-emerald-950/40 p-3">
          <div className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Result</div>
          <div className="font-mono text-xl">{result}</div>
        </div>
      )}
      {steps.length > 0 && (
        <div className="mt-4">
          <div className="text-xs uppercase tracking-wide text-neutral-500">Steps</div>
          <ol className="mt-2 space-y-2">
            {steps.map((s, i) => (
              <li key={i} className="rounded border border-neutral-200 dark:border-neutral-800 p-2">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{i + 1}. {s.description}</div>
                <div className="font-mono text-sm mt-1">{s.expression}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
      {error && <div className="mt-4 rounded bg-red-50 dark:bg-red-950/40 p-3 text-red-700 dark:text-red-400 text-sm">{error}</div>}
    </div>
  );
}
