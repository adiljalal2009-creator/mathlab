import Decimal from 'decimal.js';

export interface PercentResult { value: string; steps: string[]; }

export function percentOf(percent: number, of: number): PercentResult {
  const p = new Decimal(percent);
  const v = new Decimal(of);
  const value = p.div(100).times(v);
  return {
    value: value.toString(),
    steps: [
      `Convert ${percent}% to a decimal: ${p.div(100)}`,
      `Multiply by ${of}: ${p.div(100)} × ${of} = ${value}`,
    ],
  };
}

export function percentChange(from: number, to: number): PercentResult {
  if (from === 0) throw new Error('Cannot compute % change from 0');
  const diff = new Decimal(to).minus(from);
  const pct = diff.div(from).times(100);
  return {
    value: pct.toDecimalPlaces(6).toString() + '%',
    steps: [
      `Change = new − old = ${to} − ${from} = ${diff}`,
      `Divide by old value: ${diff} / ${from} = ${diff.div(from)}`,
      `Multiply by 100 → ${pct.toDecimalPlaces(6)}%`,
    ],
  };
}

export function tip(bill: number, tipPercent: number): PercentResult {
  const t = new Decimal(bill).times(tipPercent).div(100);
  const total = new Decimal(bill).plus(t);
  return {
    value: total.toDecimalPlaces(2).toString(),
    steps: [
      `Tip = ${bill} × ${tipPercent}/100 = ${t.toDecimalPlaces(2)}`,
      `Total = ${bill} + ${t.toDecimalPlaces(2)} = ${total.toDecimalPlaces(2)}`,
    ],
  };
}
