import React, { useState, useEffect } from 'react';
import { Volume2, Play, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import GameContainer from '../components/GameContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AudioFeedback from '../components/AudioFeedback';

interface Command {
  text: string;
  complexity: number;
  emoji: string; // Adicionando emoji para representação visual
}

const commands: Command[] = [
  { text: "Pule uma vez", complexity: 1, emoji: "🦘" },
  { text: "Bata palmas duas vezes", complexity: 1, emoji: "👏" },
  { text: "Toque na sua cabeça", complexity: 1, emoji: "🧠" },
  { text: "Levante os braços", complexity: 1, emoji: "🙌" },
  { text: "Gire uma vez", complexity: 1, emoji: "🔄" },
  { text: "Pule duas vezes", complexity: 2, emoji: "🦘🦘" },
  { text: "Toque no seu nariz e depois bata palmas", complexity: 2, emoji: "👃👏" },
  { text: "Levante uma perna e conte até três", complexity: 2, emoji: "🦵1️⃣2️⃣3️⃣" },
  { text: "Bata palmas e depois toque seus ombros", complexity: 2, emoji: "👏👐" },
  { text: "Gire e depois sente no chão", complexity: 2, emoji: "🔄🪑" },
  { text: "Pule três vezes e depois toque seu nariz", complexity: 3, emoji: "🦘🦘🦘👃" },
  { text: "Bata palmas, toque na cabeça e depois nos joelhos", complexity: 3, emoji: "👏🧠🦵" },
  { text: "Gire, bata palmas e depois pule uma vez", complexity: 3, emoji: "🔄👏🦘" },
  { text: "Levante os braços, toque no nariz e depois bata palmas duas vezes", complexity: 3, emoji: "🙌👃👏👏" },
  { text: "Pegue um brinquedo azul e coloque na sua cabeça", complexity: 3, emoji: "🧸🔵🧠" }
];

const IntegracaoSensorial: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentCommand, setCurrentCommand] = useState<Command | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [commandsCompleted, setCommandsCompleted] = useState(0);

  const filteredCommands = commands.filter(cmd => cmd.complexity === currentLevel);

  const startGame = () => {
    setGameStarted(true);
    getNextCommand();
    
    // Initial audio feedback
    setFeedbackMessage("Vamos brincar de Comandos Malucos! Ouça com atenção e faça o que eu pedir!");
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const getNextCommand = () => {
    const levelCommands = commands.filter(cmd => cmd.complexity === currentLevel);
    const randomIndex = Math.floor(Math.random() * levelCommands.length);
    setCurrentCommand(levelCommands[randomIndex]);
    setCompleted(false);
  };

  const handleCommandComplete = () => {
    setCompleted(true);
    setCommandsCompleted(prev => prev + 1);
    setFeedbackMessage("Muito bem! Você completou o comando!");
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      
      // Check if we should increase the level
      if (commandsCompleted + 1 >= 3 && currentLevel < 3) {
        setCurrentLevel(prev => prev + 1);
        setFeedbackMessage(`Parabéns! Você avançou para o nível ${currentLevel + 1}!`);
        setShowFeedback(true);
        setCommandsCompleted(0);
        
        setTimeout(() => {
          setShowFeedback(false);
          getNextCommand();
        }, 3000);
      } else {
        getNextCommand();
      }
    }, 2000);
  };

  const playCommand = () => {
    if (currentCommand) {
      setFeedbackMessage(currentCommand.text);
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Comandos Malucos Online" />
      
      <main className="container mx-auto px-4 py-8">
        <GameContainer title="Comandos Malucos Online">
          {!gameStarted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤸‍♂️</div>
              <h3 className="text-2xl font-bold mb-4">Siga os Comandos Malucos!</h3>
              <p className="text-gray-600 mb-8">
                Ouça com atenção e faça o que os comandos pedem. 
                Os comandos ficarão mais difíceis conforme você avança!
              </p>
              <Button 
                onClick={startGame} 
                size="lg" 
                className="animate-pulse"
              >
                <Play className="mr-2" />
                Começar a Brincar
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8">
              <Card className="w-full max-w-md mb-8">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Nível {currentLevel}</h3>
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {commandsCompleted}/3 concluídos
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 my-4"></div>
                  
                  <div className="text-center py-4">
                    {currentCommand && (
                      <div className="flex flex-col items-center">
                        {/* Adicionando o emoji do comando atual */}
                        <div className="text-5xl mb-4">{currentCommand.emoji}</div>
                        
                        <Button 
                          onClick={playCommand}
                          variant="outline" 
                          size="lg"
                          className="mb-6 hover:bg-primary/10"
                        >
                          <Volume2 className="mr-2 h-6 w-6" />
                          Ouvir o Comando
                        </Button>
                        
                        {completed ? (
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="mr-2" />
                            Comando concluído!
                          </div>
                        ) : (
                          <Button 
                            onClick={handleCommandComplete}
                            variant="default"
                          >
                            Concluí o comando!
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Peça ajuda a um adulto se precisar!
                </p>
              </div>
            </div>
          )}
        </GameContainer>
      </main>
      
      <AudioFeedback 
        play={showFeedback} 
        message={feedbackMessage}
        onComplete={() => {}}
      />
    </div>
  );
};

export default IntegracaoSensorial;
