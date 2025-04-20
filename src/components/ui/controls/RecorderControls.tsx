'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';

export default function SessionControls() {
    const [sessionStatus, setSessionStatus] = useState<'idle' | 'recording' | 'processing' | 'completed'>('idle');

    // Simulated backend AI response (e.g. from Claude or RAG)
    const [summary, setSummary] = useState('');
    const [takeaways, setTakeaways] = useState<string[]>([]);

    const patient = {
        name: 'John Harvard',
        dob: '1970-01-01',
        gender: 'Male',
        patientId: 'cb3205c9-5459-4b88-b2e5-6ed85bb6fbbd',
        email: 'john.harvard@example.com',
    };

    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const startRecording = async () => {
        setIsRecording(true);
        setSessionStatus('recording');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ws = new WebSocket('ws://localhost:8000/ws/transcribe/'+patient.patientId); // Change if needed
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connected");
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start(1000); // Send data every 250ms

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                    console.log("data: ", event.data);
                ws.send(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop());
            };
        };

        ws.onerror = (e) => { 
            console.error("WebSocket error:", e);
            setIsRecording(false);
            setSessionStatus('completed');
        };
    };

    const stopRecording = () => {
        setIsRecording(false);
        setSessionStatus('processing');
        console.log("Session ended.");
        mediaRecorderRef.current?.stop();
        wsRef.current?.close();
    };

    // Simulate Claude response
    useEffect(() => {
        // TODO: Replace this with real Claude API call or websocket
        setTimeout(() => {
            setSummary(
                'Patient reports chest pain and fatigue over the last 3 days. No fever or cough. Symptoms worsen with exertion.'
            );
            setTakeaways([
                'Ask about previous cardiac history.',
                'Order ECG and basic labs (CBC, troponin).',
                'Rule out anxiety and GERD.',
            ]);
            setSessionStatus('completed');
        }, 1000);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
            {/* Status */}
            <p className="text-sm text-gray-600">
                {isRecording ? `Currently Recording...` : 'No Active Session'}
            </p>

            {/* Controls */}
            <div className="flex space-x-4">
                <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <FaPlay className="w-5 h-5" />
                    <span>Start Session</span>
                </button>

                <button
                    onClick={stopRecording}
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
