import React from 'react';
import { Check, Lock, Play, Repeat } from 'lucide-react'; // Add Replay icon for redo functionality
import { Meditation } from '../../types/meditation';

interface JourneyStepProps {
  meditation: Meditation;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  onClick: () => void;
  onRedo: () => void; // Add a function to reset progress
  orientation: 'horizontal' | 'vertical';
}

export function JourneyStep({
  meditation,
  isActive,
  isCompleted,
  isLocked,
  progress,
  onClick,
  onRedo,
  orientation,
}: JourneyStepProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`relative flex ${
        isHorizontal ? 'flex-col' : 'flex-row space-x-4'
      } items-center ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {/* Connection Line */}
      {isHorizontal ? (
        <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gray-200 hidden md:block" />
      ) : (
        <div className="absolute left-8 -top-12 h-12 w-0.5 bg-gray-200 md:hidden" />
      )}

      {/* Step Circle */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center relative
          ${
            isActive
              ? 'bg-indigo-500 text-white'
              : isCompleted
              ? 'bg-green-500 text-white'
              : isLocked
              ? 'bg-gray-200 text-gray-400'
              : 'bg-white text-indigo-500'
          }
          border-2 ${isActive ? 'border-indigo-600' : 'border-gray-200'}
          shadow-lg transition-all duration-300 hover:scale-105 shrink-0`}
      >
        {isActive ? (
          <div className="relative">
            <Play className="w-8 h-8" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full bg-green-500"
                style={{
                  transform: `scale(${progress / 100})`,
                }}
              />
            </div>
          </div>
        ) : isCompleted ? (
          <>
            <Check className="w-8 h-8" />
            {/* Add a redo icon if the task is completed */}
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the main onClick
                onRedo(); // Call the redo function
              }}
              className="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer"
            >
              <Repeat className="w-4 h-4 text-gray-600" />
            </div>
          </>
        ) : isLocked ? (
          <Lock className="w-6 h-6" />
        ) : (
          <Play className="w-8 h-8" />
        )}
      </div>

      {/* Title */}
      <div
        className={`${isHorizontal ? 'mt-2 text-center' : 'text-left'} ${
          isLocked ? 'text-gray-400' : 'text-gray-800'
        }`}
      >
        <h3 className="font-medium text-sm">{meditation.title}</h3>
        <p className="text-xs opacity-75">{meditation.duration}</p>
      </div>
    </button>
  );
}
