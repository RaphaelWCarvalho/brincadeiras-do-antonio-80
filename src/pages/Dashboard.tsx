import React, { useState } from 'react';
import Header from '../components/Header';
import ProgressChart from '../components/ProgressChart';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Award, Star, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import AudioFeedback from '../components/AudioFeedback';

const initialProgressData = [
  { moduleName: 'Comandos Malucos', percentage: 10, color: 'bg-purple-500' },
  { moduleName: 'Lógica para Crianças', percentage: 15, color: 'bg-indigo-500' },
  { moduleName: 'Detetive dos Objetos', percentage: 45, color: 'bg-green-500' },
  { moduleName: 'História Interrompida', percentage: 20, color: 'bg-yellow-500' },
  { moduleName: 'Caça ao Som', percentage: 65, color: 'bg-red-500' },
  { moduleName: 'Matemática para Crianças', percentage: 50, color: 'bg-orange-500' },
  { moduleName: 'Sequência de Receitas', percentage: 30, color: 'bg-blue-500' }
];

const achievements = [
  { id: 1, title: 'Explorador Curioso', description: 'Completou pelo menos uma atividade em cada módulo', unlocked: true, icon: <Star className="h-8 w-8 text-yellow-500" /> },
  { id: 2, title: 'Mestre da Fala', description: 'Alcançou 80% de progresso em Caça ao Som', unlocked: false, icon: <Trophy className="h-8 w-8 text-blue-500" /> },
  { id: 3, title: 'Chef Júnior', description: 'Ordenou todas as receitas corretamente', unlocked: false, icon: <Award className="h-8 w-8 text-green-500" /> },
  { id: 4, title: 'Matemático Iniciante', description: 'Resolveu 10 desafios de matemática', unlocked: true, icon: <Star className="h-8 w-8 text-purple-500" /> },
];

const Dashboard: React.FC = () => {
  const [progressData, setProgressData] = useState(initialProgressData);
  const [showAchievement, setShowAchievement] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");
  
  const handleResetProgress = () => {
    // Reset all percentages to zero
    const resetData = progressData.map(item => ({ ...item, percentage: 0 }));
    setProgressData(resetData);
    
    // Show toast and play audio
    toast.success("Progresso reiniciado com sucesso!");
    setAudioMessage("Seu progresso foi reiniciado! Vamos começar tudo de novo!");
    setPlayAudio(true);
  };
  
  const handleUnlockAchievement = (id: number) => {
    // This is just a demo function to simulate unlocking an achievement
    setShowAchievement(true);
    setAudioMessage(`Parabéns! Você desbloqueou a conquista ${achievements.find(a => a.id === id)?.title}!`);
    setPlayAudio(true);
    
    setTimeout(() => {
      setShowAchievement(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Header title="Dashboard de Progresso" />
      
      <AudioFeedback 
        play={playAudio} 
        message={audioMessage} 
        onComplete={() => setPlayAudio(false)} 
      />
      
      {showAchievement && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md animate-bounce">
            <div className="text-center">
              <div className="text-7xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2">Nova Conquista!</h3>
              <p className="text-lg text-gray-700">Você desbloqueou uma conquista!</p>
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Progresso nos Módulos</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressChart data={progressData} />
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="destructive" 
                  onClick={handleResetProgress}
                >
                  Zerar Progresso
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle>Conquistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${achievement.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                      onClick={() => achievement.unlocked ? null : handleUnlockAchievement(achievement.id)}
                    >
                      <div className="flex items-center mb-2">
                        {achievement.icon}
                        <h4 className="text-lg font-bold ml-2">{achievement.title}</h4>
                      </div>
                      <p className="text-sm">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <Button variant="ghost" size="sm" className="mt-2 w-full">
                          Bloqueado
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Próximos Objetivos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-3">
                  <li>80% de acertos em Caça ao Som</li>
                  <li>Completar 5 receitas em sequência</li>
                  <li>Descrever 10 objetos com adjetivos</li>
                  <li>Alcançar 70% de coerência em histórias</li>
                  <li>Seguir 3 comandos em sequência</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle>Últimas Sessões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="font-medium">Caça ao Som Web</p>
                    <p className="text-sm text-gray-500">13 acertos em 15 tentativas</p>
                    <p className="text-xs text-gray-400">05/09/2025</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="font-medium">Detetive dos Objetos</p>
                    <p className="text-sm text-gray-500">7 adjetivos corretos</p>
                    <p className="text-xs text-gray-400">04/09/2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
