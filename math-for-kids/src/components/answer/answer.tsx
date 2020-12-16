import React, { useState } from 'react';
import { MathProblem, solveProblem } from '../../math/generateMathProblem';
import styles from './answer.module.scss';
type AnswerProps = {
  problem: MathProblem;
  onCorrectAnswer: () => void;
};

const Answer: React.FC<AnswerProps> = ({ problem, onCorrectAnswer }) => {
  const [answer, setAnswer] = useState('');
  const [wrong, setWrong] = useState(false);

  const handleAnswer = (problem: MathProblem, answer: number) => {
    var expectedAnswer = solveProblem(problem);
    if (expectedAnswer === answer) {
      setAnswer('');
      onCorrectAnswer();
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setAnswer('');
      }, 1500);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleAnswer(problem, parseInt((event.target as HTMLInputElement).value));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  return (
    <input
      ref={(input) => input && input.focus()}
      maxLength={2}
      className={styles.answerInput + ' ' + (wrong ? styles.hvrWobbleTop : '')}
      onKeyUp={handleKeyUp}
      value={answer}
      onChange={handleChange}
    ></input>
  );
};

export default Answer;
