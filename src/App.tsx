
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Fonologia from "./pages/Fonologia";
import Morfossintaxe from "./pages/Morfossintaxe";
import Vocabulario from "./pages/Vocabulario";
import Compreensao from "./pages/Compreensao";
import IntegracaoSensorial from "./pages/IntegracaoSensorial";
import Matematica from "./pages/Matematica";
import Logica from "./pages/Logica";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fonologia" element={<Fonologia />} />
          <Route path="/morfossintaxe" element={<Morfossintaxe />} />
          <Route path="/vocabulario" element={<Vocabulario />} />
          <Route path="/compreensao" element={<Compreensao />} />
          <Route path="/integracao" element={<IntegracaoSensorial />} />
          <Route path="/matematica" element={<Matematica />} />
          <Route path="/logica" element={<Logica />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
