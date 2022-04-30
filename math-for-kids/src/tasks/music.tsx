import { ITask } from './ITask';
export type note = number;
export class MusicTask implements ITask {
  note: note;
  constructor(note: note) {
    this.note = note;
  }
  solveProblem = (): number => this.note;
  getProblemComplexity = () => {
    return 0.3;
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

export const generateMusicTask = (): MusicTask => {
  const note = randomInt(0, 6);
  return new MusicTask(note);
};
