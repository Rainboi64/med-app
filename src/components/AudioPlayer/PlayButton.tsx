import React from 'react';
import { Play, Pause } from 'lucide-react';

interface PlayButtonProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function PlayButton({ isPlaying, onPlayPause }: PlayButtonProps) {
  return (
    <button
      onClick={onPlayPause}
      className="p-6 bg-indigo-500 rounded-full hover:bg-indigo-600 text-white transition-all duration-300 
               shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 
               focus:ring-indigo-500 focus:ring-offset-2"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <Pause className="w-8 h-8" />
      ) : (
        <Play className="w-8 h-8 ml-1" />
      )}
    </button>
  );
}