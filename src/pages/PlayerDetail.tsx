import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, TrendingUp, BarChart2, User, Users, ArrowLeft, Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import PlayerPredictionCard from '@/components/PlayerPredictionCard';
import PlayerMatchupAnalysis from '@/components/PlayerMatchupAnalysis';
import { mockPlayers } from '@/utils/mockData';

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const fetchPlayerData = async () => {
        try {
          setLoading(true);
          const playerData = mockPlayers.find(p => p.id === parseInt(id));
          setPlayer(playerData);
        } catch (error) {
          console.error('Erro ao carregar dados do jogador:', error);
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar os dados do jogador',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchPlayerData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-basketball-gray/30 to-white">
        <Header />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-basketball-gray/30 to-white">
        <Header />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Jogador não encontrado</h2>
            <Link to="/players" className="text-basketball-accent hover:text-basketball-orange">
              Voltar para lista de jogadores
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-basketball-gray/30 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/players">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Detalhes do Jogador</h1>
          <p className="text-xl text-muted-foreground">
            Informações detalhadas e estatísticas do jogador
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estatísticas Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Estatísticas Gerais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pontos por jogo:</span>
                  <span className="font-bold">{player.stats.points}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rebotes por jogo:</span>
                  <span className="font-bold">{player.stats.rebounds}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assistências por jogo:</span>
                  <span className="font-bold">{player.stats.assists}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eficiência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Eficiência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>FG%:</span>
                  <span className="font-bold">{(player.stats.fg_pct * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>3P%:</span>
                  <span className="font-bold">{(player.stats.three_pct * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>FT%:</span>
                  <span className="font-bold">{(player.stats.ft_pct * 100).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Defesa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Defesa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Roubos por jogo:</span>
                  <span className="font-bold">{player.stats.steals}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bloqueios por jogo:</span>
                  <span className="font-bold">{player.stats.blocks}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações do Jogador */}
        <div className="mt-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {player.position}
            </span>
            <span className="text-muted-foreground">{player.team}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayerDetail; 