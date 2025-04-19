'use client';

import React from 'react';
import PatientList from '@/components/ui/agenda/PatientList';

export default function PatientsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Today&lsquo;s Patients</h1>
                    <p className="mt-1 text-gray-600">
                        Select a patient who has arrived to start their visit or review patient details.
                    </p>
                </header>

                {/* Patient List */}
                <PatientList />
            </div>
        </div>
    );
}
