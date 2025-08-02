import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Search, Award } from 'lucide-react';
import Header from '../components/Header';
import GameContainer from '../components/GameContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AudioFeedback from '../components/AudioFeedback';
import ReadAloudButton from '../components/ReadAloudButton';

interface Adjective {
  id: number;
  text: string;
  correct: boolean;
}

interface Object {
  id: number;
  name: string;
  image: string;
  correctAdjectives: number[];
  adjectives: Adjective[];
  description: string;
}

const objects: Object[] = [
  {
    id: 1,
    name: "Bola",
    image: "⚽",
    correctAdjectives: [1, 3],
    adjectives: [
      { id: 1, text: "Redonda", correct: true },
      { id: 2, text: "Quadrada", correct: false },
      { id: 3, text: "Colorida", correct: true },
      { id: 4, text: "Pequena", correct: false }
    ],
    description: "Uma bola colorida e redonda para jogar"
  },
  {
    id: 2,
    name: "Mochila",
    image: "🎒",
    correctAdjectives: [2, 3],
    adjectives: [
      { id: 1, text: "Transparente", correct: false },
      { id: 2, text: "Grande", correct: true },
      { id: 3, text: "Pesada", correct: true },
      { id: 4, text: "Molhada", correct: false }
    ],
    description: "Uma mochila grande e pesada para a escola"
  },
  {
    id: 3,
    name: "Maçã",
    image: "🍎",
    correctAdjectives: [1, 2],
    adjectives: [
      { id: 1, text: "Vermelha", correct: true },
      { id: 2, text: "Redonda", correct: true },
      { id: 3, text: "Quente", correct: false },
      { id: 4, text: "Dura", correct: false }
    ],
    description: "Uma maçã vermelha e redonda para comer"
  },
  {
    id: 4,
    name: "Brinquedo",
    image: "🧸",
    correctAdjectives: [3, 4],
    adjectives: [
      { id: 1, text: "Azedo", correct: false },
      { id: 2, text: "Molhado", correct: false },
      { id: 3, text: "Pequeno", correct: true },
      { id: 4, text: "Divertido", correct: true }
    ],
    description: "Um brinquedo pequeno e divertido para brincar"
  },
  {
    id: 5,
    name: "Travesseiro",
    image: "🛏️",
    correctAdjectives: [1, 2],
    adjectives: [
      { id: 1, text: "Macio", correct: true },
      { id: 2, text: "Confortável", correct: true },
      { id: 3, text: "Duro", correct: false },
      { id: 4, text: "Gelado", correct: false }
    ],
    description: "Um travesseiro macio e confortável para dormir"
  },
  {
    id: 6,
    name: "Casaco",
    image: "🧥",
    correctAdjectives: [2, 4],
    adjectives: [
      { id: 1, text: "Frio", correct: false },
      { id: 2, text: "Quente", correct: true },
      { id: 3, text: "Molhado", correct: false },
      { id: 4, text: "Grosso", correct: true }
    ],
    description: "Um casaco quente e grosso para o inverno"
  },
  {
    id: 7,
    name: "Livro",
    image: "📚",
    correctAdjectives: [1, 3],
    adjectives: [
      { id: 1, text: "Colorido", correct: true },
      { id: 2, text: "Redondo", correct: false },
      { id: 3, text: "Interessante", correct: true },
      { id: 4, text: "Barulhento", correct: false }
    ],
    description: "Um livro colorido e interessante para ler"
  },
  {
    id: 8,
    name: "Sorvete",
    image: "🍦",
    correctAdjectives: [1, 4],
    adjectives: [
      { id: 1, text: "Gelado", correct: true },
      { id: 2, text: "Seco", correct: false },
      { id: 3, text: "Áspero", correct: false },
      { id: 4, text: "Doce", correct: true }
    ],
    description: "Um sorvete gelado e doce para comer"
  },
  {
    id: 9,
    name: "Urso de Pelúcia",
    image: "🧸",
    correctAdjectives: [2, 3],
    adjectives: [
      { id: 1, text: "Duro", correct: false },
      { id: 2, text: "Fofo", correct: true },
      { id: 3, text: "Macio", correct: true },
      { id: 4, text: "Frio", correct: false }
    ],
    description: "Um urso de pelúcia fofo e macio para abraçar"
  },
  {
    id: 10,
    name: "Sapato",
    image: "👞",
    correctAdjectives: [2, 4],
    adjectives: [
      { id: 1, text: "Molhado", correct: false },
      { id: 2, text: "Confortável", correct: true },
      { id: 3, text: "Quadrado", correct: false },
      { id: 4, text: "Resistente", correct: true }
    ],
    description: "Um sapato confortável e resistente para caminhar"
  }
];

