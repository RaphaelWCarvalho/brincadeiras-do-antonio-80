
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AudioFeedback from './AudioFeedback';
import ReadAloudButton from './ReadAloudButton';
import { Award } from 'lucide-react';

interface WordItem {
  id: number;
  word: string;
  image: string;
  hasTargetSound: boolean;
  targetSound: string;
}

// Sample words with R and L sounds
const sampleWords: WordItem[] = [
  { id: 1, word: "Rato", image: "🐭", hasTargetSound: true, targetSound: "R" },
  { id: 2, word: "Bola", image: "⚽", hasTargetSound: true, targetSound: "L" },
  { id: 3, word: "Carro", image: "🚗", hasTargetSound: true, targetSound: "R" },
  { id: 4, word: "Sol", image: "☀️", hasTargetSound: true, targetSound: "L" },
  { id: 5, word: "Gato", image: "🐱", hasTargetSound: false, targetSound: "" },
  { id: 6, word: "Flor", image: "🌸", hasTargetSound: true, targetSound: "R" },
  { id: 7, word: "Leão", image: "🦁", hasTargetSound: true, targetSound: "L" },
  { id: 8, word: "Peixe", image: "🐠", hasTargetSound: false, targetSound: "" },
  { id: 9, word: "Girafa", image: "🦒", hasTargetSound: false, targetSound: "" },
  { id: 10, word: "Foca", image: "🦭", hasTargetSound: false, targetSound: "" },
  { id: 11, word: "Arvore", image: "🌳", hasTargetSound: true, targetSound: "R" },
  { id: 12, word: "Lua", image: "🌙", hasTargetSound: true, targetSound: "L" }
];

const CacaAoSom: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<WordItem[]>([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [targetSound, setTargetSound] = useState<string>("R");
  const [gameActive, setGameActive] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Estados para o feedback de áudio
  const [playAudio, setPlayAudio] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");

  // Start a new round with random words
  const startNewRound = () => {
    // Shuffle and get 6-8 words
    const shuffled = [...sampleWords].sort(() => 0.5 - Math.random());
    const roundSize = Math.floor(Math.random() * 3) + 6; // 6-8 words
    const roundWords = shuffled.slice(0, roundSize);
    
    setCurrentRound(roundWords);
    const newSound = Math.random() > 0.5 ? "R" : "L";
    setTargetSound(newSound);
    setGameActive(true);
    
    // Mensagem de áudio para início de rodada com a fonética correta
    const soundPhonetics = newSound === "R" ? "érrê" : "élê";
    setAudioMessage(`Vamos encontrar palavras com o som ${soundPhonetics}. Clique nas imagens que têm esse som.`);
    setPlayAudio(true);
  };

  // Check if a word has the target sound
  const checkWord = (word: WordItem) => {
    setTotal(prev => prev + 1);
    
    const hasCorrectTargetSound = word.hasTargetSound && word.targetSound === targetSound;
    const soundPhonetics = targetSound === "R" ? "érrê" : "élê";
    
    if (hasCorrectTargetSound) {
      setScore(prev => prev + 1);
      // Visual and audio feedback
      toast.success(`Parabéns! "${word.word}" tem o som "${targetSound}"!`);
      
      // Feedback de áudio para acerto
      setAudioMessage(`Parabéns! ${word.word} tem o som ${soundPhonetics}!`);
      setPlayAudio(true);
      
      // Show celebration animation for correct answers
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      if (word.hasTargetSound) {
        const otherSoundPhonetics = word.targetSound === "R" ? "érrê" : "élê";
        toast.info(`"${word.word}" tem o som "${word.targetSound}", não "${targetSound}".`);
        
        // Feedback de áudio para erro com som diferente
        setAudioMessage(`Ih! ${word.word} tem o som ${otherSoundPhonetics}, não ${soundPhonetics}.`);
        setPlayAudio(true);
      } else {
        toast.info(`"${word.word}" não tem o som "${targetSound}".`);
        
        // Feedback de áudio para erro sem o som alvo
        setAudioMessage(`Ih! ${word.word} não tem o som ${soundPhonetics}. Tente novamente!`);
        setPlayAudio(true);
      }
    }
    
    // Remove the word from the current round
    setCurrentRound(prev => prev.filter(w => w.id !== word.id));
    
    // Check if round is over
    if (currentRound.length <= 1) {
      setGameActive(false);
      
      // Feedback de áudio para fim de rodada
      const finalMessage = score > (total / 2) 
        ? "Muito bem! Você conseguiu vários acertos nessa rodada!" 
        : "Continue praticando. Você vai melhorar!";
        
      setTimeout(() => {
        setAudioMessage(finalMessage);
        setPlayAudio(true);
      }, 1500);
    }
  };

  // Manipulador para quando o áudio terminar
  const handleAudioComplete = () => {
    setPlayAudio(false);
  };

  // Start first round when component loads
  useEffect(() => {
    startNewRound();
  }, []);

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center">
      <AudioFeedback 
        play={playAudio} 
        message={audioMessage} 
        onComplete={handleAudioComplete} 
      />
      
      <div className="mb-6 text-center">
        <h3 className="text-xl mb-2">Encontre palavras com o som: 
          <span className="text-2xl font-bold ml-2 text-primary">{targetSound}</span>
        </h3>
        <p className="text-muted-foreground">Clique nas imagens que têm esse som</p>
        <div className="mt-2">
          <ReadAloudButton 
            text={`Encontre palavras com o som ${targetSound === "R" ? "érrê" : "élê"}`} 
            size="default"
          />
        </div>
      </div>
      
      {showCelebration && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-50">
          <div className="animate-bounce text-7xl">🎉</div>
          <div className="animate-bounce text-7xl delay-100">⭐</div>
          <div className="animate-bounce text-7xl delay-200">🎊</div>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {currentRound.map((word) => (
          <div key={word.id} className="flex flex-col items-center">
            <button
              onClick={() => gameActive && checkWord(word)}
              disabled={!gameActive}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow flex flex-col items-center w-full"
            >
              <span className="text-4xl mb-2">{word.image}</span>
              <span className="font-medium">{word.word}</span>
            </button>
            <div className="mt-1">
              <ReadAloudButton text={word.word} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="mb-4">
          Acertos: <span className="font-bold">{score}</span> de <span className="font-bold">{total}</span> 
          {total > 0 && <span className="ml-2">({accuracy}%)</span>}
        </p>
        
        {!gameActive && (
          <Button 
            onClick={startNewRound}
            className="btn-primary"
          >
            <span className="mr-2">Próxima Rodada</span>
            <Award className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CacaAoSom;
