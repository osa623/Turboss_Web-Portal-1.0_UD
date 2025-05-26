'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, updateUserEmail, updateUserPassword, reauthenticate } from '../lib/auth';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Home, 
  Check, 
  AlertCircle, 
  ChevronRight,
  Eye,
  EyeOff,
  Clock,
  Shield,
  MessageSquare
} from 'lucide-react';

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

  // New state variables for UI enhancements
  const [activeTab, setActiveTab] = useState('general');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

  // Handle tab switching
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Navigation header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
              <ArrowLeft size={18} className="mr-1" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
              <Home size={18} className="mr-1" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden border-4 border-white shadow-md">
                {user?.photoURL ? (
                  <Image 
                    src={user.photoURL} 
                    alt="Profile"
                    width={96} 
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.displayName ? user.displayName[0].toUpperCase() : 'U'
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
              </button>
            </div>
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-2xl font-bold">{displayName || 'User Profile'}</h1>
              <p className="text-gray-500">{email || 'No email set'}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  <Clock size={12} />
                  Member since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 mt-6 md:mt-0 w-full md:w-auto">
            <Link href="/profile/activity" className="inline-flex items-center justify-center md:justify-start px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              <MessageSquare size={16} className="mr-2" />
              View Community Activity
            </Link>
            <Link href="/profile/security" className="inline-flex items-center justify-center md:justify-start px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors">
              <Shield size={16} className="mr-2" />
              Security Settings
            </Link>
          </div>
        </div>
        
        {/* Alert message */}
        {message.text && (
          <div 
            className={`mb-6 p-4 rounded-lg flex items-start shadow-md ${
              message.type === 'success' 
                ? 'bg-green-50 border-l-4 border-green-500 text-green-700' 
                : 'bg-red-50 border-l-4 border-red-500 text-red-700'
            }`}
          >
            <div className={`p-1 rounded-full ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
              {message.type === 'success' ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <AlertCircle size={18} className="text-red-600" />
              )}
            </div>
            <span className="ml-3">{message.text}</span>
          </div>
        )}
        
        {/* Profile tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex flex-wrap -mb-px">
            <button
              onClick={() => handleTabChange('general')}
              className={`inline-flex items-center px-4 py-3 mr-4 text-sm font-medium ${
                activeTab === 'general'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`
            >
              <User size={18} className="mr-2" />
              General
            </button>
            <button
              onClick={() => handleTabChange('email')}
              className={`inline-flex items-center px-4 py-3 mr-4 text-sm font-medium ${
                activeTab === 'email'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`
            >
              <Mail size={18} className="mr-2" />
              Email
            </button>
            <button
              onClick={() => handleTabChange('password')}
              className={`inline-flex items-center px-4 py-3 mr-4 text-sm font-medium ${
                activeTab === 'password'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`
            >
              <Lock size={18} className="mr-2" />
              Password
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* General tab */}
          {activeTab === 'general' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User size={20} className="mr-2 text-orange-500" />
                Personal Information
              </h2>
              <form onSubmit={handleProfileUpdate} className="max-w-xl">
                <div className="mb-6">
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50"
                    placeholder="Enter your display name"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    This name will be visible to others in the community chat and forums
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      isUpdatingProfile
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {isUpdatingProfile ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 px-4 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Email tab */}
          {activeTab === 'email' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Mail size={20} className="mr-2 text-orange-500" />
                Email Address
              </h2>
              <form onSubmit={handleEmailUpdate} className="max-w-xl">
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50"
                    placeholder="your@email.com"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    We'll send a verification link to this email address
                  </p>
                </div>
                <div className="mb-6">
                  <label htmlFor="emailCurrentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="emailCurrentPassword"
                      value={emailCurrentPassword}
                      onChange={(e) => setEmailCurrentPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50"
                      placeholder="Enter your current password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Required for security purposes
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isUpdatingEmail}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      isUpdatingEmail
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {isUpdatingEmail ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        Update Email
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 px-4 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Password tab */}
          {activeTab === 'password' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Lock size={20} className="mr-2 text-orange-500" />
                Change Password
              </h2>
              <form onSubmit={handlePasswordUpdate} className="max-w-xl">
                <div className="mb-6">
                  <label htmlFor="passwordCurrentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="passwordCurrentPassword"
                      value={passwordCurrentPassword}
                      onChange={(e) => setPasswordCurrentPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50"
                      placeholder="Enter your current password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50"
                      placeholder="Create new password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                    <div className="mt-1 flex space-x-2">
                      <div className={`h-1 flex-1 rounded-full ${newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${newPassword.length >= 10 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50 ${
                        confirmPassword && newPassword !== confirmPassword
                          ? 'border-red-500'
                          : confirmPassword && newPassword === confirmPassword
                          ? 'border-green-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="mt-2 text-xs text-red-500">Passwords do not match</p>
                  )}
                  {confirmPassword && newPassword === confirmPassword && (
                    <p className="mt-2 text-xs text-green-500">Passwords match</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword || (confirmPassword && newPassword !== confirmPassword)}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      isUpdatingPassword || (confirmPassword && newPassword !== confirmPassword)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {isUpdatingPassword ? (
                      <>