'use client';

import React from 'react';
import { PatientInfo } from '@/types/patients/types';
import PatientCard from '@/components/ui/agenda/PatientCard';

// Dummy patient data
const dummyPatients: PatientInfo[] = [
    {
        id: 'a1f5c8e2-1234-4abc-8e2a-abcdef012345',
        fullName: 'John Doe',
        dob: '1980-01-15',
        gender: 'Male',
        age: 44,
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        imageUrl: '/avatar1.png',
    },
    {
        id: 'b2e6d9f3-2345-4bcd-9f3b-bcdef0123456',
        fullName: 'Jane Smith',
        dob: '1992-07-22',
        gender: 'Female',
        age: 31,
        email: 'jane.smith@example.com',
        phone: '(555) 234-5678',
        imageUrl: '/avatar2.png',
    },
    {
        id: 'c3f7e0a4-3456-4cde-0a4c-cdef01234567',
        fullName: 'Alice Johnson',
        dob: '1975-11-05',
        gender: 'Female',
        age: 48,
        email: 'alice.johnson@example.com',
        phone: '(555) 345-6789',
        imageUrl: '/avatar3.png',
    },
    {
        id: 'd4g8f1b5-4567-4def-1b5d-def012345678',
        fullName: 'Robert Brown',
        dob: '1968-03-30',
        gender: 'Male',
        age: 56,
        email: 'robert.brown@example.com',
        phone: '(555) 456-7890',
        imageUrl: '/avatar4.png',
    },
    {
        id: 'e5h9g2c6-5678-4efa-2c6e-ef0123456789',
        fullName: 'Emily Davis',
        dob: '1988-09-12',
        gender: 'Female',
        age: 35,
        email: 'emily.davis@example.com',
        phone: '(555) 567-8901',
        imageUrl: '/avatar5.png',
    },
];

export default function AgendaPatientList() {
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            {dummyPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
            ))}
        </div>
    );
}
