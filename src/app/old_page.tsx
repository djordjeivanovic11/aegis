'use client';

import React, { useRef, useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import RecorderControls from '@/components/dashboard/audio/RecorderControls';
import SessionStatusBar from '@/components/dashboard/audio/SessionStatusBar';
import CurrentPatientCard from '@/components/dashboard/records/CurrentPatientCard';
import TranscriptFeed from '@/components/dashboard/transcript/TranscriptFeed';
import AIInsightsPanel from '@/components/dashboard/ai/AIInsightsPanel';


    //const ws = new WebSocket();
// Dummy transcript data
const dummyTranscript = [
    { speaker: 'Doctor', text: 'How are you feeling today?', timestamp: '10:01 AM' },
    { speaker: 'Patient', text: "I'm feeling a bit under the weather.", timestamp: '10:02 AM' },
    { speaker: 'Doctor', text: 'Any pain or discomfort?', timestamp: '10:03 AM' },
    { speaker: 'Patient', text: 'Yes, a slight pain in my chest.', timestamp: '10:04 AM' },
];

export default function DashboardPage() {
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
    const mediaRecorderRef = useRef(null);
    const wsRef = useRef(null);

    const startRecording = async () => {
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

        setIsRecording(true);
        };

        ws.onerror = (e) => console.error("WebSocket error:", e);
    };

    const stopRecording = () => {
        console.log("Session ended.");
        mediaRecorderRef.current?.stop();
        wsRef.current?.close();
        setIsRecording(false);
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
        }, 1000);
    }, []);

    return (
        <DashboardLayout pageTitle="Live Session">
            {/* Top: Status & Controls | Patient Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <SessionStatusBar status={sessionStatus} />
                    <RecorderControls
                        isRecording={sessionStatus === 'recording'}
                        onStartWhisper={() => {
                            startRecording();
                            setSessionStatus('recording');
                        }}
                        onStartClaude={() => console.log('Claude analysis triggered')}
                        onStopAll={() => {
                            stopRecording();
                            setSessionStatus('completed');
                        }}
                    />
                </div>
                <div>
                    <CurrentPatientCard {...patient} />
                </div>
            </div>

            {/* Bottom: Transcript & AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-secondary">Transcript</h3>
                    <TranscriptFeed transcript={dummyTranscript} />
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-secondary">AI Insights</h3>
                    <AIInsightsPanel
                        summary={summary}
                        takeaways={takeaways}
                        onViewInsights={() => {
                            console.log('View full insights clicked');
                            // TODO: Navigate to insights page or open modal
                        }}
                    />
                </section>
            </div>
        </DashboardLayout>
    );
}
