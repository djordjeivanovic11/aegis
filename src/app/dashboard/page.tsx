'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import RecorderControls from '@/components/dashboard/audio/RecorderControls';
import SessionStatusBar from '@/components/dashboard/audio/SessionStatusBar';
import CurrentPatientCard from '@/components/dashboard/records/CurrentPatientCard';
import TranscriptFeed from '@/components/dashboard/transcript/TranscriptFeed';
import AIInsightsPanel from '@/components/dashboard/ai/AIInsightsPanel';

// Dummy transcript data
const dummyTranscript = [
    { speaker: 'Doctor', text: 'How are you feeling today?', timestamp: '10:01 AM' },
    { speaker: 'Patient', text: "I'm feeling a bit under the weather.", timestamp: '10:02 AM' },
    { speaker: 'Doctor', text: 'Any pain or discomfort?', timestamp: '10:03 AM' },
    { speaker: 'Patient', text: 'Yes, a slight pain in my chest.', timestamp: '10:04 AM' },
];

export default function DashboardPage() {
    const [sessionStatus, setSessionStatus] = useState<'idle' | 'recording' | 'processing' | 'completed'>('recording');

    // Simulated backend AI response (e.g. from Claude or RAG)
    const [summary, setSummary] = useState('');
    const [takeaways, setTakeaways] = useState<string[]>([]);

    const patient = {
        name: 'Jane Doe',
        dob: '1985-09-15',
        gender: 'Female',
        patientId: 'P-23918',
        email: 'jane.doe@email.com',
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
                            console.log('Whisper started');
                            setSessionStatus('recording');
                        }}
                        onStartClaude={() => console.log('Claude analysis triggered')}
                        onStopAll={() => {
                            console.log('Session ended');
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
