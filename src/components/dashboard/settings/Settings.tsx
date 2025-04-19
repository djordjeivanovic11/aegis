'use client';

import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/services/settings';
import type {
    ReportSettingsRead,
    ReportSettingsCreate,
} from '@/types/settings/types';

interface Settings {
    includeTranscript: boolean;
    includeSOAPNote: boolean;
    includePatientSummary: boolean;
    includeLabAnalysis: boolean;
    includeReminders: boolean;
    includeFollowupChecklist: boolean;
}

export default function SettingsComponent() {
    const [settings, setSettings] = useState<Settings>({
        includeTranscript: false,
        includeSOAPNote: false,
        includePatientSummary: false,
        includeLabAnalysis: false,
        includeReminders: false,
        includeFollowupChecklist: false,
    });
    const [loading, setLoading] = useState(true);

    // load from API on mount
    useEffect(() => {
        async function load() {
            try {
                const data: ReportSettingsRead = await getSettings();
                setSettings({
                    includeTranscript: data.include_transcript,
                    includeSOAPNote: data.include_soap_note,
                    includePatientSummary: data.include_patient_summary,
                    includeLabAnalysis: data.include_lab_analysis,
                    includeReminders: data.include_reminders,
                    includeFollowupChecklist: data.include_followup_checklist,
                });
            } catch (err) {
                console.error('Failed to load settings', err);
            } finally {
                setLoading(false);
            }
        }
        load().then(r =>
        console.log('Settings Loaded', r),);
    }, []);

    const handleToggle = (key: keyof Settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = async () => {
        setLoading(true);
        // convert to API shape
        const payload: ReportSettingsCreate = {
            include_transcript: settings.includeTranscript,
            include_soap_note: settings.includeSOAPNote,
            include_patient_summary: settings.includePatientSummary,
            include_lab_analysis: settings.includeLabAnalysis,
            include_reminders: settings.includeReminders,
            include_followup_checklist: settings.includeFollowupChecklist,
        };
        try {
            await updateSettings(payload);
            alert('Your report settings have been saved.');
        } catch (err) {
            console.error('Failed to save settings', err);
            alert('Error saving settings.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading settings…</div>;
    }

    return (
        <div className="bg-card p-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-4">
                Report Generation Settings
            </h2>
            <p className="text-muted-foreground mb-6">
                Choose which sections should be included when generating visit reports.
                You can customize these preferences anytime.
            </p>

            <div className="space-y-4">
                <Checkbox
                    id="includeTranscript"
                    label="Include Full Transcript"
                    checked={settings.includeTranscript}
                    onChange={() => handleToggle('includeTranscript')}
                />
                <Checkbox
                    id="includeSOAPNote"
                    label="Include SOAP Note"
                    checked={settings.includeSOAPNote}
                    onChange={() => handleToggle('includeSOAPNote')}
                />
                <Checkbox
                    id="includePatientSummary"
                    label="Include Patient-Friendly Summary"
                    checked={settings.includePatientSummary}
                    onChange={() => handleToggle('includePatientSummary')}
                />
                <Checkbox
                    id="includeLabAnalysis"
                    label="Include Lab Results Analysis"
                    checked={settings.includeLabAnalysis}
                    onChange={() => handleToggle('includeLabAnalysis')}
                />
                <Checkbox
                    id="includeReminders"
                    label="Include Smart Reminders from Patient History"
                    checked={settings.includeReminders}
                    onChange={() => handleToggle('includeReminders')}
                />
                <Checkbox
                    id="includeFollowupChecklist"
                    label="Include Follow-Up Checklist"
                    checked={settings.includeFollowupChecklist}
                    onChange={() => handleToggle('includeFollowupChecklist')}
                />
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                >
                    {loading ? 'Saving…' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: () => void;
}
const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => (
    <div className="flex items-center">
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 text-primary"
        />
        <label htmlFor={id} className="ml-3 text-lg text-foreground">
            {label}
        </label>
    </div>
);
