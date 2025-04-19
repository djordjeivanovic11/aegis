'use client';

import React from 'react';
import { FaUserCircle, FaCheckCircle } from 'react-icons/fa';

export interface Patient {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
}

interface PatientRecordCardProps {
    patient: Patient;
    onSelect: (p: Patient) => void;
    isSelected: boolean;
}

const PatientRecordCard: React.FC<PatientRecordCardProps> = ({
                                                                 patient,
                                                                 onSelect,
                                                                 isSelected,
                                                             }) => {
    return (
        <div
            onClick={() => onSelect(patient)}
            tabIndex={0}
            className={`
        relative flex items-center gap-4 p-4 bg-card border rounded-md
        ${isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-default'}
        hover:shadow-md focus:ring-2 focus:ring-primary transition cursor-pointer
      `}
        >
            {/* Selection Badge */}
            {isSelected && (
                <FaCheckCircle className="absolute top-2 right-2 text-primary text-lg" />
            )}

            {/* Avatar */}
            <FaUserCircle className="text-muted text-3xl" />

            {/* Patient Info */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{patient.fullName}</h3>
                <p className="text-sm text-muted">{patient.email}</p>
                <p className="text-sm text-muted">{patient.phoneNumber}</p>
            </div>
        </div>
    );
};

export default PatientRecordCard;
