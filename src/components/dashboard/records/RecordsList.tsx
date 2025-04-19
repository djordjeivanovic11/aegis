'use client';

import React from 'react';
import { FaUsers } from 'react-icons/fa';
import PatientRecordCard, { Patient } from './PatientRecordCard';

interface PatientListProps {
    patients: Patient[];
    selectedPatient?: Patient;
    onSelect: (p: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({
                                                     patients,
                                                     selectedPatient,
                                                     onSelect,
                                                 }) => {
    if (patients.length === 0) {
        return <p className="py-6 text-center text-muted">No patients found.</p>;
    }

    return (
        <section className="bg-card border border-default rounded-md p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <FaUsers className="text-primary text-xl" />
                <h2 className="text-2xl font-semibold text-foreground">Select a Patient</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients.map(p => (
                    <PatientRecordCard
                        key={p.id}
                        patient={p}
                        isSelected={selectedPatient?.id === p.id}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </section>
    );
};

export default PatientList;
