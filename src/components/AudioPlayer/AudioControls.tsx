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
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="relative">
        <div 
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={onSeek}
        >
          <div 
            className="absolute h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500 text-right">
          {Math.round(progress)}% Complete
        </div>
      </div>

      {/* Play/Pause Button */}
      <div className="flex justify-center">
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
      </div>
    </div>
  );
}