import Decimal from 'decimal.js';

export interface QuadraticResult {
  roots: string[];
  discriminant: string;
  steps: string[];
  kind: 'two-real' | 'one-real' | 'two-complex';
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (a === 0) throw new Error('Coefficient a must be non-zero for a quadratic');
  const A = new Decimal(a), B = new Decimal(b), C = new Decimal(c);
  const disc = B.times(B).minus(A.times(C).times(4));
  const steps: string[] = [
    `Equation: ${a}x² + ${b}x + ${c} = 0`,
    `Discriminant Δ = b² − 4ac = ${B}² − 4·${A}·${C} = ${disc}`,
  ];
  if (disc.isNegative()) {
    const real = B.negated().div(A.times(2));
    const imag = disc.negated().sqrt().div(A.times(2));
    steps.push(`Δ < 0 → two complex roots: x = ${real} ± ${imag}i`);
    return {
      kind: 'two-complex',
      discriminant: disc.toString(),
      roots: [`${real} + ${imag}i`, `${real} - ${imag}i`],
      steps,
    };
  }
  if (disc.isZero()) {
    const x = B.negated().div(A.times(2));
    steps.push(`Δ = 0 → one real root: x = −r/(2a) = ${x}`);
    return { kind: 'one-real', discriminant: '0', roots: [x.toString()], steps };
  }
  const sqrtD = disc.sqrt();
  const x1 = B.negated().plus(sqrtD).div(A.times(2));
  const x2 = B.negated().minus(sqrtD).div(A.times(2));
  steps.push(`√Ô = ${sqrtD}`);
  steps.push(`x = (−r ± √Δ) / (2a) → x₁ = ${x1}, x₂ = ${x2}`);
  return {
    kind: 'two-real',
    discriminant: disc.toString(),
    roots: [x1.toString(), x2.toString()],
    steps,
  };
}
