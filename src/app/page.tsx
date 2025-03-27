"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Basketball2 } from "lucide-react";

const HomePage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao HoopVision</h1>
        <p className="text-xl text-muted-foreground">
          Sua plataforma para análise de jogos, estatísticas e previsões de basquete
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border rounded-lg p-6 hover:bg-accent transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Basketball2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Jogos de Hoje</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Acompanhe os jogos do dia, resultados e estatísticas em tempo real.
          </p>
          <Link 
            to="/matches" 
            className="inline-flex items-center justify-center px-4 py-2 border rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Ver Jogos
          </Link>
        </div>
        
        <div className="border rounded-lg p-6 hover:bg-accent transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Basketball2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Estatísticas</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Explore estatísticas detalhadas de jogadores e times durante a temporada.
          </p>
          <Link 
            to="/players" 
            className="inline-flex items-center justify-center px-4 py-2 border rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Ver Estatísticas
          </Link>
        </div>
        
        <div className="border rounded-lg p-6 hover:bg-accent transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Basketball2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Previsões</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Descubra previsões inteligentes baseadas em dados para os próximos jogos.
          </p>
          <Link 
            to="/teams" 
            className="inline-flex items-center justify-center px-4 py-2 border rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Ver Times
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 