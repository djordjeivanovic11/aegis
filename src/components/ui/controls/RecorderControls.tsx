'use client';

import React, { useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';

export default function SessionControls() {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Start a new session (dummy backend integration)
    const handleStart = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/session/start', {
                method: 'POST',
            });
            const data = await res.json();
            setSessionId(data.sessionId || 'dummy-session-id');
        } catch (err) {
            console.error('Failed to start session', err);
        } finally {
            setLoading(false);
        }
    };

    // End the current session
    const handleStop = async () => {
        if (!sessionId) return;
        setLoading(true);
        try {
            await fetch('/api/session/end', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId }),
            });
            setSessionId(null);
        } catch (err) {
            console.error('Failed to end session', err);
        } finally {
            setLoading(false);
        }
    };

    const isActive = Boolean(sessionId);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
            {/* Status */}
            <p className="text-sm text-gray-600">
                {isActive ? `Session Active: ${sessionId}` : 'No Active Session'}
            </p>

            {/* Controls */}
            <div className="flex space-x-4">
                <button
                    onClick={handleStart}
                    disabled={isActive || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaPlay className="w-5 h-5" />
                    <span>Start Session</span>
                </button>

                <button
                    onClick={handleStop}
                    disabled={!isActive || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaStop className="w-5 h-5" />
                    <span>End Session</span>
                </button>
            </div>
        </div>
    );
}
