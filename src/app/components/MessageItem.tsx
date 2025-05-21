import React, { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp, Reply, Trash, ThumbsUp, User } from 'lucide-react';
import { Message } from '../lib/messageService';
import MessageComposer from './MessageComposer';

interface MessageItemProps {
  message: Message;
  onToggleReplies: (messageId: string) => void;
  onSendReply: (parentId: string, text: string) => Promise<void>;
  onUpvote: (messageId: string) => Promise<void>;
  currentUserId?: string;
  isCurrentUserMessage?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  onToggleReplies,
  onSendReply,
  onUpvote,
  currentUserId,
  isCurrentUserMessage = false
}) => {
  const [isReplying, setIsReplying] = useState(false);
  
  // Format timestamp for display
  const formattedTime = message.timestamp ? 
    formatDistanceToNow(message.timestamp.toDate(), { addSuffix: true }) : 
    'Just now';
  
  // Calculate left margin based on depth for nested appearance
  const marginLeft = message.depth ? `${message.depth * 1.5}rem` : '0';
  
  // Handle reply toggle
  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };
  
  // Send a reply
  const handleSendReply = async (text: string) => {
    await onSendReply(message.id, text);
    setIsReplying(false);
  };
  
  // Handle upvote
  const handleUpvote = async () => {
    await onUpvote(message.id);
  };
  
  const isUpvoted = currentUserId && message.upvotedBy?.includes(currentUserId);
  
  // Determine border color based on if it's the current user's message
  const borderColor = isCurrentUserMessage 
    ? "border-orange-200 hover:border-orange-300" 
    : "border-gray-200 hover:border-blue-200";
  
  return (
    <div 
      className="transition-all duration-200" 
      style={{ marginLeft }}
    >
      <div className={`bg-white rounded-lg shadow p-4 border ${borderColor} transition-colors`}>
        {/* User badge if it's the current user's message */}
        {isCurrentUserMessage && (
          <div className="mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
              <User size={12} className="mr-1" />
              Your message
            </span>
          </div>
        )}
      
        {/* Message header with user info */}
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            {message.userPhotoURL ? (
              <Image 
                src={message.userPhotoURL} 
                alt={message.userName} 
                width={40}
                height={40}
                className="object-cover"
                onError={(e) => {
                  // Fallback for image load errors
                  (e.target as HTMLImageElement).src = '/placeholders/default-avatar.jpg';
                }}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-blue-500 text-white text-xl font-bold">
                {message.userName?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">{message.userName}</h3>
            <p className="text-xs text-gray-500">{formattedTime}</p>
          </div>
        </div>
        
        {/* Message content */}
        <div className="ml-12">
          <p className="text-gray-800 whitespace-pre-line">{message.text}</p>
          
          {/* Message actions */}
          <div className="flex items-center mt-3 space-x-2 text-gray-500">
            <button
              onClick={handleUpvote}
              disabled={isUpvoted}
              className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-colors ${
                isUpvoted 
                  ? 'bg-orange-50 text-orange-500' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <ThumbsUp size={14} />
              <span className="text-sm">{message.upvotes || 0}</span>
            </button>
            
            {currentUserId && (
              <button 
                onClick={handleReplyClick}
                className="flex items-center space-x-1 text-sm hover:text-blue-600 transition-colors"
              >
                <Reply size={16} />
                <span>{isReplying ? 'Cancel' : 'Reply'}</span>
              </button>
            )}
            
            {/* Only show toggle if there are replies or if it's expanded */}
            {(message.replies?.length > 0 || message.isExpanded) && (
              <button
                onClick={() => onToggleReplies(message.id)}
                className="flex items-center space-x-1 text-sm hover:text-blue-600 transition-colors ml-3"
              >
                {message.isExpanded ? (
                  <>
                    <ChevronUp size={16} />
                    <span>Hide Replies ({message.replies?.length || 0})</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    <span>Show Replies ({message.replies?.length || 0})</span>
                  </>
                )}
              </button>
            )}
            
            {/* Delete option (only for user's own messages) */}
            {currentUserId === message.userId && (
              <button className="flex items-center space-x-1 text-sm hover:text-red-600 transition-colors ml-auto">
                <Trash size={16} />
                <span>Delete</span>
              </button>
            )}
          </div>
          
          {/* Reply composer */}
          {isReplying && (
            <div className="mt-3">
              <MessageComposer 
                onSendMessage={handleSendReply}
                placeholder="Write a reply..."
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Nested replies */}
      {message.isExpanded && message.replies && message.replies.length > 0 && (
        <div className="mt-2 space-y-2 border-l-2 border-gray-100 pl-2">
          {message.replies.map(reply => (
            <MessageItem
              key={reply.id}
              message={reply}
              onToggleReplies={onToggleReplies}
              onSendReply={onSendReply}
              onUpvote={onUpvote}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageItem;
