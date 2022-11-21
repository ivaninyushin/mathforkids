import { clefVariants } from '../components/problemGenerator/clefVariants';
import { ITask } from './ITask';
export type note = number;

export class MusicTask implements ITask {
  note: note;
  clef: clefVariants;

  constructor(note: note, clef: clefVariants) {
    this.note = note;
    this.clef = clef;
  }
  solveProblem = (): number => this.note % 7;
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

export const generateMusicTask = (clef: clefVariants): MusicTask => {
  const note = randomInt(0, 13);
  return new MusicTask(note, clef);
};
