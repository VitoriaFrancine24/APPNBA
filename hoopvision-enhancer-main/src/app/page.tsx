"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, ArrowRight, TrendingUp, Basketball } from "lucide-react";

export default function Home() {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">HoopVision</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Análise de basquete impulsionada por inteligência artificial para previsões precisas de jogos, estatísticas de jogadores e tendências de equipes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Partidas */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <Basketball className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Partidas</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Visualize partidas, resultados e previsões baseadas em IA para jogos da NBA.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <Button asChild>
              <Link to="/matches">Ver Partidas</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Card Jogadores */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <Basketball className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Jogadores</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Explore estatísticas detalhadas, análises e previsões de desempenho de jogadores.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <Button asChild>
              <Link to="/players">Ver Jogadores</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Card Times */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <Basketball className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Times</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Análise de equipes, classificações, forças e fraquezas baseadas em dados avançados.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <Button asChild>
              <Link to="/teams">Ver Times</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex items-center justify-center mt-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-4xl">
          <div className="p-6 flex flex-col items-center text-center space-y-4">
            <TrendingUp className="h-12 w-12 text-primary" />
            <h2 className="text-2xl font-bold">Previsões em Tempo Real</h2>
            <p className="text-muted-foreground">
              Nossas previsões são atualizadas continuamente com base nos dados mais recentes e análises avançadas de IA.
              Clique em qualquer jogo para ver previsões detalhadas, probabilidades de vitória e insights.
            </p>
            <Link to="/matches">
              <Button size="lg" className="mt-2">
                Ver Previsões de Jogos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 