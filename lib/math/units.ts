import Decimal from 'decimal.js';

type UnitMap = Record<string, number>;

const LENGTH: UnitMap = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000,
  in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344,
};
const MASS: UnitMap = {
  mg: 0.000001, g: 0.001, kg: 1, t: 1000,
  oz: 0.028349523125, lb: 0.45359237, st: 6.35029318,
};
const VOLUME: UnitMap = {
  ml: 0.001, l: 1, m3: 1000,
  tsp: 0.00492892, tbsp: 0.01478676, floz: 0.0295735296,
  cup: 0.2365882365, pt: 0.473176473, qt: 0.946352946, gal: 3.785411784,
};
const TIME: UnitMap = {
  ms: 0.001, s: 1, min: 60, h: 3600, d: 86400, wk: 604800, yr: 31557600,
};
const AREA: UnitMap = {
  mm2: 1e-6, cm2: 1e-4, m2: 1, ha: 10000, km2: 1e6,
  in2: 0.00064516, ft2: 0.09290304, yd2: 0.83612736, acre: 4046.8564224, mi2: 2589988.110336,
};

const CATEGORIES: { name: string; map: UnitMap }[] = [
  { name: 'length', map: LENGTH },
  { name: 'mass', map: MASS },
  { name: 'volume', map: VOLUME },
  { name: 'time', map: TIME },
  { name: 'area', map: AREA },
];

function findCategory(unit: string): { name: string; map: UnitMap } | null {
  for (const c of CATEGORIES) if (unit in c.map) return c;
  return null;
}

export function convert(from: string, to: string, value: number): { value: string; exact: string; category: string } {
  if (from === to) return { value: String(value), exact: `${value}`, category: 'identity' };
  if (isTemperature(from) || isTemperature(to)) return convertTemperature(from, to, value);
  const cf = findCategory(from);
  const ct = findCategory(to);
  if (!cf || !ct) throw new Error(`Unknown unit: ${cf ? to : from}`);
  if (cf.name !== ct.name) throw new Error(`Cannot convert ${cf.name} to ${ct.name}`);
  const factorFrom = new Decimal(cf.map[from]);
  const factorTo = new Decimal(ct.map[to]);
  const result = new Decimal(value).times(factorFrom).div(factorTo);
  return {
    value: result.toDecimalPlaces(10).toString(),
    exact: `${value} × ${factorFrom} / ${factorTo}`,
    category: cf.name,
  };
}

function isTemperature(u: string): boolean {
  return ['C', 'F', 'K'].includes(u);
}

function convertTemperature(from: string, to: string, value: number) {
  let kelvin: Decimal;
  const v = new Decimal(value);
  if (from === 'C') kelvin = v.plus(273.15);
  else if (from === 'F') kelvin = v.minus(32).times(5).div(9).plus(273.15);
  else if (from === 'K') kelvin = v;
  else throw new Error(`Unknown temperature unit: ${from}`);
  let out: Decimal;
  if (to === 'C') out = kelvin.minus(273.15);
  else if (to === 'F') out = kelvin.minus(273.15).times(9).div(5).plus(32);
  else if (to === 'K') out = kelvin;
  else throw new Error(`Unknown temperature unit: ${to}`);
  return {
    value: out.toDecimalPlaces(6).toString(),
    exact: `${from} → K → ${to}`,
    category: 'temperature',
  };
}

export const UNIT_CATEGORIES = CATEGORIES.map(c => ({ name: c.name, units: Object.keys(c.map) }));
