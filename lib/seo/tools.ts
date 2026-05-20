export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  metaDescription: string;
};

export const tools: Tool[] = [
  { slug: 'scientific', name: 'Scientific Calculator', tagline: 'Trig, logs, exponents, constants.', metaDescription: 'Free online scientific calculator with full trig, logarithm, exponent, and constant support.' },
  { slug: 'graphing', name: 'Graphing Calculator', tagline: 'Plot functions, zoom, trace.', metaDescription: 'Free online graphing calculator. Plot multiple functions, zoom, trace, and explore.' },
  { slug: 'fraction', name: 'Fraction Calculator', tagline: 'Add, subtract, multiply, divide fractions.', metaDescription: 'Free fraction calculator with step-by-step explanations.' },
  { slug: 'percentage', name: 'Percentage Calculator', tagline: 'Percent of, change, tip, discount.', metaDescription: 'Free percentage calculator: percent of, percent change, tip, discount, tax.' },
  { slug: 'matrix', name: 'Matrix Calculator', tagline: 'Add, multiply, invert, determinant.', metaDescription: 'Free matrix calculator: addition, multiplication, inverse, determinant, rank, RREF.' },
  { slug: 'equation-solver', name: 'Equation Solver', tagline: 'Linear, quadratic, systems.', metaDescription: 'Free equation solver with step-by-step solutions for linear, quadratic, and systems.' },
  { slug: 'unit-converter', name: 'Unit Converter', tagline: 'Length, mass, temperature, more.', metaDescription: 'Free unit converter: length, mass, temperature, volume, area, time, energy.' },
  { slug: 'gpa', name: 'GPA Calculator', tagline: '4.0, 5.0, weighted, cumulative.', metaDescription: 'Free GPA calculator: unweighted, weighted, cumulative, semester.' },
];
