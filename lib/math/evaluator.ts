/**
 * MathLab Math Expression Evaluator
 *
 * Walks the AST from parser.ts and evaluates it.
 * Supports:
 * - Numeric evaluation with variables/scope
 * - All math functions (sin, cos, sqrt, log, etc.)
 * - Error handling with detailed messages
 * - Optional step-by-step evaluation tracking
 * - Both numeric and symbolic results (via KaTeX/MathML)
 *
 * Architecture:
 *   Input → parseExpression() → AST → evaluate() → Result
 *
 * Usage:
 *   const result = evaluate(ast, { x: 5 });
 *   console.log(result.value); // computed result
 *   console.log(result.steps); // optional step-by-step
 */

import * as mathjs from 'mathjs';
import type {
  ASTNode,
  NumberNode,
  VariableNode,
  BinaryOpNode,
  UnaryOpNode,
  FunctionCallNode,
  ErrorNode,
} from './parser';

/**
 * Evaluation result
 */
export interface EvaluationResult {
  ok: boolean;
  value?: number | Complex;
  latex?: string; // LaTeX representation of result
  steps?: EvaluationStep[]; // optional step-by-step
  error?: string; // error message if ok === false
}

export interface EvaluationStep {
  expression: string;
  result: number | Complex;
  description: string;
}

/**
 * Complex number representation
 */
export interface Complex {
  re: number;
  im: number;
}

/**
 * Scope for variable evaluation
 */
export interface Scope {
  [key: string]: number | Complex;
}

/**
 * Predefined constants
 */
const CONSTANTS: Scope = {
  pi: Math.PI,
  π: Math.PI,
  e: Math.E,
  phi: (1 + Math.sqrt(5)) / 2, // Golden ratio
  φ: (1 + Math.sqrt(5)) / 2,
  tau: 2 * Math.PI,
  τ: 2 * Math.PI,
  ln2: Math.LN2,
  ln10: Math.LN10,
  sqrt2: Math.SQRT2,
  sqrt1_2: Math.SQRT1_2,
};

/**
 * Main evaluation function
 */
export function evaluate(
  node: ASTNode,
  scope: Scope = {},
  trackSteps: boolean = false
): EvaluationResult {
  try {
    const mergedScope = { ...CONSTANTS, ...scope };
    const steps: EvaluationStep[] = [];
    const value = evaluateNode(node, mergedScope, steps, trackSteps);

    return {
      ok: true,
      value,
      latex: valueToLatex(value),
      steps: trackSteps ? steps : undefined,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message || 'Evaluation error',
    };
  }
}

/**
 * Recursively evaluate AST node
 */
function evaluateNode(
  node: ASTNode,
  scope: Scope,
  steps: EvaluationStep[],
  trackSteps: boolean
): number | Complex {
  switch (node.type) {
    case 'number':
      return (node as NumberNode).value;

    case 'variable': {
      const name = (node as VariableNode).name;
      if (!(name in scope)) {
        throw new Error(`Undefined variable: ${name}`);
      }
      return scope[name];
    }

    case 'unaryOp':
      return evaluateUnaryOp(node as UnaryOpNode, scope, steps, trackSteps);

    case 'binaryOp':
      return evaluateBinaryOp(node as BinaryOpNode, scope, steps, trackSteps);

    case 'functionCall':
      return evaluateFunctionCall(
        node as FunctionCallNode,
        scope,
        steps,
        trackSteps
      );

    case 'error':
      throw new Error((node as ErrorNode).message);

    default:
      throw new Error(`Unknown node type`);
  }
}

/**
 * Evaluate unary operators: +, -
 */
function evaluateUnaryOp(
  node: UnaryOpNode,
  scope: Scope,
  steps: EvaluationStep[],
  trackSteps: boolean
): number | Complex {
  const operand = evaluateNode(node.operand, scope, steps, trackSteps);

  switch (node.operator) {
    case '+':
      return operand;
    case '-':
      return isComplex(operand)
        ? { re: -operand.re, im: -operand.im }
        : -operand;
    default:
      throw new Error(`Unknown unary operator: ${node.operator}`);
  }
}

/**
 * Evaluate binary operators: +, -, *, /, %, **
 */
