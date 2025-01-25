import React from 'react';
import { Clock, Calendar, Award } from 'lucide-react';
import { SignOutButton } from '../components/SignOutButton';
import { useUserProfile } from '../hooks/useUserProfile';

export function ProfilePage() {
  const { profile, recentSessions, loading } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Unable to load profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20">
      <div className="max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
          <SignOutButton />
        </div>

        <div className="grid gap-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-800">Total Time</h2>
              </div>
              <p className="text-2xl font-bold text-indigo-600">{profile.total_minutes} min</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-800">Sessions</h2>
              </div>
              <p className="text-2xl font-bold text-indigo-600">{profile.completed_sessions}</p>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 text-indigo-500" />
              <h2 className="text-lg font-semibold text-gray-800">Current Streak</h2>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-indigo-600">{profile.current_streak} days</p>
              {profile.longest_streak > 0 && (
                <p className="text-sm text-gray-500">
                  Best: {profile.longest_streak} days
                </p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentSessions.length > 0 ? (
                recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">
                        {session.meditations?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {Math.floor(session.duration_seconds / 60)} minutes
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(session.completed_at || '').toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No meditation sessions yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}