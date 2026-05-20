import { Tok, tokenize } from './lexer';
import { Node } from './ast';

class Parser {
  pos = 0;
  constructor(public toks: Tok[]) {}
  peek() { return this.toks[this.pos]; }
  eat() { return this.toks[this.pos++]; }
  expect(value: string) {
    const t = this.eat();
    if (t.kind !== 'op' || t.value !== value) throw new Error(`Expected '${value}'`);
  }

  parseExpr(minBp = 0): Node {
    let left = this.parsePrefix();
    while (true) {
      const t = this.peek();
      if (t.kind === 'eof') break;
      if (t.kind === 'op' && (t.value === ')' || t.value === ',' || t.value === '=')) break;
      const bp = this.infixBp(t);
      if (bp === null) {
        if (this.canImplicitMul(left, t)) {
          const right = this.parseExpr(3);
          left = { type: 'binary', op: '*', left, right };
          continue;
        }
        break;
      }
      if (bp.left < minBp) break;
      const op = (this.eat() as any).value;
      const right = this.parseExpr(bp.right);
      left = { type: 'binary', op, left, right };
    }
    return left;
  }

  canImplicitMul(_left: Node, t: Tok): boolean {
    if (t.kind === 'ident') return true;
    if (t.kind === 'op' && t.value === '(') return true;
    if (t.kind === 'num') return true;
    return false;
  }

  infixBp(t: Tok): { left: number; right: number } | null {
    if (t.kind !== 'op') return null;
    switch (t.value) {
      case '+': case '-': return { left: 1, right: 2 };
      case '*': case '/': return { left: 3, right: 4 };
      case '^': return { left: 6, right: 5 };
      default: return null;
    }
  }

  parsePrefix(): Node {
    const t = this.eat();
    if (t.kind === 'num') return { type: 'num', value: t.value };
    if (t.kind === 'op' && (t.value === '+' || t.value === '-')) {
      const arg = this.parseExpr(5);
      return { type: 'unary', op: t.value, arg };
    }
    if (t.kind === 'op' && t.value === '(') {
      const e = this.parseExpr(0);
      this.expect(')');
      return e;
    }
    if (t.kind === 'ident') {
      if (this.peek().kind === 'op' && (this.peek() as any).value === '(') {
        this.eat();
        const args: Node[] = [];
        if (!(this.peek().kind === 'op' && (this.peek() as any).value === ')')) {
          args.push(this.parseExpr(0));
          while (this.peek().kind === 'op' && (this.peek() as any).value === ',') {
            this.eat();
            args.push(this.parseExpr(0));
          }
        }
        this.expect(')');
        return { type: 'call', name: t.value, args };
      }
      if (t.value === 'pi' || t.value === 'e') return { type: 'const', name: t.value };
      return { type: 'var', name: t.value };
    }
    throw new Error(`Unexpected token`);
  }
}

export function parse(src: string): Node {
  const toks = tokenize(src);
  const p = new Parser(toks);
  const left = p.parseExpr(0);
  if (p.peek().kind === 'op' && (p.peek() as any).value === '=') {
    p.eat();
    const right = p.parseExpr(0);
    if (p.peek().kind !== 'eof') throw new Error('Trailing tokens after equation');
    return { type: 'eq', left, right };
  }
  if (p.peek().kind !== 'eof') throw new Error('Trailing tokens');
  return left;
}