function evaluateBinaryOp(
  node: BinaryOpNode,
  scope: Scope,
  steps: EvaluationStep[],
  trackSteps: boolean
): number | Complex {
  const left = evaluateNode(node.left, scope, steps, trackSteps);
  const right = evaluateNode(node.right, scope, steps, trackSteps);

  let result: number | Complex;

  switch (node.operator) {
    case '+':
      result = add(left, right);
      break;
    case '-':
      result = subtract(left, right);
      break;
    case '*':
      result = multiply(left, right);
      break;
    case '/':
      result = divide(left, right);
      break;
    case '%':
      result = modulo(left, right);
      break;
    case '**':
      result = power(left, right);
      break;
    default:
      throw new Error(`Unknown binary operator: ${node.operator}`);
  }

  if (trackSteps) {
    steps.push({
      expression: `${left} ${node.operator} ${right}`,
      result,
      description: `${node.operator} operation`,
    });
  }

  return result;
}

/**
 * Evaluate function calls
 */
function evaluateFunctionCall(
  node: FunctionCallNode,
  scope: Scope,
  steps: EvaluationStep[],
  trackSteps: boolean
): number | Complex {
  const args = node.args.map((arg) =>
    evaluateNode(arg, scope, steps, trackSteps)
  );

  let result: number | Complex;

  switch (node.name.toLowerCase()) {
    // Trigonometric
    case 'sin':
      result = args.length === 1 ? Math.sin(toNumber(args[0])) : NaN;
      break;
    case 'cos':
      result = args.length === 1 ? Math.cos(toNumber(args[0])) : NaN;
      break;
    case 'tan':
      result = args.length === 1 ? Math.tan(toNumber(args[0])) : NaN;
      break;
    case 'asin':
    case 'arcsin':
      result = args.length === 1 ? Math.asin(toNumber(args[0])) : NaN;
      break;
    case 'acos':
    case 'arccos':
      result = args.length === 1 ? Math.acos(toNumber(args[0])) : NaN;
      break;
    case 'atan':
    case 'arctan':
      result = args.length === 1 ? Math.atan(toNumber(args[0])) : NaN;
      break;

    // Hyperbolic
    case 'sinh':
      result = args.length === 1 ? Math.sinh(toNumber(args[0])) : NaN;
      break;
    case 'cosh':
      result = args.length === 1 ? Math.cosh(toNumber(args[0])) : NaN;
      break;
    case 'tanh':
      result = args.length === 1 ? Math.tanh(toNumber(args[0])) : NaN;
      break;

    // Logarithmic & Exponential
    case 'log':
    case 'log10':
      result = args.length === 1 ? Math.log10(toNumber(args[0])) : NaN;
      break;
    case 'ln':
      result = args.length === 1 ? Math.log(toNumber(args[0])) : NaN;
      break;
    case 'log2':
      result = args.length === 1 ? Math.log2(toNumber(args[0])) : NaN;
      break;
    case 'exp':
      result = args.length === 1 ? Math.exp(toNumber(args[0])) : NaN;
      break;

    // Root & Power
    case 'sqrt':
      result = args.length === 1 ? Math.sqrt(toNumber(args[0])) : NaN;
      break;
    case 'cbrt':
      result = args.length === 1 ? Math.cbrt(toNumber(args[0])) : NaN;
      break;

    // Rounding
    case 'abs':
      result =
        args.length === 1
          ? isComplex(args[0])
            ? complexAbs(args[0] as Complex)
            : Math.abs(args[0] as number)
          : NaN;
      break;
    case 'floor':
      result = args.length === 1 ? Math.floor(toNumber(args[0])) : NaN;
      break;
    case 'ceil':
      result = args.length === 1 ? Math.ceil(toNumber(args[0])) : NaN;
      break;
    case 'round':
      result = args.length === 1 ? Math.round(toNumber(args[0])) : NaN;
      break;

    // Special
    case 'sign':
      result = args.length === 1 ? Math.sign(toNumber(args[0])) : NaN;
      break;
    case 'factorial':
      result = args.length === 1 ? factorial(toNumber(args[0])) : NaN;
      break;
    case 'max':
      result = Math.max(...args.map(toNumber));
      break;
    case 'min':
      result = Math.min(...args.map(toNumber));
      break;

    default:
      throw new Error(`Unknown function: ${node.name}`);
  }

  if (trackSteps) {
    steps.push({
      expression: `${node.name}(${args.map((a) => resultToString(a)).join(', ')})`,
      result,
      description: `${node.name} function`,
    });
  }

  return result;
}

/**
 * Arithmetic operations (handle complex numbers)
 */
function add(a: number | Complex, b: number | Complex): number | Complex {
  if (isComplex(a) || isComplex(b)) {
    const ac = toComplex(a);
    const bc = toComplex(b);
    return {
      re: ac.re + bc.re,
      im: ac.im + bc.im,
    };
  }
  return (a as number) + (b as number);
}

