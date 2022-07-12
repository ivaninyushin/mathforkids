import { ITask } from './ITask';
export type note = number;
export type clef = 'treble' | 'bass';
export class MusicTask implements ITask {
  note: note;
  clef: clef;

  constructor(note: note, clef: clef) {
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

export const generateMusicTask = (): MusicTask => {
  const note = randomInt(0, 13);
  const clef: clef = randomInt(0, 1) === 1 ? 'bass' : 'treble';
  return new MusicTask(note, clef);
};
