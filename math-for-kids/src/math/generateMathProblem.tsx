export type operation = 'plus' | 'minus';
export type order = 'direct' | 'reverse';

export interface MathProblem {
  a1: number;
  a2: number;
  operation: operation;
  order: order;
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
  const a1 = randomInt(0, 20);
  const a2 = randomInt(0, 20);
  const op: operation = randomInt(0, 1) === 0 ? 'plus' : 'minus';
  const order = randomInt(0, 1) === 0 ? 'direct' : 'reverse';

  return { a1: a1, a2: a2, operation: op, order: order };
};
