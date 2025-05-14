'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logoutUser } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/loginpage');
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      router.push('/auth/loginpage');
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  // Parse the display name to get first and last name
  const displayNameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
  const firstName = displayNameParts[0] || '';
  const lastName = displayNameParts.slice(1).join(' ') || '';

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <div className="flex space-x-4">
            <Link href="/profile" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
              Profile
            </Link>
            <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>

        <div className="bg-primary shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Welcome to Turboss Garage</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2 text-secondary">Your Profile</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p className="mb-2"><span className="font-semibold">Name:</span> {firstName} {lastName}</p>
              <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Account ID:</span> {user.uid}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Car Collection</h3>
              <p className="text-gray-700">View your saved vehicles and configurations</p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Garage Tools</h3>
              <p className="text-gray-700">Explore the tools and equipment in your garage</p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Technical Guides</h3>
              <p className="text-gray-700">Access specialized guides and tutorials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
