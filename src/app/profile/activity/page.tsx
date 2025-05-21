'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getUserCommunityActivity } from '../../lib/messageService';
import Link from 'next/link';
import { MessageSquare, Reply, Calendar, Clock } from 'lucide-react';

export default function UserActivity() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activity, setActivity] = useState<{
    messages: any[];
    replies: any[];
  }>({ messages: [], replies: [] });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/loginpage');
      return;
    }
    
    if (user) {
      loadUserActivity();
    }
  }, [user, authLoading, router]);
  
  const loadUserActivity = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const userActivity = await getUserCommunityActivity(user.uid);
      setActivity(userActivity);
      console.log("Loaded user activity:", userActivity);
    } catch (error) {
      console.error("Error loading user activity:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '';
    }
  };
  
  if (authLoading || !user) return null;
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Community Activity</h1>
            <p className="text-sm text-gray-400 mt-1">All your messages and replies are visible to the public community</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/profile" 
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
            >
              Back to Profile
            </Link>
            <Link 
              href="/communitychat/chat_interface" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors"
            >
              Community Chat
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Messages Section */}
            <div className="bg-gray-900 shadow-xl rounded-lg p-6 border border-gray-800">
              <div className="flex items-center mb-4 pb-2 border-b border-gray-800">
                <MessageSquare size={20} className="text-orange-500 mr-2" />
                <h2 className="text-2xl font-semibold">Your Messages ({activity.messages.length})</h2>
              </div>
              
              {activity.messages.length === 0 ? (
                <div className="py-8 text-center bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">You haven't posted any messages yet.</p>
                  <Link 
                    href="/communitychat/chat_interface" 
                    className="inline-block mt-4 text-orange-500 hover:text-orange-400"
                  >
                    Start a conversation
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activity.messages.map((message) => (
                    <div key={message.id} className="border-b border-gray-800 pb-4 hover:bg-gray-800/30 p-3 rounded transition-colors">
                      <Link href={`/communitychat/chat_interface?q=${message.messageId}`} className="block hover:text-orange-400 font-medium transition-colors">
                        {message.content}
                      </Link>
                      <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
                        <span className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(message.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Replies Section */}
            <div className="bg-gray-900 shadow-xl rounded-lg p-6 border border-gray-800">
              <div className="flex items-center mb-4 pb-2 border-b border-gray-800">
                <Reply size={20} className="text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold">Your Replies ({activity.replies.length})</h2>
              </div>
              
              {activity.replies.length === 0 ? (
                <div className="py-8 text-center bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">You haven't replied to any messages yet.</p>
                  <Link 
                    href="/communitychat/chat_interface" 
                    className="inline-block mt-4 text-blue-500 hover:text-blue-400"
                  >
                    Join the conversation
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activity.replies.map((reply) => (
                    <div key={reply.id} className="border-b border-gray-800 pb-4 hover:bg-gray-800/30 p-3 rounded transition-colors">
                      <Link href={`/communitychat/chat_interface?q=${reply.parentId}`} className="block hover:text-blue-400 font-medium transition-colors">
                        {reply.content}
                      </Link>
                      <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
                        <span className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(reply.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatTime(reply.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