const Vocabulario: React.FC = () => {
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
  const [selectedAdjectives, setSelectedAdjectives] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    setSelectedAdjectives([]);
    setShowResult(false);
  }, [currentObjectIndex]);

  const currentObject = objects[currentObjectIndex];

  const handleCheckAdjective = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedAdjectives([...selectedAdjectives, id]);
    } else {
      setSelectedAdjectives(selectedAdjectives.filter(adjId => adjId !== id));
    }
  };

  const handleCheck = () => {
    const correctAdjectives = currentObject.correctAdjectives;
    const isCorrect = selectedAdjectives.length === correctAdjectives.length && 
                       selectedAdjectives.every(id => correctAdjectives.includes(id));
    
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      setFeedbackMessage("Muito bem! Você encontrou os adjetivos corretos!");
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      setFeedbackMessage("Hmm, não está certo. Tente observar melhor o objeto!");
    }
    
    setShowResult(true);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const handleNextObject = () => {
    if (currentObjectIndex < objects.length - 1) {
      setCurrentObjectIndex(currentObjectIndex + 1);
    }
  };

  const handlePreviousObject = () => {
    if (currentObjectIndex > 0) {
      setCurrentObjectIndex(currentObjectIndex - 1);
    }
  };

  const getAdjColor = (adjective: Adjective) => {
    if (!showResult) return '';
    
    const isSelected = selectedAdjectives.includes(adjective.id);
    
    if (adjective.correct && isSelected) {
      return 'text-green-600 font-bold'; // Correct and selected
    } else if (!adjective.correct && isSelected) {
      return 'text-red-600 font-bold'; // Incorrect but selected
    } else if (adjective.correct && !isSelected) {
      return 'text-green-600 opacity-70'; // Correct but not selected
    }
    
    return ''; // Incorrect and not selected
  };

  return (
    <div className="min-h-screen">
      <Header title="Detetive dos Objetos" />
      
      <main className="container mx-auto px-4 py-8">
        <GameContainer title="Detetive dos Objetos">
          {showCelebration && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-50">
              <div className="animate-bounce text-7xl">🎉</div>
              <div className="animate-bounce text-7xl delay-100">⭐</div>
              <div className="animate-bounce text-7xl delay-200">🎊</div>
            </div>
          )}
          
          <div className="flex flex-col items-center py-8">
            <Card className="w-full max-w-2xl mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <span className="text-8xl">{currentObject.image}</span>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold mb-2">{currentObject.name}</h3>
                    <div className="mb-2">
                      <ReadAloudButton text={currentObject.name} />
                    </div>
                    <p className="mb-4 text-gray-600">
                      Encontre os adjetivos corretos para descrever este objeto:
                    </p>
                    
                    <div className="space-y-3">
                      {currentObject.adjectives.map((adjective) => (
                        <div key={adjective.id} className="flex items-center">
                          <Checkbox 
                            id={`adjective-${adjective.id}`} 
                            checked={selectedAdjectives.includes(adjective.id)}
                            onCheckedChange={(checked) => handleCheckAdjective(adjective.id, checked === true)}
                            disabled={showResult}
                            className="mr-2"
                          />
                          <label 
                            htmlFor={`adjective-${adjective.id}`}
                            className={`${getAdjColor(adjective)} cursor-pointer flex-grow`}
                          >
                            {adjective.text}
                          </label>
                          <ReadAloudButton text={adjective.text} className="ml-2" />
                        </div>
                      ))}
                    </div>
                    
                    {showResult && (
                      <div className={`mt-4 p-3 rounded-md ${correctCount > currentObjectIndex ? 'bg-green-100' : 'bg-red-100'}`}>
                        <p>{currentObject.description}</p>
                        <div className="mt-2">
                          <ReadAloudButton text={currentObject.description} />
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-center">
                      {!showResult ? (
                        <Button onClick={handleCheck} variant="default">
                          <Search className="mr-2" />
                          Verificar
                        </Button>
                      ) : (
                        <div className="text-center">
                          <p className="mb-2 font-medium">
                            Objetos corretos: {correctCount} de {currentObjectIndex + 1}
                          </p>
                          <Button onClick={handleNextObject} disabled={currentObjectIndex >= objects.length - 1}>
                            Próximo objeto
                            <ChevronRight className="ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    onClick={handlePreviousObject} 
                    disabled={currentObjectIndex === 0 || showResult}
                    variant="outline"
                  >
                    <ChevronLeft className="mr-2" />
                    Anterior
                  </Button>
                  <Button 
                    onClick={handleNextObject} 
                    disabled={currentObjectIndex === objects.length - 1 || !showResult}
                    variant="outline"
                  >
                    Próximo
                    <ChevronRight className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Observe bem a imagem e escolha os adjetivos corretos!
              </p>
            </div>
          </div>
        </GameContainer>
        
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Dicas para os Responsáveis:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Estimule a criança a descrever o objeto em voz alta.</li>
            <li>Pergunte por que ela acha que determinado adjetivo é adequado ao objeto.</li>
            <li>Incentive o uso de adjetivos no dia a dia, descrevendo objetos do ambiente.</li>
          </ul>
        </div>
      </main>
      
      <AudioFeedback 
        play={showFeedback} 
        message={feedbackMessage}
        onComplete={() => {}}
      />
    </div>
  );
};

export default Vocabulario;
