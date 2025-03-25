import React from 'react';
import { Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { formatDate } from '@/lib/utils';

interface TeamInfo {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

interface MatchCardProps {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  onClick?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  time,
  status,
  onClick,
}) => {
  // Format the date
  const formattedDate = formatDate(date);
  
  // Check if the match is today
  const isToday = new Date(date).toDateString() === new Date().toDateString();
  
  // Status badge color
  const getBadgeVariant = () => {
    switch (status) {
      case 'live':
        return 'destructive';
      case 'finished':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  // Status text
  const getStatusText = () => {
    switch (status) {
      case 'live':
        return 'AO VIVO';
      case 'finished':
        return 'ENCERRADO';
      default:
        return isToday ? 'HOJE' : formattedDate;
    }
  };
  
  return (
    <div 
      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-card"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3">
        <Badge variant={getBadgeVariant()}>
          {getStatusText()}
        </Badge>
        <div className="text-sm text-muted-foreground flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {status === 'upcoming' ? `${time}` : ''}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        {/* Home Team */}
        <div className="flex flex-1 items-center">
          <div className="w-10 h-10 mr-2 flex-shrink-0">
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-medium text-sm sm:text-base truncate max-w-[100px] sm:max-w-[140px]">
            {homeTeam.name}
          </span>
        </div>
        
        {/* Score */}
        <div className="flex items-center px-2 sm:px-4">
          {(status === 'live' || status === 'finished') ? (
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg">{homeTeam.score}</span>
              <span className="text-sm">-</span>
              <span className="font-bold text-lg">{awayTeam.score}</span>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground font-medium">VS</div>
          )}
        </div>
        
        {/* Away Team */}
        <div className="flex flex-1 items-center justify-end">
          <span className="font-medium text-sm sm:text-base truncate max-w-[100px] sm:max-w-[140px] text-right">
            {awayTeam.name}
          </span>
          <div className="w-10 h-10 ml-2 flex-shrink-0">
            <img
              src={awayTeam.logo}
              alt={awayTeam.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
