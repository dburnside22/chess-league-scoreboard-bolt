import React from 'react';
import { Game, Player } from '../types';

interface GameScheduleProps {
  games: Game[];
  players: Player[];
  onRecordMatch: (gameId: string, result: 'white' | 'black' | 'draw') => void;
}

const GameSchedule: React.FC<GameScheduleProps> = ({ games, players, onRecordMatch }) => {
  const leaguePlayers = players.filter(p => p.league === games[0]?.league);

  const getGameResult = (player1: string, player2: string, isWhite: boolean) => {
    const game = games.find(g => 
      (isWhite && g.whitePlayer === player1 && g.blackPlayer === player2) ||
      (!isWhite && g.blackPlayer === player1 && g.whitePlayer === player2)
    );

    if (!game) return null;

    const result = game.result;
    if (result === null) return 'Not played';
    if (result === 'draw') return 'Draw';
    if (isWhite) {
      return result === 'white' ? 'Win' : 'Loss';
    } else {
      return result === 'black' ? 'Win' : 'Loss';
    }
  };

  const renderGameCell = (player1: Player, player2: Player, isWhite: boolean) => {
    if (player1.id === player2.id) return <td className="bg-gray-200"></td>;

    const game = games.find(g => 
      (isWhite && g.whitePlayer === player1.id && g.blackPlayer === player2.id) ||
      (!isWhite && g.blackPlayer === player1.id && g.whitePlayer === player2.id)
    );

    if (!game) return <td className="p-2 text-center">N/A</td>;

    const result = getGameResult(player1.id, player2.id, isWhite);
    const colorClass = result === 'Win' ? 'text-green-600' : result === 'Loss' ? 'text-red-600' : '';

    return (
      <td className="p-2 text-center">
        <div className={`font-bold ${colorClass}`}>{result}</div>
        <div className="mt-1">
          <button 
            onClick={() => onRecordMatch(game.id, isWhite ? 'white' : 'black')} 
            className={`px-2 py-1 rounded text-xs mr-1 ${result === 'Win' ? 'bg-green-500 text-white' : 'bg-green-200'}`}
          >
            Win
          </button>
          <button 
            onClick={() => onRecordMatch(game.id, isWhite ? 'black' : 'white')} 
            className={`px-2 py-1 rounded text-xs mr-1 ${result === 'Loss' ? 'bg-red-500 text-white' : 'bg-red-200'}`}
          >
            Loss
          </button>
          <button 
            onClick={() => onRecordMatch(game.id, 'draw')} 
            className={`px-2 py-1 rounded text-xs ${result === 'Draw' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
          >
            Draw
          </button>
        </div>
      </td>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Game Schedule - {games[0]?.league} League</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">Player</th>
            {leaguePlayers.map(player => (
              <th key={player.id} className="p-2 border" colSpan={2}>
                {player.name}
              </th>
            ))}
          </tr>
          <tr>
            <th className="p-2 border"></th>
            {leaguePlayers.map(player => (
              <React.Fragment key={player.id}>
                <th className="p-2 border bg-gray-100">White</th>
                <th className="p-2 border bg-gray-200">Black</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaguePlayers.map(player1 => (
            <tr key={player1.id}>
              <th className="p-2 border">{player1.name}</th>
              {leaguePlayers.map(player2 => (
                <React.Fragment key={player2.id}>
                  {renderGameCell(player1, player2, true)}
                  {renderGameCell(player1, player2, false)}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameSchedule;