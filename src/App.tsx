import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { JourneyPage } from './pages/JourneyPage';
import { PlayerPage } from './pages/PlayerPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { BottomNav } from './components/BottomNav';
import { AuthProvider } from './components/AuthProvider';
import { useAuthContext } from './components/AuthProvider';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <div className="pb-16">
        <Routes>
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? <Navigate to="/journey" /> : <AuthPage />
            } 
          />
          <Route 
            path="/journey" 
            element={
              <ProtectedRoute>
                <JourneyPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/player/:id" 
            element={
              <ProtectedRoute>
                <PlayerPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/journey" />
              ) : (
                <Navigate to="/auth" />
              )
            } 
          />
        </Routes>
      </div>
      {isAuthenticated && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}