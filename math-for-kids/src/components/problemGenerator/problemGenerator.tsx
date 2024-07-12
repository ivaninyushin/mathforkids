import React, { useCallback, useEffect, useState } from 'react';
import { generateMathProblem } from '../../tasks/math';
import Answer from '../answer/answer';
import ProblemRenderer from '../problemRenderer/problemRenderer';
import TouchKeyboard from '../touchKeyboard/touchKeyboard';
import Fireworks from '../fireworks/fireworks';
import styles from './problemGenerator.module.scss';
import Star from '../../assets/img/star.min.svg?react';
import Poop from '../../assets/img/poop.min.svg?react';
import gnome from '../../assets/img/gnomes.png';
import { generateMusicTask } from '../../tasks/music';
import { ITask } from '../../tasks/ITask';
import { allNotesRu, allNotesEn, allNumbers } from '../../assets/data/arrays';
import { Link } from 'react-router-dom';
import { clefVariants } from './clefVariants';
import ClefSelector from '../clefSelector/clefSelector';

type ProblemGeneratorProps = {
  mode: 'music' | 'math';
  lang: 'en' | 'ru';
};

const processKey = (
  key: string,
  answer: string,
  mode: 'music' | 'math',
  lang: 'en' | 'ru'
) => {
  const allNotes = lang === 'en' ? allNotesEn : allNotesRu;

  if (key === 'Backspace' || key === 'Delete') {
    return mode === 'math' ? answer.substring(0, answer.length - 1) : '';
  } else if (mode === 'math' && allNumbers.includes(key)) {
    return answer.length < 2 ? answer + key : answer;
  } else if (mode === 'music' && allNotes.includes(key)) {
    return key;
  }
  return answer;
};

// Number of stars that equal to one gnome
const starsToGnome = 3;
const generateTask = (
  mode: ProblemGeneratorProps['mode'],
  clef: clefVariants | undefined
) => (mode === 'math' ? generateMathProblem() : generateMusicTask(clef!));

const ProblemGenerator: React.FC<ProblemGeneratorProps> = ({ mode, lang }) => {
  const [fireworks, setFireworks] = useState(false);
  const [answer, setAnswer] = useState('');
  const [wrong, setWrong] = useState(false);
  const [stars, setStars] = useState<number[]>([]);
  const allNotes = lang === 'en' ? allNotesEn : allNotesRu;

  const [clef, setClef] = useState<clefVariants | undefined>(undefined);
  const [problem, setProblem] = useState<ITask>();

  useEffect(() => {
    if (mode === 'math' || (mode === 'music' && clef)) {
      setProblem(generateTask(mode, clef));
    }
  }, [clef, mode]);

  const handleCorrectAnswer = useCallback(
    (problem: ITask) => {
      setFireworks(true);
      setTimeout(() => {
        setFireworks(false);
        setProblem(generateTask(mode, clef));
      }, problem.getProblemComplexity() * 1000 * 12);
    },
    [mode, clef]
  );

  const handleAnswer = useCallback(
    (answer: number, problem: ITask) => {
      if (problem.isCorrectAnswer(answer)) {
        setAnswer('');
        if (stars.filter((v) => v === 1).length >= starsToGnome - 1) {
          let index = 0;
          const newStars: number[] = [];
          for (let i = 0; i < stars.length; i++) {
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
        const value =
          mode === 'math' ? parseInt(answer) : allNotes.indexOf(answer);
        handleAnswer(value, problem!);
      }
      setAnswer((answer) => processKey(key, answer, mode, lang));
    }
  };

  const selectClef = (clef: clefVariants) => {
    setClef(clef);
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (!fireworks && !wrong) {
        if (event.key === 'Enter') {
          event.preventDefault();
          const value =
            mode === 'math' ? parseInt(answer) : allNotes.indexOf(answer);
          handleAnswer(value, problem!);
        } else {
          setAnswer((answer) => processKey(event.key, answer, mode, lang));
        }
      }
    };

    document.addEventListener('keydown', listener);

    return function cleanup() {
      document.removeEventListener('keydown', listener);
    };
  }, [answer, fireworks, handleAnswer, problem, wrong, mode, allNotes, lang]);

  return fireworks ? (
    <Fireworks />
  ) : mode === 'music' && !clef ? (
    <ClefSelector onSelected={(clef) => selectClef(clef)} />
  ) : (
    <div className={styles.container}>
      <div className={styles.stars}>
        <div className="flex flex-row">
          {stars.map((s, i) =>
            s === 1 ? (
              <Star key={i} className={styles.star} />
            ) : s === starsToGnome ? (
              <img src={gnome} alt="gnome" key={i} className={styles.star} />
            ) : (
              <Poop key={i} className={styles.star} />
            )
          )}
        </div>
      </div>
      <div className={styles.mathProblem}>
        {problem && <ProblemRenderer problem={problem!}></ProblemRenderer>}
        <Answer answer={answer} isWrong={wrong}></Answer>
      </div>
      <TouchKeyboard
        onKey={handleTouchKey}
        mode={mode}
        lang={lang}
        allowSubmit={answer?.length > 0 === true}
      ></TouchKeyboard>
      {mode === 'music' ? (<>
        <Link to="/" className={styles.footerLink}>
          Математика
        </Link>
        <Link to="/donate" className={styles.footerLink2}>
          Donate/Support
        </Link>
      </>
      ) : (
        <>
          <Link to="ru/music" className={styles.footerLink}>
            Ноты До-Си
          </Link>
          <Link to="en/music" className={styles.footerLink2}>
            Ноты A-G
          </Link>
          <Link to="/donate" className={styles.footerLink3}>
            Donate/Support
          </Link>
        </>
      )}
    </div>
  );
};

export default ProblemGenerator;
