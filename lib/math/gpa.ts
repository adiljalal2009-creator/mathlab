export interface Course { name: string; grade: string; credits: number; weighted?: boolean; }
export interface GpaResult { gpa: string; totalCredits: number; breakdown: { name: string; points: number; credits: number; weighted: boolean }[]; }

const SCALE_4: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
};

export function gradeToPoints(grade: string, weighted = false): number {
  const g = grade.trim().toUpperCase();
  const base = SCALE_4[g];
  if (base === undefined) throw new Error(`Unknown grade: ${grade}`);
  if (!weighted) return base;
  if (base >= 3.0) return Math.min(5.0, base + 1.0);
  return base;
}

export function computeGpa(courses: Course[]): GpaResult {
  if (courses.length === 0) return { gpa: '0.00', totalCredits: 0, breakdown: [] };
  let totalPoints = 0;
  let totalCredits = 0;
  const breakdown = courses.map(c => {
    const points = gradeToPoints(c.grade, c.weighted);
    totalPoints += points * c.credits;
    totalCredits += c.credits;
    return { name: c.name, points: points, credits: c.credits, weighted: !!c.weighted };
  });
  const gpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;
  return { gpa: gpa.toFixed(2), totalCredits, breakdown };
}
