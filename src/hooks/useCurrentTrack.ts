import { useEffect, useState } from 'react';
import { getCurrentTrack, getPlaybackState } from '../lib/spotify';
import type { SpotifyTrack } from '../types/spotify';

export function useCurrentTrack(token: string) {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [playbackState, setPlaybackState] = useState<{ progress_ms: number; isPlaying: boolean } | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchTrack = async () => {
      const data = await getCurrentTrack(token);
      if (data) setTrack(data);
    };

    const fetchPlaybackState = async () => {
      const state = await getPlaybackState(token);
      setPlaybackState(state);
    };

    fetchTrack();
    fetchPlaybackState();
    const interval = setInterval(() => {
      fetchTrack();
      fetchPlaybackState();
    }, 1000); 
    return () => clearInterval(interval);
  }, [token]);

  return { track, playbackState };
}