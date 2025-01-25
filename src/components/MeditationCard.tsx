import React from 'react';
import { Play, Lock, Check } from 'lucide-react';
import { ProgressCircle } from './ProgressCircle';
import { Meditation } from '../types/meditation';

interface MeditationCardProps {
  meditation: Meditation;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  onClick: () => void;
}

export function MeditationCard({
  meditation,
  isActive,
  isCompleted,
  isLocked,
  progress,
  onClick
}: MeditationCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full flex items-center p-4 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-indigo-50 border-2 border-indigo-500'
          : isCompleted
          ? 'bg-green-50 border border-green-200'
          : isLocked
          ? 'bg-gray-50 border border-gray-200 opacity-75 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="mr-4">
        {isActive ? (
          <ProgressCircle progress={progress} />
        ) : isCompleted ? (
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
        ) : isLocked ? (
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center">
            <Play className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className="flex-1 text-left">
        <h3 className={`font-medium ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
          {meditation.title}
        </h3>
        <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
          {meditation.duration}
        </p>
      </div>
    </button>
  );
}