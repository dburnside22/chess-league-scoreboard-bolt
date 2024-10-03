import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { AppState } from './types';
import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';
import GameSchedule from './components/GameSchedule';
import AdminPanel from './components/AdminPanel';
import { api } from './utils/mockApi';

function App() {
  const [state, setState] = useState<AppState>({ players: [], matches: [], games: [] });
  const [loading, setLoading] = useState(true);
  const [activeLeague, setActiveLeague] = useState<'King' | 'Knight'>('King');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getState();
      setState(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddPlayer = async (name: string, league: 'King' | 'Knight') => {
    await api.addPlayer(name, league);
    const updatedState = await api.getState();
    setState(updatedState);
  };

  const handleRecordMatch = async (gameId: string, result: 'white' | 'black' | 'draw') => {
    await api.recordMatch(gameId, result);
    const updatedState = await api.getState();
    setState(updatedState);
  };

  const handleUpdateLeague = async (playerId: string, newLeague: 'King' | 'Knight') => {
    await api.updatePlayerLeague(playerId, newLeague);
    const updatedState = await api.getState();
    setState(updatedState);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <Award className="inline-block w-12 h-12 mb-2 text-yellow-500" />
          <h1 className="text-3xl font-bold">Chess League Scoreboard</h1>
        </header>
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 rounded ${isAdmin ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          >
            {isAdmin ? 'Exit Admin Mode' : 'Enter Admin Mode'}
          </button>
        </div>
        {isAdmin && <AdminPanel players={state.players} onUpdateLeague={handleUpdateLeague} />}
        <AddPlayer onAddPlayer={handleAddPlayer} />
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setActiveLeague('King')}
            className={`px-4 py-2 rounded ${activeLeague === 'King' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            King League
          </button>
          <button
            onClick={() => setActiveLeague('Knight')}
            className={`px-4 py-2 rounded ${activeLeague === 'Knight' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Knight League
          </button>
        </div>
        <div className="mt-8">
          <PlayerList 
            players={state.players.filter(p => p.league === activeLeague)} 
          />
        </div>
        <div className="mt-8">
          <GameSchedule 
            games={state.games.filter(g => g.league === activeLeague)} 
            players={state.players.filter(p => p.league === activeLeague)} 
            onRecordMatch={handleRecordMatch} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;