import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, SortAsc, SortDesc, RefreshCw, Users, Basketball } from 'lucide-react';
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
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Jogadores</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lista de jogadores simulada */}
        {[1, 2, 3, 4, 5, 6].map((player) => (
          <div key={player} className="border rounded-lg p-6 hover:bg-accent transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Basketball className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Jogador {player}</h3>
                <p className="text-sm text-muted-foreground">Posição: Ala-Armador</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Pontos por jogo</span>
                <span className="font-medium">22.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rebotes por jogo</span>
                <span className="font-medium">6.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Assistências por jogo</span>
                <span className="font-medium">5.8</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <a href={`/players/${player}`} className="text-primary hover:underline">
                Ver detalhes
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players; 