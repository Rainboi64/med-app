import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../components/AuthProvider';
import type { Profile, MeditationSession } from '../types/database';

export function useUserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentSessions, setRecentSessions] = useState<MeditationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchProfileData() {
      if (!user) return;

      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // Fetch recent meditation sessions with meditation details
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('meditation_sessions')
          .select(`
            *,
            meditations (
              title,
              duration_seconds
            )
          `)
          .eq('user_id', user.id)
          .eq('completed', true)
          .order('completed_at', { ascending: false })
          .limit(5);

        if (sessionsError) throw sessionsError;

        setProfile(profileData);
        setRecentSessions(sessionsData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [user]);

  return {
    profile,
    recentSessions,
    loading
  };
}