import React, { useState, useEffect } from 'react';
import { Calendar, Filter, RefreshCw, Clock, Trophy } from 'lucide-react';
import Header from '@/components/Header';
import MatchCard from '@/components/MatchCard';
import MatchPredictionModal from '@/components/MatchPredictionModal';
import PlayerGameStats from '@/components/PlayerGameStats';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Importar funções de mock ou API
import { fetchUpcomingMatches, fetchMatchPrediction } from '@/utils/nbaApiService';

interface TeamInfo {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

interface Match {
  id: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  date: string;
  time: string;
  status: 'upcoming' | 'finished';
  quarter?: string;
  remainingTime?: string;
}

interface MatchPrediction {
  id: string;
  homeTeam: {
    name: string;
    winProbability: number;
    predictedScore: number;
    keyPlayers: Array<{
      name: string;
      prediction: string;
    }>;
  };
  awayTeam: {
    name: string;
    winProbability: number;
    predictedScore: number;
    keyPlayers: Array<{
      name: string;
      prediction: string;
    }>;
  };
  insights: string[];
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedMatchStats, setSelectedMatchStats] = useState<string | null>(null);
  const [matchPrediction, setMatchPrediction] = useState<MatchPrediction | null>(null);
  const [predictionModalOpen, setPredictionModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  
  // Lista de times para o filtro
  const teams = [
    'Lakers', 'Warriors', 'Bucks', 'Celtics', 'Suns', 
    'Nuggets', 'Sixers', 'Heat', 'Mavericks', 'Grizzlies'
  ];
  
  useEffect(() => {
    fetchMatches();
  }, [activeTab]);
  
  const fetchMatches = async () => {
    setLoading(true);
    try {
      // Na prática, você usaria diferentes endpoints com base no status (upcoming, finished)
      const data = await fetchUpcomingMatches(activeTab);
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os jogos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleMatchClick = async (match: Match) => {
    setSelectedMatch(match);
    
    if (match.status === 'finished' && match.id) {
      setSelectedMatchStats(match.id);
    } else if (match.status === 'upcoming') {
      try {
        // Buscar previsões para o jogo
        const prediction = await fetchMatchPrediction(match.id);
        setMatchPrediction(prediction);
        setPredictionModalOpen(true);
      } catch (error) {
        console.error('Error fetching match prediction:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar a previsão para este jogo',
          variant: 'destructive',
        });
      }
    }
  };
  
  const closeStatsModal = () => {
    setSelectedMatchStats(null);
  };
  
  const closePredictionModal = () => {
    setPredictionModalOpen(false);
    setMatchPrediction(null);
  };
  
  const refreshMatches = () => {
    fetchMatches();
    toast({
      title: 'Atualizando',
      description: 'Buscando jogos mais recentes...',
    });
  };
  
  // Filtrar as partidas com base na tab ativa e outros filtros
  const filteredMatches = matches.filter(match => {
    // Filtrar por status (tab)
    if (activeTab === 'upcoming' && match.status !== 'upcoming') return false;
    if (activeTab === 'finished' && match.status !== 'finished') return false;
    
    // Filtrar por time
    if (selectedTeam !== 'all') {
      const isHomeTeam = match.homeTeam.name === selectedTeam;
      const isAwayTeam = match.awayTeam.name === selectedTeam;
      if (!isHomeTeam && !isAwayTeam) return false;
    }
    
    // Filtrar por data
    if (selectedDate !== 'all') {
      const matchDate = new Date(match.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate === 'today') {
        const isToday = matchDate.toDateString() === today.toDateString();
        if (!isToday) return false;
      } else if (selectedDate === 'tomorrow') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const isTomorrow = matchDate.toDateString() === tomorrow.toDateString();
        if (!isTomorrow) return false;
      } else if (selectedDate === 'this-week') {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(endOfWeek.getDate() + 7);
        const isThisWeek = matchDate >= today && matchDate <= endOfWeek;
        if (!isThisWeek) return false;
      }
    }
    
    return true;
  });
  
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Jogos da NBA</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Acompanhe os jogos, resultados e previsões da NBA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Jogos de Hoje */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Jogos de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Confira os jogos programados para hoje, incluindo horários e previsões.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Button variant="outline" className="w-full">
              Ver Jogos de Hoje
            </Button>
          </div>
        </Card>

        {/* Próximos Jogos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Próximos Jogos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Visualize os próximos jogos da NBA e suas previsões.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Button variant="outline" className="w-full">
              Ver Próximos Jogos
            </Button>
          </div>
        </Card>

        {/* Resultados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-500" />
              Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Acompanhe os resultados dos jogos recentes e análises pós-jogo.
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Button variant="outline" className="w-full">
              Ver Resultados
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Matches; 