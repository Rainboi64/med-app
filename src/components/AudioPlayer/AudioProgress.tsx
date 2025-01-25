import React from 'react';

interface AudioProgressProps {
  progress: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function AudioProgress({ progress, onSeek }: AudioProgressProps) {
  return (
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
  );
}