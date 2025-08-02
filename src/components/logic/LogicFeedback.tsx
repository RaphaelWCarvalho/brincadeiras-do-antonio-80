
import React from 'react';

interface LogicFeedbackProps {
  show: boolean;
  message: string;
  correct: boolean;
}

const LogicFeedback: React.FC<LogicFeedbackProps> = ({ show, message, correct }) => {
  if (!show) return null;

  return (
    <div className={`feedback text-center p-4 rounded-lg mb-8 ${
      correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default LogicFeedback;
