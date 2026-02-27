import { useEffect, useState } from 'react';
import { extractTokenFromUrl, getSpotifyToken } from '../lib/spotify';

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const extractedToken = await extractTokenFromUrl();
      
      if (extractedToken) {
        setToken(extractedToken);
      } else {
        const storedToken = getSpotifyToken();
        setToken(storedToken);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  return { token, loading };
}