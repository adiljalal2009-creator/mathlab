import Decimal from 'decimal.js';
import { Node } from './ast';

Decimal.set({ precision: 40 });

export type Env = Record<string, Decimal>;

const fns: Record<string, (args: Decimal[]) => Decimal> = {
  sin: ([x]) => new Decimal(Math.sin(x.toNumber())),
  cos: ([x]) => new Decimal(Math.cos(x.toNumber())),
  tan: ([x]) => new Decimal(Math.tan(x.toNumber())),
  asin: ([x]) => new Decimal(Math.asin(x.toNumber())),
  acos: ([x]) => new Decimal(Math.acos(x.toNumber())),
  atan: ([x]) => new Decimal(Math.atan(x.toNumber())),
  ln: ([x]) => new Decimal(Decimal.ln(x).toString()),
  log: ([x]) => new Decimal(Decimal.log10(x).toString()),
  sqrt: ([x]) => x.sqrt(),
  abs: ([x]) => x.abs(),
  exp: ([x]) => new Decimal(Math.exp(x.toNumber())),
  floor: ([x]) => x.floor(),
  ceil: ([x]) => x.ceil(),
  round: ([x]) => x.round(),
};

export function evaluate(node: Node, env: Env = {}): Decimal {
  switch (node.type) {
    case 'num': return new Decimal(node.value);
    case 'const':
      if (node.name === 'pi') return new Decimal(Math.PI);
      return new Decimal(Math.E);
    case 'var':
      if (env[node.name] === undefined) throw new Error(`Undefined variable: ${node.name}`);
      return env[node.name];
    case 'unary': {
      const v = evaluate(node.arg, env);
      return node.op === '-' ? v.neg() : v;
    }
    case 'binary': {
      const a = evaluate(node.left, env);
      const b = evaluate(node.right, env);
      switch (node.op) {
        case '+': return a.plus(b);
        case '-': return a.minus(b);
        case '*': return a.times(b);
        case '/':
          if (b.isZero()) throw new Error('Division by zero');
          return a.div(b);
        case '^': return a.pow(b);
      }
    }
    case 'call': {
      const fn = fns[node.name];
      if (!fn) throw new Error(`Unknown function: ${node.name}`);
      return fn(node.args.map(a => evaluate(a, env)));
    }
    case 'eq':
      throw new Error('Cannot evaluate an equation; use solve()');
  }
}
