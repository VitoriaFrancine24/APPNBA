import { toast } from "@/hooks/use-toast";

// Define types for the API responses
export interface PlayerGameStats {
  player: {
    id: number;
    firstname: string;
    lastname: string;
  };
  team: {
    id: number;
    name: string;
    nickname: string;
    code: string;
    logo: string;
  };
  game: {
    id: number;
  };
  points: number;
  pos: string;
  min: string;
  fgm: number;
  fga: number;
  fgp: string;
  ftm: number;
  fta: number;
  ftp: string;
  tpm: number;
  tpa: number;
  tpp: string;
  offReb: number;
  defReb: number;
  totReb: number;
  assists: number;
  pFouls: number;
  steals: number;
  turnovers: number;
  blocks: number;
  plusMinus: string;
  comment: string | null;
}

export const fetchPlayerGameStats = async (gameId: number): Promise<PlayerGameStats[]> => {
  try {
    const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?game=${gameId}`, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '483519e94amshab1118285782235p1d678fjsnd35e8c1c6857'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch player statistics');
    }

    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching player game stats:', error);
    toast({
      title: 'Error',
      description: 'Could not load player statistics for this game',
      variant: 'destructive',
    });
    return [];
  }
};

// Additional API endpoints based on the documentation
export interface Game {
  id: number;
  date: {
    start: string;
    end: string | null;
    duration: string | null;
  };
  status: {
    clock: string | null;
    halftime: boolean;
    short: number;
    long: string;
  };
  periods: {
    current: number;
    total: number;
    endOfPeriod: boolean;
  };
  arena: {
    name: string;
    city: string;
    state: string;
    country: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
    visitors: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
  };
  scores: {
    home: {
      quarter_1: number | null;
      quarter_2: number | null;
      quarter_3: number | null;
      quarter_4: number | null;
      over_time: number | null;
      total: number | null;
    };
    visitors: {
      quarter_1: number | null;
      quarter_2: number | null;
      quarter_3: number | null;
      quarter_4: number | null;
      over_time: number | null;
      total: number | null;
    };
  };
  officials: string[];
  timesTied: number | null;
  leadChanges: number | null;
  nugget: string | null;
}

export const fetchGames = async (date?: string, team?: number, season?: number): Promise<Game[]> => {
  try {
    let url = 'https://api-nba-v1.p.rapidapi.com/games';
    const params = new URLSearchParams();
    
    if (date) params.append('date', date);
    if (team) params.append('team', team.toString());
    if (season) params.append('season', season.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '483519e94amshab1118285782235p1d678fjsnd35e8c1c6857'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }

    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    toast({
      title: 'Error',
      description: 'Could not load games data',
      variant: 'destructive',
    });
    return [];
  }
};

export const fetchTeam = async (teamId: number): Promise<any> => {
  try {
    const response = await fetch(`https://api-nba-v1.p.rapidapi.com/teams?id=${teamId}`, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '483519e94amshab1118285782235p1d678fjsnd35e8c1c6857'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team data');
    }

    const data = await response.json();
    return data.response[0] || null;
  } catch (error) {
    console.error('Error fetching team data:', error);
    toast({
      title: 'Error',
      description: 'Could not load team data',
      variant: 'destructive',
    });
    return null;
  }
};

export const fetchPlayer = async (playerId: number): Promise<any> => {
  try {
    const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${playerId}`, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '483519e94amshab1118285782235p1d678fjsnd35e8c1c6857'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch player data');
    }

    const data = await response.json();
    return data.response[0] || null;
  } catch (error) {
    console.error('Error fetching player data:', error);
    toast({
      title: 'Error',
      description: 'Could not load player data',
      variant: 'destructive',
    });
    return null;
  }
};

export const fetchAllPlayers = async (page: number = 1, perPage: number = 100): Promise<any[]> => {
  try {
    const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players?page=${page}&per_page=${perPage}`, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '483519e94amshab1118285782235p1d678fjsnd35e8c1c6857'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch players data');
    }

    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching all players:', error);
    toast({
      title: 'Error',
      description: 'Could not load players data',
      variant: 'destructive',
    });
    return [];
  }
};

export const fetchPlayerStats = async (playerId: number, season?: number): Promise<any[]> => {
  try {
    let url = `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerId}`;
    if (season) {
      url += `&season=${season}`;
    }

    const response = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '483519e94amshab1118285782235p1d678fjsnd35e8c1c6857'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch player statistics');
    }

    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching player statistics:', error);
    toast({
      title: 'Error',
      description: 'Could not load player statistics',
      variant: 'destructive',
    });
    return [];
  }
};

