import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AuthForm from './components/auth/AuthForm';
import PricingPlans from './components/subscription/PricingPlans';
import RequirementsForm from './components/RequirementsForm';
import RecommendationCard from './components/RecommendationCard';
import { Cpu } from 'lucide-react';
import HomePage from './components/home/HomePage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Cpu className="w-8 h-8 text-blue-500" />
                <span className="ml-2 text-xl font-semibold">Tech Stack Advisor AI</span>
              </div>
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-gray-600">{user.email}</span>
                    {!user.isPremium && (
                      <a href="/pricing" className="text-blue-600 hover:text-blue-500">
                        Upgrade to Premium
                      </a>
                    )}
                  </>
                ) : (
                  <a href="/login" className="text-blue-600 hover:text-blue-500">
                    Giriş Yap
                  </a>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <HomePage />} 
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="max-w-7xl mx-auto px-4 py-12">
                  <RequirementsForm
                    onSubmit={async (requirements) => {
                      // Handle form submission
                      console.log(requirements);
                    }}
                  />
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;