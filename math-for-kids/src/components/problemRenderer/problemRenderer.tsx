import React from 'react';
import { MathProblem } from '../../math/generateMathProblem';
import styles from './problemRenderer.module.scss';

type ProblemRendererProps = {
  problem: MathProblem;
};

const ProblemRenderer: React.FC<ProblemRendererProps> = ({ problem }) => {
  return (
    <>
      <span className={styles.argument1}>{problem.a1}</span>
      <span className={styles[problem.operation]}>
        {problem.operation === 'plus' ? '+' : '-'}
      </span>

      <span className={styles.argument2}>{problem.a2}</span>
      <span className={styles.equals}>=</span>
    </>
  );
};

export default ProblemRenderer;
