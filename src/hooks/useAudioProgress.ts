import { useState } from 'react';

export function useAudioProgress(onComplete: () => void) {
  const [progress, setProgress] = useState(0);

  const handleComplete = () => {
    setProgress(100);
    onComplete();
  };

  return {
    progress,
    setProgress,
    onComplete: handleComplete
  };
}