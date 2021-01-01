import React from 'react';
import { ITask } from '../../tasks/ITask';
import { MathProblem } from '../../tasks/math';
import { MusicTask } from '../../tasks/music';
import styles from './problemRenderer.module.scss';
import doo from '../../assets/img/notes/0.png';
import re from '../../assets/img/notes/1.png';
import mi from '../../assets/img/notes/2.png';
import fa from '../../assets/img/notes/3.png';
import sol from '../../assets/img/notes/4.png';
import la from '../../assets/img/notes/5.png';
import si from '../../assets/img/notes/6.png';

const notes = [doo, re, mi, fa, sol, la, si];

type ProblemRendererProps = {
  problem: ITask;
};

const ProblemRenderer: React.FC<ProblemRendererProps> = ({ problem }) => {
  if (problem instanceof MathProblem) {
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
  } else if (problem instanceof MusicTask) {
    return (
      <>
        <img className={styles.note} src={notes[problem.note]} alt="note"></img>
        <span className={styles.equals}>=</span>
      </>
    );
  } else throw new Error('unsupported problem type');
};

export default ProblemRenderer;
