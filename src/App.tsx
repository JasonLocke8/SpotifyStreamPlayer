import React, { useEffect } from 'react';
import NowPlaying from './components/NowPlaying';
import { extractTokenFromUrl } from './lib/spotify';

function App() {
  useEffect(() => {
    extractTokenFromUrl();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <NowPlaying />
    </div>
  );
}

export default App;