// Interfaces para jogos e previsões
export interface TeamInfo {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

export interface Match {
  id: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  date: string;
  time: string;
  status: 'upcoming' | 'finished';
  quarter?: string;
  remainingTime?: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  teamName: string;
  teamLogo: string;
  playerImage: string;
  jerseyNumber: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    fgp?: string;
    tpp?: string;
  };
}

export interface PlayerPrediction {
  playerId: string;
  playerName: string;
  teamName: string;
  teamLogo: string;
  matchId: string;
  matchDate: string;
  opponent: string;
  pointsPrediction: number;
  reboundsPrediction: number;
  assistsPrediction: number;
  stealsPrediction: number;
  blocksPrediction: number;
  fgPercentagePrediction: number;
  tpPercentagePrediction: number;
  winProbability: number;
}

export interface MatchPrediction {
  id: string;
  homeTeam: {
    name: string;
    winProbability: number;
    predictedScore: number;
    keyPlayers: Array<{
      name: string;
      prediction: string;
    }>;
  };
  awayTeam: {
    name: string;
    winProbability: number;
    predictedScore: number;
    keyPlayers: Array<{
      name: string;
      prediction: string;
    }>;
  };
  insights: string[];
}

export const fetchUpcomingMatches = async (status: string = 'upcoming'): Promise<Match[]> => {
  try {
    // Em um app real, você usaria a API para buscar jogos com base no status
    // Aqui, vamos simular com dados mockados para demonstração
    
    // Obter a data atual para simular jogos futuros a partir de hoje
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    
    // Formatar as datas para exibição
    const todayFormatted = today.toISOString().split('T')[0];
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    const dayAfterTomorrowFormatted = dayAfterTomorrow.toISOString().split('T')[0];
    
    // Gerar IDs únicos para os jogos
    const generateId = () => Math.floor(Math.random() * 10000).toString();
    
    // Dados mockados com base no status solicitado
    if (status === 'upcoming') {
      return [
        {
          id: generateId(),
          homeTeam: { id: '1610612747', name: 'Lakers', logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg' },
          awayTeam: { id: '1610612738', name: 'Celtics', logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg' },
          date: todayFormatted,
          time: '19:30',
          status: 'upcoming'
        },
        {
          id: generateId(),
          homeTeam: { id: '1610612744', name: 'Warriors', logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg' },
          awayTeam: { id: '1610612756', name: 'Suns', logo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg' },
          date: todayFormatted,
          time: '20:00',
          status: 'upcoming'
        },
        {
          id: generateId(),
          homeTeam: { id: '1610612749', name: 'Bucks', logo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg' },
          awayTeam: { id: '1610612741', name: 'Bulls', logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg' },
          date: tomorrowFormatted,
          time: '18:00',
          status: 'upcoming'
        },
        {
          id: generateId(),
          homeTeam: { id: '1610612761', name: 'Raptors', logo: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg' },
          awayTeam: { id: '1610612755', name: 'Sixers', logo: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg' },
          date: tomorrowFormatted,
          time: '19:00',
          status: 'upcoming'
        },
        {
          id: generateId(),
          homeTeam: { id: '1610612740', name: 'Pelicans', logo: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg' },
          awayTeam: { id: '1610612743', name: 'Nuggets', logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg' },
          date: dayAfterTomorrowFormatted,
          time: '20:30',
          status: 'upcoming'
        }
      ];
    } else {
      // Jogos finalizados (removemos o condicional para jogos ao vivo)
      return [
        {
          id: generateId(),
          homeTeam: { id: '1610612737', name: 'Hawks', logo: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg', score: 112 },
          awayTeam: { id: '1610612766', name: 'Hornets', logo: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg', score: 97 },
          date: todayFormatted,
          time: '19:00',
          status: 'finished'
        },
        {
          id: generateId(),
          homeTeam: { id: '1610612752', name: 'Knicks', logo: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg', score: 104 },
          awayTeam: { id: '1610612753', name: 'Magic', logo: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg', score: 118 },
          date: todayFormatted,
          time: '18:30',
          status: 'finished'
        },
        {
          id: generateId(),
          homeTeam: { id: '1610612760', name: 'Thunder', logo: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg', score: 125 },
          awayTeam: { id: '1610612763', name: 'Grizzlies', logo: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg', score: 112 },
          date: todayFormatted,
          time: '20:00',
          status: 'finished'
        }
      ];
    }
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível carregar os jogos',
      variant: 'destructive',
    });
    return [];
  }
};

export const fetchPlayerPrediction = async (playerId: string, matchId?: string): Promise<PlayerPrediction[]> => {
  try {
    // Simulando um pequeno atraso para mostrar loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Lista de jogadores com previsões
    const players = [
      { id: '1', name: 'LeBron James', teamName: 'Lakers', position: 'SF' },
      { id: '2', name: 'Stephen Curry', teamName: 'Warriors', position: 'PG' },
      { id: '3', name: 'Giannis Antetokounmpo', teamName: 'Bucks', position: 'PF' },
      { id: '4', name: 'Kevin Durant', teamName: 'Suns', position: 'SF' },
      { id: '5', name: 'Luka Doncic', teamName: 'Mavericks', position: 'PG' },
      { id: '6', name: 'Nikola Jokic', teamName: 'Nuggets', position: 'C' },
      { id: '7', name: 'Joel Embiid', teamName: 'Sixers', position: 'C' },
      { id: '8', name: 'Jayson Tatum', teamName: 'Celtics', position: 'SF' },
      { id: '9', name: 'Ja Morant', teamName: 'Grizzlies', position: 'PG' },
      { id: '10', name: 'Damian Lillard', teamName: 'Bucks', position: 'PG' }
    ];
    
    // Se um ID específico for fornecido, filtre por esse jogador
    const filteredPlayers = playerId ? players.filter(p => p.id === playerId) : players;
    
    // Mapeie para criar previsões para cada jogador
    return filteredPlayers.map(player => {
      // Gerar dados aleatórios de previsão
      const pointsPrediction = Math.floor(Math.random() * 20) + 10;
      const reboundsPrediction = Math.floor(Math.random() * 10) + 2;
      const assistsPrediction = Math.floor(Math.random() * 8) + 1;
      const stealsPrediction = Math.floor(Math.random() * 3) + 1;
      const blocksPrediction = Math.floor(Math.random() * 2) + 0;
      const fgPercentagePrediction = Math.floor(Math.random() * 20) + 40;
      const tpPercentagePrediction = Math.floor(Math.random() * 20) + 30;
      const winProbability = Math.floor(Math.random() * 50) + 25;
      
      // Obter oponente aleatório
      const opponents = ['Lakers', 'Warriors', 'Bucks', 'Celtics', 'Suns', 'Nuggets', 'Sixers', 'Mavericks'];
      const opponent = opponents.filter(o => o !== player.teamName)[Math.floor(Math.random() * (opponents.length - 1))];
      
      // Gerar data aleatória para o jogo (dentro dos próximos 7 dias)
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 7));
      const matchDate = date.toISOString().split('T')[0];
      
      return {
        playerId: player.id,
        playerName: player.name,
        teamName: player.teamName,
        teamLogo: `https://cdn.nba.com/logos/nba/${player.teamName.toLowerCase()}/global/L/logo.svg`,
        matchId: matchId || Math.floor(Math.random() * 10000).toString(),
        matchDate,
        opponent,
        pointsPrediction,
        reboundsPrediction,
        assistsPrediction,
        stealsPrediction,
        blocksPrediction,
        fgPercentagePrediction,
        tpPercentagePrediction,
        winProbability
      };
    });
  } catch (error) {
    console.error('Error fetching player prediction:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível carregar as previsões para este jogador',
      variant: 'destructive',
    });
    return [];
  }
};

export const fetchMatchPrediction = async (matchId: string): Promise<MatchPrediction> => {
  try {
    // Em um app real, você buscaria a previsão da API
    // Aqui, geramos dados de previsão simulados
    
    // Simular um pequeno atraso para mostrar loading state
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Gerar pontuações aleatórias
    const homeScore = Math.floor(Math.random() * 30) + 95;
    const awayScore = Math.floor(Math.random() * 30) + 95;
    
    // Probabilidades que somam 100%
    const homeWinProb = Math.floor(Math.random() * 70) + 30;
    const awayWinProb = 100 - homeWinProb;
    
    // Obter informações do jogo (em um app real, usaríamos o id para buscar o jogo)
    const matches = await fetchUpcomingMatches();
    const match = matches.find(m => m.id === matchId) || matches[0];
    
    if (!match) {
      throw new Error('Match not found');
    }
    
    // Gerar previsões para jogadores-chave
    const generatePlayerPredictions = (teamName: string) => {
      // Lista de jogadores por time
      const playersByTeam: Record<string, string[]> = {
        'Lakers': ['LeBron James', 'Anthony Davis', 'Austin Reaves'],
        'Warriors': ['Stephen Curry', 'Klay Thompson', 'Draymond Green'],
        'Bucks': ['Giannis Antetokounmpo', 'Damian Lillard', 'Brook Lopez'],
        'Celtics': ['Jayson Tatum', 'Jaylen Brown', 'Kristaps Porzingis'],
        'Suns': ['Kevin Durant', 'Devin Booker', 'Bradley Beal'],
        'Nuggets': ['Nikola Jokic', 'Jamal Murray', 'Aaron Gordon'],
        'Sixers': ['Joel Embiid', 'Tyrese Maxey', 'Tobias Harris'],
        'Knicks': ['Jalen Brunson', 'Julius Randle', 'OG Anunoby'],
        'Heat': ['Jimmy Butler', 'Bam Adebayo', 'Tyler Herro'],
        'Mavericks': ['Luka Doncic', 'Kyrie Irving', 'Tim Hardaway Jr.']
      };
      
      // Obter jogadores do time, ou gerar nomes genéricos se o time não estiver na lista
      const playerNames = playersByTeam[teamName] || [
        `${teamName} Player 1`,
        `${teamName} Player 2`,
        `${teamName} Player 3`
      ];
      
      return playerNames.map(name => ({
        name,
        prediction: `${Math.floor(Math.random() * 15) + 10} pts, ${Math.floor(Math.random() * 7) + 2} reb, ${Math.floor(Math.random() * 6) + 1} ast`
      }));
    };
    
    // Gerar insights da partida
    const insights = [
      `Os ${match.homeTeam.name} têm um histórico de ${Math.floor(Math.random() * 5) + 3}-${Math.floor(Math.random() * 3) + 1} nos últimos jogos em casa.`,
      `Os ${match.awayTeam.name} têm uma média de ${Math.floor(Math.random() * 15) + 105} pontos por jogo nos últimos 5 jogos.`,
      `Em confrontos anteriores nesta temporada, o ${homeWinProb > awayWinProb ? match.homeTeam.name : match.awayTeam.name} venceu ${Math.floor(Math.random() * 2) + 1} de ${Math.floor(Math.random() * 2) + 2} jogos.`,
      `Este é um jogo importante para a classificação nos playoffs, especialmente para o ${Math.random() > 0.5 ? match.homeTeam.name : match.awayTeam.name}.`,
      `O ritmo de jogo esperado é ${Math.random() > 0.5 ? 'alto' : 'moderado'}, com potencial para muitos pontos de transição.`
    ];
    
    return {
      id: matchId,
      homeTeam: {
        name: match.homeTeam.name,
        winProbability: homeWinProb,
        predictedScore: homeScore,
        keyPlayers: generatePlayerPredictions(match.homeTeam.name)
      },
      awayTeam: {
        name: match.awayTeam.name,
        winProbability: awayWinProb,
        predictedScore: awayScore,
        keyPlayers: generatePlayerPredictions(match.awayTeam.name)
      },
      insights
    };
    
  } catch (error) {
    console.error('Error fetching match prediction:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível carregar a previsão do jogo',
      variant: 'destructive',
    });
    
    // Retornar dados simulados em caso de erro
    return {
      id: matchId,
      homeTeam: {
        name: 'Time da Casa',
        winProbability: 50,
        predictedScore: 105,
        keyPlayers: [
          { name: 'Jogador 1', prediction: '18 pts, 5 reb, 4 ast' },
          { name: 'Jogador 2', prediction: '15 pts, 8 reb, 2 ast' },
          { name: 'Jogador 3', prediction: '12 pts, 4 reb, 6 ast' }
        ]
      },
      awayTeam: {
        name: 'Time Visitante',
        winProbability: 50,
        predictedScore: 102,
        keyPlayers: [
          { name: 'Jogador 1', prediction: '20 pts, 4 reb, 3 ast' },
          { name: 'Jogador 2', prediction: '16 pts, 7 reb, 3 ast' },
          { name: 'Jogador 3', prediction: '13 pts, 3 reb, 5 ast' }
        ]
      },
      insights: [
        'Os times estão equilibrados nesta temporada.',
        'Espera-se um jogo competitivo com ritmo moderado.',
        'Ambas as equipes têm jogadores-chave saudáveis para este confronto.'
      ]
    };
  }
};
