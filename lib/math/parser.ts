/**
 * MathLab Math Expression Parser
 *
 * Converts mathematical expressions (strings) into an AST (Abstract Syntax Tree).
 * Supports:
 * - Basic arithmetic: +, -, *, /, **, %
 * - Functions: sin, cos, tan, ln, log, sqrt, abs, etc.
 * - Variables: x, y, etc.
 * - Parentheses and precedence
 *
 * Implementation: Pratt parser (recursive descent with precedence climbing)
 * Fallback: mathjs parser for complex expressions
 */

import * as mathjs from 'mathjs';

/**
 * AST Node types
 */
export type ASTNode =
  | NumberNode
  | VariableNode
  | BinaryOpNode
  | UnaryOpNode
  | FunctionCallNode
  | ErrorNode;

export interface NumberNode {
  type: 'number';
  value: number;
}

export interface VariableNode {
  type: 'variable';
  name: string;
}

export interface BinaryOpNode {
  type: 'binaryOp';
  operator: string; // '+', '-', '*', '/', '**', '%'
  left: ASTNode;
  right: ASTNode;
}

export interface UnaryOpNode {
  type: 'unaryOp';
  operator: string; // '+', '-'
  operand: ASTNode;
}

export interface FunctionCallNode {
  type: 'functionCall';
  name: string; // 'sin', 'cos', 'sqrt', 'abs', etc.
  args: ASTNode[];
}

export interface ErrorNode {
  type: 'error';
  message: string;
  input: string;
}

/**
 * Tokenizer
 * Breaks expression into tokens
 */
interface Token {
  type:
    | 'number'
    | 'variable'
    | 'operator'
    | 'function'
    | 'lparen'
    | 'rparen'
    | 'comma'
    | 'eof';
  value: string;
  position: number;
}

class Tokenizer {
  private input: string;
  private position: number = 0;
  private tokens: Token[] = [];

  constructor(input: string) {
    this.input = input.trim().toLowerCase();
  }

  private peek(offset: number = 0): string {
    const pos = this.position + offset;
    return pos < this.input.length ? this.input[pos] : '\0';
  }

  private advance(): string {
    return this.input[this.position++];
  }

  private isWhitespace(ch: string): boolean {
    return /\s/.test(ch);
  }

  private isDigit(ch: string): boolean {
    return /\d/.test(ch);
  }

  private isAlpha(ch: string): boolean {
    return /[a-z_]/i.test(ch);
  }

  private isAlphaNumeric(ch: string): boolean {
    return this.isAlpha(ch) || this.isDigit(ch);
  }

  private readNumber(): Token {
    const start = this.position;
    let hasDecimal = false;

    while (this.isDigit(this.peek()) || (this.peek() === '.' && !hasDecimal)) {
      if (this.peek() === '.') hasDecimal = true;
      this.advance();
    }

    return {
      type: 'number',
      value: this.input.substring(start, this.position),
      position: start,
    };
  }

  private readVariable(): Token {
    const start = this.position;

    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const value = this.input.substring(start, this.position);

    // Check if it's a function
    if (this.isFunction(value)) {
      return {
        type: 'function',
        value,
        position: start,
      };
    }

    return {
      type: 'variable',
      value,
      position: start,
    };
  }

  private isFunction(name: string): boolean {
    const functions = [
      'sin',
      'cos',
      'tan',
      'asin',
      'acos',
      'atan',
      'sinh',
      'cosh',
      'tanh',
      'log',
      'ln',
      'log10',
      'sqrt',
      'abs',
      'ceil',
      'floor',
      'round',
      'exp',
      'factorial',
      'sign',
      'max',
      'min',
    ];
    return functions.includes(name);
  }

