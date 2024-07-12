import { ITask } from './ITask';
export type operation = 'plus' | 'minus' | 'multiply' | 'divide';

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
    this.operation === 'plus' ? this.a1 + this.a2 
      : this.operation === 'minus' ? this.a1 - this.a2
      : this.operation === 'multiply' ? this.a1 * this.a2
      : this.a1 / this.a2;
  getProblemComplexity = () => {
    return (this.a1 + this.a2) / 100;
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
  const opCode = randomInt(0, 3);
  const op: operation = opCode === 0 ? 'plus' : opCode === 1 ? 'minus': opCode === 2 ? 'multiply' : 'divide';
  let a1 = randomInt(1, 49);
  let a2 = randomInt(1, 39);
  if(op == 'multiply') {
    a1 = randomInt(1, 9);
    a2 = randomInt(1, 9);
  }
  if(op == 'divide') {
    a1 = randomInt(1, 9);
    a2 = randomInt(1, 9);
    a1 = a1 * a2;
  }

  const problem: MathProblem = new MathProblem(a1, a2, op);

  if (problem.solveProblem() < 0) return generateMathProblem();
  
  return problem;
};
