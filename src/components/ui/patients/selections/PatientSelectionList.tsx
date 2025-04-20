import React from 'react';
import { PatientInfo } from '@/types/patients/types';
import { SelectionPatientCard } from '@/components/ui/patients/selections/PatientSelectionCard';

interface PatientSelectionListProps {
    patients: PatientInfo[];
    onSelect: (patient: PatientInfo) => void;
}

export default function PatientSelectionList({ patients, onSelect }: PatientSelectionListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {patients.map((patient) => (
                <SelectionPatientCard
                    key={patient.id}
                    patient={patient}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
