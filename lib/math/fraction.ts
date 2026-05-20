import Decimal from 'decimal.js';

export type Op = 'add' | 'sub' | 'mul' | 'div';
export interface Fraction { n: number; d: number; }
export interface FractionResult {
  label: string;
  result: string;
  resultTex: string;
  decimal: string;
  steps: string[];
  quality: number;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

function simplify(n: number, d: number): Fraction {
  if (d === 0) throw new Error('Division by zero');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

const OP_SYMBOL: Record<Op, string> = { add: '+', sub: '−', mul: '×', div: '÷' };

export function computeFraction(input: { op: Op; a: Fraction; b: Fraction }): FractionResult {
  const { op, a, b } = input;
  if (a.d === 0 || b.d === 0) throw new Error('Division by zero in input');
  let n = 0, d = 1;
  const steps: string[] = [`Start: ${a.n}/${a.d} ${OP_SYMBOL[op]} ${b.n}/${b.d}`];
  if (op === 'add' || op === 'sub') {
    const lcd = (a.d * b.d) / gcd(a.d, b.d);
    const an = a.n * (lcd / a.d);
    const bn = b.n * (lcd / b.d);
    steps.push(`Common denominator: ${lcd}. Rewrite as ${an}/${lcd} ${OP_SYMBOL[op]} ${bn}/${lcd}.`);
    n = op === 'add' ? an + bn : an - bn;
    d = lcd;
  } else if (op === 'mul') {
    n = a.n * b.n;
    d = a.d * b.d;
    steps.push(`Multiply numerators and denominators: ${a.n}·${b.n} / ${a.d}·${b.d} = ${n}/${d}.`);
  } else {
    n = a.n * b.d;
    d = a.d * b.n;
    steps.push(`Multiply by the reciprocal: ${a.n}/${a.d} × ${b.d}/${b.n} = ${n}/${d}.`);
  }
  const simplified = simplify(n, d);
  if (simplified.n !== n || simplified.d !== d) {
    steps.push(`Simplify by GCD ${gcd(n, d)}: ${simplified.n}/${simplified.d}.`);
  }
  const decimal = new Decimal(simplified.n).div(simplified.d).toDecimalPlaces(10).toString();
  const label = `${a.n}/${a.d} ${OP_SYMBOL[op]} ${b.n}/${b.d}`;
  const result = simplified.d === 1 ? `${simplified.n}` : `${simplified.n}/${simplified.d}`;
  const resultTex = simplified.d === 1
    ? `${simplified.n}`
    : `\\frac{${simplified.n}}{${simplified.d}}`;
  const quality =
    Math.abs(a.n) <= 1000 && Math.abs(b.n) <= 1000 && a.d <= 1000 && b.d <= 1000 ? 80 : 40;
  return { label, result, resultTex, decimal, steps, quality };
}
