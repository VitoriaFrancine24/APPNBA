"use client";

import React, { useEffect, useState } from "react";
import { 
  getPlayers, 
  getPlayerSeasonStats, 
  adaptPlayerFormat, 
  Player as PlayerType,
  Stats
} from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import PlayerCard from "@/components/PlayerCard";
import PlayerDetailModal from "@/components/PlayerDetailModal";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

// Tipo adaptado para informações de jogadores
interface AdaptedPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  teamLogo: string;
  playerImage: string;
  jerseyNumber: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    fgp?: string;
    tpp?: string;
  };
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<AdaptedPlayer[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<AdaptedPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<AdaptedPlayer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lista de posições para filtro
  const positions = [
    { value: "all", label: "Todas as posições" },
    { value: "G", label: "Guard (G)" },
    { value: "F", label: "Forward (F)" },
    { value: "C", label: "Center (C)" },
    { value: "G-F", label: "Guard-Forward (G-F)" },
    { value: "F-C", label: "Forward-Center (F-C)" }
  ];

  // Buscar jogadores iniciais
  useEffect(() => {
    fetchPlayers(1);
  }, []);

  // Efeito para filtrar jogadores
  useEffect(() => {
    filterPlayers();
  }, [searchQuery, positionFilter, players]);

  // Função para buscar jogadores da API
  const fetchPlayers = async (pageNumber: number) => {
    if (pageNumber === 1) {
      setLoading(true);
    }
    
    try {
      const { players: apiPlayers, meta } = await getPlayers({ 
        per_page: 25, 
        page: pageNumber 
      });
      
      // Buscar estatísticas para cada jogador (temporada atual)
      const currentSeason = new Date().getFullYear();
      const playersWithStats = await Promise.all(
        apiPlayers.map(async (player) => {
          try {
            const stats = await getPlayerSeasonStats(player.id, currentSeason);
            // Usar a estatística mais recente disponível
            return adaptPlayerFormat(player, stats.length > 0 ? stats[0] : undefined);
          } catch (error) {
            console.error(`Erro ao buscar estatísticas para ${player.first_name} ${player.last_name}:`, error);
            return adaptPlayerFormat(player);
          }
        })
      );
      
      if (pageNumber === 1) {
        setPlayers(playersWithStats);
      } else {
        setPlayers(prev => [...prev, ...playersWithStats]);
      }
      
      setHasMore(meta.next_page !== null);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
      toast({
        title: "Erro ao carregar jogadores",
        description: "Não foi possível carregar a lista de jogadores. Tente novamente mais tarde.",
        variant: "destructive",
      });
      
      if (pageNumber === 1) {
        // Usar dados mockados em caso de falha
        setPlayers(getMockPlayers());
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar jogadores baseado na busca e posição
  const filterPlayers = () => {
    let filtered = [...players];
    
    // Filtrar por busca
    if (searchQuery) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrar por posição
    if (positionFilter !== "all") {
      filtered = filtered.filter(player => 
        player.position.includes(positionFilter)
      );
    }
    
    setFilteredPlayers(filtered);
  };

  // Carregar mais jogadores
  const loadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPlayers(nextPage);
    }
  };

  // Selecionar um jogador para ver detalhes
  const handlePlayerSelect = (player: AdaptedPlayer) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  // Renderizar skeleton cards durante carregamento
  const renderSkeletons = () => {
    return Array.from({ length: 12 }).map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <div className="p-2">
          <div className="w-full aspect-square rounded-lg overflow-hidden mb-4">
            <Skeleton className="w-full h-full" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </Card>
    ));
  };

  // Dados mockados para fallback
  const getMockPlayers = (): AdaptedPlayer[] => {
    return [
      {
        id: "1",
        name: "LeBron James",
        position: "F",
        team: "Los Angeles Lakers",
        teamLogo: "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg",
        playerImage: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
        jerseyNumber: "23",
        stats: {
          ppg: 27.8,
          rpg: 7.5,
          apg: 8.3,
          fgp: "52.3%",
          tpp: "39.8%"
        }
      },
      {
        id: "2",
        name: "Stephen Curry",
        position: "G",
        team: "Golden State Warriors",
        teamLogo: "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg",
        playerImage: "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
        jerseyNumber: "30",
        stats: {
          ppg: 29.2,
          rpg: 5.2,
          apg: 6.1,
          fgp: "47.1%",
          tpp: "43.5%"
        }
      },
      {
        id: "3",
        name: "Kevin Durant",
        position: "F",
        team: "Phoenix Suns",
        teamLogo: "https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg",
        playerImage: "https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png",
        jerseyNumber: "35",
        stats: {
          ppg: 28.4,
          rpg: 7.1,
          apg: 4.8,
          fgp: "52.9%",
          tpp: "40.2%"
        }
      }
    ];
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">Jogadores</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore os jogadores da NBA, estatísticas e previsões
      </p>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar jogador..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por posição" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((position) => (
                <SelectItem key={position.value} value={position.value}>
                  {position.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de jogadores */}
      {loading && players.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderSkeletons()}
        </div>
      ) : filteredPlayers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onClick={() => handlePlayerSelect(player)}
              />
            ))}
          </div>
          
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={loadMore} 
                disabled={loading}
                className="px-8"
              >
                {loading ? "Carregando..." : "Carregar mais"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Nenhum jogador encontrado para sua busca.
          </p>
        </div>
      )}

      {/* Modal de detalhes do jogador */}
      <PlayerDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        player={selectedPlayer}
      />
    </div>
  );
} 