'use client';

import React from 'react';
import { PatientInfo } from '@/types/patients/types';

interface CurrentPatientCardProps {
    patient: PatientInfo;
}

const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const diffMs = Date.now() - birthDate.getTime();
    const diffDate = new Date(diffMs);
    return Math.abs(diffDate.getUTCFullYear() - 1970);
};

const CurrentPatientCard: React.FC<CurrentPatientCardProps> = ({ patient }) => {
    const { id, fullName, dob, gender, email } = patient;
    const age = calculateAge(dob);

    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4">Current Patient</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-base text-foreground">
                <div>
                    <span className="font-medium text-muted">Name:</span> {fullName}
                </div>
                <div>
                    <span className="font-medium text-muted">Patient ID:</span> {id}
                </div>
                <div>
                    <span className="font-medium text-muted">Date of Birth:</span> {dob}
                </div>
                <div>
                    <span className="font-medium text-muted">Age:</span> {age}
                </div>
                <div>
                    <span className="font-medium text-muted">Gender:</span> {gender || '—'}
                </div>
                <div>
                    <span className="font-medium text-muted">Email:</span> {email || '—'}
                </div>
            </div>
        </div>
    );
};

export default CurrentPatientCard;
