import Decimal from 'decimal.js';
import { Node } from './ast';
import { evaluate } from './evaluator';

export interface Step { description: string; expression: string; }
export interface Solution { variable: string; value: string; steps: Step[]; }

function collectLinear(n: Node, varName: string, sign: 1 | -1): { a: Decimal; b: Decimal } {
  if (n.type === 'num') return { a: new Decimal(0), b: new Decimal(n.value).times(sign) };
  if (n.type === 'var' && n.name === varName) return { a: new Decimal(sign), b: new Decimal(0) };
  if (n.type === 'const') return { a: new Decimal(0), b: new Decimal(evaluate(n)).times(sign) };
  if (n.type === 'unary') {
    const nextSign = (n.op === '-' ? -sign : sign) as 1 | -1;
    return collectLinear(n.arg, varName, nextSign);
  }
  if (n.type === 'binary') {
    if (n.op === '+') {
      const l = collectLinear(n.left, varName, sign);
      const r = collectLinear(n.right, varName, sign);
      return { a: l.a.plus(r.a), b: l.b.plus(r.b) };
    }
    if (n.op === '-') {
      const l = collectLinear(n.left, varName, sign);
      const r = collectLinear(n.right, varName, (-sign) as 1 | -1);
      return { a: l.a.plus(r.a), b: l.b.plus(r.b) };
    }
    if (n.op === '*') {
      const lHasVar = containsVar(n.left, varName);
      const rHasVar = containsVar(n.right, varName);
      if (!lHasVar && !rHasVar) {
        return { a: new Decimal(0), b: evaluate(n).times(sign) };
      }
      if (lHasVar && !rHasVar) {
        const coeff = evaluate(n.right);
        const inner = collectLinear(n.left, varName, sign);
        return { a: inner.a.times(coeff), b: inner.b.times(coeff) };
      }
      if (!lHasVar && rHasVar) {
        const coeff = evaluate(n.left);
        const inner = collectLinear(n.right, varName, sign);
        return { a: inner.a.times(coeff), b: inner.b.times(coeff) };
      }
    }
    if (n.op === '/') {
      const rHasVar = containsVar(n.right, varName);
      if (!rHasVar) {
        const denom = evaluate(n.right);
        if (denom.isZero()) throw new Error('Division by zero');
        const inner = collectLinear(n.left, varName, sign);
        return { a: inner.a.div(denom), b: inner.b.div(denom) };
      }
    }
  }
  throw new Error('Equation is not linear in ' + varName);
}

function containsVar(n: Node, name: string): boolean {
  switch (n.type) {
    case 'var': return n.name === name;
    case 'num': case 'const': return false;
    case 'unary': return containsVar(n.arg, name);
    case 'binary': return containsVar(n.left, name) || containsVar(n.right, name);
    case 'call': return n.args.some(a => containsVar(a, name));
    case 'eq': return containsVar(n.left, name) || containsVar(n.right, name);
  }
}

export function findVar(n: Node): string | null {
  switch (n.type) {
    case 'var': return n.name;
    case 'num': case 'const': return null;
    case 'unary': return findVar(n.arg);
    case 'binary': return findVar(n.left) ?? findVar(n.right);
    case 'call': for (const a of n.args) { const v = findVar(a); if (v) return v; } return null;
    case 'eq': return findVar(n.left) ?? findVar(n.right);
  }
}

export function solveLinear(eq: Node): Solution {
  if (eq.type !== 'eq') throw new Error('Not an equation');
  const v = findVar(eq) ?? 'x';
  const left = collectLinear(eq.left, v, 1);
  const right = collectLinear(eq.right, v, 1);
  const a = left.a.minus(right.a);
  const b = right.b.minus(left.b);
  if (a.isZero()) {
    if (b.isZero()) throw new Error('Identity (infinite solutions)');
    throw new Error('No solution');
  }
  const value = b.div(a);
  const steps: Step[] = [
    { description: 'Start with the equation', expression: `${fmt(left.a)}${v} + ${fmt(left.b)} = ${fmt(right.a)}${v} + ${fmt(right.b)}` },
    { description: `Move all ${v} terms to the left and constants to the right`, expression: `${fmt(a)}${v} = ${fmt(b)}` },
    { description: `Divide both sides by ${fmt(a)}`, expression: `${v} = ${fmt(value)}` },
  ];
  return { variable: v, value: value.toString(), steps };
}

function fmt(d: Decimal): string { return d.toString(); }
