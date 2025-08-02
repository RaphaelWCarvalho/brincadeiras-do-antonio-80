
import React from 'react';
import Header from '../components/Header';
import GameContainer from '../components/GameContainer';
import CacaAoSom from '../components/CacaAoSom';
import ReadAloudButton from '../components/ReadAloudButton';

const Fonologia: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header title="Módulo de Fonologia" />
      
      <main className="container mx-auto px-4 py-8">
        <GameContainer title="Caça ao Som Web">
          <CacaAoSom />
        </GameContainer>
        
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-3">Dicas para os Responsáveis:</h3>
          <div className="mb-4">
            <ReadAloudButton 
              text="Dicas para os responsáveis. Incentive a criança a pronunciar as palavras em voz alta. Reforce o som alvo erre ou ele quando a criança acertar. Faça pausas se a criança demonstrar cansaço. Anote dificuldades específicas para informar ao fonoaudiólogo."
              size="default"
            />
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>Incentive a criança a pronunciar as palavras em voz alta.</li>
            <li>Reforce o som alvo (R ou L) quando a criança acertar.</li>
            <li>Faça pausas se a criança demonstrar cansaço.</li>
            <li>Anote dificuldades específicas para informar ao fonoaudiólogo.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Fonologia;
