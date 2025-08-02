
import React, { useState } from 'react';
import GameContainer from '../components/GameContainer';
import MathChallenge from '../components/MathChallenge';
import { toast } from '@/components/ui/sonner';
import AudioFeedback from '../components/AudioFeedback';

const Matematica: React.FC = () => {
  const [playAudio, setPlayAudio] = useState(false);
  const [audioMessage, setAudioMessage] = useState('');

  const handleFeedback = (correct: boolean, message: string) => {
    if (correct) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    
    // Falar o feedback para a criança
    setAudioMessage(message);
    setPlayAudio(true);
  };

  return (
    <GameContainer title="Matemática para Crianças">
      <div className="max-w-2xl mx-auto">
        <AudioFeedback 
          play={playAudio} 
          message={audioMessage}
          onComplete={() => setPlayAudio(false)}
        />
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Vamos somar!</h2>
          <p className="text-gray-600">
            Resolva os desafios de soma. Clique em "Mostrar dica" se precisar de ajuda.
          </p>
        </div>
        
        <MathChallenge onFeedback={handleFeedback} />
      </div>
    </GameContainer>
  );
};

export default Matematica;
