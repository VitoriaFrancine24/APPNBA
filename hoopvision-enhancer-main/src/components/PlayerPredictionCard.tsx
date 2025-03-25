
import React from 'react';
import { TrendingUp, Calendar, AlertTriangle, BarChart3, History } from 'lucide-react';

interface PredictionCardProps {
  prediction: {
    jogador: string;
    proximo_jogo: string;
    historico_vs_adversario: {
      pts_media: number;
      reb_media: number;
      ast_media: number;
      ultimos_5_jogos: number[];
    };
    previsao: {
      pontos: string;
      rebotes: string;
      assistencias: string;
      risco: string;
      detalhes: string;
    };
  };
  upcomingGame: {
    homeTeam: { id: string; name: string; logo: string };
    awayTeam: { id: string; name: string; logo: string };
    date: string;
    time: string;
  };
  playerTeam: string;
}

const PlayerPredictionCard = ({ prediction, upcomingGame, playerTeam }: PredictionCardProps) => {
  const isHomeTeam = playerTeam === upcomingGame.homeTeam.name;
  const opponentTeam = isHomeTeam ? upcomingGame.awayTeam : upcomingGame.homeTeam;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'baixo':
        return 'text-green-500';
      case 'médio':
        return 'text-amber-500';
      case 'alto':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'baixo':
        return 'bg-green-500/10';
      case 'médio':
        return 'bg-amber-500/10';
      case 'alto':
        return 'bg-red-500/10';
      default:
        return 'bg-gray-500/10';
    }
  };
  
  const calculateAverage = (numbers: number[]) => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  };

  const avgLastGames = calculateAverage(prediction.historico_vs_adversario.ultimos_5_jogos);
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-basketball-dark to-basketball-accent p-4 text-white">
        <div className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          <h2 className="font-bold">Previsão para o Próximo Jogo</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm">{formatDate(upcomingGame.date)} • {upcomingGame.time}</span>
          </div>
          
          <div className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(prediction.previsao.risco)} ${getRiskBgColor(prediction.previsao.risco)}`}>
            Risco: <span className="font-medium capitalize">{prediction.previsao.risco}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-2">
              <img 
                src={isHomeTeam ? upcomingGame.homeTeam.logo : upcomingGame.awayTeam.logo} 
                alt={playerTeam} 
                className="h-full w-full object-contain" 
              />
            </div>
            <span className="font-medium">{playerTeam}</span>
          </div>
          
          <div className="text-sm px-2">vs</div>
          
          <div className="flex items-center">
            <span className="font-medium mr-2">{opponentTeam.name}</span>
            <div className="h-8 w-8">
              <img 
                src={opponentTeam.logo} 
                alt={opponentTeam.name} 
                className="h-full w-full object-contain" 
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Pontos</p>
            <p className="text-xl font-bold">{prediction.previsao.pontos}</p>
            <p className="text-xs text-gray-500">pts</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Rebotes</p>
            <p className="text-xl font-bold">{prediction.previsao.rebotes}</p>
            <p className="text-xs text-gray-500">reb</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Assistências</p>
            <p className="text-xl font-bold">{prediction.previsao.assistencias}</p>
            <p className="text-xs text-gray-500">ast</p>
          </div>
        </div>

        <div className="mb-5 border-t border-b py-3 border-gray-100">
          <div className="flex items-center mb-2">
            <History className="w-4 h-4 text-basketball-accent mr-2" />
            <h3 className="text-sm font-medium">Histórico contra {opponentTeam.name}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Pontos (média):</span>
              <span className="font-medium">{prediction.historico_vs_adversario.pts_media.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Rebotes (média):</span>
              <span className="font-medium">{prediction.historico_vs_adversario.reb_media.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Últimos 5 jogos (pts):</span>
              <span className="text-xs font-medium">{avgLastGames.toFixed(1)} pts/jogo</span>
            </div>
            <div className="flex space-x-1 mt-1">
              {prediction.historico_vs_adversario.ultimos_5_jogos.map((pts, idx) => (
                <div key={idx} className="flex-1">
                  <div 
                    className="bg-basketball-accent/20 rounded-sm" 
                    style={{ 
                      height: `${Math.min(100, (pts / 50) * 100)}px`, 
                      minHeight: '20px' 
                    }}
                  ></div>
                  <div className="text-xs text-center mt-1">{pts}</div>
                </div>
              ))}
              {prediction.historico_vs_adversario.ultimos_5_jogos.length === 0 && (
                <div className="w-full text-center text-xs text-gray-500 py-2">
                  Sem jogos anteriores contra este time
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <div className="flex items-start">
            <BarChart3 className="w-4 h-4 text-basketball-accent mr-2 mt-0.5 flex-shrink-0" />
            <p className="font-medium">Análise de Matchup:</p>
          </div>
          <div className="ml-6 mt-1">
            <p>{prediction.previsao.detalhes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPredictionCard;
