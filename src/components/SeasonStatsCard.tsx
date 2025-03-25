
import React from 'react';
import { Calendar, BarChart2, ArrowUp, ArrowDown, TrendingUp, Percent, Target } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SeasonStatsCardProps {
  playerName: string;
  seasonStats: {
    season: string;
    monthlyStats: {
      month: string;
      ppg: number;
      fg_pct: number;
      wins: number;
      games: number;
    }[];
    overallStats: {
      ppg: number;
      rpg: number;
      apg: number;
      games_played: number;
      minutes: number;
      plus_minus: number;
      fg_pct?: number;
      fg3_pct?: number;
      ft_pct?: number;
      ts_pct?: number;
      efg_pct?: number;
      steals?: number;
      blocks?: number;
      turnovers?: number;
      fouls?: number;
      offReb?: number;
      defReb?: number;
    };
    comparison: {
      stat: string;
      current: number;
      last: number;
      change: number;
    }[];
    advanced?: {
      per?: number;
      usg_pct?: number;
      ortg?: number;
      drtg?: number;
      ws?: number;
      bpm?: number;
      vorp?: number;
    };
  };
}

const SeasonStatsCard = ({ playerName, seasonStats }: SeasonStatsCardProps) => {
  // Função para formatar valores de porcentagem
  const formatPercent = (value: number | undefined) => {
    if (value === undefined) return "-";
    return (value * 100).toFixed(1) + "%";
  };

  // Função para formatar valores numéricos
  const formatStat = (value: number | undefined) => {
    if (value === undefined) return "-";
    return value.toFixed(1);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-basketball-dark to-basketball-accent p-4 text-white">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          <h2 className="font-bold">Estatísticas da Temporada {seasonStats.season}</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-5">
          <h3 className="text-sm font-medium mb-3">Visão Geral</h3>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">Jogos</p>
              <p className="font-bold">{seasonStats.overallStats.games_played}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">Minutos/J</p>
              <p className="font-bold">{seasonStats.overallStats.minutes.toFixed(1)}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">+/-</p>
              <p className={`font-bold ${seasonStats.overallStats.plus_minus >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {seasonStats.overallStats.plus_minus > 0 ? '+' : ''}{seasonStats.overallStats.plus_minus.toFixed(1)}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">PPG</p>
              <p className="font-bold">{seasonStats.overallStats.ppg.toFixed(1)}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">RPG</p>
              <p className="font-bold">{seasonStats.overallStats.rpg.toFixed(1)}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">APG</p>
              <p className="font-bold">{seasonStats.overallStats.apg.toFixed(1)}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">FG%</p>
              <p className="font-bold">{formatPercent(seasonStats.overallStats.fg_pct)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">3P%</p>
              <p className="font-bold">{formatPercent(seasonStats.overallStats.fg3_pct)}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">FT%</p>
              <p className="font-bold">{formatPercent(seasonStats.overallStats.ft_pct)}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">STL</p>
              <p className="font-bold">{formatStat(seasonStats.overallStats.steals)}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">BLK</p>
              <p className="font-bold">{formatStat(seasonStats.overallStats.blocks)}</p>
            </div>
          </div>
        </div>
        
        {seasonStats.advanced && (
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-3">Estatísticas Avançadas</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2 bg-gray-50 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">PER</p>
                <p className="font-bold">{formatStat(seasonStats.advanced.per)}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">USG%</p>
                <p className="font-bold">{formatPercent(seasonStats.advanced.usg_pct)}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">TS%</p>
                <p className="font-bold">{formatPercent(seasonStats.overallStats.ts_pct)}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 bg-gray-50 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">ORTG</p>
                <p className="font-bold">{formatStat(seasonStats.advanced.ortg)}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">DRTG</p>
                <p className="font-bold">{formatStat(seasonStats.advanced.drtg)}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">WS</p>
                <p className="font-bold">{formatStat(seasonStats.advanced.ws)}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">BPM</p>
                <p className="font-bold">{formatStat(seasonStats.advanced.bpm)}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-5">
          <h3 className="text-sm font-medium mb-3">Comparação com temporada anterior</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Estatística</TableHead>
                <TableHead>2023-24</TableHead>
                <TableHead>2022-23</TableHead>
                <TableHead className="text-right">Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seasonStats.comparison.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.stat}</TableCell>
                  <TableCell>
                    {typeof item.current === 'number' && item.current < 1 && item.stat.includes('%') 
                      ? (item.current * 100).toFixed(1) + '%' 
                      : item.current.toFixed(1)}
                  </TableCell>
                  <TableCell>
                    {typeof item.last === 'number' && item.last < 1 && item.stat.includes('%') 
                      ? (item.last * 100).toFixed(1) + '%' 
                      : item.last.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`inline-flex items-center ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change >= 0 
                        ? <ArrowUp className="w-3 h-3 mr-1" /> 
                        : <ArrowDown className="w-3 h-3 mr-1" />}
                      <span>
                        {item.stat.includes('%') 
                          ? (Math.abs(item.change) * 100).toFixed(1) + '%' 
                          : Math.abs(item.change).toFixed(1)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Estatísticas mensais</h3>
          <div className="space-y-4">
            {seasonStats.monthlyStats.map((monthStat, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{monthStat.month}</span>
                  <span className="text-xs text-gray-500">{monthStat.wins}-{monthStat.games - monthStat.wins} ({Math.round(monthStat.wins / monthStat.games * 100)}%)</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-xs mr-2 w-10">PPG:</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-basketball-accent h-full rounded-full" 
                      style={{ width: `${(monthStat.ppg / 35) * 100}%` }} 
                    />
                  </div>
                  <span className="text-xs ml-2 font-medium">{monthStat.ppg.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs mr-2 w-10">FG%:</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-basketball-orange h-full rounded-full" 
                      style={{ width: `${monthStat.fg_pct * 100}%` }} 
                    />
                  </div>
                  <span className="text-xs ml-2 font-medium">{(monthStat.fg_pct * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonStatsCard;
