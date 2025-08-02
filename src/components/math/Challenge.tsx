
import React from 'react';
import ReadAloudButton from '../ReadAloudButton';

interface ChallengeProps {
  num1: number;
  num2: number;
}

const Challenge: React.FC<ChallengeProps> = ({ num1, num2 }) => {
  return (
    <div className="challenge mb-8 text-center">
      <h3 className="text-2xl font-bold mb-4">Quanto é:</h3>
      <div className="numbers flex items-center justify-center text-4xl font-bold gap-4">
        <span className="number bg-blue-100 p-4 rounded-lg">{num1}</span>
        <span>+</span>
        <span className="number bg-blue-100 p-4 rounded-lg">{num2}</span>
        <span>=</span>
        <span className="question bg-yellow-100 p-4 rounded-lg">?</span>
      </div>
      <div className="mt-2">
        <ReadAloudButton 
          text={`${num1} mais ${num2} é igual a quanto?`}
          size="default"
        />
      </div>
    </div>
  );
};

export default Challenge;
