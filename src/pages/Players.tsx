import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, SortAsc, SortDesc, RefreshCw, Users } from 'lucide-react';
import Header from '@/components/Header';
import PlayerCard from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

// Importar funções do API Service
import { 
  fetchAllPlayers, 
  fetchPlayerPrediction, 
  Player, 
  PlayerPrediction 
} from '@/utils/nbaApiService';

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'ppg' | 'rpg' | 'apg'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [predictionModalOpen, setPredictionModalOpen] = useState(false);
  const [playerPredictions, setPlayerPredictions] = useState<PlayerPrediction[]>([]);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('all');
  
  // Lista de times e posições para filtros
  const teams = [
    'Lakers', 'Warriors', 'Bucks', 'Celtics', 'Suns', 
    'Nuggets', 'Sixers', 'Heat', 'Mavericks', 'Grizzlies'
  ];
  
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  
  useEffect(() => {
    fetchPlayers();
  }, []);
  
  useEffect(() => {
    // Aplicar todos os filtros e ordenação
    let result = [...players];
    
    // Filtrar por pesquisa
    if (searchQuery) {
      result = result.filter(player => 
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrar por time
    if (selectedTeam !== 'all') {
      result = result.filter(player => 
        player.teamName === selectedTeam
      );
    }
    
    // Filtrar por posição
    if (selectedPosition !== 'all') {
      result = result.filter(player => 
        player.position === selectedPosition || 
        player.position.includes(selectedPosition)
      );
    }
    
    // Ordenar
    result.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;
      
      switch (sortBy) {
        case 'ppg':
          valueA = a.stats.ppg;
          valueB = b.stats.ppg;
          break;
        case 'rpg':
          valueA = a.stats.rpg;
          valueB = b.stats.rpg;
          break;
        case 'apg':
          valueA = a.stats.apg;
          valueB = b.stats.apg;
          break;
        default:
          valueA = a.name;
          valueB = b.name;
      }
      
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    setFilteredPlayers(result);
  }, [players, searchQuery, selectedTeam, selectedPosition, sortBy, sortDirection]);
  
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      // Simular a obtenção de jogadores da API
      const mockPlayers: Player[] = [
        {
          id: '1',
          name: 'LeBron James',
          position: 'SF',
          teamName: 'Lakers',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
          jerseyNumber: '23',
          stats: { ppg: 25.2, rpg: 7.9, apg: 8.3, fgp: '52.0', tpp: '39.2' }
        },
        {
          id: '2',
          name: 'Stephen Curry',
          position: 'PG',
          teamName: 'Warriors',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
          jerseyNumber: '30',
          stats: { ppg: 26.5, rpg: 4.8, apg: 6.5, fgp: '47.3', tpp: '42.1' }
        },
        {
          id: '3',
          name: 'Giannis Antetokounmpo',
          position: 'PF',
          teamName: 'Bucks',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
          jerseyNumber: '34',
          stats: { ppg: 29.7, rpg: 11.5, apg: 5.8, fgp: '55.7', tpp: '25.3' }
        },
        {
          id: '4',
          name: 'Kevin Durant',
          position: 'SF',
          teamName: 'Suns',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
          jerseyNumber: '35',
          stats: { ppg: 27.3, rpg: 6.8, apg: 4.9, fgp: '51.2', tpp: '38.5' }
        },
        {
          id: '5',
          name: 'Luka Doncic',
          position: 'PG',
          teamName: 'Mavericks',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
          jerseyNumber: '77',
          stats: { ppg: 32.4, rpg: 8.9, apg: 9.4, fgp: '48.5', tpp: '35.7' }
        },
        {
          id: '6',
          name: 'Nikola Jokic',
          position: 'C',
          teamName: 'Nuggets',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',
          jerseyNumber: '15',
          stats: { ppg: 26.1, rpg: 12.2, apg: 9.0, fgp: '58.3', tpp: '34.8' }
        },
        {
          id: '7',
          name: 'Joel Embiid',
          position: 'C',
          teamName: 'Sixers',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png',
          jerseyNumber: '21',
          stats: { ppg: 33.7, rpg: 11.2, apg: 5.6, fgp: '53.5', tpp: '36.8' }
        },
        {
          id: '8',
          name: 'Jayson Tatum',
          position: 'SF',
          teamName: 'Celtics',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png',
          jerseyNumber: '0',
          stats: { ppg: 27.1, rpg: 8.5, apg: 4.7, fgp: '46.7', tpp: '37.3' }
        },
        {
          id: '9',
          name: 'Ja Morant',
          position: 'PG',
          teamName: 'Grizzlies',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629630.png',
          jerseyNumber: '12',
          stats: { ppg: 26.2, rpg: 5.9, apg: 8.1, fgp: '47.1', tpp: '30.9' }
        },
        {
          id: '10',
          name: 'Damian Lillard',
          position: 'PG',
          teamName: 'Bucks',
          teamLogo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
          playerImage: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203081.png',
          jerseyNumber: '0',
          stats: { ppg: 24.7, rpg: 4.2, apg: 7.0, fgp: '43.9', tpp: '38.4' }
        }
      ];
      
      setPlayers(mockPlayers);
      setFilteredPlayers(mockPlayers);
      
      toast({
        title: 'Dados carregados',
        description: `${mockPlayers.length} jogadores carregados com sucesso`,
        duration: 3000
      });
      
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível obter os dados dos jogadores',
        variant: 'destructive',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePlayerClick = async (player: Player) => {
    setSelectedPlayer(player);
    setPredictionModalOpen(true);
    loadPlayerPredictions(player.id);
  };
  
  const loadPlayerPredictions = async (playerId: string) => {
    setPredictionLoading(true);
    try {
      const predictions = await fetchPlayerPrediction(playerId);
      setPlayerPredictions(predictions);
    } catch (error) {
      console.error('Erro ao buscar previsões:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as previsões para este jogador',
        variant: 'destructive'
      });
    } finally {
      setPredictionLoading(false);
    }
  };
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  const closePredictionModal = () => {
    setPredictionModalOpen(false);
    setSelectedPlayer(null);
    setPlayerPredictions([]);
  };
  
  // Filtrar predições com base na data selecionada
  const getFilteredPredictions = () => {
    if (selectedDate === 'all') return playerPredictions;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dateFilters: Record<string, (date: string) => boolean> = {
      'today': (date) => {
        const predDate = new Date(date);
        predDate.setHours(0, 0, 0, 0);
        return predDate.getTime() === today.getTime();
      },
      'tomorrow': (date) => {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const predDate = new Date(date);
        predDate.setHours(0, 0, 0, 0);
        return predDate.getTime() === tomorrow.getTime();
      },
      'this-week': (date) => {
        const predDate = new Date(date);
        const daysDiff = Math.floor((predDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff >= 0 && daysDiff < 7;
      },
      'next-week': (date) => {
        const predDate = new Date(date);
        const daysDiff = Math.floor((predDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff >= 7 && daysDiff < 14;
      }
    };
    
    return playerPredictions.filter(pred => dateFilters[selectedDate](pred.matchDate));
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Jogadores da NBA</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Explore as estatísticas e análises dos jogadores da NBA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Estatísticas Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Estatísticas Gerais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Visualize as estatísticas gerais de todos os jogadores da NBA, incluindo pontos, rebotes e assistências.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Button variant="outline" className="w-full">
              Ver Estatísticas
            </Button>
          </div>
        </Card>

        {/* Líderes da Liga */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-yellow-500" />
              Líderes da Liga
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Confira os líderes em diferentes categorias estatísticas da NBA.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Button variant="outline" className="w-full">
              Ver Líderes
            </Button>
          </div>
        </Card>

        {/* Análise de Desempenho */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Análise de Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Análise detalhada do desempenho dos jogadores, incluindo tendências e projeções.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Button variant="outline" className="w-full">
              Ver Análises
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Players; 