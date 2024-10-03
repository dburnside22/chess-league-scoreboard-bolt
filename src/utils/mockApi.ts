import { AppState, Player, Match, Game } from '../types';

let mockDatabase: AppState = {
  players: [],
  matches: [],
  games: []
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getState(): Promise<AppState> {
    await delay(200);
    return { ...mockDatabase };
  },

  async addPlayer(name: string, league: 'King' | 'Knight'): Promise<void> {
    await delay(200);
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      score: 0,
      matches: 0,
      league,
    };
    mockDatabase.players.push(newPlayer);

    // Generate games for the new player
    const leaguePlayers = mockDatabase.players.filter(p => p.league === league && p.id !== newPlayer.id);
    for (const opponent of leaguePlayers) {
      mockDatabase.games.push(
        {
          id: `${Date.now()}-1`,
          whitePlayer: newPlayer.id,
          blackPlayer: opponent.id,
          result: null,
          league
        },
        {
          id: `${Date.now()}-2`,
          whitePlayer: opponent.id,
          blackPlayer: newPlayer.id,
          result: null,
          league
        }
      );
    }
  },

  async recordMatch(gameId: string, result: 'white' | 'black' | 'draw'): Promise<void> {
    await delay(200);
    const game = mockDatabase.games.find(g => g.id === gameId);
    if (game) {
      const oldResult = game.result;
      game.result = result;
      const whitePlayer = mockDatabase.players.find(p => p.id === game.whitePlayer);
      const blackPlayer = mockDatabase.players.find(p => p.id === game.blackPlayer);
      
      if (whitePlayer && blackPlayer) {
        // Remove old result points
        if (oldResult === 'white') {
          whitePlayer.score -= 3;
        } else if (oldResult === 'black') {
          blackPlayer.score -= 3;
        } else if (oldResult === 'draw') {
          whitePlayer.score -= 1;
          blackPlayer.score -= 1;
        }

        // Add new result points
        if (result === 'white') {
          whitePlayer.score += 3;
        } else if (result === 'black') {
          blackPlayer.score += 3;
        } else {
          whitePlayer.score += 1;
          blackPlayer.score += 1;
        }

        // Only increment matches count if it's a new game
        if (oldResult === null) {
          whitePlayer.matches++;
          blackPlayer.matches++;
        }
      }
    }
  },

  async updatePlayerLeague(playerId: string, newLeague: 'King' | 'Knight'): Promise<void> {
    await delay(200);
    const player = mockDatabase.players.find(p => p.id === playerId);
    if (player) {
      const oldLeague = player.league;
      player.league = newLeague;

      // Remove games from old league
      mockDatabase.games = mockDatabase.games.filter(g => 
        !(g.whitePlayer === playerId || g.blackPlayer === playerId)
      );

      // Add new games for the new league
      const leaguePlayers = mockDatabase.players.filter(p => p.league === newLeague && p.id !== playerId);
      for (const opponent of leaguePlayers) {
        mockDatabase.games.push(
          {
            id: `${Date.now()}-1`,
            whitePlayer: playerId,
            blackPlayer: opponent.id,
            result: null,
            league: newLeague
          },
          {
            id: `${Date.now()}-2`,
            whitePlayer: opponent.id,
            blackPlayer: playerId,
            result: null,
            league: newLeague
          }
        );
      }
    }
  }
};