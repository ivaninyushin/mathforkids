export type OpMode = 'music' | 'math1'| 'math2'| 'math3';
export interface ITask {
  isCorrectAnswer(answer: number): boolean;
  solveProblem(): number;
  getProblemComplexity(): number;

  isCorrectAnswer(answer: number): boolean;
}
