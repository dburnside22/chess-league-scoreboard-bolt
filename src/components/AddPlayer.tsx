import React, { useState } from 'react';

interface AddPlayerProps {
  onAddPlayer: (name: string, league: 'King' | 'Knight') => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const [league, setLeague] = useState<'King' | 'Knight'>('King');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim(), league);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Add New Player</h2>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <select
            value={league}
            onChange={(e) => setLeague(e.target.value as 'King' | 'Knight')}
            className="w-full p-2 border rounded"
          >
            <option value="King">King League</option>
            <option value="Knight">Knight League</option>
          </select>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
        Add Player
      </button>
    </form>
  );
};

export default AddPlayer;