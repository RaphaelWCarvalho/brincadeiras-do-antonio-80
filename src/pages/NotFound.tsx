
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md">
        <div className="text-6xl mb-6">🤔</div>
        <h1 className="text-4xl font-bold mb-4">Opa! Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          Não conseguimos encontrar a página que você estava procurando.
        </p>
        <Button asChild className="btn-primary">
          <a href="/">Voltar para a Página Inicial</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
