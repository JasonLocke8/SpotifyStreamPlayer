const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPE = "user-read-currently-playing user-read-playback-state";

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

export const saveSpotifyToken = (token: string) => {
  sessionStorage.setItem('spotify_token', token);
};

export const getSpotifyToken = (): string | null => {
  return sessionStorage.getItem('spotify_token');
};

export const extractTokenFromUrl = async (): Promise<string | null> => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  
  if (!code) return null;

  try {
    const response = await fetch('/.netlify/functions/spotify-authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      console.error('Token exchange failed', response.statusText);
      return null;
    }

    const data = await response.json();
    saveSpotifyToken(data.access_token);
    
    // Limpiar la URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    return data.access_token;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return null;
  }
};

export const getCurrentTrack = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const data = await response.json();
  if (!data.item) {
    return null;
  }

  return {
    song: data.item.name,
    artist: data.item.artists.map((artist: { name: string }) => artist.name).join(', '),
    albumArt: data.item.album.images[0].url,
    album: data.item.album.name,
    duration_ms: data.item.duration_ms,
    isPlaying: data.is_playing,
  };
};

export const getPlaybackState = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const data = await response.json();
  return {
    progress_ms: data.progress_ms,
    isPlaying: data.is_playing,
  };
};