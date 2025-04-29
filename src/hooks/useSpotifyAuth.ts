import { useEffect, useState } from 'react';
import { extractTokenFromUrl, getSpotifyToken } from '../lib/spotify';

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    extractTokenFromUrl();

    const storedToken = getSpotifyToken();
    setToken(storedToken);
  }, []);

  return { token };
}