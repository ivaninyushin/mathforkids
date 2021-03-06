import { ITask } from './ITask';
export type operation = 'plus' | 'minus';

export class MathProblem implements ITask {
  a1: number;
  a2: number;
  operation: operation;
  constructor(a1: number, a2: number, operation: operation) {
    this.a1 = a1;
    this.a2 = a2;
    this.operation = operation;
  }
  solveProblem = (): number =>
    this.operation === 'plus' ? this.a1 + this.a2 : this.a1 - this.a2;
  getProblemComplexity = () => {
    return (this.a1 + this.a2) / 50;
  };

  isCorrectAnswer = (answer: number) => answer === this.solveProblem();
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

export const generateMathProblem = (): MathProblem => {
  const a1 = randomInt(0, 29);
  const a2 = randomInt(0, 19);
  const op: operation = randomInt(0, 1) === 0 ? 'plus' : 'minus';

  var problem: MathProblem = new MathProblem(a1, a2, op);

  if (problem.solveProblem() < 0) return generateMathProblem();
  if (a1 === 0 || a2 === 0) return generateMathProblem();

  return problem;
};
