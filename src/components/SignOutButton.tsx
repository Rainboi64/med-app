import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={signOut}
      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-medium"
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
}