import React, { useState, useEffect } from 'react';
import { Calendar, Filter, RefreshCw, Clock, Trophy, Basketball } from 'lucide-react';
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Jogos</h1>
      
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Jogos Recentes</h2>
        </div>
        
        <div className="space-y-4">
          {/* Lista de jogos simulada */}
          {[1, 2, 3].map((game) => (
            <div key={game} className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Basketball className="h-5 w-5" />
                  <span className="font-medium">Time A</span>
                </div>
                <div className="text-center">
                  <span className="text-sm bg-muted px-2 py-1 rounded">86 - 82</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Time B</span>
                  <Basketball className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Data: 25/03/2025 • Encerrado
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Próximos Jogos</h2>
        </div>
        
        <div className="space-y-4">
          {/* Lista de próximos jogos simulada */}
          {[1, 2, 3].map((game) => (
            <div key={game} className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Basketball className="h-5 w-5" />
                  <span className="font-medium">Time C</span>
                </div>
                <div className="text-center">
                  <span className="text-sm bg-muted px-2 py-1 rounded">VS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Time D</span>
                  <Basketball className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Data: 30/03/2025 • 19:00
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches; 