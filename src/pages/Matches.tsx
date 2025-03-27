import React from 'react';
import { Basketball } from 'lucide-react';

const Matches = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Jogos</h1>
      
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Jogos Recentes</h2>
        </div>
        
        <div className="space-y-4">
          {/* Lista de jogos simulada */}
          {[1, 2, 3].map((game) => (
            <div key={game} className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Basketball className="h-5 w-5" />
                  <span className="font-medium">Time A</span>
                </div>
                <div className="text-center">
                  <span className="text-sm bg-muted px-2 py-1 rounded">86 - 82</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Time B</span>
                  <Basketball className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Data: 25/03/2025 • Encerrado
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Próximos Jogos</h2>
        </div>
        
        <div className="space-y-4">
          {/* Lista de próximos jogos simulada */}
          {[1, 2, 3].map((game) => (
            <div key={game} className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Basketball className="h-5 w-5" />
                  <span className="font-medium">Time C</span>
                </div>
                <div className="text-center">
                  <span className="text-sm bg-muted px-2 py-1 rounded">VS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Time D</span>
                  <Basketball className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Data: 30/03/2025 • 19:00
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches; 