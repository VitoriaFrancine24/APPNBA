
import React from 'react';
import { Dumbbell, Scale, Sword, Shield, TrendingUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { 
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

interface PlayerComparisonCardProps {
  player1: {
    id: number;
    name: string;
    teamName: string;
    teamLogo: string;
    playerImage: string;
    position: string;
    stats: {
      ppg: number;
      rpg: number;
      apg: number;
      spg: number;
      bpg: number;
      fg_pct: number;
      fg3_pct: number;
      ft_pct: number;
    };
  };
  player2: {
    id: number;
    name: string;
    teamName: string;
    teamLogo: string;
    playerImage: string;
    position: string;
    stats: {
      ppg: number;
      rpg: number;
      apg: number;
      spg: number;
      bpg: number;
      fg_pct: number;
      fg3_pct: number;
      ft_pct: number;
    };
  };
}

const PlayerComparisonCard = ({ player1, player2 }: PlayerComparisonCardProps) => {
  // Preparando dados para o gráfico de radar
  const chartData = [
    {
      category: 'Pontos',
      player1: player1.stats.ppg / 35 * 100,
      player2: player2.stats.ppg / 35 * 100,
      fullMark: 100,
    },
    {
      category: 'Rebotes',
      player1: player1.stats.rpg / 15 * 100,
      player2: player2.stats.rpg / 15 * 100,
      fullMark: 100,
    },
    {
      category: 'Assistências',
      player1: player1.stats.apg / 12 * 100,
      player2: player2.stats.apg / 12 * 100,
      fullMark: 100,
    },
    {
      category: 'Roubos',
      player1: player1.stats.spg / 3 * 100,
      player2: player2.stats.spg / 3 * 100,
      fullMark: 100,
    },
    {
      category: 'Bloqueios',
      player1: player1.stats.bpg / 3 * 100,
      player2: player2.stats.bpg / 3 * 100,
      fullMark: 100,
    },
    {
      category: 'EFG%',
      player1: player1.stats.fg_pct * 100 + (player1.stats.fg3_pct * 50),
      player2: player2.stats.fg_pct * 100 + (player2.stats.fg3_pct * 50),
      fullMark: 100,
    },
  ];

  const getStatBarWidth = (val1: number, val2: number) => {
    const total = val1 + val2;
    if (total === 0) return 50;
    return (val1 / total) * 100;
  };

  const renderStatComparison = (label: string, val1: number, val2: number, colorClass: string) => {
    const player1Width = getStatBarWidth(val1, val2);
    const player2Width = 100 - player1Width;
    
    return (
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium">{val1}</span>
          <span className="text-gray-600">{label}</span>
          <span className="font-medium">{val2}</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden">
          <div 
            className={`${colorClass}`} 
            style={{ width: `${player1Width}%` }}
          ></div>
          <div 
            className="bg-gray-300" 
            style={{ width: `${player2Width}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-basketball-dark/90 to-basketball-dark p-4 text-white">
        <div className="flex items-center">
          <Dumbbell className="w-5 h-5 mr-2" />
          <h2 className="font-bold">Comparação de Jogadores</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden mr-3 border-2 border-basketball-accent">
              <img src={player1.playerImage} alt={player1.name} className="h-full w-full object-cover object-top" />
            </div>
            <div>
              <p className="font-bold">{player1.name}</p>
              <div className="flex items-center text-xs text-gray-500">
                <div className="h-4 w-4 mr-1">
                  <img src={player1.teamLogo} alt={player1.teamName} className="h-full w-full object-contain" />
                </div>
                {player1.teamName} • {player1.position}
              </div>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">vs</div>
          
          <div className="flex items-center">
            <div>
              <p className="font-bold text-right">{player2.name}</p>
              <div className="flex items-center text-xs text-gray-500 justify-end">
                {player2.teamName} • {player2.position}
                <div className="h-4 w-4 ml-1">
                  <img src={player2.teamLogo} alt={player2.teamName} className="h-full w-full object-contain" />
                </div>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full overflow-hidden ml-3 border-2 border-gray-400">
              <img src={player2.playerImage} alt={player2.name} className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-3">Estatísticas Ofensivas</h3>
              {renderStatComparison('PPG', player1.stats.ppg, player2.stats.ppg, 'bg-basketball-accent')}
              {renderStatComparison('FG%', Math.round(player1.stats.fg_pct * 1000) / 10, Math.round(player2.stats.fg_pct * 1000) / 10, 'bg-basketball-accent')}
              {renderStatComparison('3P%', Math.round(player1.stats.fg3_pct * 1000) / 10, Math.round(player2.stats.fg3_pct * 1000) / 10, 'bg-basketball-accent')}
              {renderStatComparison('FT%', Math.round(player1.stats.ft_pct * 1000) / 10, Math.round(player2.stats.ft_pct * 1000) / 10, 'bg-basketball-accent')}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Estatísticas Defensivas</h3>
              {renderStatComparison('RPG', player1.stats.rpg, player2.stats.rpg, 'bg-basketball-orange')}
              {renderStatComparison('BPG', player1.stats.bpg, player2.stats.bpg, 'bg-basketball-orange')}
              {renderStatComparison('SPG', player1.stats.spg, player2.stats.spg, 'bg-basketball-orange')}
              {renderStatComparison('APG', player1.stats.apg, player2.stats.apg, 'bg-basketball-orange')}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="70%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#444', fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#666', fontSize: 10 }} />
                  <Radar
                    name={player1.name}
                    dataKey="player1"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name={player2.name}
                    dataKey="player2"
                    stroke="#9ca3af"
                    fill="#9ca3af"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-center text-gray-500 mt-4">
          Estatísticas baseadas nos dados da temporada atual.
        </div>
      </div>
    </div>
  );
};

export default PlayerComparisonCard;
