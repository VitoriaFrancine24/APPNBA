
import React from 'react';
import { TrendingUp, TrendingDown, Percent, Target, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TeamTrendsCardProps {
  teamData: {
    id: string;
    name: string;
    logo: string;
    trends: {
      lastTenGames: { result: 'W' | 'L', points: number }[];
      streakType: 'W' | 'L';
      streakCount: number;
      homeRecord: string;
      awayRecord: string;
      standingPosition: number;
      ppg: number;
      oppg: number;
    };
  };
}

const TeamTrendsCard = ({ teamData }: TeamTrendsCardProps) => {
  // Preparando dados para o gráfico de tendências
  const chartData = teamData.trends.lastTenGames.map((game, index) => ({
    game: `Jogo ${index + 1}`,
    points: game.points,
    result: game.result
  }));
  
  const getStreakColor = (type: 'W' | 'L') => {
    return type === 'W' ? 'text-green-500' : 'text-red-500';
  };
  
  const getStreakIcon = (type: 'W' | 'L') => {
    return type === 'W' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };
  
  const getCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const game = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-xs">
          <p>{label}</p>
          <p className="font-medium">{game.points} pts</p>
          <p className={game.result === 'W' ? 'text-green-500' : 'text-red-500'}>
            {game.result === 'W' ? 'Vitória' : 'Derrota'}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-basketball-dark/90 to-basketball-dark p-4 text-white">
        <div className="flex items-center">
          <Target className="w-5 h-5 mr-2" />
          <h2 className="font-bold">Tendências de {teamData.name}</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 mr-3">
            <img src={teamData.logo} alt={teamData.name} className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-bold text-lg">{teamData.name}</p>
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Sequência:</span>
              <span className={`flex items-center font-medium ${getStreakColor(teamData.trends.streakType)}`}>
                {getStreakIcon(teamData.trends.streakType)}
                <span className="ml-1">{teamData.trends.streakCount} {teamData.trends.streakType}</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Posição</p>
            <p className="font-bold">{teamData.trends.standingPosition}º</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Casa</p>
            <p className="font-bold">{teamData.trends.homeRecord}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Fora</p>
            <p className="font-bold">{teamData.trends.awayRecord}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-2 h-8 bg-basketball-accent rounded-sm mr-2"></div>
            <div>
              <p className="text-xs text-gray-500">Pts/Jogo</p>
              <p className="font-bold">{teamData.trends.ppg.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-8 bg-gray-400 rounded-sm mr-2"></div>
            <div>
              <p className="text-xs text-gray-500">Pts Adv/Jogo</p>
              <p className="font-bold">{teamData.trends.oppg.toFixed(1)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-3">Pontuação - Últimos 10 jogos</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="game" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip content={getCustomTooltip} />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={(props) => {
                    const result = props.payload.result;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        fill={result === 'W' ? '#22c55e' : '#ef4444'}
                        stroke="none"
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTrendsCard;
