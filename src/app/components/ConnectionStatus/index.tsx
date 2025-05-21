'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Database } from 'lucide-react';
import { isFirestoreOnline, setFirestoreNetwork } from '../../lib/firestore';

export const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [networkStatus, setNetworkStatus] = useState(navigator?.onLine ?? true);
  const [firestoreStatus, setFirestoreStatus] = useState(isFirestoreOnline());
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);
  const [offlineDocPath, setOfflineDocPath] = useState<string | null>(null);
  const [usingCache, setUsingCache] = useState(false);
  
  // Handle manual reconnection attempt
  const handleReconnect = async () => {
    if (!navigator.onLine) {
      setMessage("Your device appears to be offline. Please check your internet connection.");
      setShowMessage(true);
      return;
    }
    
    setIsRetrying(true);
    try {
      await setFirestoreNetwork(true);
      setMessage("Reconnection successful! Your data is now syncing.");
      setFirestoreStatus(true);
      setIsOnline(true);
      setShowMessage(true);
      
      // Automatically hide success message after 3 seconds
      setTimeout(() => {
        if (isOnline) {
          setShowMessage(false);
        }
      }, 3000);
    } catch (error) {
      setMessage("Reconnection failed. Please try again later.");
      setShowMessage(true);
    } finally {
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    // Check both browser and Firestore connection status
    const updateStatus = () => {
      const browserOnline = navigator.onLine;
      const fsOnline = isFirestoreOnline();
      setNetworkStatus(browserOnline);
      setFirestoreStatus(fsOnline);
      
      const online = browserOnline && fsOnline;
      setIsOnline(online);
      
      // Show appropriate message
      if (!browserOnline) {
        setMessage("You're offline. Connect to the internet to sync your data.");
        setShowMessage(true);
      } else if (!fsOnline) {
        setMessage("Unable to connect to Firestore. Data will sync when connection is restored.");
        setShowMessage(true);
      } else if (!online && showMessage) {
        // Already showing an offline message
      } else if (online && !showMessage) {
        // We're online and not showing anything - don't show a new message
      } else if (online && showMessage) {
        setMessage("Connected successfully!");
        // Auto-hide success message after 3 seconds
        setTimeout(() => setShowMessage(false), 3000);
      }
    };

    // Set up event listeners for online/offline events
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    
    // Enhanced Firestore connection event handler
    const handleFirestoreConnectionChange = (e: any) => {
      const { connected, errorMessage, operation, recovered, specificError, documentPath, collectionPath } = e.detail || {};
      
      setFirestoreStatus(connected);
      setIsOnline(navigator.onLine && connected);
      
      if (!connected && errorMessage) {
        // Handle the specific offline document error
        if (specificError === 'OFFLINE_DOCUMENT' && documentPath) {
          setOfflineDocPath(documentPath);
          setMessage(`Working with cached data: unable to fetch the latest version of ${documentPath.split('/').pop()}`);
          setUsingCache(true);
        } else if (specificError === 'OFFLINE_COLLECTION' && collectionPath) {
          setMessage(`Viewing cached data: unable to fetch the latest content from ${collectionPath}`);
          setUsingCache(true);
        } else {
          setMessage(`Database connection issue: ${
            errorMessage.includes('offline') 
              ? "You appear to be offline" 
              : "Unable to reach database"
          }`);
        }
        setShowMessage(true);
      } else if (recovered) {
        setUsingCache(false);
        setOfflineDocPath(null);
        setMessage("Connection restored! Your data is now syncing.");
        setShowMessage(true);
        // Auto-hide after 3 seconds
        setTimeout(() => setShowMessage(false), 3000);
      }
    };
    
    window.addEventListener('firestoreConnectionChanged', handleFirestoreConnectionChange as EventListener);
    window.addEventListener('firestoreOfflineReady', () => {
      console.log("Offline capability is ready");
    });
    
    // Also listen for the specific offline failures
    window.addEventListener('firestoreOfflineFailed', (e: any) => {
      const error = e.detail?.error;
      setMessage("Offline mode setup failed. Some features may not work without internet connection.");
      setShowMessage(true);
    });
    
    // Initial check
    updateStatus();
    
    // Set interval to check Firestore status periodically
    const interval = setInterval(updateStatus, 10000);
    
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      window.removeEventListener('firestoreConnectionChanged', handleFirestoreConnectionChange as EventListener);
      window.removeEventListener('firestoreOfflineReady', () => {});
      window.removeEventListener('firestoreOfflineFailed', () => {});
      clearInterval(interval);
    };
  }, [showMessage]);

  // Don't render anything if everything is online and no message to show
  if (isOnline && !showMessage) return null;

  return (
    <div className={`fixed bottom-20 right-4 z-50 max-w-md rounded-lg shadow-lg transition-all duration-300 ${
      showMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
    } ${usingCache ? 'bg-amber-600' : (isOnline ? 'bg-green-600' : 'bg-red-600')}`}>
      <div className="p-4">
        <div className="flex items-start space-x-3 text-white">
          <div className="mt-0.5">
            {isOnline ? (
              <Wifi size={18} className="text-white" />
            ) : (
              <WifiOff size={18} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium mb-1">
              {usingCache ? 'Offline Mode' : (isOnline ? 'Connected' : 'Connection Issue')}
            </div>
            <p className="text-sm text-white/90">{message}</p>
            
            {!isOnline && (
              <button 
                onClick={handleReconnect}
                disabled={isRetrying || !navigator.onLine}
                className="mt-2 flex items-center text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw size={14} className="mr-1.5 animate-spin" />
                    Reconnecting...
                  </>
                ) : (
                  <>
                    <RefreshCw size={14} className="mr-1.5" />
                    Try Reconnecting
                  </>
                )}
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowMessage(false)} 
            className="text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
      
      {(!isOnline || usingCache) && (
        <div className="px-4 py-2 bg-black/20 text-xs text-white/70 rounded-b-lg">
          <div className="flex items-center">
            <Database size={12} className="mr-1.5" />
            <span>
              {usingCache ? 
                "Working with cached data: Changes will sync when back online" : 
                (networkStatus ? 
                  "Offline mode active: You can still view cached content" : 
                  "No internet connection - connect to Wi-Fi or mobile data")
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
