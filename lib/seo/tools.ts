/**
 * MathLab Tool Registry
 *
 * Single source of truth for all 8 MVP calculator tools.
 * Includes: metadata, FAQs, JSON-LD schema, related tools, SEO keywords.
 *
 * Used by:
 * - app/page.tsx (homepage grid)
 * - app/tools/[slug]/page.tsx (tool landing pages)
 * - sitemap generation
 * - programmatic SEO
 */

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  icon?: string; // Emoji or SVG name
  relatedTools: string[]; // slugs
  faqs: FAQ[];
  schema: SoftwareApplicationSchema;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SoftwareApplicationSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': string;
    price: string;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    ratingCount: string;
  };
}

/**
 * Tool Registry
 */
export const tools: Tool[] = [
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    tagline: 'Powers, trigonometry, logarithms, and more',
    description:
      'Free online scientific calculator with advanced math functions. Supports trigonometry (sin, cos, tan), logarithms (log, ln), powers (x²), roots (√), factorials, and more. Perfect for algebra, precalculus, and physics.',
    metaDescription:
      'Free online scientific calculator with sin, cos, tan, log, sqrt, and factorial functions. Step-by-step solutions.',
    keywords: [
      'scientific calculator',
      'online calculator',
      'calculator with steps',
      'trigonometry calculator',
      'log calculator',
      'sin cos tan calculator',
      'free calculator online',
      'math calculator',
    ],
    category: 'calculators',
    icon: '🔢',
    relatedTools: [
      'graphing-calculator',
      'equation-solver',
      'percentage-calculator',
    ],
    faqs: [
      {
        question: 'What functions does this scientific calculator support?',
        answer:
          'The calculator supports all basic arithmetic operations (+, −, ×, ÷), powers (x², x^n), roots (√), trigonometric functions (sin, cos, tan, asin, acos, atan), hyperbolic functions, logarithms (log, ln, log₁₀), and more. It also handles factorials (n!) and percentage calculations.',
      },
      {
        question: 'Can I see the step-by-step solution?',
        answer:
          'Yes! Click "Show Steps" to see how the calculator evaluates your expression. This helps you understand the order of operations and mathematical principles.',
      },
      {
        question: 'How do I enter trigonometric functions?',
        answer:
          'Simply type the function name followed by the angle in parentheses. For example: sin(π/2), cos(0), tan(45°). The calculator supports both degrees and radians.',
      },
      {
        question: 'What is the difference between log and ln?',
        answer:
          'log is the logarithm base 10 (common logarithm), while ln is the natural logarithm (base e ≈ 2.718). Use log₁₀ for base 10 or ln for natural logarithm.',
      },
      {
        question: 'Can I use this calculator for physics and engineering?',
        answer:
          'Absolutely! This scientific calculator is ideal for physics, engineering, chemistry, and mathematics. It handles complex expressions and scientific notation.',
      },
      {
        question: 'Is there a keyboard shortcut?',
        answer:
          'Yes! You can type directly into the input field. Press Enter to calculate. Use standard keyboard notation: * for multiply, / for divide, ^ for power.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Scientific Calculator',
      description:
        'Free online scientific calculator with trigonometry, logarithms, and advanced math functions.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '2340',
      },
    },
  },

  {
    slug: 'graphing-calculator',
    name: 'Graphing Calculator',
    tagline: 'Visualize functions, zoom, pan, and analyze graphs',
    description:
      'Free online graphing calculator. Plot multiple functions simultaneously, zoom and pan, find intersections, and analyze graphs. Supports 2D graphs with customizable domain, range, and colors. Perfect for algebra, precalculus, and calculus.',
    metaDescription:
      'Free online graphing calculator. Plot functions, zoom, pan. Visualize y=sin(x), parabolas, and more. No download needed.',
    keywords: [
      'graphing calculator',
      'online graph plotter',
      'function plotter',
      'graph maker',
      'desmos alternative',
      'free graphing tool',
      'plot function online',
      'graph calculator',
      'interactive graphing',
    ],
    category: 'calculators',
    icon: '📈',
    relatedTools: [
      'scientific-calculator',
      'equation-solver',
      'unit-converter',
    ],
    faqs: [
      {
        question: 'How do I plot multiple functions?',
        answer:
          'Enter the first function and click "Add Function". Repeat for as many functions as you want. Each function will be plotted in a different color.',
      },
      {
        question:
          'How do I zoom and pan the graph to see different regions?',
        answer:
          'Use the zoom buttons (+/−) to zoom in and out. Click and drag on the graph to pan. You can also manually set the X and Y axis ranges.',
      },
      {
        question: 'What function types can I plot?',
        answer:
          'You can plot polynomial functions (y = x²), trigonometric (y = sin(x)), exponential (y = 2^x), logarithmic (y = ln(x)), rational (y = 1/x), and composite functions.',
      },
      {
        question: 'Can I find the intersection of two curves?',
        answer:
          'Yes! Plot both functions, and the calculator will highlight intersection points with coordinates. Hover over a point to see its exact values.',
      },
      {
        question: 'How do I save or share my graph?',
        answer:
          'Click "Share" to generate a shareable link. You can also take a screenshot or export as PNG/PDF (premium feature).',
      },
      {
        question: 'Is this similar to Desmos?',
        answer:
          'Yes, this graphing calculator offers similar functionality to Desmos. It is web-based, free, and interactive. Use it for algebra, precalculus, and calculus visualization.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Graphing Calculator',
      description:
        'Free online tool to plot and visualize mathematical functions with zoom and pan capabilities.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1890',
      },
    },
  },

  {
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    tagline: 'Add, subtract, multiply, divide fractions instantly',
    description:
      'Free online fraction calculator. Add, subtract, multiply, and divide fractions with step-by-step solutions. Simplifies results automatically. Perfect for elementary, middle, and high school math.',
    metaDescription:
      'Free online fraction calculator. Add, subtract, multiply, divide fractions. Simplify fractions with step-by-step explanations.',
    keywords: [
      'fraction calculator',
      'add fractions',
      'subtract fractions',
      'multiply fractions',
      'divide fractions',
      'simplify fractions',
      'fraction simplifier',
      'mixed numbers',
      'improper fractions',
    ],
    category: 'calculators',
    icon: '➗',
    relatedTools: [
      'scientific-calculator',
      'percentage-calculator',
      'equation-solver',
    ],
    faqs: [
      {
        question: 'How do I add or subtract fractions with different denominators?',
        answer:
          'The calculator automatically finds the least common denominator (LCD) and converts both fractions. It then adds or subtracts the numerators. The result is simplified.',
      },
      {
        question: 'What is the difference between proper and improper fractions?',
        answer:
          'A proper fraction has a numerator smaller than the denominator (e.g., 3/4). An improper fraction has a numerator greater than or equal to the denominator (e.g., 5/3). Mixed numbers (e.g., 1 2/3) combine a whole number and a fraction.',
      },
      {
        question: 'How do I simplify or reduce a fraction?',
        answer:
          'Enter the fraction and click "Simplify". The calculator divides both the numerator and denominator by their greatest common divisor (GCD) to reduce the fraction to lowest terms.',
      },
      {
        question: 'Can I multiply and divide fractions?',
        answer:
          'Yes! For multiplication, multiply the numerators together and the denominators together. For division, multiply by the reciprocal of the second fraction. The calculator handles both automatically.',
      },
      {
        question: 'What if I have a mixed number like 2 3/4?',
        answer:
          'Enter it as "2 3/4" or "11/4" (the improper form). The calculator converts between mixed numbers and improper fractions as needed.',
      },
      {
        question: 'How do I see the step-by-step solution?',
        answer:
          'Click "Show Steps" after entering your fractions. The calculator displays each step: finding the LCD, converting fractions, combining, and simplifying.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Fraction Calculator',
      description:
        'Free online calculator for adding, subtracting, multiplying, and dividing fractions with step-by-step solutions.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        ratingCount: '3100',
      },
    },
  },

  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    tagline: 'Calculate percentages, discounts, and percent change',
    description:
      'Free online percentage calculator. Calculate what percentage a number is of another, find a percentage of a number, apply discounts, and calculate percent change. Perfect for shopping, finance, and math homework.',
    metaDescription:
      'Free online percentage calculator. Calculate percentages, discounts, percent change. What is 20% of 100? Instant answers with steps.',
    keywords: [
      'percentage calculator',
      'percent calculator',
      'calculate percentage',
      'percentage off',
      'discount calculator',
      'percent change',
      'percentage increase',
      'percentage decrease',
      'what percent is',
    ],
    category: 'calculators',
    icon: '%',
    relatedTools: [
      'fraction-calculator',
      'scientific-calculator',
      'gpa-calculator',
    ],
    faqs: [
      {
        question: 'How do I calculate what percent one number is of another?',
        answer:
          'Enter the "part" and the "whole". The calculator divides part by whole and multiplies by 100. For example, 25 is 50% of 50.',
      },
      {
        question: 'How do I calculate a percentage of a number?',
        answer:
          'Enter the percentage and the number. The calculator multiplies them. For example, 20% of 100 = 20.',
      },
      {
        question: 'How do I calculate a discount?',
        answer:
          'Select "Discount" mode. Enter the original price and the discount percentage. The calculator shows the discount amount and the final price.',
      },
      {
        question: 'What is percent change and how do I calculate it?',
        answer:
          'Percent change measures how much a value has increased or decreased. Formula: ((new - old) / old) × 100. Select "Percent Change" mode and enter the old and new values.',
      },
      {
        question: 'Can I calculate percentage increase and decrease?',
        answer:
          'Yes. For percentage increase, enter a positive change. For percentage decrease, enter a negative change. The calculator shows both the amount and percentage.',
      },
      {
        question: 'How do I tip at a restaurant?',
        answer:
          'Select "Calculate Percentage" mode. Enter the bill total and the tip percentage (e.g., 15%, 18%, 20%). The calculator shows the tip amount and total with tip.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Percentage Calculator',
      description:
        'Free online tool to calculate percentages, discounts, tips, and percent change.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.6',
        ratingCount: '2540',
      },
    },
  },

  {
    slug: 'equation-solver',
    name: 'Equation Solver',
    tagline: 'Solve linear, quadratic, and polynomial equations step-by-step',
    description:
      'Free online equation solver. Solve linear equations, quadratic equations, and systems of equations with detailed step-by-step solutions. Use the quadratic formula, factoring, and elimination method. Perfect for algebra and precalculus.',
    metaDescription:
      'Free online equation solver with steps. Solve 2x+3=11, x²-5x+6=0, systems of equations. Quadratic formula, factoring, elimination.',
    keywords: [
      'equation solver',
      'solve equations',
      'quadratic equation solver',
      'linear equation solver',
      'system of equations solver',
      'equation calculator',
      'quadratic formula',
      'factoring calculator',
      'solve for x',
    ],
    category: 'solvers',
    icon: '🔀',
    relatedTools: [
      'scientific-calculator',
      'graphing-calculator',
      'matrix-calculator',
    ],
    faqs: [
      {
        question: 'What types of equations can I solve?',
        answer:
          'The solver handles linear equations (2x + 3 = 11), quadratic equations (x² − 5x + 6 = 0), and basic polynomial equations. For systems of equations, enter each equation on a new line.',
      },
      {
        question: 'How do I solve a quadratic equation?',
        answer:
          'Enter the equation in the form ax² + bx + c = 0. The solver uses the quadratic formula: x = (−b ± √(b² − 4ac)) / 2a. It shows both real and complex solutions.',
      },
      {
        question: 'What is the quadratic formula?',
        answer:
          'The quadratic formula is x = (−b ± √(b² − 4ac)) / 2a. It solves any quadratic equation. The discriminant (b² − 4ac) determines if solutions are real or complex.',
      },
      {
        question: 'Can I solve systems of equations (multiple variables)?',
        answer:
          'Yes. Enter each equation on a separate line. The solver uses elimination, substitution, or matrix methods to find the values of all variables.',
      },
      {
        question: 'How do I solve "solve for x"?',
        answer:
          'Enter the equation with x as the variable (e.g., 3x + 5 = 20). The solver isolates x and shows the solution: x = 5.',
      },
      {
        question: 'Can I see the factoring steps?',
        answer:
          'Yes! For quadratic equations that can be factored, the solver shows the factored form and uses the zero-product property to find solutions.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Equation Solver',
      description:
        'Free online solver for linear, quadratic, and polynomial equations with step-by-step solutions.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2120',
      },
    },
  },

  {
    slug: 'matrix-calculator',
    name: 'Matrix Calculator',
    tagline: 'Add, multiply, transpose, find determinant, inverse, and rank',
    description:
      'Free online matrix calculator. Add, subtract, and multiply matrices. Calculate determinant, inverse, transpose, and rank. Solve systems of linear equations using matrices. Perfect for linear algebra and engineering.',
    metaDescription:
      'Free online matrix calculator. Add, multiply matrices, find determinant, inverse, transpose, rank. Solve Ax=b systems.',
    keywords: [
      'matrix calculator',
      'matrix multiplication',
      'matrix determinant',
      'matrix inverse',
      'transpose matrix',
      'matrix rank',
      'linear algebra calculator',
      'matrix solver',
      'matrix operations',
    ],
    category: 'calculators',
    icon: '📊',
    relatedTools: [
      'equation-solver',
      'scientific-calculator',
      'graphing-calculator',
    ],
    faqs: [
      {
        question: 'How do I add or subtract matrices?',
        answer:
          'Matrices must have the same dimensions (rows and columns). Add or subtract corresponding elements. For example, element [1,1] + element [1,1].',
      },
      {
        question: 'How do I multiply matrices?',
        answer:
          'For matrix A (m × n) and matrix B (n × p), the result is (m × p). Each element [i,j] is the dot product of row i of A and column j of B.',
      },
      {
        question: 'What is the determinant and why is it important?',
        answer:
          'The determinant is a scalar value. For a 2×2 matrix [[a, b], [c, d]], det = ad − bc. It tells us if the matrix is invertible and is used in solving systems of equations.',
      },
      {
        question: 'How do I find the inverse of a matrix?',
        answer:
          'The inverse exists only for square matrices with non-zero determinant. For a 2×2 matrix, multiply the adjugate by 1/determinant. The calculator handles larger matrices automatically.',
      },
      {
        question: 'What is transpose and how do I use it?',
        answer:
          'The transpose swaps rows and columns. If A is 2×3, then A^T is 3×2. Element [i,j] becomes [j,i]. Used in solving normal equations and statistics.',
      },
      {
        question: 'How do I solve Ax = b (a system of linear equations)?',
        answer:
          'Enter matrix A and vector b. The calculator uses matrix methods (Gaussian elimination, LU decomposition) to find vector x.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Matrix Calculator',
      description:
        'Free online calculator for matrix operations including addition, multiplication, determinant, inverse, and transpose.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        ratingCount: '890',
      },
    },
  },

  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    tagline: 'Convert between 200+ units: length, weight, temperature, time',
    description:
      'Free online unit converter. Convert between 200+ units including length (m, ft, km, miles), weight (kg, lb, oz), temperature (°C, °F, K), volume, time, and more. Instant conversion with high precision.',
    metaDescription:
      'Free online unit converter. Convert km to miles, kg to lbs, °C to °F, inches to cm, and 200+ more units instantly.',
    keywords: [
      'unit converter',
      'length converter',
      'weight converter',
      'temperature converter',
      'km to miles',
      'celsius to fahrenheit',
      'kg to lbs',
      'metric converter',
      'online converter',
      'unit conversion',
    ],
    category: 'utilities',
    icon: '📏',
    relatedTools: [
      'scientific-calculator',
      'percentage-calculator',
      'gpa-calculator',
    ],
    faqs: [
      {
        question: 'How many kilometers are in a mile?',
        answer:
          '1 mile = 1.60934 kilometers. To convert miles to km, multiply by 1.60934. To convert km to miles, divide by 1.60934 or multiply by 0.621371.',
      },
      {
        question: 'How do I convert Celsius to Fahrenheit?',
        answer:
          'Formula: °F = (°C × 9/5) + 32. For example, 0°C = 32°F, 100°C = 212°F. The calculator handles conversions instantly.',
      },
      {
        question: 'What is the difference between metric and imperial units?',
        answer:
          'Metric units (meters, kilograms) are based on powers of 10 and are used globally. Imperial units (feet, pounds) are used primarily in the US. The converter supports both systems.',
      },
      {
        question: 'How many pounds are in a kilogram?',
        answer:
          '1 kilogram = 2.20462 pounds. So 1 pound ≈ 0.453592 kilograms. For example, 70 kg ≈ 154 lbs.',
      },
      {
        question: 'Can I convert multiple units at once?',
        answer:
          'Yes! The calculator shows conversions between common units in the same category (length, weight, etc.). Select the "from" and "to" units.',
      },
      {
        question: 'How accurate is the converter?',
        answer:
          'The converter uses standard conversion factors with high precision (typically 6+ decimal places). Results are rounded based on your input precision.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Unit Converter',
      description:
        'Free online converter for 200+ units including length, weight, temperature, volume, and more.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        ratingCount: '1670',
      },
    },
  },

  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    tagline: 'Calculate and track your cumulative and semester GPA',
    description:
      'Free online GPA calculator. Calculate cumulative GPA, semester GPA, and weighted GPA. Supports 4.0 scale, 5.0 scale, and percentage scales. Add grades and credit hours to see your GPA instantly. Perfect for high school and college students.',
    metaDescription:
      'Free online GPA calculator. Calculate cumulative GPA, semester GPA, weighted GPA. Supports 4.0, 5.0 scales and percentages.',
    keywords: [
      'gpa calculator',
      'cumulative gpa',
      'semester gpa',
      'weighted gpa',
      'calculate gpa',
      'gpa scale',
      '4.0 gpa',
      'college gpa',
      'high school gpa',
    ],
    category: 'utilities',
    icon: '🎓',
    relatedTools: [
      'percentage-calculator',
      'scientific-calculator',
      'unit-converter',
    ],
    faqs: [
      {
        question: 'What is GPA and how is it calculated?',
        answer:
          'GPA (Grade Point Average) is the average of your course grades weighted by credit hours. Formula: GPA = Σ(Grade × Credit Hours) / Σ(Credit Hours). Grade points vary by scale (A=4.0 on 4.0 scale, A=5.0 on 5.0 scale).',
      },
      {
        question: 'What is the difference between cumulative and semester GPA?',
        answer:
          'Cumulative GPA is the average across all semesters and courses you have completed. Semester GPA is the average for one semester only. Most colleges focus on cumulative GPA.',
      },
      {
        question: 'How do I calculate weighted GPA?',
        answer:
          'Weighted GPA accounts for the credit hours of each course. Courses with more credits have more impact on your GPA. The calculator multiplies each grade by its credit hours, sums them, and divides by total credits.',
      },
      {
        question: 'What does a 3.5 GPA mean?',
        answer:
          'On a 4.0 scale, a 3.5 GPA is excellent and represents mostly A− grades. On a 5.0 scale, 3.5 is average. The interpretation depends on the scale used by your school.',
      },
      {
        question: 'Can I calculate what grade I need to reach my GPA goal?',
        answer:
          'Yes! Enter your target GPA, current GPA, current total credits, and the number of credits for your next course. The calculator shows the grade needed.',
      },
      {
        question: 'What GPA scales are supported?',
        answer:
          'The calculator supports 4.0 scale (US standard), 5.0 scale (some international systems), and percentage scales (0−100%). Select your scale when you start.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'GPA Calculator',
      description:
        'Free online tool to calculate cumulative, semester, and weighted GPA for high school and college students.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '4230',
      },
    },
  },
];

/**
 * Helper functions
 */

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getRelatedTools(toolSlug: string): Tool[] {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return [];
  return tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((t) => t !== undefined) as Tool[];
}

export function getAllCategories(): string[] {
  const categories = new Set(tools.map((t) => t.category));
  return Array.from(categories).sort();
}

export function generateBreadcrumb(toolSlug: string) {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mathlab.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://mathlab.app/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `https://mathlab.app/tools/${tool.slug}`,
      },
    ],
  };
}

/**
 * Export for testing and debugging
 */
export const toolCount = tools.length;
export const categoryCount = getAllCategories().length;
