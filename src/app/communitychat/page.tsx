'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageSquare, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function CommunityLanding() {
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-orange-500">Turboss</span> Community Chat
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our public community where car enthusiasts share knowledge, ask questions, and help each other. All questions and answers are public and visible to everyone.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-lg">
            <div className="bg-orange-600/20 p-3 rounded-full w-fit mb-6">
              <MessageSquare size={24} className="text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Public Discussions</h2>
            <p className="text-gray-300 mb-6">
              All questions and answers are public, creating a knowledge base that helps everyone in the community.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-lg">
            <div className="bg-blue-600/20 p-3 rounded-full w-fit mb-6">
              <Users size={24} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Expert Contributors</h2>
            <p className="text-gray-300 mb-6">
              Get answers from passionate car enthusiasts and experts who have proven their knowledge.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-lg">
            <div className="bg-green-600/20 p-3 rounded-full w-fit mb-6">
              <TrendingUp size={24} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Build Reputation</h2>
            <p className="text-gray-300 mb-6">
              Earn reputation by posting helpful answers and asking good questions that help others.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-gray-800/70 to-gray-700/50 rounded-2xl p-8 border border-gray-600/50 shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to join the conversation?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push('/communitychat/chat_interface')}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-lg text-white font-semibold flex items-center justify-center"
            >
              <span>Browse Public Discussions</span>
              <ChevronRight size={20} className="ml-2" />
            </button>
            
            {!loading && !user && (
              <button
                onClick={() => router.push('/auth/loginpage')}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold"
              >
                Login to Participate
              </button>
            )}
          </div>
          
          <p className="mt-4 text-gray-300">
            No account needed to browse. Create an account to ask questions and post answers.
          </p>
        </div>
      </div>
      
      {/* Add the Footer component */}
      <Footer />
    </div>
  );
}
