export type Profile = {
  id: string;
  email: string;
  total_minutes: number;
  completed_sessions: number;
  current_streak: number;
  longest_streak: number;
  last_meditation_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Meditation = {
  id: number;
  title: string;
  description: string | null;
  duration_seconds: number;
  audio_url: string;
  thumbnail_url: string | null;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  sequence_order: number;
  is_premium: boolean;
  created_at: string;
};

export type UserProgress = {
  id: number;
  user_id: string;
  meditation_id: number;
  is_completed: boolean;
  progress_percent: number;
  last_played_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type MeditationSession = {
  id: number;
  user_id: string;
  meditation_id: number;
  duration_seconds: number;
  completed: boolean;
  started_at: string;
  completed_at: string | null;
  notes: string | null;
};