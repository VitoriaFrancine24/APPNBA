"use client";

import React, { useEffect, useState } from "react";
import { getTeams, Team } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Trophy, Basketball } from 'lucide-react';

const Teams = () => {
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
        toast({
          title: "Erro ao carregar times",
          description: "Não foi possível carregar a lista de times. Tente novamente mais tarde.",
          variant: "destructive",
        });
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

  // Componente para o card de um time
  const TeamCard = ({ team }: { team: Team }) => {
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Times</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lista de times simulada */}
        {[1, 2, 3, 4, 5, 6].map((team) => (
          <div key={team} className="border rounded-lg p-6 hover:bg-accent transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Basketball className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Time {team}</h3>
                <p className="text-sm text-muted-foreground">Conferência Leste</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Vitórias</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Derrotas</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Aproveitamento</span>
                <span className="font-medium">64%</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <a href={`/teams/${team}`} className="text-primary hover:underline">
                Ver detalhes
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams; 