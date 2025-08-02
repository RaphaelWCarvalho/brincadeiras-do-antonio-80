
import React from 'react';

interface CelebrationAnimationProps {
  show: boolean;
}

const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-50">
      <div className="animate-bounce text-7xl">🎉</div>
      <div className="animate-bounce text-7xl delay-100">⭐</div>
      <div className="animate-bounce text-7xl delay-200">🎊</div>
    </div>
  );
};

export default CelebrationAnimation;
