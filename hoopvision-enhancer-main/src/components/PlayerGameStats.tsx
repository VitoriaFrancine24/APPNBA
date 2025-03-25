
import React, { useState, useEffect } from 'react';
import { fetchPlayerGameStats } from '../utils/nbaApiService';
import type { PlayerGameStats as PlayerGameStatsType } from '../utils/nbaApiService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlayerGameStatsProps {
  gameId: number;
  onClose: () => void;
}

const PlayerGameStats = ({ gameId, onClose }: PlayerGameStatsProps) => {
  const [stats, setStats] = useState<PlayerGameStatsType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const data = await fetchPlayerGameStats(gameId);
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
        toast({
          title: 'Error',
          description: 'Could not load player statistics',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [gameId, toast]);

  // Group players by team
  const teamGroups = stats.reduce((groups, player) => {
    const teamId = player.team.id;
    if (!groups[teamId]) {
      groups[teamId] = {
        team: player.team,
        players: []
      };
    }
    groups[teamId].players.push(player);
    return groups;
  }, {} as Record<number, { team: PlayerGameStatsType['team'], players: PlayerGameStatsType[] }>);

  const teams = Object.values(teamGroups);

  // Sort players by points (highest first)
  teams.forEach(team => {
    team.players.sort((a, b) => b.points - a.points);
  });

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex justify-between items-center bg-gradient-to-r from-basketball-dark to-basketball-accent p-4 text-white">
        <h2 className="font-bold">Game Player Statistics</h2>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-basketball-accent" />
          <span className="ml-2 text-gray-500">Loading statistics...</span>
        </div>
      ) : teams.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No statistics available for this game.
        </div>
      ) : (
        <Tabs defaultValue={teams[0]?.team.id.toString()} className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="w-full">
              {teams.map(team => (
                <TabsTrigger 
                  key={team.team.id} 
                  value={team.team.id.toString()}
                  className="flex items-center"
                >
                  <img 
                    src={team.team.logo} 
                    alt={team.team.name} 
                    className="h-5 w-5 mr-2" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://cdn.nba.com/logos/nba/fallback/global/L/logo.svg';
                    }}
                  />
                  {team.team.nickname || team.team.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {teams.map(team => (
            <TabsContent key={team.team.id} value={team.team.id.toString()} className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead className="text-center">PTS</TableHead>
                      <TableHead className="text-center">REB</TableHead>
                      <TableHead className="text-center">AST</TableHead>
                      <TableHead className="text-center">MIN</TableHead>
                      <TableHead className="text-center">FG</TableHead>
                      <TableHead className="text-center">3PT</TableHead>
                      <TableHead className="text-center">FT</TableHead>
                      <TableHead className="text-center">STL</TableHead>
                      <TableHead className="text-center">BLK</TableHead>
                      <TableHead className="text-center">TO</TableHead>
                      <TableHead className="text-center">+/-</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {team.players.map((player) => (
                      <TableRow key={`${player.player.id}-${team.team.id}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.player.id}.png`} />
                              <AvatarFallback>{player.player.firstname[0]}{player.player.lastname[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{player.player.firstname} {player.player.lastname}</p>
                              <p className="text-xs text-gray-500">{player.pos || "N/A"}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-semibold">{player.points}</TableCell>
                        <TableCell className="text-center">{player.totReb}</TableCell>
                        <TableCell className="text-center">{player.assists}</TableCell>
                        <TableCell className="text-center">{player.min || "0"}</TableCell>
                        <TableCell className="text-center text-xs">{player.fgm}/{player.fga}</TableCell>
                        <TableCell className="text-center text-xs">{player.tpm}/{player.tpa}</TableCell>
                        <TableCell className="text-center text-xs">{player.ftm}/{player.fta}</TableCell>
                        <TableCell className="text-center">{player.steals}</TableCell>
                        <TableCell className="text-center">{player.blocks}</TableCell>
                        <TableCell className="text-center">{player.turnovers}</TableCell>
                        <TableCell className="text-center">
                          {player.plusMinus && (
                            <Badge variant={Number(player.plusMinus) >= 0 ? "outline" : "destructive"} className="text-xs">
                              {player.plusMinus}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default PlayerGameStats;
