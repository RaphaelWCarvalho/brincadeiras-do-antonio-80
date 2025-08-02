
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressData {
  moduleName: string;
  percentage: number;
  color: string;
}

interface ProgressChartProps {
  data: ProgressData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Seu Progresso</h2>
      
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{item.moduleName}</span>
            <span className="font-medium">{item.percentage}%</span>
          </div>
          <Progress 
            value={item.percentage} 
            className={`h-4 ${item.color}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProgressChart;
