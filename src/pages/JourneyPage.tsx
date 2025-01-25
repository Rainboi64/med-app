import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { JourneyPath } from '../components/JourneyPath/JourneyPath';
import { useMeditations } from '../hooks/useMeditations';
import { useUserMeditationProgress } from '../hooks/useUserMeditationProgress';

export function JourneyPage() {
  const navigate = useNavigate();
  const { meditations, loading } = useMeditations();
  const {
    progress,
    loading: progressLoading,
    refreshProgress,
  } = useUserMeditationProgress();
  const [currentMeditation, setCurrentMeditation] = useState<any>(null);

  useEffect(() => {
    if (meditations.length > 0 && !currentMeditation) {
      setCurrentMeditation(meditations[0]);
    }
  }, [meditations, currentMeditation]);

  // Refresh progress when the component mounts
  useEffect(() => {
    refreshProgress();
  }, []);

  if (loading || progressLoading || !currentMeditation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  const handleMeditationSelect = (meditationId: number) => {
    navigate(`/player/${meditationId}`);
  };

  const mappedMeditations = meditations.map((m) => ({
    id: m.id,
    title: m.title,
    duration: `${Math.floor(m.duration_seconds / 60)}:${(
      m.duration_seconds % 60
    )
      .toString()
      .padStart(2, '0')}`,
    audioUrl: m.audio_url,
  }));

  const mappedProgress = progress.map((p) => ({
    id: p.meditation_id,
    completed: p.is_completed,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-6xl mx-auto">
        <Header />
        <JourneyPath
          meditations={mappedMeditations}
          currentMeditation={currentMeditation}
          progress={mappedProgress}
          onSelect={(meditation) => handleMeditationSelect(meditation.id)}
          audioProgress={
            progress.find((p) => p.meditation_id === currentMeditation?.id)
              ?.progress_percent || 0
          }
        />
      </div>
    </div>
  );
}
