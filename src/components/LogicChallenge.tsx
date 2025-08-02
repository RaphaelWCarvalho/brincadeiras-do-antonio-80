
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { useLogicChallenge } from './logic/useLogicChallenge';
import LogicQuestion from './logic/LogicQuestion';
import LogicOptions from './logic/LogicOptions';
import LogicFeedback from './logic/LogicFeedback';
import LogicCelebration from './logic/LogicCelebration';
import AudioFeedback from './AudioFeedback';

const LogicChallenge: React.FC = () => {
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
  } = useLogicChallenge();

  // Read instructions automatically when component mounts
  useEffect(() => {
    const instructions = "Bem-vindo ao módulo de lógica! Vamos completar padrões e sequências. Observe o padrão e escolha qual elemento vem a seguir.";
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(instructions);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }, 500);
  }, []);

  if (!challenge) return null;

  return (
    <div className="logic-challenge max-w-4xl mx-auto p-6">
      {/* Audio Feedback Component */}
      <AudioFeedback 
        play={playAudio} 
        message={audioMessage} 
        onComplete={() => setPlayAudio(false)} 
      />

      {/* Celebration Animation */}
      <LogicCelebration show={showCelebration} />

      {/* Main Challenge Card */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <LogicQuestion 
            pattern={challenge.pattern}
            type={challenge.type}
          />
          
          <LogicOptions
            options={challenge.options}
            selectedOption={selectedOption}
            correctAnswer={challenge.correctAnswer}
            feedbackShown={feedback.show}
            onOptionSelect={handleOptionSelect}
          />

          {/* Hint Button */}
          <div className="text-center mb-6">
            <Button
              onClick={toggleHint}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              {showHint ? 'Esconder Dica' : 'Preciso de Ajuda'}
            </Button>
          </div>

          {/* Hint Card */}
          {showHint && (
            <Card className="mb-6 bg-yellow-50 border-yellow-200">
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">💡 Dica:</p>
                  <p className="text-gray-700">{challenge.hint}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Feedback Display */}
      <LogicFeedback 
        show={feedback.show}
        message={feedback.message}
        correct={feedback.correct}
      />
    </div>
  );
};

export default LogicChallenge;
