
import React from 'react';

interface TeamStats {
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fieldGoals: string;
  threePointers: string;
  freeThrows: string;
}

interface PlayerStats {
  id: number;
  name: string;
  jerseyNumber: number;
  position: string;
  points: number;
  rebounds: number;
  assists: number;
  minutesPlayed: string;
  isOnCourt?: boolean;
}

interface TeamInfo {
  name: string;
  shortName: string;
  logo: string;
  score: number;
  teamStats: TeamStats;
  players: PlayerStats[];
  timeouts: number;
}

interface LiveMatchProps {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  quarter: string;
  remainingTime: string;
  arena: string;
  referees: string[];
  attendance: number;
}

const LiveMatch = ({
  homeTeam,
  awayTeam,
  quarter,
  remainingTime,
  arena,
  referees,
  attendance
}: LiveMatchProps) => {
  
  const [activeTab, setActiveTab] = React.useState<'boxscore' | 'stats' | 'play-by-play'>('boxscore');
  
  const StatComparison = ({ label, home, away }: { label: string, home: number | string, away: number | string }) => (
    <div className="grid grid-cols-3 text-sm py-1.5 border-b border-border">
      <div className="text-right pr-2 font-medium">{home}</div>
      <div className="text-center text-xs text-gray-500">{label}</div>
      <div className="text-left pl-2 font-medium">{away}</div>
    </div>
  );
  
  const PlayerRow = ({ player, isHome }: { player: PlayerStats, isHome: boolean }) => (
    <tr className={`border-t border-border hover:bg-muted/20 transition-colors ${player.isOnCourt ? 'bg-secondary/50' : ''}`}>
      <td className="px-3 py-2">
        <div className="flex items-center">
          <span className="text-xs text-gray-500 w-6">{player.jerseyNumber}</span>
          <span className={`font-medium ${player.isOnCourt ? 'text-basketball-accent' : ''}`}>{player.name}</span>
          <span className="ml-1.5 text-xs text-gray-500">{player.position}</span>
        </div>
      </td>
      <td className="px-3 py-2 text-center">{player.minutesPlayed}</td>
      <td className="px-3 py-2 text-center font-medium">{player.points}</td>
      <td className="px-3 py-2 text-center">{player.rebounds}</td>
      <td className="px-3 py-2 text-center">{player.assists}</td>
    </tr>
  );
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-orange-50 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 text-xs bg-black/5 rounded-full px-2 py-0.5">
            <span className="h-2 w-2 rounded-full bg-basketball-danger mr-0.5 animate-pulse-live"></span>
            <span>{quarter} • {remainingTime}</span>
          </div>
          
          <div className="text-xs text-gray-500">
            {arena}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-5">
          {/* Home Team */}
          <div className="flex flex-col items-center">
            <img src={homeTeam.logo} alt={homeTeam.name} className="w-16 h-16 mb-2" />
            <h3 className="font-semibold text-sm">{homeTeam.name}</h3>
            <div className="text-xs text-gray-500 mt-1">
              Timeouts: {homeTeam.timeouts}
            </div>
          </div>
          
          {/* Score */}
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">{homeTeam.score}</span>
            <span className="text-xl mx-3 text-gray-400">-</span>
            <span className="text-4xl font-bold">{awayTeam.score}</span>
          </div>
          
          {/* Away Team */}
          <div className="flex flex-col items-center">
            <img src={awayTeam.logo} alt={awayTeam.name} className="w-16 h-16 mb-2" />
            <h3 className="font-semibold text-sm">{awayTeam.name}</h3>
            <div className="text-xs text-gray-500 mt-1">
              Timeouts: {awayTeam.timeouts}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          <button 
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'boxscore' ? 'border-basketball-orange text-basketball-orange' : 'border-transparent hover:text-gray-700 text-gray-500'}`}
            onClick={() => setActiveTab('boxscore')}
          >
            Box Score
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stats' ? 'border-basketball-orange text-basketball-orange' : 'border-transparent hover:text-gray-700 text-gray-500'}`}
            onClick={() => setActiveTab('stats')}
          >
            Team Stats
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'play-by-play' ? 'border-basketball-orange text-basketball-orange' : 'border-transparent hover:text-gray-700 text-gray-500'}`}
            onClick={() => setActiveTab('play-by-play')}
          >
            Play-by-Play
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {activeTab === 'boxscore' && (
          <div>
            {/* Home Team Box Score */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <img src={homeTeam.logo} alt={homeTeam.name} className="w-5 h-5" />
                <h3 className="font-medium">{homeTeam.name}</h3>
              </div>
              
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Player</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">MIN</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">PTS</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">REB</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">AST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeTeam.players.map((player) => (
                      <PlayerRow key={player.id} player={player} isHome={true} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Away Team Box Score */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <img src={awayTeam.logo} alt={awayTeam.name} className="w-5 h-5" />
                <h3 className="font-medium">{awayTeam.name}</h3>
              </div>
              
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Player</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">MIN</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">PTS</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">REB</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">AST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {awayTeam.players.map((player) => (
                      <PlayerRow key={player.id} player={player} isHome={false} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Team Comparison</h3>
                <div className="space-y-1">
                  <StatComparison label="FG%" home={homeTeam.teamStats.fieldGoals} away={awayTeam.teamStats.fieldGoals} />
                  <StatComparison label="3PT%" home={homeTeam.teamStats.threePointers} away={awayTeam.teamStats.threePointers} />
                  <StatComparison label="FT%" home={homeTeam.teamStats.freeThrows} away={awayTeam.teamStats.freeThrows} />
                  <StatComparison label="Rebounds" home={homeTeam.teamStats.rebounds} away={awayTeam.teamStats.rebounds} />
                  <StatComparison label="Assists" home={homeTeam.teamStats.assists} away={awayTeam.teamStats.assists} />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">More Stats</h3>
                <div className="space-y-1">
                  <StatComparison label="Steals" home={homeTeam.teamStats.steals} away={awayTeam.teamStats.steals} />
                  <StatComparison label="Blocks" home={homeTeam.teamStats.blocks} away={awayTeam.teamStats.blocks} />
                  <StatComparison label="Turnovers" home={homeTeam.teamStats.turnovers} away={awayTeam.teamStats.turnovers} />
                  <StatComparison label="Fouls" home={homeTeam.teamStats.fouls} away={awayTeam.teamStats.fouls} />
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-gray-500">
                <p><strong>Arena:</strong> {arena}</p>
                <p><strong>Attendance:</strong> {attendance.toLocaleString()}</p>
                <p><strong>Referees:</strong> {referees.join(', ')}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'play-by-play' && (
          <div className="text-center py-6 text-gray-500">
            Play-by-play data will be updated during the game.
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMatch;
