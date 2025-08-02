
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import GameContainer from '../components/GameContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AudioFeedback from '../components/AudioFeedback';
import RecipeSteps from '../components/RecipeSteps';
import ReadAloudButton from '../components/ReadAloudButton';

const Morfossintaxe: React.FC = () => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleFeedback = (correct: boolean, message: string) => {
    setIsCorrect(correct);
    setFeedbackMessage(message);
    setShowFeedback(true);
    
    if (correct) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    }
    
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const handleNextRecipe = () => {
    if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1);
    }
  };

  const handlePreviousRecipe = () => {
    if (currentRecipeIndex > 0) {
      setCurrentRecipeIndex(currentRecipeIndex - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Sequência de Receitas" />
      
      <main className="container mx-auto px-4 py-8">
        <GameContainer title="Sequência de Receitas">
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
                <h3 className="text-xl font-bold mb-4 text-center">{recipes[currentRecipeIndex].name}</h3>
                <div className="mb-4 text-center">
                  <ReadAloudButton 
                    text={recipes[currentRecipeIndex].name}
                    size="default"
                  />
                </div>
                
                <RecipeSteps 
                  recipe={recipes[currentRecipeIndex]} 
                  onFeedback={handleFeedback}
                />
                
                <div className="flex justify-between mt-8">
                  <Button 
                    onClick={handlePreviousRecipe} 
                    disabled={currentRecipeIndex === 0}
                    variant="outline"
                  >
                    <ChevronLeft className="mr-2" />
                    Anterior
                  </Button>
                  <Button 
                    onClick={handleNextRecipe} 
                    disabled={currentRecipeIndex === recipes.length - 1}
                  >
                    Próxima
                    <ChevronRight className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Primeiro arraste os passos na ordem correta, depois clique em verificar!
              </p>
            </div>
          </div>
        </GameContainer>
        
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Dicas para os Responsáveis:</h3>
          <div className="mb-4">
            <ReadAloudButton 
              text="Dicas para os responsáveis. Incentive a criança a usar palavras como primeiro, depois, por último para descrever a sequência. Pergunte o porquê de cada passo vir antes ou depois de outro. Relacione a atividade com experiências reais de cozinha que a criança já teve."
              size="default"
            />
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>Incentive a criança a usar palavras como "primeiro", "depois", "por último" para descrever a sequência.</li>
            <li>Pergunte o porquê de cada passo vir antes ou depois de outro.</li>
            <li>Relacione a atividade com experiências reais de cozinha que a criança já teve.</li>
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

// Recipes data com emojis para representar imagens
const recipes = [
  {
    id: 1,
    name: "Sanduíche de Queijo",
    steps: [
      { id: 1, text: "Primeiro, pegue duas fatias de pão", imageSrc: "🍞" },
      { id: 2, text: "Depois, coloque uma fatia de queijo no meio", imageSrc: "🧀" },
      { id: 3, text: "Por último, feche o sanduíche com a outra fatia de pão", imageSrc: "🥪" }
    ]
  },
  {
    id: 2,
    name: "Vitamina de Banana",
    steps: [
      { id: 1, text: "Primeiro, descasque uma banana", imageSrc: "🍌" },
      { id: 2, text: "Depois, coloque a banana no liquidificador", imageSrc: "🍌➡️🔌" },
      { id: 3, text: "Então, adicione leite", imageSrc: "🥛" },
      { id: 4, text: "Por último, bata tudo", imageSrc: "🥤" }
    ]
  },
  {
    id: 3,
    name: "Biscoitos de Chocolate",
    steps: [
      { id: 1, text: "Primeiro, misture farinha e chocolate", imageSrc: "🌾🍫" },
      { id: 2, text: "Depois, faça bolinhas com a massa", imageSrc: "⚪⚪⚪" },
      { id: 3, text: "Então, coloque as bolinhas na forma", imageSrc: "🍪🍪🍪" },
      { id: 4, text: "Por último, asse no forno", imageSrc: "🔥" }
    ]
  },
  {
    id: 4,
    name: "Salada de Frutas",
    steps: [
      { id: 1, text: "Primeiro, lave as frutas", imageSrc: "🍎💦" },
      { id: 2, text: "Depois, corte as frutas em pedaços", imageSrc: "🔪🍎" },
      { id: 3, text: "Então, coloque as frutas em uma tigela", imageSrc: "🥣" },
      { id: 4, text: "Por último, misture tudo", imageSrc: "🥗" }
    ]
  },
  {
    id: 5,
    name: "Suco de Laranja",
    steps: [
      { id: 1, text: "Primeiro, corte as laranjas ao meio", imageSrc: "🍊✂️" },
      { id: 2, text: "Depois, esprema as laranjas", imageSrc: "🍊➡️💦" },
      { id: 3, text: "Por último, sirva o suco em um copo", imageSrc: "🧃" }
    ]
  }
];

export default Morfossintaxe;
