export interface Meditation {
  id: number;
  title: string;
  duration: string;
  audioUrl: string;
}

export const meditations: Meditation[] = [
  {
    id: 1,
    title: "Breath Awareness",
    duration: "10:00",
    audioUrl: "/meditations/breath-awareness.mp3"
  },
  {
    id: 2,
    title: "Body Scan",
    duration: "15:00",
    audioUrl: "/meditations/body-scan.mp3"
  },
  {
    id: 3,
    title: "Loving Kindness",
    duration: "12:00",
    audioUrl: "/meditations/loving-kindness.mp3"
  },
  {
    id: 4,
    title: "Mindful Walking",
    duration: "10:00",
    audioUrl: "/meditations/mindful-walking.mp3"
  },
  {
    id: 5,
    title: "Gratitude Practice",
    duration: "8:00",
    audioUrl: "/meditations/gratitude.mp3"
  },
  {
    id: 6,
    title: "Stress Relief",
    duration: "15:00",
    audioUrl: "/meditations/stress-relief.mp3"
  },
  {
    id: 7,
    title: "Sleep Meditation",
    duration: "20:00",
    audioUrl: "/meditations/sleep.mp3"
  },
  {
    id: 8,
    title: "Morning Energy",
    duration: "10:00",
    audioUrl: "/meditations/morning-energy.mp3"
  },
  {
    id: 9,
    title: "Anxiety Relief",
    duration: "12:00",
    audioUrl: "/meditations/anxiety-relief.mp3"
  },
  {
    id: 10,
    title: "Deep Relaxation",
    duration: "15:00",
    audioUrl: "/meditations/deep-relaxation.mp3"
  }
];