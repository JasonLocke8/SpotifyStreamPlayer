import React from "react";
import { WindowControls } from "./WindowControls";
import { AlbumArt } from "./AlbumArt";
import { PlayerInfo } from "./PlayerInfo";
import { useSpotifyAuth } from "../hooks/useSpotifyAuth";
import { useCurrentTrack } from "../hooks/useCurrentTrack";
import { loginUrl } from "../lib/spotify";
import { mockTrack } from "../data/mockData";

const NowPlaying = () => {
  const { token } = useSpotifyAuth();
  const { track } = useCurrentTrack(token);
  const { playbackState } = useCurrentTrack(token);
  const currentTrack = track || mockTrack;

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-[400px] bg-black/80 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20">
          <WindowControls />
          <div className="flex flex-col items-center justify-center h-[300px]">
            <a
              href={loginUrl}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-colors"
            >
              Conectar con Spotify
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] bg-black/80 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20">
        <WindowControls />
        <AlbumArt
          albumArt={currentTrack.albumArt}
          albumName={currentTrack.album}
          isPlaying={currentTrack.isPlaying}
        />
        <PlayerInfo
          song={currentTrack.song}
          artist={currentTrack.artist}
          progress={playbackState?.progress_ms || 0}
          duration={currentTrack.duration_ms}
          isPlaying={currentTrack.isPlaying}
        />
      </div>
    </div>
  );
};

export default NowPlaying;
