import React, { useState } from 'react';
import { Send, Smile, Image as ImageIcon, X } from 'lucide-react';

interface MessageComposerProps {
  onSendMessage: (text: string) => Promise<void>;
  placeholder?: string;
  className?: string;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ 
  onSendMessage,
  placeholder = 'Type a message...',
  className = ''
}) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await onSendMessage(text.trim());
      setText('');
    } catch (error) {
      console.error('Error in message composer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={text.split('\n').length > 3 ? 5 : 3}
          className="w-full px-4 py-3 text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
          disabled={isSubmitting}
        />
        
        <div className="flex items-center bg-gray-50 px-3 py-2 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Add image"
            >
              <ImageIcon size={20} />
            </button>
          </div>
          
          <div className="ml-auto flex items-center space-x-2">
            {text.trim() && (
              <button
                type="button"
                onClick={() => setText('')}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="Clear message"
              >
                <X size={20} />
              </button>
            )}
            <button
              type="submit"
              disabled={!text.trim() || isSubmitting}
              className={`px-4 py-1.5 rounded-full flex items-center space-x-2 text-white font-medium transition-colors ${
                text.trim() && !isSubmitting
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-orange-400 cursor-not-allowed'
              }`}
            >
              <span>Send</span>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-orange-600"></div>
        </div>
      )}
    </form>
  );
};

export default MessageComposer;
