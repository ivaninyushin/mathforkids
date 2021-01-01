export interface ITask {
  isCorrectAnswer(answer: number): boolean;
  solveProblem(): number;
  getProblemComplexity(): number;

  isCorrectAnswer(answer: number): boolean;
}
