
import React from 'react';
import GameContainer from '../components/GameContainer';
import LogicChallenge from '../components/LogicChallenge';

const Logica: React.FC = () => {
  return (
    <GameContainer title="Lógica para Crianças">
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          Complete os padrões e sequências!
        </p>
      </div>
      <LogicChallenge />
    </GameContainer>
  );
};

export default Logica;
