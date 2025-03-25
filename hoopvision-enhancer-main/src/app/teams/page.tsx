"use client";

import React, { useEffect, useState } from "react";
import { getTeams, Team } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export const metadata = {
  title: "Times | HoopVision",
  description: "Visualize informações e estatísticas dos times da NBA",
};

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex items-center justify-center">
        <div className="w-24 h-24 mb-4">
          <img
            src={`https://cdn.nba.com/logos/nba/${team.id}/global/L/logo.svg`}
            alt={team.full_name}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-center">{team.full_name}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {team.city}, {team.abbreviation}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-muted p-2 rounded text-center">
            <span className="text-xs text-muted-foreground">Conferência</span>
            <p className="font-medium">{team.conference}</p>
          </div>
          <div className="bg-muted p-2 rounded text-center">
            <span className="text-xs text-muted-foreground">Divisão</span>
            <p className="font-medium">{team.division}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Filtra os times baseado na busca e na aba ativa
  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && team.conference.toLowerCase() === activeTab.toLowerCase();
  });

  // Renderiza cards de skeleton durante o carregamento
  const renderSkeletons = () => {
    return Array.from({ length: 30 }).map((_, index) => (
      <Card key={index}>
        <CardHeader className="pb-2 flex items-center justify-center">
          <Skeleton className="w-24 h-24 rounded-full mb-4" />
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">Times</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore os times da NBA e suas informações
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar time..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="East">Leste</TabsTrigger>
          <TabsTrigger value="West">Oeste</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderSkeletons()}
        </div>
      ) : filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Nenhum time encontrado para sua busca.
          </p>
        </div>
      )}
    </div>
  );
} 