import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { UserProgress, MeditationSession } from '../types/database';
import { useAuthContext } from '../components/AuthProvider';

export function useUserMeditationProgress() {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  const fetchProgress = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);

    if (!error && data) {
      setProgress(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  const updateProgress = async (
    meditationId: number,
    progressPercent: number,
    durationSeconds?: number
  ) => {
    if (!user) return;

    const now = new Date().toISOString();
    const isCompleted = progressPercent === 100;

    try {
      // Update or create progress for current meditation
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('meditation_id', meditationId)
        .single();

      if (existingProgress) {
        await supabase
          .from('user_progress')
          .update({
            progress_percent: progressPercent,
            is_completed: isCompleted,
            completed_at: isCompleted ? now : null,
            last_played_at: now,
          })
          .eq('user_id', user.id)
          .eq('meditation_id', meditationId);
      } else {
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            meditation_id: meditationId,
            progress_percent: progressPercent,
            is_completed: isCompleted,
            completed_at: isCompleted ? now : null,
            last_played_at: now,
          });
      }

      // If meditation is completed, create a session record
      if (isCompleted && durationSeconds) {
        await supabase
          .from('meditation_sessions')
          .insert({
            user_id: user.id,
            meditation_id: meditationId,
            duration_seconds: durationSeconds,
            completed: true,
            started_at: now,
            completed_at: now,
          });
      }

      // Refresh progress data after update
      await fetchProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return {
    progress,
    loading,
    updateProgress,
    refreshProgress: fetchProgress,
  };
}