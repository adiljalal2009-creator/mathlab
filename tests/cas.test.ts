import { describe, it, expect } from 'vitest';
import { parse, evaluate, solveLinear, toLatex } from '@/lib/cas';

function val(src: string): string {
  return evaluate(parse(src)).toString();
}

describe('arithmetic', () => {
  it('adds', () => expect(val('1 + 2')).toBe('3'));
  it('subtracts', () => expect(val('10 - 4')).toBe('6'));
  it('multiplies', () => expect(val('6 * 7')).toBe('42'));
  it('divides', () => expect(val('20 / 4')).toBe('5'));
  it('honors precedence', () => expect(val('2 + 3 * 4')).toBe('14'));
  it('honors parentheses', () => expect(val('(2 + 3) * 4')).toBe('20'));
  it('handles unary minus', () => expect(val('-5 + 3')).toBe('-2'));
  it('handles double unary', () => expect(val('--5')).toBe('5'));
  it('handles exponents', () => expect(val('2 ^ 10')).toBe('1024'));
  it('right-associates exponents', () => expect(val('2 ^ 2 ^ 3')).toBe('256'));
  it('handles decimals', () => expect(val('0.1 + 0.2')).toBe('0.3'));
  it('handles negative exponents', () => expect(val('2 ^ -2')).toBe('0.25'));
});

describe('functions', () => {
  it('sqrt', () => expect(val('sqrt(16)')).toBe('4'));
  it('abs', () => expect(val('abs(-7)')).toBe('7'));
  it('floor', () => expect(val('floor(3.7)')).toBe('3'));
  it('ceil', () => expect(val('ceil(3.2)')).toBe('4'));
  it('round', () => expect(val('round(3.5)')).toBe('4'));
});

describe('constants', () => {
  it('pi', () => expect(parseFloat(val('pi'))).toBeCloseTo(Math.PI, 10));
  it('e', () => expect(parseFloat(val('e'))).toBeCloseTo(Math.E, 10));
});

describe('implicit multiplication', () => {
  it('number-paren', () => expect(val('2(3 + 4)')).toBe('14'));
  it('paren-paren', () => expect(val('(2)(3)')).toBe('6'));
});

describe('linear equations', () => {
  it('solves x + 3 = 7', () => {
    const sol = solveLinear(parse('x + 3 = 7'));
    expect(sol.value).toBe('4');
    expect(sol.steps.length).toBeGreaterThan(0);
  });
  it('solves 2*x + 3 = 11', () => {
    expect(solveLinear(parse('2*x + 3 = 11')).value).toBe('4');
  });
  it('solves 3*x - 5 = 2*x + 1', () => {
    expect(solveLinear(parse('3*x - 5 = 2*x + 1')).value).toBe('6');
  });
  it('solves with negative coefficient', () => {
    expect(solveLinear(parse('-2*x = 10')).value).toBe('-5');
  });
  it('solves with division', () => {
    expect(solveLinear(parse('x/2 = 5')).value).toBe('10');
  });
  it('rejects nonlinear', () => {
    expect(() => solveLinear(parse('x^2 = 4'))).toThrow();
  });
});

describe('latex rendering', () => {
  it('renders fraction', () => expect(toLatex(parse('1/2'))).toContain('frac'));
  it('renders sqrt', () => expect(toLatex(parse('sqrt(2)'))).toContain('sqrt'));
  it('renders power', () => expect(toLatex(parse('x^2'))).toBe('x^{2}'));
});

describe('error handling', () => {
  it('rejects unknown function', () => expect(() => val('foo(1)')).toThrow());
  it('rejects division by zero', () => expect(() => val('1/0')).toThrow());
  it('rejects bad syntax', () => expect(() => val('1 +')).toThrow());
});
