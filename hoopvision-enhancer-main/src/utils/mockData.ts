export interface PlayerType {
  id: number;
  name: string;
  team: string;
  position: string;
  stats: Stats;
}

export interface Stats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fg_pct: number;
  ft_pct: number;
  three_pct: number;
}

export const mockPlayers: PlayerType[] = [
  {
    id: 1,
    name: "LeBron James",
    team: "LAL",
    position: "SF",
    stats: {
      points: 25.4,
      rebounds: 7.2,
      assists: 7.8,
      steals: 1.2,
      blocks: 0.6,
      fg_pct: 0.52,
      ft_pct: 0.73,
      three_pct: 0.38
    }
  },
  // Adicione mais jogadores conforme necessário
];

export const mockTeams = [
  { id: 1, name: "Los Angeles Lakers", abbreviation: "LAL" },
  { id: 2, name: "Golden State Warriors", abbreviation: "GSW" },
  // Adicione mais times conforme necessário
];

export const mockMatches = [
  {
    id: 1,
    homeTeam: { id: 1, name: "Los Angeles Lakers", abbreviation: "LAL" },
    awayTeam: { id: 2, name: "Golden State Warriors", abbreviation: "GSW" },
    date: new Date().toISOString(),
    status: "scheduled",
    homeScore: null,
    awayScore: null
  },
  // Adicione mais partidas conforme necessário
];

export function getMockPlayerById(id: number): PlayerType | undefined {
  return mockPlayers.find(player => player.id === id);
}

export function getUpcomingGame(playerId: number) {
  return {
    id: 1,
    date: new Date().toISOString(),
    opponent: "Golden State Warriors",
    location: "home"
  };
}

export function getPrediction(playerId: number) {
  return {
    points: { min: 20, max: 30, predicted: 25 },
    rebounds: { min: 5, max: 9, predicted: 7 },
    assists: { min: 6, max: 10, predicted: 8 }
  };
}

export function getComparisonPlayer(playerId: number) {
  return {
    id: 2,
    name: "Stephen Curry",
    team: "GSW",
    stats: {
      points: 28.1,
      rebounds: 4.2,
      assists: 6.3
    }
  };
}

export function getTeamTrends(teamId: number) {
  return {
    winRate: 0.65,
    lastGames: [
      { result: "W", score: "120-110" },
      { result: "W", score: "115-108" },
      { result: "L", score: "98-105" }
    ]
  };
}

export function getSeasonStats(playerId: number) {
  return {
    games: 45,
    averages: {
      points: 25.4,
      rebounds: 7.2,
      assists: 7.8
    },
    shooting: {
      fg: 0.52,
      three: 0.38,
      ft: 0.73
    }
  };
} 