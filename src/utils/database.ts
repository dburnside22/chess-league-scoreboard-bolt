import { AppState, Player, Match } from '../types';

const STORAGE_KEY = 'chessLeagueData';

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(): AppState {
  const storedState = localStorage.getItem(STORAGE_KEY);
  if (storedState) {
    return JSON.parse(storedState);
  }
  return { players: [], matches: [] };
}

export function addPlayer(state: AppState, name: string, league: 'King' | 'Knight'): AppState {
  const newPlayer: Player = {
    id: Date.now().toString(),
    name,
    score: 0,
    matches: 0,
    league,
  };
  const newState = {
    ...state,
    players: [...state.players, newPlayer],
  };
  saveState(newState);
  return newState;
}

export function recordMatch(
  state: AppState,
  player1Id: string,
  player2Id: string,
  result: 'win' | 'loss' | 'draw',
  league: 'King' | 'Knight'
): AppState {
  const newMatch: Match = {
    id: Date.now().toString(),
    player1: player1Id,
    player2: player2Id,
    result,
    league,
  };

  const updatedPlayers = state.players.map(player => {
    if (player.id === player1Id || player.id === player2Id) {
      let scoreChange = 0;
      if (player.id === player1Id) {
        scoreChange = result === 'win' ? 1 : result === 'draw' ? 0.5 : 0;
      } else {
        scoreChange = result === 'loss' ? 1 : result === 'draw' ? 0.5 : 0;
      }
      return {
        ...player,
        score: player.score + scoreChange,
        matches: player.matches + 1,
      };
    }
    return player;
  });

  const newState = {
    players: updatedPlayers,
    matches: [...state.matches, newMatch],
  };

  saveState(newState);
  return newState;
}