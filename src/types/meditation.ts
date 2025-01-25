export interface Meditation {
  id: number;
  title: string;
  duration: string;
  audioUrl: string;
}

export interface MeditationProgress {
  id: number;
  completed: boolean;
}