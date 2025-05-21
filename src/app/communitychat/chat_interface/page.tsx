'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, Search, Filter, ArrowLeft, Users } from 'lucide-react';
import MessageThread from '../../components/MessageThread';
import ConnectionStatus from '../../components/ConnectionStatus';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'mine' | 'unanswered'>('all');
  
  const chatFeedRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if we should highlight a specific question from URL
  const highlightQuestionId = searchParams.get('q');

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-100 font-poppins">
      {/* Add the connection status component */}
      <ConnectionStatus />
      
      {/* Background Layer with subtle gradient */}
      <div className="fixed inset-0 z-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-30"></div>
          <div className="absolute h-full w-full bg-gradient-radial from-indigo-500/5 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Content Layer - Chat Interface */}
      <div className="relative z-10 min-h-screen w-full overflow-y-auto pb-24">
        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md bg-gray-900/60 border-b border-gray-800/50 shadow-lg">
          <div className="container mx-auto py-4 px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Link 
                  href="/communitychat"
                  className="mr-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  <ArrowLeft size={18} />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Community <span className="text-orange-500">Chat</span>
                  <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Public</span>
                </h1>
              </div>
              
              <div className="flex items-center">
                <div className="relative rounded-full bg-gray-800/60 border border-gray-700/50 shadow-inner flex items-center px-3 w-full md:w-64">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search topics..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent py-2 text-sm w-full focus:outline-none text-gray-200"
                  />
                </div>
                
                <Link 
                  href="/profile/activity" 
                  className="ml-2 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  title="My Activity"
                >
                  <Users size={18} />
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="container mx-auto p-6">
          {/* Show public visibility info to all users */}
          <div className="bg-gray-800/60 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white text-lg mb-1">
                  <span className="text-green-400 font-semibold">Public Community Feed</span> - See messages from all users
                </h3>
                <p className="text-gray-300 text-sm">
                  All messages and replies are visible to everyone. 
                  {!user && " Log in to participate in the conversation."}
                </p>
              </div>
              {!user && (
                <button 
                  onClick={() => router.push('/auth/loginpage')}
                  className="px-4 py-2 bg-orange-600 rounded-lg text-white whitespace-nowrap"
                >
                  Log In to Participate
                </button>
              )}
            </div>
          </div>
          
          {/* Filter controls */}
          <div className="mb-8 p-4 rounded-xl bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 shadow-lg">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
              <div className="flex space-x-2 mb-3 md:mb-0">
                <button 
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-full ${
                    filterType === 'all' 
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20' 
                      : 'bg-gray-700/70 text-gray-300 border border-gray-600/30'
                  } font-medium text-sm transition-all duration-300 hover:-translate-y-0.5`}
                >
                  Everyone's Messages
                </button>
                <button 
                  onClick={() => setFilterType('unanswered')}
                  className={`px-4 py-2 rounded-full ${
                    filterType === 'unanswered' 
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20' 
                      : 'bg-gray-700/70 text-gray-300 border border-gray-600/30'
                  } font-medium text-sm transition-all duration-300 hover:-translate-y-0.5`}
                >
                  Unanswered
                </button>
                {user && (
                  <button 
                    onClick={() => setFilterType('mine')}
                    className={`px-4 py-2 rounded-full ${
                      filterType === 'mine' 
                        ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20' 
                        : 'bg-gray-700/70 text-gray-300 border border-gray-600/30'
                    } font-medium text-sm transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    Only My Messages
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Search results info */}
          {searchTerm && (
            <div className="mb-4 p-3 bg-gray-800/30 rounded-lg text-gray-300 text-sm">
              Showing results for: <span className="font-semibold text-white">{searchTerm}</span>
              <button 
                onClick={() => setSearchTerm('')}
                className="ml-2 text-orange-400 hover:text-orange-300"
              >
                Clear
              </button>
            </div>
          )}
          
          {/* The Message Thread component handles all the chat UI */}
          <div ref={chatFeedRef} className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/30">
            <MessageThread 
              initialFilter={filterType}
            />
          </div>
          
          {/* Highlighted Question Indicator */}
          {highlightQuestionId && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center space-x-2">
                <MessageSquare size={16} />
                <span>Viewing highlighted message</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
