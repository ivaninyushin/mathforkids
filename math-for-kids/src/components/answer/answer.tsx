import React from 'react';
import styles from './answer.module.scss';
type AnswerProps = {
  answer: string;
  isWrong: boolean;
};

const Answer: React.FC<AnswerProps> = ({ answer, isWrong }) => {
  return (
    <span
      className={styles.answer + ' ' + (isWrong ? styles.hvrWobbleTop : '')}
    >
      {answer}
    </span>
  );
};

export default Answer;
