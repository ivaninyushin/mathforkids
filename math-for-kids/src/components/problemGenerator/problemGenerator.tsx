import React, { useEffect, useState } from 'react';
import {
  generateMathProblem,
  MathProblem,
} from '../../math/generateMathProblem';
import ProblemRenderer from '../problemRenderer/problemRenderer';
type ProblemGeneratorProps = {};

const ProblemGenerator: React.FC<ProblemGeneratorProps> = () => {
  const [problem, setProblem] = useState<MathProblem>(generateMathProblem());

  return (
    <div>
      <ProblemRenderer problem={problem}></ProblemRenderer>
    </div>
  );
};

export default ProblemGenerator;
