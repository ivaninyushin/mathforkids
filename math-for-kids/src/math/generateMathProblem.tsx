export type operation = 'plus' | 'minus';

export interface MathProblem {
  a1: number;
  a2: number;
  operation: operation;
}
/**
 * Generates a random integer between min and max (inclusive)
 * @param  {number} min
 * @param  {number} max
 * @returns randomly generated integer
 */
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const solveProblem = (problem: MathProblem): number => {
  const { a1, a2, operation } = problem;
  return operation === 'plus' ? a1 + a2 : a1 - a2;
};

export const generateMathProblem = (): MathProblem => {
  const a1 = randomInt(0, 29);
  const a2 = randomInt(0, 19);
  const op: operation = randomInt(0, 1) === 0 ? 'plus' : 'minus';

  var problem: MathProblem = { a1: a1, a2: a2, operation: op };

  if (solveProblem(problem) < 0) return generateMathProblem();
  if (a1 === 0 || a2 === 0) return generateMathProblem();

  return problem;
};

export const getProblemComplexity = (problem: MathProblem) => {
  return (problem.a1 + problem.a2) / 50;
};
