
import React from 'react';
import { Mic, AlignJustify, BookOpen, MessageCircle, Activity, Plus, Brain } from 'lucide-react';
import ModuleCard, { ModuleInfo } from '../components/ModuleCard';
import Header from '../components/Header';

const modules: ModuleInfo[] = [
  {
    id: 'integracao',
    name: 'Comandos Malucos',
    description: 'Siga instruções visuais e sonoras',
    icon: <Activity className="h-10 w-10 text-white" />,
    iconBg: 'bg-purple-500',
    path: '/integracao'
  },
  {
    id: 'logica',
    name: 'Lógica para Crianças',
    description: 'Complete padrões e sequências divertidas',
    icon: <Brain className="h-10 w-10 text-white" />,
    iconBg: 'bg-indigo-500',
    path: '/logica'
  },
  {
    id: 'vocabulario',
    name: 'Detetive dos Objetos',
    description: 'Descreva objetos usando adjetivos corretos',
    icon: <BookOpen className="h-10 w-10 text-white" />,
    iconBg: 'bg-green-500',
    path: '/vocabulario'
  },
  {
    id: 'compreensao',
    name: 'História Interrompida',
    description: 'Continue a história de forma coerente',
    icon: <MessageCircle className="h-10 w-10 text-white" />,
    iconBg: 'bg-yellow-500',
    path: '/compreensao'
  },
  {
    id: 'fonologia',
    name: 'Caça ao Som',
    description: 'Localize e pronuncie palavras com os sons /R/ e /L/',
    icon: <Mic className="h-10 w-10 text-white" />,
    iconBg: 'bg-red-500',
    path: '/fonologia'
  },
  {
    id: 'matematica',
    name: 'Matemática para Crianças',
    description: 'Resolva desafios de soma com números de 1 a 10',
    icon: <Plus className="h-10 w-10 text-white" />,
    iconBg: 'bg-orange-500',
    path: '/matematica'
  },
  {
    id: 'morfossintaxe',
    name: 'Sequência de Receitas',
    description: 'Arranje e ordene cartões de etapas de receitas',
    icon: <AlignJustify className="h-10 w-10 text-white" />,
    iconBg: 'bg-blue-500',
    path: '/morfossintaxe'
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header title="BRINCADEIRAS DO ANTONIO" showHomeButton={false} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo às Brincadeiras do Antonio</h1>
          <p className="text-xl text-gray-600">
            Escolha um módulo para começar sua atividade
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <a 
            href="/dashboard" 
            className="btn-secondary"
          >
            Ver meu progresso
          </a>
        </div>
      </main>
    </div>
  );
};

export default Index;
