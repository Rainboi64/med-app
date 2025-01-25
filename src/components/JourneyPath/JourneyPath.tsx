import React, { useState } from 'react';
import { JourneyStep } from './JourneyStep';
import { Meditation, MeditationProgress } from '../../types/meditation';

interface JourneyPathProps {
  meditations: Meditation[];
  currentMeditation: Meditation;
  progress: MeditationProgress[];
  onSelect: (meditation: Meditation) => void;
  audioProgress: number;
}

export function JourneyPath({
  meditations,
  currentMeditation,
  progress,
  onSelect,
  audioProgress,
}: JourneyPathProps) {
  // Use a state to manage the progress of meditations (resettable)
  const [meditationProgress, setMeditationProgress] =
    useState<MeditationProgress[]>(progress);

  // Handle resetting progress (to allow "redo")
  const handleRedoProgress = (meditationId: number) => {
    setMeditationProgress((prevProgress) =>
      prevProgress.map((p) =>
        p.id === meditationId ? { ...p, completed: false, progress: 0 } : p
      )
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex md:flex-row flex-col items-center md:items-start md:space-x-16 space-y-12 md:space-y-0 md:overflow-x-auto pb-8 px-8">
        {meditations.map((meditation, index) => {
          const progressForMeditation = meditationProgress.find(
            (p) => p.id === meditation.id
          );
          const isCompleted = progressForMeditation?.completed;
          const isActive = currentMeditation.id === meditation.id;

          return (
            <JourneyStep
              key={meditation.id}
              meditation={meditation}
              isActive={isActive}
              isCompleted={!!isCompleted}
              isLocked={false} // Always set to false to keep tracks unlocked
              progress={isActive ? 100 : 0}
              onClick={() => onSelect(meditation)}
              onRedo={() => handleRedoProgress(meditation.id)}
              orientation={window.innerWidth >= 768 ? 'horizontal' : 'vertical'}
            />
          );
        })}
      </div>
    </div>
  );
}