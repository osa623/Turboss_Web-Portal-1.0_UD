import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Message, getTopLevelMessagesRealtime, getRepliesRealtime, addMessage, addReply, upvoteMessage } from '../lib/messageService';
import MessageItem from './MessageItem';
import MessageComposer from './MessageComposer';

interface MessageThreadProps {
  initialFilter?: 'all' | 'mine' | 'unanswered';
  className?: string;
}

const MessageThread: React.FC<MessageThreadProps> = ({ 
  initialFilter = 'all',
  className = ''
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'mine' | 'unanswered'>(initialFilter);
  const { user } = useAuth();

  // State for debug information
  const [rawMessagesCount, setRawMessagesCount] = useState(0);
  const [uniqueUserIdsCount, setUniqueUserIdsCount] = useState(0);

  // Load top-level messages with real-time updates
  useEffect(() => {
    setLoading(true);
    
    console.log(`[DEBUG] Setting up message listener. Initial filter prop from page: ${initialFilter}`);
    
    const unsubscribe = getTopLevelMessagesRealtime((loadedMessages, isFromCache) => {
      // Deep copy for reliable logging, as objects in console can update.
      const messagesToLog = JSON.parse(JSON.stringify(loadedMessages));
      console.log(`[DEBUG] Received ${loadedMessages.length} messages from getTopLevelMessagesRealtime:`, messagesToLog);
      
      const userIds = new Set(loadedMessages.map(msg => msg.userId));
      console.log(`[DEBUG] Messages from ${userIds.size} different users. User IDs present:`, Array.from(userIds));
      
      setMessages(loadedMessages);
      // Update debug state
      setRawMessagesCount(loadedMessages.length);
      setUniqueUserIdsCount(userIds.size);

      setLoading(false);
      setFromCache(!!isFromCache);
    });
    
    return () => {
      console.log("[DEBUG] Cleaning up message listener");
      unsubscribe();
    };
  }, []);

  // Load replies for a specific message
  const loadReplies = (messageId: string) => {
    const unsubscribe = getRepliesRealtime(messageId, (replies) => {
      setMessages(currentMessages => {
        return currentMessages.map(msg => {
          if (msg.id === messageId) {
            return { ...msg, replies, isExpanded: true };
          } else {
            return msg;
          }
        });
      });
    });
    
    return unsubscribe;
  };

  // Toggle expanding/collapsing a message's replies
  const toggleReplies = (messageId: string) => {
    setMessages(currentMessages => 
      currentMessages.map(msg => {
        if (msg.id === messageId) {
          // If we're expanding and there are no replies loaded yet, load them
          if (!msg.isExpanded && (!msg.replies || msg.replies.length === 0)) {
            loadReplies(messageId);
          }
          
          return { ...msg, isExpanded: !msg.isExpanded };
        }
        return msg;
      })
    );
  };

  // Handle sending a new top-level message
  const handleSendMessage = async (text: string) => {
    if (!user) return;
    try {
      await addMessage(text, user);
      // The real-time listener will handle updating the UI
    } catch (error: any) {
      console.error('Error sending message:', error);
      alert(error?.message || 'Failed to send message. Please try again.');
    }
  };

  // Handle sending a reply to a message
  const handleSendReply = async (parentId: string, text: string) => {
    if (!user) return;
    try {
      await addReply(text, parentId, user);
      // The real-time listener will handle updating the UI
    } catch (error: any) {
      console.error('Error sending reply:', error);
      alert(error?.message || 'Failed to send reply. Please try again.');
    }
  };
  
  // Handle upvoting a message
  const handleUpvote = async (messageId: string) => {
    if (!user) return;
    
    try {
      await upvoteMessage(messageId, user.uid);
      // The real-time listener will handle updating the UI
    } catch (error) {
      console.error('Error upvoting message:', error);
    }
  };
  
  // Filter messages based on selected filter
  const filteredMessages = messages.filter(msg => {
    if (filterType === 'mine' && user) {
      return msg.userId === user.uid;
    } else if (filterType === 'unanswered') {
      return !msg.replies || msg.replies.length === 0;
    }
    return true; // Show all for 'all' filter
  });

  useEffect(() => {
    console.log(`[DEBUG] Filter type changed to: ${filterType}. Displaying ${filteredMessages.length} messages.`);
  }, [filterType, filteredMessages.length]); // Log when filter or displayed count changes

  return (
    <div className={`flex flex-col space-y-4 w-full ${className}`}>
      {/* DEBUG Information Panel - REMOVE FOR PRODUCTION */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
        <p className="font-bold">Community Chat - Debug Information:</p>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li>Raw messages received from service: <strong>{rawMessagesCount}</strong></li>
          <li>Unique user IDs in raw messages: <strong>{uniqueUserIdsCount}</strong></li>
          <li>Current UI filter: "<strong>{filterType}</strong>"</li>
          <li>Messages displayed after UI filter: <strong>{filteredMessages.length}</strong></li>
          {user && <li>Your User ID: <code>{user.uid}</code></li>}
          {!user && <li>User status: Not logged in</li>}
        </ul>
        <p className="text-xs mt-3">
          <strong>Important:</strong> All messages and replies are public and visible to everyone. If you see only your own messages, check the <code>getTopLevelMessagesRealtime</code> function in <code>messageService.ts</code> to ensure it does not filter by user.
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex space-x-2 mb-4">
        <button 
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filterType === 'all' 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Messages ({messages.length})
        </button>
        
        {user && (
          <button 
            onClick={() => setFilterType('mine')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterType === 'mine' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            My Messages ({messages.filter(msg => user && msg.userId === user.uid).length})
          </button>
        )}
        
        <button 
          onClick={() => setFilterType('unanswered')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filterType === 'unanswered' 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Unanswered ({messages.filter(msg => !msg.replies || msg.replies.length === 0).length})
        </button>
      </div>
      
      {/* Offline indicator if data is from cache */}
      {fromCache && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg mb-4 text-sm">
          You're viewing cached data. Some content may not be up to date.
        </div>
      )}
      
      {/* Message composer for new top-level messages */}
      {user ? (
        <MessageComposer 
          onSendMessage={handleSendMessage} 
          placeholder="Start a new conversation..." 
        />
      ) : (
        <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 mb-4">
          Please log in to participate in the conversation.
        </div>
      )}
      
      {/* Loading State */}
      {loading && rawMessagesCount === 0 && ( // Show loading only if no messages yet
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}
      
      {/* Empty State */}
      {!loading && filteredMessages.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg p-6">
          <p className="mb-4">
            {rawMessagesCount === 0 ? "No messages in the community yet." : "No messages match your current filter."}
          </p>
          {filterType !== 'all' && rawMessagesCount > 0 && (
            <button 
              onClick={() => setFilterType('all')}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              View all messages instead
            </button>
          )}
        </div>
      )}
      
      {/* Message list */}
      {!loading && filteredMessages.length > 0 && (
        <div className="space-y-4">
          {filteredMessages.map(message => (
            <MessageItem 
              key={message.id} 
              message={message} 
              onToggleReplies={toggleReplies}
              onSendReply={handleSendReply}
              onUpvote={handleUpvote}
              currentUserId={user?.uid}
              isCurrentUserMessage={user?.uid === message.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageThread;
