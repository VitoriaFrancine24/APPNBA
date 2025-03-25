"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  fetchUpcomingMatches, 
  fetchMatchPrediction,
  Match as ApiMatch
} from "@/utils/nbaApiService";
import MatchPredictionModal from "@/components/MatchPredictionModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { Suspense } from "react";
import MatchesList from "@/components/MatchesList";
import MatchesListSkeleton from "@/components/MatchesListSkeleton";

type MatchStatus = 'scheduled' | 'live' | 'finished' | 'upcoming';

interface Team {
  id: number;
  name: string;
  abbreviation: string;
  logo?: string;
  score?: number;
}

interface Match extends Omit<ApiMatch, 'status'> {
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  quarter?: string;
  remainingTime?: string;
}

export const metadata = {
  title: "Partidas | HoopVision",
  description: "Visualize partidas e previsões da NBA com inteligência artificial",
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMatches(activeTab);
  }, [activeTab]);

  const fetchMatches = async (status: string) => {
    setLoading(true);
    try {
      const data = await fetchUpcomingMatches(status);
      // Transform the API data to match our Match interface
      const transformedData: Match[] = data.map(match => ({
        ...match,
        status: match.status as MatchStatus,
        homeScore: match.homeTeam.score || null,
        awayScore: match.awayTeam.score || null,
        quarter: match.quarter || undefined,
        remainingTime: match.remainingTime || undefined
      }));
      setMatches(transformedData);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os jogos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMatchClick = async (matchId: string) => {
    setSelectedMatchId(matchId);
    setPredictionLoading(true);
    setShowPredictionModal(true);
    
    try {
      const predictionData = await fetchMatchPrediction(matchId);
      setPrediction(predictionData);
    } catch (error) {
      console.error("Failed to fetch prediction:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a previsão do jogo",
        variant: "destructive",
      });
    } finally {
      setPredictionLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowPredictionModal(false);
    setPrediction(null);
    setSelectedMatchId(null);
  };

  const getStatusBadgeVariant = (status: MatchStatus) => {
    switch (status) {
      case 'live':
        return 'destructive';
      case 'finished':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const renderMatchCard = (match: Match) => (
    <div 
      key={match.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleMatchClick(match.id.toString())}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{match.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{match.time}</span>
        </div>
        {match.status === "upcoming" && (
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleMatchClick(match.id.toString());
            }}
          >
            <TrendingUp className="h-3 w-3" />
            Previsão
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex flex-col items-center w-2/5">
          <img 
            src={match.homeTeam.logo} 
            alt={match.homeTeam.name} 
            className="h-16 w-16 object-contain mb-2" 
          />
          <h3 className="font-semibold text-center">{match.homeTeam.name}</h3>
          {match.homeTeam.score !== undefined && (
            <span className="text-2xl font-bold">{match.homeTeam.score}</span>
          )}
        </div>
        
        {/* Match Status */}
        <div className="flex flex-col items-center justify-center w-1/5">
          {match.status === "upcoming" ? (
            <span className="font-semibold text-blue-500 text-center">VS</span>
          ) : match.status === "live" ? (
            <div className="flex flex-col items-center">
              <span className="font-semibold text-red-500 text-center">{match.quarter}</span>
              <span className="text-sm text-gray-500">{match.remainingTime}</span>
            </div>
          ) : (
            <span className="font-semibold text-gray-500 text-center">Final</span>
          )}
        </div>
        
        {/* Away Team */}
        <div className="flex flex-col items-center w-2/5">
          <img 
            src={match.awayTeam.logo} 
            alt={match.awayTeam.name} 
            className="h-16 w-16 object-contain mb-2" 
          />
          <h3 className="font-semibold text-center">{match.awayTeam.name}</h3>
          {match.awayTeam.score !== undefined && (
            <span className="text-2xl font-bold">{match.awayTeam.score}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderSkeletonCard = (index: number) => (
    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center w-2/5">
          <Skeleton className="h-16 w-16 rounded-full mb-2" />
          <Skeleton className="h-5 w-24 mb-1" />
        </div>
        
        <div className="flex flex-col items-center justify-center w-1/5">
          <Skeleton className="h-4 w-8" />
        </div>
        
        <div className="flex flex-col items-center w-2/5">
          <Skeleton className="h-16 w-16 rounded-full mb-2" />
          <Skeleton className="h-5 w-24 mb-1" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">Partidas</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Visualize partidas, resultados e previsões com IA
      </p>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="live">Ao Vivo</TabsTrigger>
          <TabsTrigger value="finished">Encerradas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <Suspense fallback={<MatchesListSkeleton count={5} />}>
            <MatchesList status="upcoming" />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="live" className="space-y-4">
          <Suspense fallback={<MatchesListSkeleton count={3} />}>
            <MatchesList status="live" />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="finished" className="space-y-4">
          <Suspense fallback={<MatchesListSkeleton count={5} />}>
            <MatchesList status="finished" />
          </Suspense>
        </TabsContent>
      </Tabs>
      
      {showPredictionModal && (
        <MatchPredictionModal
          isOpen={showPredictionModal}
          isLoading={predictionLoading}
          prediction={prediction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
} 