import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Check } from 'lucide-react';
import { Meditation } from '../types/database';
import { useUserMeditationProgress } from '../hooks/useUserMeditationProgress';
import { useAuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface MeditationPlayerProps {
  meditation: Meditation;
  onComplete: () => void;
}

export function MeditationPlayer({ meditation, onComplete }: MeditationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { updateProgress, refreshProgress } = useUserMeditationProgress();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = async () => {
    if (audioRef.current && user) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
      
      if (Math.abs(currentProgress - progress) > 5) {
        await updateProgress(meditation.id, Math.round(currentProgress));
      }
    }
  };

  const handleEnded = async () => {
    if (user) {
      setIsPlaying(false);
      setProgress(100);
      await updateProgress(meditation.id, 100, meditation.duration_seconds);
      setShowCompletion(true);
    }
  };

  const handleDone = async () => {
    // Make sure progress is fully updated in the database
    await updateProgress(meditation.id, 100, meditation.duration_seconds);
    // Refresh progress to ensure next meditation is unlocked
    await refreshProgress();
    // Navigate to journey page
    navigate('/journey');
    // Call onComplete callback
    onComplete();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
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

  if (showCompletion) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Meditation Complete!
        </h2>
        <p className="text-gray-600 mb-6">
          Great job! You've completed this meditation.
        </p>
        <button
          onClick={handleDone}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                   transition-colors duration-300 focus:outline-none focus:ring-2 
                   focus:ring-indigo-500 focus:ring-offset-2 font-medium"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <audio
        ref={audioRef}
        src={meditation.audio_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {meditation.title}
      </h2>
      <p className="text-gray-600 mb-8">
        {Math.floor(meditation.duration_seconds / 60)}:{(meditation.duration_seconds % 60).toString().padStart(2, '0')}
      </p>
      
      <div className="space-y-6">
        <div className="relative">
          <div 
            className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSeek}
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

        <div className="flex justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
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
    </div>
  );
}