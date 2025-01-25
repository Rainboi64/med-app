import React from 'react';
import { Meditation } from '../data/meditations';
import { Play } from 'lucide-react';

interface MeditationListProps {
  meditations: Meditation[];
  currentMeditation: Meditation;
  onSelect: (meditation: Meditation) => void;
}

export function MeditationList({ meditations, currentMeditation, onSelect }: MeditationListProps) {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Meditation Sessions</h2>
      <div className="space-y-2">
        {meditations.map((meditation) => (
          <button
            key={meditation.id}
            onClick={() => onSelect(meditation)}
            className={`w-full flex items-center justify-between p-4 rounded-lg ${
              currentMeditation.id === meditation.id
                ? 'bg-indigo-50 border-2 border-indigo-500'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className="mr-4">
                {currentMeditation.id === meditation.id ? (
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">{meditation.id}</span>
                  </div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800">{meditation.title}</h3>
                <p className="text-sm text-gray-500">{meditation.duration}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}