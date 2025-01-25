import React from 'react';
import { AudioProgress } from '../AudioProgress';
import { PlayButton } from '../PlayButton';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function AudioControls({ isPlaying, onPlayPause, progress, onSeek }: AudioControlsProps) {
  return (
    <div className="space-y-6">
      <AudioProgress progress={progress} onSeek={onSeek} />
      <div className="flex justify-center">
        <PlayButton isPlaying={isPlaying} onPlayPause={onPlayPause} />
      </div>
    </div>
  );
}