
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  iconBg: string;
  path: string;
}

interface ModuleCardProps {
  module: ModuleInfo;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="module-card"
      onClick={() => navigate(module.path)}
    >
      <div className={`module-icon ${module.iconBg}`}>
        {module.icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{module.name}</h3>
      <p className="text-sm text-gray-600 text-center">{module.description}</p>
    </div>
  );
};

export default ModuleCard;
