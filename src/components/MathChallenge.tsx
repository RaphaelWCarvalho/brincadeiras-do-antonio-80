
import React from 'react';
import { Button } from '@/components/ui/button';
import AudioFeedback from './AudioFeedback';
import Challenge from './math/Challenge';
import AnswerOptions from './math/AnswerOptions';
import HintCard from './math/HintCard';
import FeedbackDisplay from './math/FeedbackDisplay';
import CelebrationAnimation from './math/CelebrationAnimation';
import { useMathChallenge } from './math/useMathChallenge';

interface MathChallengeProps {
  onFeedback: (correct: boolean, message: string) => void;
}

const MathChallenge: React.FC<MathChallengeProps> = ({ onFeedback }) => {
  const {
    challenge,
    showHint,
    selectedOption,
    feedback,
    playAudio,
    audioMessage,
    showCelebration,
    handleOptionSelect,
    toggleHint,
    setPlayAudio
  } = useMathChallenge(onFeedback);

  if (!challenge) return <div>Carregando desafio...</div>;

  return (
    <div className="math-challenge">
      <AudioFeedback 
        play={playAudio} 
        message={audioMessage} 
        onComplete={() => setPlayAudio(false)} 
      />

      <CelebrationAnimation show={showCelebration} />

      <Challenge num1={challenge.num1} num2={challenge.num2} />

      <AnswerOptions
        options={challenge.options}
        selectedOption={selectedOption}
        correctAnswer={challenge.correctAnswer}
        feedbackShown={feedback.show}
        onOptionSelect={handleOptionSelect}
      />

      <div className="flex justify-center mb-8">
        <Button onClick={toggleHint} variant="outline">
          {showHint ? 'Esconder dica' : 'Mostrar dica'}
        </Button>
      </div>

      {showHint && (
        <HintCard num1={challenge.num1} num2={challenge.num2} />
      )}

      <FeedbackDisplay
        show={feedback.show}
        message={feedback.message}
        correct={feedback.correct}
      />
    </div>
  );
};

export default MathChallenge;
