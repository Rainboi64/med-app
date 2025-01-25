import { useState, useRef, useEffect } from 'react';

export function useAudioPlayer(onComplete: () => void) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return {
    audioRef,
    isPlaying,
    progress,
    togglePlay,
    handleTimeUpdate,
    handleEnded,
    handleSeek,
    setIsPlaying,
    setProgress
  };
}