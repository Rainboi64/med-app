import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MeditationPlayer } from '../components/MeditationPlayer';
import { useMeditations } from '../hooks/useMeditations';

export function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meditations, loading } = useMeditations();
  const meditation = meditations.find(m => m.id === parseInt(id || '1', 10));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!meditation) {
    return <div>Meditation not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <button
        onClick={() => navigate('/journey')}
        className="mb-8 flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Journey
      </button>

      <div className="max-w-2xl mx-auto">
        <MeditationPlayer
          meditation={meditation}
          onComplete={() => {
            // Navigate to next meditation if available
            const nextMeditation = meditations.find(m => m.sequence_order === meditation.sequence_order + 1);
            if (nextMeditation) {
              navigate(`/player/${nextMeditation.id}`);
            } else {
              navigate('/journey');
            }
          }}
        />
      </div>
    </div>
  );
}