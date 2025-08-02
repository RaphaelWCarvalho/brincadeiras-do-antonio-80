
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

interface HeaderProps {
  title: string;
  showHomeButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showHomeButton = true }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-white py-4 px-6 rounded-b-2xl shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {showHomeButton && (
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/30 hover:bg-white/40 transition-colors"
            aria-label="Voltar para a página inicial"
          >
            <Home className="h-6 w-6" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
