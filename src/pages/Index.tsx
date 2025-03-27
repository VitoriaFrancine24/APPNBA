import { Link } from 'react-router-dom';
import { Basketball } from 'lucide-react';

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold text-center">Bem-vindo ao HoopVision</h1>
        <p className="text-xl text-center text-muted-foreground">
          Análise e previsão de jogos de basquete com IA
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Card 1 */}
        <div className="border rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Basketball className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Jogos de Hoje</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Acompanhe os jogos em andamento e as previsões para hoje
          </p>
          <Link to="/matches" className="inline-block px-4 py-2 rounded bg-primary text-primary-foreground">
            Ver Jogos
          </Link>
        </div>
        
        {/* Card 2 */}
        <div className="border rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Basketball className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Estatísticas</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Análise detalhada de estatísticas e tendências
          </p>
          <Link to="/players" className="inline-block px-4 py-2 rounded bg-primary text-primary-foreground">
            Ver Estatísticas
          </Link>
        </div>
        
        {/* Card 3 */}
        <div className="border rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Basketball className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Previsões</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Previsões baseadas em IA para próximos jogos
          </p>
          <Link to="/matches" className="inline-block px-4 py-2 rounded bg-primary text-primary-foreground">
            Ver Previsões
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index; 