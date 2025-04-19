'use client';

import React from 'react';
import { PatientInfo } from '@/types/patients/types';

interface SelectionPatientCardProps {
    patient: PatientInfo;
    onSelect: (patient: PatientInfo) => void;
}

export function SelectionPatientCard({ patient, onSelect }: SelectionPatientCardProps) {
    return (
        <div
            onClick={() => onSelect(patient)}
            className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex items-center space-x-4"
        >
            <div>
                <h3 className="text-lg font-medium text-gray-900">{patient.fullName}</h3>
                <p className="text-sm text-gray-500">
                    {patient.gender}, {patient.age} yrs
                </p>
            </div>
        </div>
    );
}