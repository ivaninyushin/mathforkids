import React, { useCallback, useEffect, useState } from 'react';
import { generateMathProblem } from '../../tasks/math';
import Answer from '../answer/answer';
import ProblemRenderer from '../problemRenderer/problemRenderer';
import TouchKeyboard from '../touchKeyboard/touchKeyboard';
import Fireworks from '../fireworks/fireworks';
import styles from './problemGenerator.module.scss';
import star from '../../assets/img/star.svg';
import poop from '../../assets/img/poop.svg';
import gnome from '../../assets/img/gnomes.png';
import { generateMusicTask } from '../../tasks/music';
import { ITask } from '../../tasks/ITask';

type ProblemGeneratorProps = {
  mode: 'music' | 'math';
};

const processKey = (key: string, answer: string) => {
  if (key === 'Backspace' || key === 'Delete') {
    return answer.substr(0, answer.length - 1);
  } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
    return answer.length < 2 ? answer + key : answer;
  }
  return answer;
};
// Number of stars that equal to one gnome
const starsToGnome = 3;
const generateTask = (mode: ProblemGeneratorProps['mode']) =>
  mode === 'math' ? generateMathProblem() : generateMusicTask();

const ProblemGenerator: React.FC<ProblemGeneratorProps> = ({ mode }) => {
  const [problem, setProblem] = useState<ITask>(generateTask(mode));
  const [fireworks, setFireworks] = useState(false);
  const [answer, setAnswer] = useState('');
  const [wrong, setWrong] = useState(false);
  const [stars, setStars] = useState<number[]>([]);

  const handleCorrectAnswer = useCallback(
    (problem) => {
      setFireworks(true);
      setTimeout(() => {
        setFireworks(false);
        setProblem(generateTask(mode));
      }, problem.getProblemComplexity(problem) * 1000 * 12);
    },
    [mode]
  );

  const handleAnswer = useCallback(
    (answer: number, problem: ITask) => {
      if (problem.isCorrectAnswer(answer)) {
        setAnswer('');
        if (stars.filter((v) => v === 1).length >= starsToGnome - 1) {
          let index = 0;
          let newStars: number[] = [];
          for (var i = 0; i < stars.length; i++) {
            if (stars[i] === 1 && index < starsToGnome - 1) {
              index++;
            } else {
              newStars.push(stars[i]);
            }
          }
          newStars.push(starsToGnome);
          setStars(newStars);
        } else {
          setStars((s) => [...s, 1]);
        }
        handleCorrectAnswer(problem);
      } else {
        setWrong(true);
        setStars((s) => [...s, -1]);
        setTimeout(() => {
          setWrong(false);
          setAnswer('');
        }, 700);
      }
    },
    [handleCorrectAnswer, stars]
  );

  const handleTouchKey = (key: string) => {
    if (!fireworks && !wrong) {
      if (key === 'Enter') {
        handleAnswer(parseInt(answer), problem);
      }
      setAnswer((answer) => processKey(key, answer));
    }
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (!fireworks && !wrong) {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleAnswer(parseInt(answer), problem);
        } else {
          setAnswer((answer) => processKey(event.key, answer));
        }
      }
    };

    document.addEventListener('keydown', listener);

    return function cleanup() {
      document.removeEventListener('keydown', listener);
    };
  }, [answer, fireworks, handleAnswer, problem, wrong]);

  return fireworks ? (
    <Fireworks />
  ) : (
    <div className={styles.container}>
      <div className={styles.stars}>
        <div className="flex flex-row">
          {stars.map((s, i) =>
            s === 1 ? (
              <img src={star} alt="star" key={i} className={styles.star} />
            ) : s === starsToGnome ? (
              <img src={gnome} alt="gnome" key={i} className={styles.star} />
            ) : (
              <img src={poop} alt="poop" key={i} className={styles.star} />
            )
          )}
        </div>
      </div>
      <div className={styles.mathProblem}>
        <ProblemRenderer problem={problem}></ProblemRenderer>
        <Answer answer={answer} isWrong={wrong}></Answer>
      </div>
      <TouchKeyboard onKey={handleTouchKey} mode={mode}></TouchKeyboard>
    </div>
  );
};

export default ProblemGenerator;
