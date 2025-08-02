import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Volume2 } from 'lucide-react';
import Header from '../components/Header';
import GameContainer from '../components/GameContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AudioFeedback from '../components/AudioFeedback';

interface StoryOption {
  id: number;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

interface StoryPart {
  id: number;
  text: string;
  image?: string;
  options: StoryOption[];
}

interface Story {
  id: number;
  title: string;
  parts: StoryPart[];
}

const stories: Story[] = [
  {
    id: 1,
    title: "Tom Explorador e a Aventura na Floresta",
    parts: [
      {
        id: 1,
        text: "Tom Explorador estava caminhando pela floresta quando viu um coelho branco muito apressado. O coelho olhou para Tom e pediu ajuda para encontrar algo que havia perdido.",
        image: "🌳🧒🐇",
        options: [
          { 
            id: 1, 
            text: "Tom decidiu ajudar o coelho a procurar o que ele tinha perdido.", 
            isCorrect: true,
            feedback: "Muito bem! Tom é um explorador gentil que gosta de ajudar os animais."
          },
          { 
            id: 2, 
            text: "Tom ignorou o coelho e continuou seu caminho pela floresta.", 
            isCorrect: false,
            feedback: "Hmmm... Tom é um explorador gentil que sempre ajuda quem precisa."
          },
          { 
            id: 3, 
            text: "Tom pegou o coelho para levar para casa como animal de estimação.", 
            isCorrect: false,
            feedback: "Não! Tom respeita os animais da floresta e sabe que eles devem viver livres."
          }
        ]
      },
      {
        id: 2,
        text: "Tom e o coelho procuraram por toda parte. Finalmente, encontraram uma pequena chave dourada brilhando perto de um riacho. O coelho ficou muito feliz!",
        image: "🔑🌊🐇😄",
        options: [
          { 
            id: 1, 
            text: "Tom pegou a chave para sua coleção e foi embora.", 
            isCorrect: false,
            feedback: "Não, essa não é uma atitude legal. A chave pertence ao coelho."
          },
          { 
            id: 2, 
            text: "Tom deu a chave para o coelho e perguntou para que ela servia.", 
            isCorrect: true,
            feedback: "Isso mesmo! Tom é curioso e educado."
          },
          { 
            id: 3, 
            text: "Tom jogou a chave no riacho para ver se ela afundava.", 
            isCorrect: false,
            feedback: "Não! Isso seria maldoso com o coelho que precisava da chave."
          }
        ]
      },
      {
        id: 3,
        text: "O coelho explicou que a chave dourada abria uma porta secreta onde guardava suas cenouras mágicas. Como agradecimento, ele convidou Tom para conhecer seu lar secreto.",
        image: "🐇🔑🚪🥕✨",
        options: [
          { 
            id: 1, 
            text: "Tom recusou o convite e foi para casa descansar.", 
            isCorrect: false,
            feedback: "Tom é um explorador aventureiro, ele não perderia uma chance de conhecer um lugar secreto!"
          },
          { 
            id: 2, 
            text: "Tom aceitou o convite feliz por conhecer um lugar mágico.", 
            isCorrect: true,
            feedback: "Exatamente! Tom adora novas aventuras e descobrir lugares especiais."
          },
          { 
            id: 3, 
            text: "Tom roubou a chave de volta e correu para longe.", 
            isCorrect: false,
            feedback: "Tom nunca faria isso! Ele é honesto e respeita seus amigos."
          }
        ]
      },
      {
        id: 4,
        text: "O coelho abriu uma porta escondida em uma árvore antiga. Dentro havia um mundo colorido com cenouras brilhantes crescendo por todo lado. Era incrível!",
        image: "🌳🚪🌈🥕✨",
        options: [
          { 
            id: 1, 
            text: "Tom pegou todas as cenouras mágicas que conseguiu carregar.", 
            isCorrect: false,
            feedback: "Tom não é ganancioso e sabe respeitar as coisas que pertencem aos outros."
          },
          { 
            id: 2, 
            text: "Tom ficou com medo e saiu correndo do lugar mágico.", 
            isCorrect: false,
            feedback: "Tom é corajoso e curioso, ele não fugiria de uma descoberta tão incrível!"
          },
          { 
            id: 3, 
            text: "Tom agradeceu ao coelho pela visita e perguntou se poderia voltar um dia.", 
            isCorrect: true,
            feedback: "Isso mesmo! Tom é educado e gosta de fazer amizades em suas aventuras."
          }
        ]
      },
      {
        id: 5,
        text: "O coelho deu a Tom uma pequena cenoura mágica de presente, que brilhava como uma estrela. Ele disse que a cenoura ajudaria Tom a encontrar o caminho em suas próximas aventuras.",
        image: "🐇🎁🥕✨🧒",
        options: [
          { 
            id: 1, 
            text: "Tom agradeceu pelo presente especial e prometeu cuidar bem dele.", 
            isCorrect: true,
            feedback: "Perfeito! Tom valoriza os presentes especiais dos seus amigos."
          },
          { 
            id: 2, 
            text: "Tom jogou a cenoura fora porque não gostava de cenouras.", 
            isCorrect: false,
            feedback: "Tom nunca seria mal educado assim com um presente tão especial!"
          },
          { 
            id: 3, 
            text: "Tom comeu a cenoura mágica imediatamente.", 
            isCorrect: false,
            feedback: "Essa cenoura é mágica e especial, não é para comer!"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Tom Explorador e o Mistério do Mar",
    parts: [
      {
        id: 1,
        text: "Tom Explorador estava na praia coletando conchas quando viu uma garrafa brilhante na areia. Dentro da garrafa havia um mapa enrolado.",
        image: "🏖️🧒🐚🍶📜",
        options: [
          { 
            id: 1, 
            text: "Tom jogou a garrafa de volta no mar sem olhar o mapa.", 
            isCorrect: false,
            feedback: "Tom é curioso e nunca perderia a chance de descobrir o que está em um mapa misterioso!"
          },
          { 
            id: 2, 
            text: "Tom abriu a garrafa e examinou o mapa com entusiasmo.", 
            isCorrect: true,
            feedback: "Isso mesmo! Tom adora mistérios e aventuras."
          },
          { 
            id: 3, 
            text: "Tom quebrou a garrafa e rasgou o mapa.", 
            isCorrect: false,
            feedback: "Tom é cuidadoso com objetos que encontra e nunca destruiria algo sem motivo."
          }
        ]
      },
      {
        id: 2,
        text: "O mapa mostrava o caminho para uma ilha não muito longe da praia. Tom viu um pequeno barco próximo e pensou em como chegar à ilha misteriosa.",
        image: "🗺️🏝️🚣‍♂️🧒",
        options: [
          { 
            id: 1, 
            text: "Tom decidiu nadar até a ilha sozinho sem contar para ninguém.", 
            isCorrect: false,
            feedback: "Não é seguro nadar para uma ilha sem avisar alguém!"
          },
          { 
            id: 2, 
            text: "Tom rasgou o mapa e desistiu da aventura.", 
            isCorrect: false,
            feedback: "Tom nunca desistiria de uma aventura tão empolgante!"
          },
          { 
            id: 3, 
            text: "Tom pediu ajuda a um pescador para ir até a ilha com segurança.", 
            isCorrect: true,
            feedback: "Muito bem! Tom é inteligente e sabe quando precisa de ajuda."
          }
        ]
      },
      {
        id: 3,
        text: "Quando chegaram à ilha, Tom viu pegadas na areia. As pegadas levaram até uma caverna escura na encosta de uma pequena montanha.",
        image: "🏝️👣🕳️⛰️",
        options: [
          { 
            id: 1, 
            text: "Tom ficou com medo e voltou correndo para o barco.", 
            isCorrect: false,
            feedback: "Tom é corajoso! Ele não fugiria de um mistério."
          },
          { 
            id: 2, 
            text: "Tom acendeu sua lanterna e entrou na caverna com cuidado para explorar.", 
            isCorrect: true,
            feedback: "Exatamente! Tom é aventureiro mas também é cuidadoso."
          },
          { 
            id: 3, 
            text: "Tom gritou alto na entrada da caverna para ver se alguém respondia.", 
            isCorrect: false,
            feedback: "Não é prudente fazer barulho em um lugar desconhecido, poderia haver perigos."
          }
        ]
      },
      {
        id: 4,
        text: "Dentro da caverna, Tom encontrou um baú antigo. O baú não estava trancado. Tom hesitou por um momento, pensando se deveria abri-lo.",
        image: "🕳️🧒📦🔓",
        options: [
          { 
            id: 1, 
            text: "Tom abriu o baú cuidadosamente para ver o que havia dentro.", 
            isCorrect: true,
            feedback: "Isso mesmo! Tom é curioso mas sempre age com cuidado."
          },
          { 
            id: 2, 
            text: "Tom chutou o baú com força para quebrá-lo.", 
            isCorrect: false,
            feedback: "Tom respeita os objetos que encontra e nunca os destruiria assim."
          },
          { 
            id: 3, 
            text: "Tom ignorou o baú e foi embora da caverna.", 
            isCorrect: false,
            feedback: "Tom nunca deixaria de investigar uma descoberta tão interessante!"
          }
        ]
      },
      {
        id: 5,
        text: "Dentro do baú havia um lindo colar de conchas coloridas e um diário antigo. O diário contava a história de um explorador que viveu na ilha há muito tempo. Tom precisava decidir o que fazer com essas descobertas.",
        image: "📦📿🐚📔🧒",
        options: [
          { 
            id: 1, 
            text: "Tom pegou tudo para si e escondeu o baú vazio.", 
            isCorrect: false,
            feedback: "Tom respeita a história e os tesouros que encontra, ele não os roubaria assim."
          },
          { 
            id: 2, 
            text: "Tom levou as descobertas para o museu local para que todos pudessem aprender sobre o explorador.", 
            isCorrect: true,
            feedback: "Perfeito! Tom sabe que histórias importantes devem ser compartilhadas para que todos possam aprender."
          },
          { 
            id: 3, 
            text: "Tom jogou o diário no mar porque não sabia ler muito bem.", 
            isCorrect: false,
            feedback: "Mesmo se tivesse dificuldade para ler, Tom nunca destruiria algo tão valioso."
          }
        ]
      }
    ]
  }
];

const Compreensao: React.FC = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const currentStory = stories[currentStoryIndex];
  const currentPart = currentStory.parts[currentPartIndex];
  
  // Initialize with welcome audio
  useEffect(() => {
    setTimeout(() => {
      setFeedbackMessage(`Bem-vindo à história ${currentStory.title}! Escute atentamente e escolha o que acontece depois.`);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 4000);
    }, 500);
  }, []);
  
  useEffect(() => {
    setSelectedOption(null);
  }, [currentPartIndex, currentStoryIndex]);

  const handleOptionSelect = (optionId: number) => {
    const option = currentPart.options.find(opt => opt.id === optionId);
    if (option) {
      setSelectedOption(optionId);
      setTotalAnswered(prev => prev + 1);
      
      if (option.isCorrect) {
        setScore(prev => prev + 1);
        setFeedbackMessage(option.feedback);
      } else {
        setFeedbackMessage(option.feedback);
      }
      
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }
  };

  const handleNextPart = () => {
    if (currentPartIndex < currentStory.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
      
      // Read new part text
      setTimeout(() => {
        setFeedbackMessage(currentStory.parts[currentPartIndex + 1].text);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 5000);
      }, 500);
    } else {
      // End of story, show completion message
      setFeedbackMessage(`Parabéns! Você completou a história "${currentStory.title}". Acertou ${score} de ${totalAnswered} perguntas.`);
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        // If there are more stories, go to the next one
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(currentStoryIndex + 1);
          setCurrentPartIndex(0);
          setScore(0);
          setTotalAnswered(0);
          
          // Introduce new story
          setTimeout(() => {
            setFeedbackMessage(`Agora vamos para a história ${stories[currentStoryIndex + 1].title}!`);
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 3000);
          }, 500);
        }
      }, 5000);
    }
  };

  const getProgressPercentage = () => {
    return ((currentPartIndex + 1) / currentStory.parts.length) * 100;
  };

  const getButtonClass = (optionId: number) => {
    if (selectedOption === null) return '';
    
    const option = currentPart.options.find(opt => opt.id === optionId);
    if (!option) return '';
    
    if (option.isCorrect) {
      return 'bg-green-500 hover:bg-green-600 text-white';
    } else if (selectedOption === optionId) {
      return 'bg-red-500 hover:bg-red-600 text-white';
    }
    
    return 'opacity-50';
  };

  return (
    <div className="min-h-screen">
      <Header title="História Interrompida" />
      
      <main className="container mx-auto px-4 py-8">
        <GameContainer title="História Interrompida">
          <div className="flex flex-col items-center py-8">
            <Card className="w-full max-w-3xl mb-8">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{currentStory.title}</h3>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-right mt-1 text-gray-500">
                    Parte {currentPartIndex + 1} de {currentStory.parts.length}
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2">
                    {currentPart.image && (
                      <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 mb-4 flex items-center justify-center">
                        <span className="text-6xl">{currentPart.image}</span>
                      </div>
                    )}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-800 leading-relaxed">{currentPart.text}</p>
                    </div>
                    
                    {/* Button to read the text aloud */}
                    <div className="mt-3 flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFeedbackMessage(currentPart.text);
                          setShowFeedback(true);
                          setTimeout(() => setShowFeedback(false), 5000);
                        }}
                      >
                        <Volume2 className="mr-2 h-4 w-4" />
                        Ouvir texto
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <h4 className="text-lg font-medium mb-4">O que acontece depois?</h4>
                    
                    <div className="space-y-3">
                      {currentPart.options.map((option) => (
                        <Button
                          key={option.id}
                          className={`w-full justify-start text-left h-auto py-3 ${getButtonClass(option.id)}`}
                          onClick={() => handleOptionSelect(option.id)}
                          disabled={selectedOption !== null}
                          variant="outline"
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                    
                    {selectedOption !== null && (
                      <div className="mt-6 flex justify-center">
                        <Button onClick={handleNextPart}>
                          Continuar
                          <ChevronRight className="ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full max-w-3xl"
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  {isOpen ? "Esconder dicas" : "Mostrar dicas para leitura"}
                  <ChevronRight className={`ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-white p-4 rounded-lg mt-2 border border-gray-200 shadow-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Dicas para ajudar na compreensão:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Leia o texto em voz alta para a criança.</li>
                    <li>Pergunte se ela entendeu todas as palavras.</li>
                    <li>Converse sobre por que certas opções fazem mais sentido que outras.</li>
                    <li>Relacione a história com experiências que a criança já viveu.</li>
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </GameContainer>
        
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Dicas para os Responsáveis:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Peça para a criança explicar o porquê de suas escolhas.</li>
            <li>Explore as emoções dos personagens durante a história.</li>
            <li>Incentive a criança a criar seus próprios finais alternativos.</li>
            <li>Discuta as consequências das diferentes escolhas na história.</li>
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

export default Compreensao;
