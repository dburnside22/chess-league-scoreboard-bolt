import React from 'react';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Score</th>
            <th className="p-2 text-left">Matches</th>
          </tr>
        </thead>
        <tbody>
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <tr key={player.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{player.name}</td>
                <td className="p-2">{player.score}</td>
                <td className="p-2">{player.matches}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;