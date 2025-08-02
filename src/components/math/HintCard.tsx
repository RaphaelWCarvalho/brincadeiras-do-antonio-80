
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FingerVisualization from './FingerVisualization';

interface HintCardProps {
  num1: number;
  num2: number;
}

const HintCard: React.FC<HintCardProps> = ({ num1, num2 }) => {
  return (
    <Card className="hint-card mb-8">
      <CardContent className="pt-6">
        <div className="text-center mb-4">
          <h4 className="text-lg font-medium mb-2">Vamos contar nos dedos!</h4>
        </div>
        <FingerVisualization num1={num1} num2={num2} />
      </CardContent>
    </Card>
  );
};

export default HintCard;
