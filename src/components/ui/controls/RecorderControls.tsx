'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { useVisit } from '@/components/context/VisitContext';
import { listQuestions } from '@/services/patients';

export default function SessionControls() {
  const { 
    isRecording, 
    setIsRecording, 
    sessionStatus, 
    setSessionStatus,
    setChecklistQuestions,
    setChecklistStatuses,
    checklistQuestions,
    checklistStatuses
  } = useVisit();
  const socketRef = useRef<WebSocket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string>('');

  // Function to safely close the WebSocket connection
  const closeWebSocket = useCallback(() => {
    if (socketRef.current) {
      try {
        // Check if the connection is still open
        if (socketRef.current.readyState === WebSocket.OPEN || 
            socketRef.current.readyState === WebSocket.CONNECTING) {
          // Use a normal closure code
          socketRef.current.close(1000, 'Connection closed by client');
          console.log('WebSocket connection closed cleanly');
        }
      } catch (closeError) {
        console.error('Error closing WebSocket:', closeError);
      } finally {
        // Always set the socketRef to null to prevent further usage
        socketRef.current = null;
        setSocketConnected(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const patientId = params.get('id');
        setPatientId(patientId || '');
    }
  }, []);

  // Effect to handle component unmounting and cleanup
  useEffect(() => {
    return () => {
      // Ensure WebSocket is closed when component unmounts
      closeWebSocket();
    };
  }, [closeWebSocket]);

  // Effect for WebSocket error monitoring - automatically close on error
  useEffect(() => {
    if (socketError) {
      console.warn('Closing WebSocket due to error:', socketError);
      closeWebSocket();
    }
  }, [socketError, closeWebSocket]);

  // Effect to create WebSocket connection
  useEffect(() => {
    // Don't connect if no patientId is available
    if (!patientId) {
      console.log('No patient ID available, not connecting WebSocket');
      return;
    }

    // Clean up any existing connection before creating a new one
    closeWebSocket();
    
    // Define the WebSocket URL - using localhost for development
    const wsUrl = `ws://localhost:8000/ws/transcribe/${patientId}`;
    
    try {
      // Initialize WebSocket connection
      socketRef.current = new WebSocket(wsUrl);
      
      // Set up WebSocket event handlers
      socketRef.current.onopen = () => {
        console.log('WebSocket connection established');
        setSocketConnected(true);
        setSocketError(null);
      };
      
      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'checklist_status') {
            // Update checklist context with server data
            setChecklistQuestions(data.data.questions);
            setChecklistStatuses(data.data.status);
          } else if (data.type === 'recording_status') {
            // Update recording status based on server message
            setSessionStatus(data.status);
          }
        } catch (parseError) {
          console.error('Error parsing WebSocket message:', parseError);
          setSocketError(`Failed to parse WebSocket message: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }
      };
      
      socketRef.current.onclose = (event) => {
        console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
        setSocketConnected(false);
        
        // If it wasn't a normal closure, set error state
        if (event.code !== 1000) {
          setSocketError(`Connection closed: ${event.code} ${event.reason || 'Unknown reason'}`);
        }
      };
      
      socketRef.current.onerror = (error) => {
        // Log detailed error information
        console.error('WebSocket error:', error);
        setSocketError(`WebSocket connection error. Server may not be running.`);
        setSocketConnected(false);
        
        // Don't immediately set session status to error - instead just log the issue
        // This allows the component to still function for recording without WebSockets
        console.warn('WebSocket error - continuing without real-time updates');
      };
    } catch (connectionError: unknown) {
      console.error('Error creating WebSocket:', connectionError);
      setSocketError(`Failed to create WebSocket connection: ${connectionError instanceof Error ? connectionError.message : 'Unknown error'}`);
    }
  }, [patientId, setSessionStatus, setChecklistQuestions, setChecklistStatuses, closeWebSocket]);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    setSessionStatus('recording');
    
    // Validate patient ID
    if (!patientId) {
      console.error('No patient ID available');
      setSessionStatus('error');
      return;
    }
    
    // Create a safe copy of questions (ensure it's an array)
    const safeQuestions = Array.isArray(checklistQuestions) ? checklistQuestions : [];
    
    console.log('Sending questions to backend:', safeQuestions);
    
    // Initialize questions in the backend before starting recording
    listQuestions(patientId, safeQuestions.map(q => q.text))
      .then(() => {
        console.log('Questions initialized in backend');
        
        // Check if we need to reconnect the WebSocket
        if (!socketConnected || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
          console.log('WebSocket not connected, attempting to reconnect...');
          
          // Define the WebSocket URL
          const wsUrl = `ws://localhost:8000/ws/transcribe/${patientId}`;
          
          try {
            // Close any existing connection first
            closeWebSocket();
            
            // Initialize a new WebSocket connection
            socketRef.current = new WebSocket(wsUrl);
            
            // Set up minimal handlers for this new connection
            socketRef.current.onopen = () => {
              console.log('WebSocket reconnected, sending start recording command');
              setSocketConnected(true);
              socketRef.current?.send(JSON.stringify({ action: 'start_recording' }));
            };
            
            socketRef.current.onerror = (error) => {
              console.error('Error reconnecting WebSocket:', error);
              console.log('Continuing with recording without WebSocket');
            };
          } catch (reconnectError) {
            console.error('Failed to reconnect WebSocket:', reconnectError);
            console.log('Continuing with recording without WebSocket');
          }
        } else {
          // WebSocket is already connected, just send the start message
          try {
            socketRef.current.send(JSON.stringify({ action: 'start_recording' }));
          } catch (sendError) {
            console.error('Error sending start message:', sendError);
          }
        }
      })
      .catch(error => {
        console.error('Failed to initialize questions:', error);
        
        // Check for specific error types
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server error:', error.response.status, error.response.data);
          
          // If it's just a 404, we might want to proceed anyway
          if (error.response.status === 404) {
            console.warn('API endpoint not found - continuing with recording anyway');
            return; // Continue with recording even though API call failed
          }
        } 
        
        // For other errors, set session status to error
        setSessionStatus('error');
      });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setSessionStatus('processing');
    
    // Send stop recording message to server only if connected
    if (socketConnected && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(JSON.stringify({ action: 'stop_recording' }));
      } catch (sendError) {
        console.error('Error sending stop message:', sendError);
      }
    }
    
    // Always simulate "done processing" after 2s, even without WebSocket
    setTimeout(() => {
      setSessionStatus('completed');
      
      // Close the WebSocket connection after recording is completed
      // This prevents the server from waiting for further communication
      setTimeout(() => {
        console.log('Recording completed, closing WebSocket connection');
        closeWebSocket();
      }, 500); // Give a small delay to ensure any final messages are received
    }, 2000);
  };

  // Status display based on sessionStatus with consistent height
  const renderStatusDisplay = () => {
    // Common height container for all status messages
    const baseContainerClass = "min-h-[52px] w-full flex items-center justify-center";
    
    switch(sessionStatus) {
      case 'recording':
        return (
          <div className={`${baseContainerClass}`}>
            <p className="text-sm text-red-500 animate-pulse">
              Currently Recording...
            </p>
          </div>
        );
      case 'processing':
        return (
          <div className={`${baseContainerClass} p-3 bg-blue-50 border border-blue-200 rounded-md`}>
            <p className="text-sm text-blue-800">Processing recording...</p>
          </div>
        );
      case 'completed':
        return (
          <div className={`${baseContainerClass} p-3 bg-green-50 border border-green-200 rounded-md`}>
            <p className="text-sm text-green-800">Recording completed and processed successfully!</p>
          </div>
        );
      case 'error':
        return (
          <div className={`${baseContainerClass} p-3 bg-red-50 border border-red-200 rounded-md`}>
            <p className="text-sm text-red-800">Error processing recording</p>
          </div>
        );
      default:
        return (
          <div className={`${baseContainerClass}`}>
            <p className="text-sm text-gray-600">
              No Active Session
            </p>
          </div>
        );
    }
  };

  useEffect(() => {
    // Log state changes for debugging
    console.log('Context state updated:', {
      isRecording,
      sessionStatus,
      checklistQuestions,
      checklistStatuses
    });
  }, [isRecording, sessionStatus, checklistQuestions, checklistStatuses]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      {/* Status */}
      {renderStatusDisplay()}

      {/* Controls */}
      <div className="flex space-x-4">
        <button
          onClick={handleStartRecording}
          disabled={isRecording || sessionStatus === 'processing'}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FaPlay className="w-5 h-5" />
          <span>Start Session</span>
        </button>

        <button
          onClick={handleStopRecording}
          disabled={!isRecording}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FaStop className="w-5 h-5" />
          <span>End Session</span>
        </button>
      </div>
    </div>
  );
}
