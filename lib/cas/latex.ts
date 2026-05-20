import { Node } from './ast';

const FNMAP: Record<string, string> = {
  sqrt: '\\sqrt', ln: '\\ln', log: '\\log',
  sin: '\\sin', cos: '\\cos', tan: '\\tan',
  asin: '\\arcsin', acos: '\\arccos', atan: '\\arctan',
};

export function toLatex(n: Node): string {
  switch (n.type) {
    case 'num': return n.value;
    case 'var': return n.name;
    case 'const': return n.name === 'pi' ? '\\pi' : 'e';
    case 'unary': return `${n.op}${toLatex(n.arg)}`;
    case 'binary':
      if (n.op === '/') return `\\frac{${toLatex(n.left)}}{${toLatex(n.right)}}`;
      if (n.op === '^') return `${toLatex(n.left)}^{${toLatex(n.right)}}`;
      if (n.op === '*') return `${toLatex(n.left)} \\cdot ${toLatex(n.right)}`;
      return `${toLatex(n.left)} ${n.op} ${toLatex(n.right)}`;
    case 'call': {
      const fn = FNMAP[n.name] ?? `\\operatorname{${n.name}}`;
      if (n.name === 'sqrt') return `${fn}{${toLatex(n.args[0])}}`;
      return `${fn}\\left(${n.args.map(toLatex).join(', ')}\\right)`;
    }
    case 'eq': return `${toLatex(n.left)} = ${toLatex(n.right)}`;
  }
}