function subtract(a: number | Complex, b: number | Complex): number | Complex {
  if (isComplex(a) || isComplex(b)) {
    const ac = toComplex(a);
    const bc = toComplex(b);
    return {
      re: ac.re - bc.re,
      im: ac.im - bc.im,
    };
  }
  return (a as number) - (b as number);
}

function multiply(a: number | Complex, b: number | Complex): number | Complex {
  if (isComplex(a) || isComplex(b)) {
    const ac = toComplex(a);
    const bc = toComplex(b);
    return {
      re: ac.re * bc.re - ac.im * bc.im,
      im: ac.re * bc.im + ac.im * bc.re,
    };
  }
  return (a as number) * (b as number);
}

function divide(a: number | Complex, b: number | Complex): number | Complex {
  if (isComplex(a) || isComplex(b)) {
    const ac = toComplex(a);
    const bc = toComplex(b);
    const denominator = bc.re * bc.re + bc.im * bc.im;
    if (denominator === 0) throw new Error('Division by zero');
    return {
      re: (ac.re * bc.re + ac.im * bc.im) / denominator,
      im: (ac.im * bc.re - ac.re * bc.im) / denominator,
    };
  }
  const bNum = b as number;
  if (bNum === 0) throw new Error('Division by zero');
  return (a as number) / bNum;
}

function modulo(a: number | Complex, b: number | Complex): number | Complex {
  const aNum = toNumber(a);
  const bNum = toNumber(b);
  if (bNum === 0) throw new Error('Division by zero');
  return aNum % bNum;
}

function power(a: number | Complex, b: number | Complex): number | Complex {
  const aNum = toNumber(a);
  const bNum = toNumber(b);
  return Math.pow(aNum, bNum);
}

/**
 * Helper functions
 */
function isComplex(val: number | Complex): val is Complex {
  return typeof val === 'object' && 're' in val && 'im' in val;
}

function toNumber(val: number | Complex): number {
  return isComplex(val) ? val.re : val;
}

function toComplex(val: number | Complex): Complex {
  return isComplex(val) ? val : { re: val, im: 0 };
}

function complexAbs(c: Complex): number {
  return Math.sqrt(c.re * c.re + c.im * c.im);
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Factorial requires non-negative integer');
  }
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function resultToString(val: number | Complex): string {
  if (isComplex(val)) {
    const sign = val.im >= 0 ? '+' : '';
    return `${val.re}${sign}${val.im}i`;
  }
  return val.toString();
}

/**
 * Convert result to LaTeX for display
 */
function valueToLatex(val: number | Complex | undefined): string {
  if (val === undefined) return '';

  if (isComplex(val)) {
    const re = val.re.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
    const im = Math.abs(val.im).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
    const sign = val.im >= 0 ? '+' : '−';
    return `${re} ${sign} ${im}i`;
  }

  const num = val as number;
  if (!Number.isFinite(num)) return num.toString();

  // Round to 10 decimal places, remove trailing zeros
  const rounded = Math.round(num * 1e10) / 1e10;
  return rounded.toString();
}

/**
 * Format result for display (human-readable)
 */
export function formatResult(
  val: number | Complex | undefined,
  decimalPlaces: number = 10
): string {
  if (val === undefined) return '';

  if (isComplex(val)) {
    const re = val.re.toFixed(decimalPlaces).replace(/0+$/, '').replace(/\.$/, '');
    const im = Math.abs(val.im)
      .toFixed(decimalPlaces)
      .replace(/0+$/, '')
      .replace(/\.$/, '');
    const sign = val.im >= 0 ? '+' : '−';
    return `${re} ${sign} ${im}i`;
  }

  const num = val as number;
  if (!Number.isFinite(num)) {
    if (Number.isNaN(num)) return 'NaN';
    if (num > 0) return '∞';
    return '−∞';
  }

  const rounded = Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
  return rounded.toString();
}

/**
 * Export constants for reference
 */
export { CONSTANTS };

/**
 * Test cases for vitest
 */
export const testCases = [
  { expr: '2+3', scope: {}, expected: 5 },
  { expr: '2*3', scope: {}, expected: 6 },
  { expr: '2**3', scope: {}, expected: 8 },
  { expr: 'sin(0)', scope: {}, expected: 0 },
  { expr: 'cos(pi)', scope: {}, expected: -1 },
  { expr: 'sqrt(4)', scope: {}, expected: 2 },
  { expr: 'x+5', scope: { x: 10 }, expected: 15 },
  { expr: '2*x', scope: { x: 5 }, expected: 10 },
];
