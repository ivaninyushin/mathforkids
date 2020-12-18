import React, { useCallback, useEffect, useState } from 'react';
import {
  generateMathProblem,
  getProblemComplexity,
  MathProblem,
  solveProblem,
} from '../../math/generateMathProblem';
import Answer from '../answer/answer';
import ProblemRenderer from '../problemRenderer/problemRenderer';
import TouchKeyboard from '../touchKeyboard/touchKeyboard';
import Fireworks from './fireworks';
import styles from './problemGenerator.module.scss';

type ProblemGeneratorProps = {};

const processKey = (key: string, answer: string) => {
  if (key === 'Backspace' || key === 'Delete') {
    return answer.substr(0, answer.length - 1);
  } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
    return answer.length < 2 ? answer + key : answer;
  }
  return answer;
};

const ProblemGenerator: React.FC<ProblemGeneratorProps> = () => {
  const [problem, setProblem] = useState<MathProblem>(generateMathProblem());
  const [fireworks, setFireworks] = useState(false);
  const [answer, setAnswer] = useState('');
  const [wrong, setWrong] = useState(false);

  const handleCorrectAnswer = useCallback((problem) => {
    setFireworks(true);
    setTimeout(() => {
      setFireworks(false);
      setProblem(generateMathProblem());
    }, getProblemComplexity(problem) * 1000 * 12);
  }, []);

  const handleAnswer = useCallback(
    (answer: number, problem: MathProblem) => {
      var expectedAnswer = solveProblem(problem);
      if (expectedAnswer === answer) {
        setAnswer('');
        handleCorrectAnswer(problem);
      } else {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setAnswer('');
        }, 700);
      }
    },
    [handleCorrectAnswer]
  );

  const handleTouchKey = (key: string) => {
    if (key === 'Enter') {
      handleAnswer(parseInt(answer), problem);
    }
    setAnswer((answer) => processKey(key, answer));
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAnswer(parseInt(answer), problem);
      } else {
        setAnswer((answer) => processKey(event.key, answer));
      }
    };

    document.addEventListener('keydown', listener);

    return function cleanup() {
      document.removeEventListener('keydown', listener);
    };
  }, [answer, handleAnswer, problem]);

  return fireworks ? (
    <Fireworks />
  ) : (
    <div className={styles.container}>
      <div className={styles.mathProblem}>
        <ProblemRenderer problem={problem}></ProblemRenderer>
        <Answer answer={answer} isWrong={wrong}></Answer>
      </div>
      <TouchKeyboard onKey={handleTouchKey}></TouchKeyboard>
    </div>
  );
};

export default ProblemGenerator;
