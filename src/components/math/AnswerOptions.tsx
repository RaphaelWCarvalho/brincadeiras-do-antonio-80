
import React from 'react';
import { Button } from '@/components/ui/button';
import ReadAloudButton from '../ReadAloudButton';

interface AnswerOptionsProps {
  options: number[];
  selectedOption: number | null;
  correctAnswer: number;
  feedbackShown: boolean;
  onOptionSelect: (option: number) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selectedOption,
  correctAnswer,
  feedbackShown,
  onOptionSelect
}) => {
  return (
    <div className="options grid grid-cols-3 gap-4 mb-8">
      {options.map((option) => (
        <div key={option} className="flex flex-col gap-2">
          <Button
            onClick={() => onOptionSelect(option)}
            className={`text-2xl py-8 ${
              selectedOption === option 
                ? option === correctAnswer 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600' 
                : ''
            }`}
            disabled={feedbackShown}
          >
            {option}
          </Button>
          <ReadAloudButton 
            text={String(option)}
            className="flex items-center justify-center"
          />
        </div>
      ))}
    </div>
  );
};

export default AnswerOptions;
