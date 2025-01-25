import React from 'react';
import { AudioControls } from './AudioControls';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { Meditation } from '../../types/meditation';

interface AudioPlayerProps {
  meditation: Meditation;
  progress: number;
  onComplete: () => void;
  isLocked?: boolean; // Make isLocked optional
}

export function AudioPlayer({ meditation, progress, onComplete }: AudioPlayerProps) {
  const {
    audioRef,
    isPlaying,
    togglePlay,
    handleTimeUpdate,
    handleEnded,
    handleSeek
  } = useAudioPlayer(onComplete);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <audio
        ref={audioRef}
        src={meditation.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {meditation.title}
      </h2>
      <p className="text-gray-600 mb-8">{meditation.duration}</p>
      
      <AudioControls
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        progress={progress}
        onSeek={handleSeek}
      />
    </div>
  );
}