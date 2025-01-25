import React from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function AudioControls({ isPlaying, onPlayPause, progress, onSeek }: AudioControlsProps) {
  return (
    <div className="space-y-4">
      <div 
        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={onSeek}
      >
        <div 
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={onPlayPause}
          className="p-4 bg-indigo-500 rounded-full hover:bg-indigo-600 text-white transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>
      </div>
    </div>
  );
}