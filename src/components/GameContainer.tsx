
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GameContainerProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ 
  title, 
  children,
  onBack
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="game-container">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBack}
          className="mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="children-transition">
        {children}
      </div>
    </div>
  );
};

export default GameContainer;
