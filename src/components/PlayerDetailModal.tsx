import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { X, TrendingUp, History, Info, Award } from "lucide-react";

// Interface para as estatísticas do jogador
interface PlayerStats {
  ppg: number;
  rpg: number;
  apg: number;
  fgp?: string;
  tpp?: string;
}

// Interface para as propriedades do jogador
interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  teamLogo: string;
  playerImage: string;
  jerseyNumber: string;
  stats: PlayerStats;
}

interface PlayerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
}

const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  isOpen,
  onClose,
  player,
}) => {
  const [activeTab, setActiveTab] = useState("stats");
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  // Efeito para carregar previsões quando a aba de previsões é selecionada
  React.useEffect(() => {
    if (activeTab === "prediction" && player && !prediction) {
      setLoadingPrediction(true);
      // Simular busca de previsão (substituir por API real quando disponível)
      setTimeout(() => {
        setPrediction({
          nextGame: {
            opponent: "Boston Celtics",
            date: "15/12/2023",
            predictedStats: {
              points: { min: 22, max: 28, predicted: 25.4 },
              rebounds: { min: 5, max: 8, predicted: 6.8 },
              assists: { min: 4, max: 9, predicted: 7.2 },
              steals: { min: 0, max: 2, predicted: 1.1 },
              blocks: { min: 0, max: 1, predicted: 0.5 },
              threes: { min: 2, max: 5, predicted: 3.2 },
            },
            winProbability: 62,
          },
          season: {
            improvement: "+2.4 PPG comparado à temporada anterior",
            trend: "Em ascensão nas últimas 5 partidas",
            consistency: 85,
            keyMatchups: [
              { team: "Lakers", performance: "30.2 PPG em 3 jogos" },
              { team: "Bucks", performance: "28.5 PPG em 2 jogos" },
              { team: "Heat", performance: "26.8 PPG em 4 jogos" },
            ],
          },
          strengths: ["Arremessos de três pontos", "Passe", "Liderança"],
          weaknesses: ["Defesa no perímetro", "Faltas"],
          insights: [
            "Tem melhor desempenho em jogos em casa",
            "Média de pontos aumenta em 15% em jogos nacionalmente televisionados",
            "Tende a ter maior número de assistências no segundo tempo",
            "Desempenho superior contra times da Conferência Leste"
          ],
        });
        setLoadingPrediction(false);
      }, 1000);
    }
  }, [activeTab, player, prediction]);

  if (!isOpen || !player) return null;

  // Função para lidar com erros de imagem de jogador
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png";
  };

  // Renderizar o conteúdo da aba de estatísticas
  const renderStatsTab = () => (
    <div className="space-y-6">
      {/* Estatísticas básicas */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{player.stats.ppg.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Pontos por jogo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{player.stats.rpg.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Rebotes por jogo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{player.stats.apg.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Assistências por jogo</p>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas de eficiência */}
      {(player.stats.fgp || player.stats.tpp) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Eficiência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {player.stats.fgp && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">FG%</span>
                  <span className="text-sm font-medium">{player.stats.fgp}</span>
                </div>
                <Progress value={parseFloat(player.stats.fgp)} max={100} className="h-2" />
              </div>
            )}
            {player.stats.tpp && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">3P%</span>
                  <span className="text-sm font-medium">{player.stats.tpp}</span>
                </div>
                <Progress value={parseFloat(player.stats.tpp)} max={100} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Renderizar o conteúdo da aba de previsões
  const renderPredictionTab = () => {
    if (loadingPrediction) {
      return (
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }

    if (!prediction) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Não foi possível carregar previsões para este jogador.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Próximo jogo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Previsão para o próximo jogo
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              vs {prediction.nextGame.opponent} • {prediction.nextGame.date}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Pontos</div>
                <div className="text-2xl font-bold">{prediction.nextGame.predictedStats.points.predicted.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {prediction.nextGame.predictedStats.points.min}-{prediction.nextGame.predictedStats.points.max}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Rebotes</div>
                <div className="text-2xl font-bold">{prediction.nextGame.predictedStats.rebounds.predicted.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {prediction.nextGame.predictedStats.rebounds.min}-{prediction.nextGame.predictedStats.rebounds.max}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Assistências</div>
                <div className="text-2xl font-bold">{prediction.nextGame.predictedStats.assists.predicted.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {prediction.nextGame.predictedStats.assists.min}-{prediction.nextGame.predictedStats.assists.max}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Chance de vitória</span>
                <span className="text-sm font-medium">{prediction.nextGame.winProbability}%</span>
              </div>
              <Progress value={prediction.nextGame.winProbability} max={100} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Tendências da temporada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Tendências da temporada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm mb-1">{prediction.season.improvement}</div>
              <div className="text-sm mb-1">{prediction.season.trend}</div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Consistência</span>
                <span className="text-sm font-medium">{prediction.season.consistency}%</span>
              </div>
              <Progress value={prediction.season.consistency} max={100} className="h-2" />
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2">Desempenho contra adversários</div>
              {prediction.season.keyMatchups.map((matchup: any, index: number) => (
                <div key={index} className="flex justify-between text-sm py-1 border-b last:border-0">
                  <span>vs {matchup.team}</span>
                  <span className="font-medium">{matchup.performance}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Análises e Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="text-sm font-medium mb-1">Pontos fortes:</div>
              <div className="flex flex-wrap gap-2">
                {prediction.strengths.map((strength: string, index: number) => (
                  <Badge key={index} variant="secondary">{strength}</Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="text-sm font-medium mb-1">Pontos fracos:</div>
              <div className="flex flex-wrap gap-2">
                {prediction.weaknesses.map((weakness: string, index: number) => (
                  <Badge key={index} variant="outline">{weakness}</Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Insights:</div>
              <ul className="space-y-2">
                {prediction.insights.map((insight: string, index: number) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            {player.name}
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Coluna da esquerda: Info do jogador */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
              <img
                src={player.playerImage}
                alt={player.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            
            <h3 className="text-lg font-bold">{player.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{player.position}</Badge>
              {player.jerseyNumber && (
                <Badge variant="outline">#{player.jerseyNumber}</Badge>
              )}
            </div>
            
            <div className="flex items-center mt-1 mb-4">
              <img
                src={player.teamLogo}
                alt={player.team}
                className="w-6 h-6 mr-2"
              />
              <span className="text-sm">{player.team}</span>
            </div>
          </div>
          
          {/* Colunas da direita: Tabs com estatísticas e previsões */}
          <div className="md:col-span-2">
            <Tabs
              defaultValue="stats"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="stats">Estatísticas</TabsTrigger>
                <TabsTrigger value="prediction">Previsões</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats" className="space-y-4">
                {renderStatsTab()}
              </TabsContent>
              
              <TabsContent value="prediction" className="space-y-4">
                {renderPredictionTab()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDetailModal; 