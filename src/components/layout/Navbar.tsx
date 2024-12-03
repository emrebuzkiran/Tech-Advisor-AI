import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Navbar() {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Cpu className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold">Tech Stack Advisor AI</span>
            </Link>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user.email}</span>
              {!user.isPremium && (
                <Link to="/pricing" className="text-blue-600 hover:text-blue-500">
                  Upgrade to Premium
                </Link>
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
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}