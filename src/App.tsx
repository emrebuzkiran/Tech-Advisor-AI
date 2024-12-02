import { TechnologyRecommendation } from './types/index';
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import PricingPlans from "./components/subscription/PricingPlans";
import RequirementsForm from "./components/RequirementsForm";
import RecommendationCard from "./components/RecommendationCard";
import LandingPage from "./components/landing/LandingPage";
import { Cpu, LogOut } from "lucide-react";
import { analyzeTechStack } from './utils/recommendationEngine';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { user, signOut, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <Cpu className="w-8 h-8 text-blue-500" />
                  <span className="ml-2 text-xl font-semibold">
                    Tech Stack Advisor AI
                  </span>
                </a>
              </div>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{user.email}</span>
                  {!user.isPremium && (
                    <a
                      href="/pricing"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Upgrade to Premium
                    </a>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="w-5 h-5 mr-1" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <a
                    href="/pricing"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Pricing
                  </a>
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </a>
                  <a
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="max-w-7xl mx-auto px-4 py-12">
                  <RequirementsForm
                    onSubmit={async (requirements) => {
                      // Handle form submission
                     analyzeTechStack(requirements);
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
