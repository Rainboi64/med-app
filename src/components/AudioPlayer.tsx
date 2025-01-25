import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Meditation } from '../data/meditations';

interface AudioPlayerProps {
  meditation: Meditation;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function AudioPlayer({ meditation, onNext, onPrevious, hasNext, hasPrevious }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [meditation]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (hasNext) {
      onNext();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percentage = x / width;
      const time = percentage * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(percentage * 100);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <audio
        ref={audioRef}
        src={meditation.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{meditation.title}</h2>
      <p className="text-gray-600 mb-4">{meditation.duration}</p>
      
      <div 
        className="w-full h-2 bg-gray-200 rounded-full mb-4 cursor-pointer"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-indigo-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`p-2 rounded-full ${
            hasPrevious ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <button
          onClick={togglePlay}
          className="p-4 bg-indigo-500 rounded-full hover:bg-indigo-600 text-white"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`p-2 rounded-full ${
            hasNext ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}