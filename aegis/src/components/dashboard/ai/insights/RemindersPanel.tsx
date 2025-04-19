// components/dashboard/insights/RemindersPanel.tsx
'use client';

import React from 'react';

interface RemindersPanelProps {
    reminders: string[];
}

const RemindersPanel: React.FC<RemindersPanelProps> = ({ reminders }) => (
    <div className="w-full bg-card border-t-4 border-primary rounded-lg p-8 shadow-md">
        {/* Header */}
        <h2 className="text-3xl font-bold text-primary mb-6">Smart Reminders</h2>

        {/* Reminders List */}
        {reminders.length > 0 ? (
            <ul className="space-y-4">
                {reminders.map((r, i) => (
                    <li
                        key={i}
                        className="pl-4 border-l-4 border-primary text-lg text-foreground leading-snug hover:bg-muted/5 transition rounded"
                    >
                        {r}
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-lg text-muted italic">No reminders set.</p>
        )}
    </div>
);

export default RemindersPanel;
