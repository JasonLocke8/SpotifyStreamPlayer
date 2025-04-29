import React, { useState, useEffect } from 'react';
import { Music2 } from 'lucide-react';

interface PlayerInfoProps {
  song: string;
  artist: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
}

export const PlayerInfo = ({ song, artist, progress, duration, isPlaying }: PlayerInfoProps) => {
  const [currentProgress, setCurrentProgress] = useState(progress);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev < duration) {
          return prev + 1000;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const progressPercentage = (currentProgress / duration) * 100;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center mx-auto" style={{ maxWidth: '80%', height: '55px' }}>
          <div className="relative overflow-hidden" style={{ width: '80%', margin: '0 auto' }}>
            <h2
              className="text-xl font-bold text-white"
              style={{
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {song}
            </h2>
          </div>

          <div className="relative overflow-hidden" style={{ width: '80%', margin: '0 auto' }}>
            <h3
              className="text-gray-400"
              style={{
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {artist}
            </h3>
          </div>
        </div>
        <Music2 className="w-6 h-6 text-green-500" />
      </div>

      <div className="mt-4">
        <div className="w-full h-1 bg-gray-700 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;