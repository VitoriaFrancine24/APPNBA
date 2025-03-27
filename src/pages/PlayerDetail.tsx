import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Basketball } from 'lucide-react';

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link to="/players" className="text-primary hover:underline">
          ← Voltar para Jogadores
        </Link>
      </div>
      
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <Basketball className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Jogador {id}</h1>
            <p className="text-muted-foreground">Ala-Armador | Time Lakers</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Estatísticas da Temporada</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Pontos por jogo</span>
                <span className="font-medium">25.4</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rebotes por jogo</span>
                <span className="font-medium">6.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Assistências por jogo</span>
                <span className="font-medium">7.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Aproveitamento de arremessos</span>
                <span className="font-medium">48.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Aproveitamento de 3 pontos</span>
                <span className="font-medium">38.7%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Informações Pessoais</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Altura</span>
                <span className="font-medium">2.03m</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Peso</span>
                <span className="font-medium">98kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Idade</span>
                <span className="font-medium">29 anos</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Número</span>
                <span className="font-medium">#23</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Experiência</span>
                <span className="font-medium">8 anos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Desempenho Recente</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((game) => (
            <div key={game} className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Lakers vs Warriors</div>
                  <div className="text-sm text-muted-foreground">25/03/2025</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">28 pts, 7 reb, 9 ast</div>
                  <div className="text-sm text-muted-foreground">35 minutos</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail; 