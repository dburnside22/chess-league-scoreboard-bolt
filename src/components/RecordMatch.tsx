import React, { useState } from 'react';
import { Player } from '../types';

interface RecordMatchProps {
  players: Player[];
  onRecordMatch: (player1: string, player2: string, result: 'win' | 'loss' | 'draw', league: 'King' | 'Knight') => void;
}

const RecordMatch: React.FC<RecordMatchProps> = ({ players, onRecordMatch }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [result, setResult] = useState<'win' | 'loss' | 'draw'>('win');
  const [league, setLeague] = useState<'King' | 'Knight'>('King');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1 && player2 && player1 !== player2) {
      onRecordMatch(player1, player2, result, league);
      setPlayer1('');
      setPlayer2('');
      setResult('win');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Record Match</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Player 1</option>
          {players.filter(p => p.league === league).map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Player 2</option>
          {players.filter(p => p.league === league).map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value as 'win' | 'loss' | 'draw')}
          className="w-full p-2 border rounded"
        >
          <option value="win">Player 1 Wins</option>
          <option value="loss">Player 2 Wins</option>
          <option value="draw">Draw</option>
        </select>
        <select
          value={league}
          onChange={(e) => setLeague(e.target.value as 'King' | 'Knight')}
          className="w-full p-2 border rounded"
        >
          <option value="King">King League</option>
          <option value="Knight">Knight League</option>
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
        Record Match
      </button>
    </form>
  );
};

export default RecordMatch;