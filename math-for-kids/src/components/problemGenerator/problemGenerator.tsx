import React, { useState } from 'react';
import {
  generateMathProblem,
  getProblemComplexity,
  MathProblem,
} from '../../math/generateMathProblem';
import Answer from '../answer/answer';
import ProblemRenderer from '../problemRenderer/problemRenderer';
import Fireworks from './fireworks';

type ProblemGeneratorProps = {};

const ProblemGenerator: React.FC<ProblemGeneratorProps> = () => {
  const [problem, setProblem] = useState<MathProblem>(generateMathProblem());
  const [fireworks, setFireworks] = useState(false);
  const handleCorrectAnswer = () => {
    setFireworks(true);
    setTimeout(() => {
      setFireworks(false);
      setProblem(generateMathProblem());
    }, getProblemComplexity(problem) * 1000 * 7);
  };

  return fireworks ? (
    <Fireworks />
  ) : (
    <div className={'flex center'}>
      <div className="halfWidth">
        <ProblemRenderer problem={problem}></ProblemRenderer>
        <Answer
          problem={problem}
          onCorrectAnswer={handleCorrectAnswer}
        ></Answer>
      </div>
    </div>
  );
};

export default ProblemGenerator;
