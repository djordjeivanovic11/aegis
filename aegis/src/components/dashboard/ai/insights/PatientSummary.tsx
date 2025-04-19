'use client';

import React from 'react';

export interface PatientInfo {
    id: string;
    fullName: string;
    dob: string;
    gender: string;
    age: number;
}

interface PatientSummaryProps {
    patient: PatientInfo;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patient }) => (
    <div className="w-full bg-card border border-default rounded-lg p-6 flex items-center justify-between shadow-sm">
        {/* Patient Name */}
        <h2 className="text-2xl font-semibold text-foreground">
            {patient.fullName}
        </h2>

        {/* Inline Details */}
        <div className="flex items-center space-x-8 text-sm text-muted">
            <span>{patient.gender}</span>
            <span>{patient.age} yrs</span>
            <span>DOB: {patient.dob}</span>
            <span>ID: {patient.id}</span>
        </div>
    </div>
);

export default PatientSummary;
