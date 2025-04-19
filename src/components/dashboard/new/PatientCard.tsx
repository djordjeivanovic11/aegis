'use client';

import React from 'react';

export type Patient = {
    id: string;
    fullName: string;
    dob: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
};

interface PatientCardProps {
    patient: Patient;
    onSelect: (patient: Patient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onSelect }) => (
    <div className="bg-card border border-default rounded-xl p-4 shadow-sm flex flex-col justify-between">
        <div>
            <h5 className="text-lg font-semibold text-foreground">{patient.fullName}</h5>
            <p className="text-sm text-muted">DOB: {patient.dob}</p>
            {patient.gender && <p className="text-sm text-muted">Gender: {patient.gender}</p>}
            {patient.email && <p className="text-sm text-muted">Email: {patient.email}</p>}
            {patient.phoneNumber && <p className="text-sm text-muted">Phone: {patient.phoneNumber}</p>}
        </div>
        <button
            onClick={() => onSelect(patient)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition"
        >
            Select
        </button>
    </div>
);

export default PatientCard;
