import React from 'react';
import NowPlaying from './components/NowPlaying';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';

function App() {
  const { token, loading } = useSpotifyAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <NowPlaying />
    </div>
  );
}

export default App;