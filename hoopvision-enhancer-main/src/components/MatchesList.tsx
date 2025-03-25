"use client";

import React, { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import MatchPredictionModal from "./MatchPredictionModal";
import { toast } from "./ui/use-toast";
import { 
  getTodayGames, 
  getWeekGames, 
  adaptGameToMatchFormat,
  Game
} from "@/lib/api";

// Tipo para status das partidas
type MatchStatus = "upcoming" | "live" | "finished";

// Interface para informações do time
interface TeamInfo {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

// Interface para partida
interface Match {
  id: string;
  date: string;
  time: string;
  status: MatchStatus;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
}

// Interface para previsão de partida
interface MatchPrediction {
  matchId: string;
  homeTeam: {
    name: string;
    predictedScore: number;
    winProbability: number;
    keyPlayers: Array<{ name: string; prediction: string }>;
  };
  awayTeam: {
    name: string;
    predictedScore: number;
    winProbability: number;
    keyPlayers: Array<{ name: string; prediction: string }>;
  };
  insights: string[];
}

interface MatchesListProps {
  status: MatchStatus;
}

const MatchesList: React.FC<MatchesListProps> = ({ status }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  // Função para buscar partidas
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        let gamesData: Game[] = [];
        
        // Buscar jogos baseado no status selecionado
        if (status === "upcoming") {
          gamesData = await getWeekGames();
        } else {
          // Para status "finished" ou "live", usamos os jogos de hoje
          gamesData = await getTodayGames();
        }
        
        // Converter os dados da API para nosso formato e filtrar pelo status
        const adaptedMatches = gamesData
          .map(adaptGameToMatchFormat)
          .filter(match => match.status === status);
          
        setMatches(adaptedMatches);
      } catch (error) {
        console.error("Erro ao buscar partidas:", error);
        toast({
          title: "Erro ao carregar partidas",
          description: "Não foi possível carregar as partidas. Tente novamente mais tarde.",
          variant: "destructive",
        });
        
        // Fallback para dados mockados em caso de erro na API
        setMatches(getMockMatches(status));
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [status]);

  // Função para lidar com clique em uma partida
  const handleMatchClick = async (matchId: string) => {
    setSelectedMatch(matchId);
    setLoadingPrediction(true);

    try {
      // Simula busca de previsão (substituir por API real quando disponível)
      setTimeout(() => {
        const mockPrediction: MatchPrediction = {
          matchId,
          homeTeam: {
            name: matches.find((m) => m.id === matchId)?.homeTeam.name || "",
            predictedScore: 108,
            winProbability: 65,
            keyPlayers: [
              {
                name: "LeBron James",
                prediction: "27 pts, 8 reb, 9 ast",
              },
              {
                name: "Anthony Davis",
                prediction: "22 pts, 12 reb, 3 blk",
              },
            ],
          },
          awayTeam: {
            name: matches.find((m) => m.id === matchId)?.awayTeam.name || "",
            predictedScore: 102,
            winProbability: 35,
            keyPlayers: [
              {
                name: "Stephen Curry",
                prediction: "30 pts, 4 reb, 6 ast, 5 3PM",
              },
              {
                name: "Draymond Green",
                prediction: "8 pts, 9 reb, 7 ast, 2 stl",
              },
            ],
          },
          insights: [
            "Os Lakers têm vantagem no confronto direto recente, vencendo 3 dos últimos 4 jogos",
            "O ataque dos Warriors tem sido mais eficiente, mas a defesa dos Lakers pode ser o diferencial",
            "O fator casa favorece os Lakers, que têm 75% de aproveitamento em casa nesta temporada",
            "Stephen Curry está em grande fase, com média de 32 pontos nos últimos 5 jogos"
          ],
        };

        setPrediction(mockPrediction);
        setLoadingPrediction(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao buscar previsão:", error);
      toast({
        title: "Erro ao carregar previsão",
        description: "Não foi possível carregar a previsão para este jogo. Tente novamente mais tarde.",
        variant: "destructive",
      });
      setLoadingPrediction(false);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedMatch(null);
    setPrediction(null);
  };

  // Função para obter dados mockados em caso de falha na API
  const getMockMatches = (status: MatchStatus): Match[] => {
    return [
      {
        id: "1",
        date: new Date().toISOString(),
        time: "20:00",
        status: status,
        homeTeam: {
          id: "lakers",
          name: "Los Angeles Lakers",
          logo: "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg",
          score: status !== "upcoming" ? 105 : undefined,
        },
        awayTeam: {
          id: "warriors",
          name: "Golden State Warriors",
          logo: "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg",
          score: status !== "upcoming" ? 98 : undefined,
        },
      },
      {
        id: "2",
        date: new Date(Date.now() + 86400000).toISOString(),
        time: "19:30",
        status: status,
        homeTeam: {
          id: "celtics",
          name: "Boston Celtics",
          logo: "https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg",
          score: status !== "upcoming" ? 112 : undefined,
        },
        awayTeam: {
          id: "heat",
          name: "Miami Heat",
          logo: "https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg",
          score: status !== "upcoming" ? 110 : undefined,
        },
      }
    ];
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <p>Carregando partidas...</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {status === "upcoming" 
            ? "Nenhuma partida agendada no momento." 
            : status === "live" 
              ? "Nenhuma partida acontecendo no momento." 
              : "Nenhuma partida finalizada encontrada."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            date={match.date}
            time={match.time}
            status={match.status}
            onClick={() => handleMatchClick(match.id)}
          />
        ))}
      </div>

      <MatchPredictionModal
        isOpen={!!selectedMatch}
        isLoading={loadingPrediction}
        prediction={prediction}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default MatchesList; 