import { useState, useEffect } from 'react';

interface UserProgress {
  totalTime: number;
  completedSessions: number;
  streak: number;
  lastMeditationDate?: string;
}

const STORAGE_KEY = 'mindful_journey_progress';

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      totalTime: 0,
      completedSessions: 0,
      streak: 0
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (meditationDuration: number) => {
    setProgress(prev => {
      const today = new Date().toISOString().split('T')[0];
      const isConsecutiveDay = prev.lastMeditationDate === 
        new Date(Date.now() - 86400000).toISOString().split('T')[0];

      return {
        totalTime: prev.totalTime + meditationDuration,
        completedSessions: prev.completedSessions + 1,
        streak: isConsecutiveDay ? prev.streak + 1 : 1,
        lastMeditationDate: today
      };
    });
  };

  return {
    ...progress,
    updateProgress
  };
}