
import React from 'react';
import ReadAloudButton from '../ReadAloudButton';

interface LogicQuestionProps {
  pattern: string[];
  type: string;
}

const LogicQuestion: React.FC<LogicQuestionProps> = ({ pattern, type }) => {
  const patternText = pattern.join(', ');
  const questionText = `Observe este padrão: ${patternText}. Qual elemento vem a seguir?`;

  return (
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold mb-4">Complete o Padrão:</h3>
      
      {/* Pattern Display */}
      <div className="pattern-display flex items-center justify-center gap-4 mb-6 p-6 bg-gray-50 rounded-lg">
        {pattern.map((item, index) => (
          <div key={index} className="pattern-item text-4xl">
            {item}
          </div>
        ))}
        <div className="text-4xl font-bold text-blue-600">
          ?
        </div>
      </div>

      <div className="mb-4">
        <ReadAloudButton 
          text={questionText}
          size="default"
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default LogicQuestion;