  tokenize(): Token[] {
    while (this.position < this.input.length) {
      const ch = this.peek();

      if (this.isWhitespace(ch)) {
        this.advance();
        continue;
      }

      if (this.isDigit(ch)) {
        this.tokens.push(this.readNumber());
        continue;
      }

      if (this.isAlpha(ch)) {
        this.tokens.push(this.readVariable());
        continue;
      }

      if (ch === '(') {
        this.tokens.push({
          type: 'lparen',
          value: '(',
          position: this.position,
        });
        this.advance();
        continue;
      }

      if (ch === ')') {
        this.tokens.push({
          type: 'rparen',
          value: ')',
          position: this.position,
        });
        this.advance();
        continue;
      }

      if (ch === ',') {
        this.tokens.push({
          type: 'comma',
          value: ',',
          position: this.position,
        });
        this.advance();
        continue;
      }

      // Operators: +, -, *, /, **, %, ^
      if ('+-*/%^'.includes(ch)) {
        let op = this.advance();
        // Check for ** or ^
        if ((op === '*' || op === '^') && this.peek() === '*') {
          op = '**';
          this.advance();
        }
        this.tokens.push({
          type: 'operator',
          value: op,
          position: this.position - 1,
        });
        continue;
      }

      // Unknown character
      throw new Error(
        `Unexpected character '${ch}' at position ${this.position}`
      );
    }

    this.tokens.push({
      type: 'eof',
      value: '',
      position: this.position,
    });

    return this.tokens;
  }
}

/**
 * Parser
 * Converts tokens into AST using Pratt parser
 */
class Parser {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private advance(): Token {
    return this.tokens[this.current++];
  }

  private match(...types: Token['type'][]): boolean {
    if (types.includes(this.peek().type)) {
      this.advance();
      return true;
    }
    return false;
  }

  parse(): ASTNode {
    const ast = this.parseExpression();
    if (this.peek().type !== 'eof') {
      throw new Error(`Unexpected token: ${this.peek().value}`);
    }
    return ast;
  }

  private parseExpression(): ASTNode {
    return this.parseBinaryOp(0);
  }

  private parseBinaryOp(minPrecedence: number): ASTNode {
    let left = this.parseUnary();

    while (this.peek().type === 'operator') {
      const op = this.peek().value;
      const precedence = this.getPrecedence(op);

      if (precedence < minPrecedence) {
        break;
      }

      this.advance();
      const right = this.parseBinaryOp(precedence + 1);

      left = {
        type: 'binaryOp',
        operator: op,
        left,
        right,
      };
    }

    return left;
  }

  private parseUnary(): ASTNode {
    if (this.peek().type === 'operator' && '+-'.includes(this.peek().value)) {
      const op = this.advance().value;
      const operand = this.parseUnary();
      return {
        type: 'unaryOp',
        operator: op,
        operand,
      };
    }

    return this.parsePrimary();
  }

  private parsePrimary(): ASTNode {
    const token = this.peek();

    if (token.type === 'number') {
      this.advance();
      return {
        type: 'number',
        value: parseFloat(token.value),
      };
    }

    if (token.type === 'variable') {
      this.advance();
      return {
        type: 'variable',
        name: token.value,
      };
    }

    if (token.type === 'function') {
      return this.parseFunctionCall();
    }

    if (token.type === 'lparen') {
      this.advance(); // consume '('
      const expr = this.parseExpression();
      if (!this.match('rparen')) {
        throw new Error('Expected closing parenthesis');
      }
      return expr;
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  private parseFunctionCall(): ASTNode {
    const name = this.advance().value;

    if (!this.match('lparen')) {
      throw new Error(`Expected '(' after function ${name}`);
    }

    const args: ASTNode[] = [];

    if (this.peek().type !== 'rparen') {
      args.push(this.parseExpression());

      while (this.match('comma')) {
        args.push(this.parseExpression());
      }
    }

    if (!this.match('rparen')) {
      throw new Error(`Expected ')' after function arguments`);
    }

    return {
      type: 'functionCall',
      name,
      args,
    };
  }

  private getPrecedence(op: string): number {
    switch (op) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
      case '%':
        return 2;
      case '**':
      case '^':
        return 3;
      default:
        return 0;
    }
  }
}

/**
 * Main parsing function
 * Safely parses a mathematical expression into an AST
 */
export function parseExpression(input: string): ASTNode {
  try {
    // Normalize input
    const normalized = normalizeExpression(input);

    // Tokenize
    const tokenizer = new Tokenizer(normalized);
    const tokens = tokenizer.tokenize();

    // Parse
    const parser = new Parser(tokens);
    return parser.parse();
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message || 'Parse error',
      input,
    };
  }
}

