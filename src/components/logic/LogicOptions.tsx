
import React from 'react';
import { Button } from '@/components/ui/button';
import ReadAloudButton from '../ReadAloudButton';

interface LogicOptionsProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  feedbackShown: boolean;
  onOptionSelect: (option: string) => void;
}

const LogicOptions: React.FC<LogicOptionsProps> = ({
  options,
  selectedOption,
  correctAnswer,
  feedbackShown,
  onOptionSelect
}) => {
  const getOptionDescription = (option: string) => {
    const descriptions: { [key: string]: string } = {
      '🔴': 'círculo vermelho',
      '🔵': 'círculo azul',
      '🟡': 'círculo amarelo',
      '⭐': 'estrela',
      '🌙': 'lua',
      '☀️': 'sol',
      '🐭': 'ratinho pequeno',
      '🐘': 'elefante grande',
      '🦁': 'leão',
      '🍎': 'maçã vermelha',
      '🍌': 'banana amarela',
      '🍊': 'laranja',
      '1️⃣': 'número um',
      '2️⃣': 'número dois',
      '3️⃣': 'número três'
    };
    return descriptions[option] || option;
  };

  return (
    <div className="options grid grid-cols-3 gap-4 mb-8">
      {options.map((option, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Button
            onClick={() => onOptionSelect(option)}
            className={`text-4xl py-8 h-20 ${
              selectedOption === option 
                ? option === correctAnswer 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-100 hover:bg-blue-200 text-black'
            }`}
            disabled={feedbackShown}
          >
            {option}
          </Button>
          <ReadAloudButton 
            text={getOptionDescription(option)}
            className="flex items-center justify-center"
            size="sm"
          />
        </div>
      ))}
    </div>
  );
};

export default LogicOptions;
