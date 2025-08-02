
import React from 'react';
import { Volume } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReadAloudButtonProps {
  text: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({
  text,
  size = 'sm',
  variant = 'outline',
  className = '',
}) => {
  const handleReadAloud = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button
      onClick={handleReadAloud}
      size={size}
      variant={variant}
      className={`flex items-center justify-center ${className}`}
      type="button"
    >
      <Volume className="h-4 w-4 mr-1" />
      <span>Ler</span>
    </Button>
  );
};

export default ReadAloudButton;
