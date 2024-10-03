export interface Player {
  id: string;
  name: string;
  score: number;
  matches: number;
  league: 'King' | 'Knight';
}

export interface Match {
  id: string;
  player1: string;
  player2: string;
  result: 'win' | 'loss' | 'draw';
  league: 'King' | 'Knight';
}

export interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  result: 'white' | 'black' | 'draw' | null;
  league: 'King' | 'Knight';
}

export interface AppState {
  players: Player[];
  matches: Match[];
  games: Game[];
}