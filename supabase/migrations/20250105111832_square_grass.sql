/*
  # Initial Schema Setup for Meditation App

  1. New Tables
    - `profiles`
      - Extended user profile data linked to auth.users
      - Stores user preferences and stats
    
    - `meditations`
      - Meditation content and metadata
      - Includes title, duration, audio URL, etc.
    
    - `user_progress`
      - Tracks user's progress through meditations
      - Stores completion status and progress
    
    - `meditation_sessions`
      - Records individual meditation sessions
      - Tracks duration, completion, and timestamps

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  total_minutes integer DEFAULT 0,
  completed_sessions integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_meditation_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meditations table
CREATE TABLE meditations (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  description text,
  duration_seconds integer NOT NULL,
  audio_url text NOT NULL,
  thumbnail_url text,
  difficulty_level text CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  category text NOT NULL,
  sequence_order integer NOT NULL,
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE user_progress (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  meditation_id bigint REFERENCES meditations(id) ON DELETE CASCADE NOT NULL,
  is_completed boolean DEFAULT false,
  progress_percent integer DEFAULT 0,
  last_played_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, meditation_id)
);

-- Create meditation_sessions table
CREATE TABLE meditation_sessions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  meditation_id bigint REFERENCES meditations(id) ON DELETE CASCADE NOT NULL,
  duration_seconds integer NOT NULL,
  completed boolean DEFAULT false,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  notes text
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Meditations policies
CREATE POLICY "Meditations are viewable by all authenticated users"
  ON meditations FOR SELECT
  TO authenticated
  USING (true);

-- User progress policies
CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Meditation sessions policies
CREATE POLICY "Users can view their own sessions"
  ON meditation_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
  ON meditation_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_meditation_sessions_user_id ON meditation_sessions(user_id);
CREATE INDEX idx_meditations_sequence_order ON meditations(sequence_order);
CREATE INDEX idx_user_progress_last_played ON user_progress(last_played_at);

-- Functions
CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = true AND OLD.completed = false THEN
    UPDATE profiles
    SET 
      total_minutes = total_minutes + (NEW.duration_seconds / 60),
      completed_sessions = completed_sessions + 1,
      last_meditation_date = NEW.completed_at
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update profile stats when a session is completed
CREATE TRIGGER update_profile_stats_trigger
  AFTER UPDATE ON meditation_sessions
  FOR EACH ROW
  WHEN (NEW.completed = true AND OLD.completed = false)
  EXECUTE FUNCTION update_profile_stats();