import React from 'react';
import { Flower } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Flower className="w-12 h-12 text-indigo-500" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Mindful Journey</h1>
      <p className="text-gray-600">Complete each practice to unlock your path to mindfulness</p>
    </header>
  );
}