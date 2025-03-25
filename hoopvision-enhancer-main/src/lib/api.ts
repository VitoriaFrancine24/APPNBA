// API Key - Você deve substituir por sua chave real ao fazer o deploy
const API_KEY = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY || 'temp_demo_key';
const API_BASE_URL = 'https://api.balldontlie.io/v1';

// Interface para equipes
export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

// Interface para jogadores
export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  team: Team;
}

// Interface para partidas
export interface Game {
  id: number;
  date: string;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: Team;
  visitor_team_score: number;
}

// Interface para estatísticas
export interface Stats {
  id: number;
  ast: number;
  blk: number;
  dreb: number;
  fg3_pct: number;
  fg3a: number;
  fg3m: number;
  fg_pct: number;
  fga: number;
  fgm: number;
  ft_pct: number;
  fta: number;
  ftm: number;
  game: Game;
  min: string;
  oreb: number;
  pf: number;
  player: Player;
  pts: number;
  reb: number;
  stl: number;
  team: Team;
  turnover: number;
}

// Interface para paginação
interface MetaData {
  total_pages: number;
  current_page: number;
  next_page: number | null;
  per_page: number;
  total_count: number;
}

// Função para fazer requisições à API
async function fetchFromAPI<T>(endpoint: string, params: Record<string, any> = {}): Promise<{ data: T[], meta: MetaData }> {
  const queryParams = new URLSearchParams();
  
  // Adicionar parâmetros à URL
  Object.keys(params).forEach(key => {
    if (Array.isArray(params[key])) {
      params[key].forEach((value: string) => {
        queryParams.append(`${key}[]`, value);
      });
    } else {
      queryParams.append(key, params[key]);
    }
  });
  
  const url = `${API_BASE_URL}/${endpoint}?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
}

// Funções para buscar dados específicos
export async function getGames(params: { 
  dates?: string[], 
  seasons?: number[], 
  team_ids?: number[],
  per_page?: number,
  page?: number 
} = {}): Promise<{ games: Game[], meta: MetaData }> {
  const response = await fetchFromAPI<Game>('games', params);
  return { games: response.data, meta: response.meta };
}

export async function getGame(gameId: number): Promise<Game> {
  const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

export async function getTeams(): Promise<Team[]> {
  const response = await fetchFromAPI<Team>('teams');
  return response.data;
}

export async function getTeam(teamId: number): Promise<Team> {
  const response = await fetch(`${API_BASE_URL}/teams/${teamId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

export async function getPlayers(params: { 
  search?: string, 
  per_page?: number,
  page?: number 
} = {}): Promise<{ players: Player[], meta: MetaData }> {
  const response = await fetchFromAPI<Player>('players', params);
  return { players: response.data, meta: response.meta };
}

export async function getPlayer(playerId: number): Promise<Player> {
  const response = await fetch(`${API_BASE_URL}/players/${playerId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

export async function getPlayerStats(params: {
  player_ids?: number[],
  game_ids?: number[],
  seasons?: number[],
  per_page?: number,
  page?: number
} = {}): Promise<{ stats: Stats[], meta: MetaData }> {
  const response = await fetchFromAPI<Stats>('stats', params);
  return { stats: response.data, meta: response.meta };
}

// Função auxiliar para formatar datas no formato YYYY-MM-DD
export function formatDateForAPI(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Função para obter os jogos de hoje
export async function getTodayGames(): Promise<Game[]> {
  const today = formatDateForAPI(new Date());
  const { games } = await getGames({ dates: [today] });
  return games;
}

// Função para obter os jogos da semana
export async function getWeekGames(): Promise<Game[]> {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const dates = [];
  for (let d = new Date(today); d <= nextWeek; d.setDate(d.getDate() + 1)) {
    dates.push(formatDateForAPI(new Date(d)));
  }
  
  const { games } = await getGames({ dates, per_page: 100 });
  return games;
}

// Função para obter estatísticas de um jogador por temporada
export async function getPlayerSeasonStats(playerId: number, season: number): Promise<Stats[]> {
  const { stats } = await getPlayerStats({ 
    player_ids: [playerId], 
    seasons: [season],
    per_page: 100
  });
  return stats;
}

// Adaptar os dados da API para o formato usado em nosso app
export function adaptGameToMatchFormat(game: Game): any {
  const status = 
    game.status === "Final" ? "finished" : 
    (game.status.includes("start") || game.time) ? "upcoming" : "live";

  const date = new Date(game.date);
  
  return {
    id: game.id.toString(),
    date: game.date,
    time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    status,
    homeTeam: {
      id: game.home_team.id.toString(),
      name: game.home_team.full_name,
      logo: `https://cdn.nba.com/logos/nba/${game.home_team.id}/global/L/logo.svg`,
      score: game.home_team_score || undefined
    },
    awayTeam: {
      id: game.visitor_team.id.toString(),
      name: game.visitor_team.full_name,
      logo: `https://cdn.nba.com/logos/nba/${game.visitor_team.id}/global/L/logo.svg`,
      score: game.visitor_team_score || undefined
    },
    quarter: game.period > 0 ? `Q${game.period}` : undefined,
    remainingTime: game.time || undefined
  };
}

// Adaptar os dados dos jogadores para nosso formato
export function adaptPlayerFormat(player: Player, stats?: Stats): any {
  return {
    id: player.id.toString(),
    name: `${player.first_name} ${player.last_name}`,
    position: player.position,
    team: player.team.full_name,
    teamLogo: `https://cdn.nba.com/logos/nba/${player.team.id}/global/L/logo.svg`,
    playerImage: `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`,
    jerseyNumber: "0", // A API não fornece número da camisa
    stats: stats ? {
      ppg: stats.pts,
      rpg: stats.reb,
      apg: stats.ast,
      fgp: `${(stats.fg_pct * 100).toFixed(1)}%`,
      tpp: `${(stats.fg3_pct * 100).toFixed(1)}%`
    } : {
      ppg: 0,
      rpg: 0,
      apg: 0
    }
  };
} 