import React, { useState } from 'react';
import { Player } from '../types';

interface AdminPanelProps {
  players: Player[];
  onUpdateLeague: (playerId: string, newLeague: 'King' | 'Knight') => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ players, onUpdateLeague }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [newLeague, setNewLeague] = useState<'King' | 'Knight'>('King');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlayer) {
      onUpdateLeague(selectedPlayer, newLeague);
      setSelectedPlayer('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel - Change Player League</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="player" className="block mb-1">Select Player:</label>
          <select
            id="player"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a player</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name} - Current League: {player.league}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="league" className="block mb-1">New League:</label>
          <select
            id="league"
            value={newLeague}
            onChange={(e) => setNewLeague(e.target.value as 'King' | 'Knight')}
            className="w-full p-2 border rounded"
          >
            <option value="King">King League</option>
            <option value="Knight">Knight League</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          disabled={!selectedPlayer}
        >
          Update League
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;