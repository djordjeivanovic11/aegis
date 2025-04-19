'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import PatientSummary, { PatientInfo } from '@/components/dashboard/ai/insights/PatientSummary';
import QuestionsSuggestions from '@/components/dashboard/ai/insights/QuestionsSuggestions';
import ReportEditor from '@/components/dashboard/ai/insights/ReportEditor';
import RemindersPanel from '@/components/dashboard/ai/insights/RemindersPanel';
import DiagnosisInsights from '@/components/dashboard/ai/insights/DiagnosisInsights';

export default function InsightsPage() {
    // Dummy patient info – replace with real data
    const patient: PatientInfo = {
        id: 'P-23918',
        fullName: 'Jane Doe',
        dob: '1985-09-15',
        gender: 'Female',
        age: 39,
    };

    const transcriptSummary = `
Patient reports intermittent chest discomfort over past 3 days, improving with rest. 
No shortness of breath at rest. Blood pressure well controlled.
  `.trim();

    const fetchSuggestions = async () => [
        { id: 's1', text: 'Ask about exercise tolerance' },
        { id: 's2', text: 'Consider ordering echocardiogram' },
    ];

    const commitGraph = async (content: string) => {
        console.log('Graph commit:', content);
    };

    const reminders = [
        'Check lipid panel in 6 months',
        'Schedule follow‑up visit in 3 weeks',
    ];

    return (
        <DashboardLayout pageTitle="Patient Insights">
            <div className="space-y-8">
                <PatientSummary patient={patient} />
                <RemindersPanel reminders={reminders} />
                <QuestionsSuggestions fetchSuggestions={fetchSuggestions} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ReportEditor initialContent={transcriptSummary} onCommitGraph={commitGraph} />
                    <DiagnosisInsights
                        diagnosis="Acute Myocardial Infarction"
                        rationale="Based on chest pain presentation, ECG changes, and elevated troponin levels."
                        treatments={[
                            { name: 'Aspirin', description: 'Antiplatelet therapy to reduce clot formation', sideEffects: 'GI bleed' },
                            { name: 'Beta-blockers', description: 'Reduce myocardial oxygen demand', sideEffects: 'Bradycardia, fatigue' },
                            { name: 'PCI', description: 'Percutaneous coronary intervention', sideEffects: 'Access site complications' },
                        ]}
                        recoveryPlan={[
                            { stage: 'Hospital Stay', description: 'Monitoring in CCU and initiation of rehab', timeline: '3–5 days' },
                            { stage: 'Outpatient Rehab', description: 'Supervised exercise and education', timeline: '6–12 weeks' },
                            { stage: 'Long-Term', description: 'Statin therapy and lifestyle modifications', timeline: 'Ongoing' },
                        ]}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
