
import React from 'react';
import { Hand } from 'lucide-react';

interface FingerVisualizationProps {
  num1: number;
  num2: number;
}

const FingerVisualization: React.FC<FingerVisualizationProps> = ({ num1, num2 }) => {
  const renderFinger = (active: boolean, number?: number) => (
    <div className={`relative w-8 h-16 mx-1 ${active ? 'text-yellow-500' : 'text-gray-300'}`}>
      <div className="text-4xl">👆</div>
      {active && number && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <span className="text-xs font-bold bg-white rounded-full px-1 border">{number}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex justify-center gap-6">
      <div className="hand-container">
        <div className="flex mb-2 justify-center">
          <Hand className="h-8 w-8 text-gray-700" />
        </div>
        <div className="flex justify-center">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={`hand1-finger-${i}`}>
              {renderFinger(i < num1, i < num1 ? i + 1 : undefined)}
            </div>
          ))}
        </div>
      </div>
      <div className="hand-container">
        <div className="flex mb-2 justify-center">
          <Hand className="h-8 w-8 text-gray-700" />
        </div>
        <div className="flex justify-center">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={`hand2-finger-${i}`}>
              {renderFinger(i < num2, i < num2 ? num1 + i + 1 : undefined)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FingerVisualization;
