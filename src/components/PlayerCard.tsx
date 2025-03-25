import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

// Interface para as estatísticas do jogador
interface PlayerStats {
  ppg: number;
  rpg: number;
  apg: number;
  fgp?: string;
  tpp?: string;
}

// Interface para as propriedades do jogador
interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  teamLogo: string;
  playerImage: string;
  jerseyNumber: string;
  stats: PlayerStats;
}

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  // Função para lidar com erros de imagem de jogador
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png";
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-2">
        {/* Imagem do jogador */}
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted mb-4 relative">
          <img
            src={player.playerImage}
            alt={player.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          
          {/* Logo do time (canto superior direito) */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full p-1 shadow-sm">
            <img 
              src={player.teamLogo} 
              alt={player.team} 
              className="w-full h-full object-contain" 
            />
          </div>
          
          {/* Número da camisa (canto inferior esquerdo) */}
          {player.jerseyNumber && (
            <Badge 
              variant="secondary" 
              className="absolute bottom-2 left-2 font-bold"
            >
              #{player.jerseyNumber}
            </Badge>
          )}
          
          {/* Posição (canto inferior direito) */}
          <Badge 
            className="absolute bottom-2 right-2"
          >
            {player.position}
          </Badge>
        </div>
        
        {/* Informações do jogador */}
        <h3 className="font-bold text-lg truncate">{player.name}</h3>
        <p className="text-sm text-muted-foreground truncate mb-3">{player.team}</p>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-muted rounded p-2 flex flex-col items-center justify-center">
            <span className="font-bold text-lg">{player.stats.ppg.toFixed(1)}</span>
            <span className="text-muted-foreground">PPG</span>
          </div>
          <div className="bg-muted rounded p-2 flex flex-col items-center justify-center">
            <span className="font-bold text-lg">{player.stats.rpg.toFixed(1)}</span>
            <span className="text-muted-foreground">RPG</span>
          </div>
          <div className="bg-muted rounded p-2 flex flex-col items-center justify-center">
            <span className="font-bold text-lg">{player.stats.apg.toFixed(1)}</span>
            <span className="text-muted-foreground">APG</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
