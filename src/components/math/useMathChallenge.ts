
import { useState, useEffect } from 'react';

interface Challenge {
  num1: number;
  num2: number;
  correctAnswer: number;
  options: number[];
}

export const useMathChallenge = (onFeedback: (correct: boolean, message: string) => void) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState({ show: false, message: '', correct: false });
  const [playAudio, setPlayAudio] = useState(false);
  const [audioMessage, setAudioMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const generateChallenge = () => {
    const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
    const num2 = Math.floor(Math.random() * (9 - num1) + 1); // Ensure sum <= 10
    const correctAnswer = num1 + num2;
    
    // Generate 3 options including the correct one
    let options = [correctAnswer];
    
    while (options.length < 3) {
      const option = Math.floor(Math.random() * 10) + 1;
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    
    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);
    
    setChallenge({ num1, num2, correctAnswer, options });
    setShowHint(false);
    setSelectedOption(null);
    setFeedback({ show: false, message: '', correct: false });
    
    // Read the challenge aloud
    const message = `${num1} mais ${num2} é igual a quanto?`;
    setAudioMessage(message);
    setPlayAudio(true);
  };

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
    
    if (challenge && option === challenge.correctAnswer) {
      const message = 'Muito bem! Você acertou!';
      setFeedback({ show: true, message, correct: true });
      onFeedback(true, message);
      setAudioMessage(message);
      setPlayAudio(true);
      
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      
      // Move to next challenge after a delay
      setTimeout(() => {
        generateChallenge();
      }, 2000);
    } else {
      const message = 'Hmmm, essa não é a resposta certa. Tente novamente!';
      setFeedback({ show: true, message, correct: false });
      onFeedback(false, message);
      setAudioMessage(message);
      setPlayAudio(true);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint && challenge) {
      setAudioMessage(`Vamos contar: ${challenge.num1} mais ${challenge.num2} é igual a ${challenge.correctAnswer}`);
      setPlayAudio(true);
    }
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  return {
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
  };
};
