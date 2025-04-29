import { useEffect, useState } from 'react';

export function useSpotifyAuth() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
      if (token) {
        setToken(token);
        window.location.hash = "";
      }
    }
  }, []);

  return { token };
}