import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around">
        <button
          onClick={() => navigate('/journey')}
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/journey' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Journey</span>
        </button>
        
        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/profile' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </nav>
  );
}