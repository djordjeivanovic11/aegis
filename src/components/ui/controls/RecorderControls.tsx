'use client';

import React from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { useVisit } from '@/components/context/VisitContext';

export default function SessionControls() {
  const { isRecording, setIsRecording, sessionStatus, setSessionStatus } = useVisit();

  const handleStartRecording = () => {
    setIsRecording(true);
    setSessionStatus('recording');
    // …any additional start‑recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setSessionStatus('processing');
    // …any additional stop‑recording logic here

    // simulate "done processing" after 2s
    setTimeout(() => {
      setSessionStatus('completed');
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