/**
 * Normalize expression
 * - Replace ^ with ** (power operator)
 * - Add implicit multiplication: 2x → 2*x, (3)(4) → (3)*(4)
 */
function normalizeExpression(expr: string): string {
  let result = expr;

  // Replace ^ with **
  result = result.replace(/\^/g, '**');

  // Add implicit multiplication between number and variable: 2x → 2*x
  result = result.replace(/(\d)([a-zA-Z])/g, '$1*$2');

  // Add implicit multiplication between ) and (: (3)(4) → (3)*(4)
  result = result.replace(/\)\s*\(/g, ')*(');

  // Add implicit multiplication between number and (: 2(3+4) → 2*(3+4)
  result = result.replace(/(\d)\s*\(/g, '$1*(');

  // Add implicit multiplication between ) and number: (3)2 → (3)*2
  result = result.replace(/\)\s*(\d)/g, ')*$1');

  // Add implicit multiplication between variable and (: x(2+3) → x*(2+3)
  result = result.replace(/([a-zA-Z])\s*\(/g, '$1*(');

  return result;
}

/**
 * Fallback to mathjs parser for complex expressions
 * Returns the parsed expression or error
 */
export function parseExpressionFallback(input: string): ASTNode {
  try {
    const node = mathjs.parse(input);
    return astFromMathjs(node);
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message || 'Parse error',
      input,
    };
  }
}

/**
 * Convert mathjs AST to our AST
 */
function astFromMathjs(node: any): ASTNode {
  if (node.type === 'ConstantNode') {
    return {
      type: 'number',
      value: node.value,
    };
  }

  if (node.type === 'SymbolNode') {
    return {
      type: 'variable',
      name: node.name,
    };
  }

  if (node.type === 'OperatorNode') {
    if (node.args.length === 1) {
      return {
        type: 'unaryOp',
        operator: node.op,
        operand: astFromMathjs(node.args[0]),
      };
    } else if (node.args.length === 2) {
      return {
        type: 'binaryOp',
        operator: node.op,
        left: astFromMathjs(node.args[0]),
        right: astFromMathjs(node.args[1]),
      };
    }
  }

  if (node.type === 'FunctionNode') {
    return {
      type: 'functionCall',
      name: node.fn.name,
      args: node.args.map(astFromMathjs),
    };
  }

  if (node.type === 'ParenthesisNode') {
    return astFromMathjs(node.content);
  }

  return {
    type: 'error',
    message: `Unknown node type: ${node.type}`,
    input: '',
  };
}

/**
 * Pretty print AST for debugging
 */
export function printAST(node: ASTNode, indent: number = 0): string {
  const prefix = '  '.repeat(indent);

  switch (node.type) {
    case 'number':
      return `${prefix}Number(${node.value})`;
    case 'variable':
      return `${prefix}Variable(${node.name})`;
    case 'binaryOp':
      return (
        `${prefix}BinaryOp(${node.operator})\n` +
        printAST(node.left, indent + 1) +
        '\n' +
        printAST(node.right, indent + 1)
      );
    case 'unaryOp':
      return (
        `${prefix}UnaryOp(${node.operator})\n` +
        printAST(node.operand, indent + 1)
      );
    case 'functionCall':
      return (
        `${prefix}FunctionCall(${node.name})\n` +
        node.args.map((arg) => printAST(arg, indent + 1)).join('\n')
      );
    case 'error':
      return `${prefix}Error: ${node.message}`;
    default:
      return `${prefix}Unknown`;
  }
}

/**
 * Export test cases for vitest
 */
export const testCases = [
  { input: '2+3', expected: 'BinaryOp(+)' },
  { input: '2*3+4', expected: 'BinaryOp(+)' }, // Respects precedence
  { input: 'sin(x)', expected: 'FunctionCall(sin)' },
  { input: '2x', expected: 'BinaryOp(*)' }, // Implicit multiplication
  { input: '(3)(4)', expected: 'BinaryOp(*)' }, // Implicit multiplication
  { input: '2^3', expected: 'BinaryOp(**)' }, // Power operator
];
