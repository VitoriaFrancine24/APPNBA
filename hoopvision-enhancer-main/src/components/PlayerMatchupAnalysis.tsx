
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, TrendingUp, Trophy } from 'lucide-react';

interface PlayerMatchupAnalysisProps {
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
  playerName: string;
}

const PlayerMatchupAnalysis = ({ prediction, upcomingGame, playerName }: PlayerMatchupAnalysisProps) => {
  const opponentName = upcomingGame.homeTeam.name === prediction.proximo_jogo.split(' vs ')[0]
    ? upcomingGame.awayTeam.name
    : upcomingGame.homeTeam.name;
  
  // Prepare data for chart
  const chartData = prediction.historico_vs_adversario.ultimos_5_jogos.map((pts, index) => ({
    game: `Jogo ${index + 1}`,
    pontos: pts,
  }));
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-basketball-orange/90 to-basketball-orange p-4 text-white">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          <h2 className="font-bold">Análise de Confronto</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">{playerName} vs {opponentName}</h3>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-500">Pts/Jogo</p>
              <p className="font-bold">{prediction.historico_vs_adversario.pts_media}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-500">Reb/Jogo</p>
              <p className="font-bold">{prediction.historico_vs_adversario.reb_media}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-500">Ast/Jogo</p>
              <p className="font-bold">{prediction.historico_vs_adversario.ast_media}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Últimos 5 jogos vs {opponentName}</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="game" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pontos"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 pt-3 border-t">
          <div className="flex items-start">
            <Info className="w-4 h-4 text-basketball-accent mr-2 mt-0.5 flex-shrink-0" />
            <p>Histórico favorável contra este time, com média de pontuação acima da média da temporada.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerMatchupAnalysis;
