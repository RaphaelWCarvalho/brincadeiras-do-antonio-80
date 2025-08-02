
import { useState, useEffect } from 'react';

interface LogicChallenge {
  type: 'shapes' | 'colors' | 'numbers' | 'sizes';
  pattern: string[];
  correctAnswer: string;
  options: string[];
  hint: string;
}

const challenges: LogicChallenge[] = [
  {
    type: 'shapes',
    pattern: ['🔴', '🔵', '🔴', '🔵'],
    correctAnswer: '🔴',
    options: ['🔴', '🔵', '🟡'],
    hint: 'O padrão é: vermelho, azul, vermelho, azul. Qual vem depois?'
  },
  {
    type: 'shapes',
    pattern: ['⭐', '⭐', '🌙', '⭐', '⭐'],
    correctAnswer: '🌙',
    options: ['⭐', '🌙', '☀️'],
    hint: 'Vejo estrela, estrela, lua, estrela, estrela. O que vem agora?'
  },
  {
    type: 'sizes',
    pattern: ['🐭', '🐘', '🐭', '🐘'],
    correctAnswer: '🐭',
    options: ['🐭', '🐘', '🦁'],
    hint: 'Pequeno, grande, pequeno, grande. Qual é o próximo?'
  },
  {
    type: 'colors',
    pattern: ['🍎', '🍌', '🍎', '🍌'],
    correctAnswer: '🍎',
    options: ['🍎', '🍌', '🍊'],
    hint: 'Vermelho, amarelo, vermelho, amarelo. Que cor vem depois?'
  },
  {
    type: 'numbers',
    pattern: ['1️⃣', '2️⃣', '1️⃣', '2️⃣'],
    correctAnswer: '1️⃣',
    options: ['1️⃣', '2️⃣', '3️⃣'],
    hint: 'Um, dois, um, dois. Qual número continua o padrão?'
  }
];

export const useLogicChallenge = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challenge, setChallenge] = useState<LogicChallenge | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({ show: false, message: '', correct: false });
  const [playAudio, setPlayAudio] = useState(false);
  const [audioMessage, setAudioMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const generateChallenge = () => {
    const nextIndex = Math.floor(Math.random() * challenges.length);
    const newChallenge = challenges[nextIndex];
    
    setChallenge(newChallenge);
    setCurrentChallengeIndex(nextIndex);
    setShowHint(false);
    setSelectedOption(null);
    setFeedback({ show: false, message: '', correct: false });
    
    // Read the challenge aloud
    setTimeout(() => {
      const message = `Observe este padrão: ${newChallenge.pattern.join(', ')}. Qual elemento vem a seguir?`;
      setAudioMessage(message);
      setPlayAudio(true);
    }, 1000);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    if (challenge && option === challenge.correctAnswer) {
      const message = 'Excelente! Você completou o padrão corretamente!';
      setFeedback({ show: true, message, correct: true });
      setAudioMessage(message);
      setPlayAudio(true);
      
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      
      // Move to next challenge after a delay
      setTimeout(() => {
        generateChallenge();
      }, 3000);
    } else {
      const message = 'Não é essa a resposta. Observe o padrão com mais atenção e tente novamente!';
      setFeedback({ show: true, message, correct: false });
      setAudioMessage(message);
      setPlayAudio(true);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint && challenge) {
      setAudioMessage(challenge.hint);
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
