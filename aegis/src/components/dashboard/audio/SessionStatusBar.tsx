'use client';

import React from 'react';

type SessionStatus = 'idle' | 'recording' | 'processing' | 'completed' | 'error';

const statusStyles: Record<SessionStatus, string> = {
    idle: 'bg-gray-400',
    recording: 'bg-yellow-500 animate-pulse',
    processing: 'bg-blue-500',
    completed: 'bg-green-600',
    error: 'bg-red-600',
};

const statusLabels: Record<SessionStatus, string> = {
    idle: 'Idle',
    recording: 'Recording...',
    processing: 'Processing Transcript...',
    completed: 'Session Complete',
    error: 'Error Detected',
};

interface SessionStatusBarProps {
    status: SessionStatus;
}

const SessionStatusBar: React.FC<SessionStatusBarProps> = ({ status }) => {
    return (
        <div
            className={`mb-6 p-3 text-sm text-white text-center rounded-lg transition-all duration-300 ${statusStyles[status]}`}
        >
            <span className="font-medium">Current Session:</span> {statusLabels[status]}
        </div>
    );
};

export default SessionStatusBar;
