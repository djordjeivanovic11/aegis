'use client';

import React from 'react';
import ChatPanel from '@/components/dashboard/ai/patientChat/ChatPanel';

export default function JustAsk() {
    const patientId = '123e4567-e89b-12d3-a456-426614174000';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-indigo-50 px-4">
            <ChatPanel patientId={patientId} />

            <p className="mt-6 text-center text-gray-600 max-w-xl text-sm">
                Use this chat to ask personalized, real-time questions about your patient’s history, treatments, or next steps. Our AI assistant pulls context directly from medical records to help you stay informed and confident in your care decisions.
            </p>
        </div>
    );
}
