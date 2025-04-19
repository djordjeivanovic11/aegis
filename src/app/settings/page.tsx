'use client';

import React from "react";
import DashboardLayout from "@/components/ui/layout/DashboardLayout";
import SettingsComponent from "@/components/ui/settings/Settings";

export default function SettingsPage() {
    return (
        <DashboardLayout pageTitle="Settings">
            <div className="max-w-2xl mx-auto space-y-8">
                <p className="text-lg text-muted">
                    Customize your analytics and documentation preferences. Adjust the details for transcript insights, AI-generated suggestions, and historical patient reminders.
                </p>
                <SettingsComponent />
            </div>
        </DashboardLayout>
    );
}
