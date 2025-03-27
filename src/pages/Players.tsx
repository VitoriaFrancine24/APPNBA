import React from 'react';
import { Link } from 'react-router-dom';
import { Basketball } from 'lucide-react';

const Players = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Jogadores</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lista de jogadores simulada */}
        {[1, 2, 3, 4, 5, 6].map((player) => (
          <div key={player} className="border rounded-lg p-6 hover:bg-accent transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Basketball className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Jogador {player}</h3>
                <p className="text-sm text-muted-foreground">Posição: Ala-Armador</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Pontos por jogo</span>
                <span className="font-medium">22.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rebotes por jogo</span>
                <span className="font-medium">6.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Assistências por jogo</span>
                <span className="font-medium">5.8</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Link to={`/players/${player}`} className="text-primary hover:underline">
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players; 