
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, MoveVertical } from 'lucide-react';
import ReadAloudButton from './ReadAloudButton';

interface Step {
  id: number;
  text: string;
  imageSrc: string;
}

interface Recipe {
  id: number;
  name: string;
  steps: Step[];
}

interface RecipeStepsProps {
  recipe: Recipe;
  onFeedback: (correct: boolean, message: string) => void;
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ recipe, onFeedback }) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [correctOrder, setCorrectOrder] = useState<Step[]>([]);
  const [draggedStep, setDraggedStep] = useState<Step | null>(null);
  const [checking, setChecking] = useState(false);
  
  useEffect(() => {
    // Store the correct order
    setCorrectOrder([...recipe.steps]);
    
    // Shuffle steps for the game
    const shuffledSteps = [...recipe.steps].sort(() => Math.random() - 0.5);
    setSteps(shuffledSteps);
    setChecking(false);
  }, [recipe]);
  
  const handleDragStart = (step: Step) => {
    setDraggedStep(step);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedStep) {
      const dragIndex = steps.findIndex(step => step.id === draggedStep.id);
      const newSteps = [...steps];
      
      // Remove the dragged step
      newSteps.splice(dragIndex, 1);
      
      // Insert at new position
      newSteps.splice(dropIndex, 0, draggedStep);
      
      setSteps(newSteps);
      setDraggedStep(null);
    }
  };

  const checkOrder = () => {
    setChecking(true);
    const isCorrect = steps.every((step, index) => step.id === correctOrder[index].id);
    
    if (isCorrect) {
      onFeedback(true, "Muito bem! Você colocou os passos na ordem certa!");
    } else {
      onFeedback(false, "Hmm, a ordem não está certa. Tente novamente!");
    }
    
    // After a few seconds, reset checking state
    setTimeout(() => {
      setChecking(false);
    }, 3000);
  };

  const resetOrder = () => {
    const shuffledSteps = [...recipe.steps].sort(() => Math.random() - 0.5);
    setSteps(shuffledSteps);
    setChecking(false);
  };

  return (
    <div className="recipe-steps">
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Arraste os passos para a ordem correta:</h4>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              draggable
              onDragStart={() => handleDragStart(step)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center bg-white p-3 rounded-lg border-2 shadow-sm cursor-move transition duration-200
                ${checking 
                  ? correctOrder[index].id === step.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className="flex-shrink-0 mr-4 bg-gray-100 rounded-lg p-2 w-16 h-16 flex items-center justify-center text-4xl">
                {step.imageSrc}
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">{step.text}</p>
                <div className="mt-1">
                  <ReadAloudButton text={step.text} />
                </div>
              </div>
              {checking && (
                correctOrder[index].id === step.id 
                  ? <CheckCircle className="ml-3 text-green-500 flex-shrink-0" />
                  : <XCircle className="ml-3 text-red-500 flex-shrink-0" />
              )}
              {!checking && (
                <MoveVertical className="ml-3 text-gray-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={checkOrder}
          disabled={checking}
          variant="default"
        >
          Verificar ordem
        </Button>
        <Button 
          onClick={resetOrder}
          disabled={checking}
          variant="outline"
        >
          Embaralhar
        </Button>
      </div>
    </div>
  );
};

export default RecipeSteps;
