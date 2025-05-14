'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, updateUserEmail, updateUserPassword, reauthenticate } from '../lib/auth';

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  
  // Separate state variables for email and password forms
  const [emailCurrentPassword, setEmailCurrentPassword] = useState('');
  const [passwordCurrentPassword, setPasswordCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/loginpage');
    } else if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user, loading, router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    try {
      setIsUpdatingProfile(true);
      await updateUserProfile(displayName);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      console.error("Profile update error:", error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (!emailCurrentPassword) {
      setMessage({ type: 'error', text: 'Current password is required to update email' });
      return;
    }
    
    try {
      setIsUpdatingEmail(true);
      await reauthenticate(emailCurrentPassword);
      await updateUserEmail(email);
      setMessage({ type: 'success', text: 'Email updated successfully!' });
      setEmailCurrentPassword(''); // Clear password field after success
    } catch (error: any) {
      console.error("Email update error:", error);
      
      if (error.code === 'auth/wrong-password') {
        setMessage({ type: 'error', text: 'Incorrect current password.' });
      } else if (error.code === 'auth/email-already-in-use') {
        setMessage({ type: 'error', text: 'Email address is already in use by another account.' });
      } else if (error.code === 'auth/invalid-email') {
        setMessage({ type: 'error', text: 'Invalid email format.' });
      } else if (error.code === 'auth/requires-recent-login') {
        setMessage({ type: 'error', text: 'This operation requires recent authentication. Please log out and log back in before retrying.' });
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to update email' });
      }
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (!passwordCurrentPassword) {
      setMessage({ type: 'error', text: 'Current password is required to update password' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }
    
    try {
      setIsUpdatingPassword(true);
      
      // First, re-authenticate the user to confirm their identity
      console.log("Re-authenticating user...");
      await reauthenticate(passwordCurrentPassword);
      
      // Then update the password
      console.log("Updating password...");
      await updateUserPassword(newPassword);
      
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordCurrentPassword(''); // Clear password field after success
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error("Password update error:", error);
      
      if (error.code === 'auth/wrong-password') {
        setMessage({ type: 'error', text: 'Incorrect current password.' });
      } else if (error.code === 'auth/weak-password') {
        setMessage({ type: 'error', text: 'Password is too weak. Please choose a stronger password.' });
      } else if (error.code === 'auth/requires-recent-login') {
        setMessage({ type: 'error', text: 'This operation requires recent authentication. Please log out and log back in before retrying.' });
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to update password' });
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Profile</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Home
            </button>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Update Profile Section */}
          <div className="bg-primary text-secondary shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:bg-gray-400"
              >
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Update Email Section */}
          <div className="bg-primary text-secondary shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Update Email</h2>
            <form onSubmit={handleEmailUpdate}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="emailCurrentPassword" className="block text-sm font-medium mb-1">
                  Current Password (required to update email)
                </label>
                <input
                  type="password"
                  id="emailCurrentPassword"
                  value={emailCurrentPassword}
                  onChange={(e) => setEmailCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingEmail}
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:bg-gray-400"
              >
                {isUpdatingEmail ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </div>

          {/* Update Password Section */}
          <div className="bg-primary text-secondary shadow-lg rounded-lg p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-4">
                <label htmlFor="passwordCurrentPassword" className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="passwordCurrentPassword"
                  value={passwordCurrentPassword}
                  onChange={(e) => setPasswordCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:bg-gray-400"
              >
                {isUpdatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
