'use client';

import React from 'react';
import { FaUsers } from 'react-icons/fa';
import PatientCard, { Patient } from './PatientCard';

interface PatientListProps {
    patients: Patient[];
    selectedId?: string;
    onSelect: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({
                                                     patients,
                                                     selectedId,
                                                     onSelect,
                                                 }) => {
    if (patients.length === 0) {
        return (
            <p className="py-6 text-center text-muted">
                No matching patients found.
            </p>
        );
    }

    return (
        <section className="bg-card p-6 space-y-4">

            {/* Patient Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map(patient => (
                    <div
                        key={patient.id}
                        className={`
              rounded-md transition
              hover:shadow-md
              ${patient.id === selectedId ? 'ring-2 ring-primary' : ''}
            `}
                    >
                        <PatientCard patient={patient} onSelect={onSelect} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PatientList;
