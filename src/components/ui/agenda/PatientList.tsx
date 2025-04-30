'use client';

import React from 'react';
import { PatientInfo } from '@/types/patients/types';
import PatientCard from '@/components/ui/agenda/PatientCard';

export const dummyPatients: PatientInfo[] = [
    {
        id: 'a1f5c8e2-1234-4abc-8e2a-abcdef012345',
        fullName: 'Jane Doe',
        dob: '2000-01-15',
        gender: 'Female',
        age: 25,
        email: 'jane.doe@example.com',
        phone: '(555) 123-4567',
        imageUrl: '/avatar1.png',
    },
    {
        id: 'b2e6d9f3-2345-4bcd-9f3b-bcdef0123456',
        fullName: 'Alice Smith',
        dob: '1965-04-22',
        gender: 'Female',
        age: 60,
        email: 'alice.smith@example.com',
        phone: '(555) 234-5678',
        imageUrl: '/avatar2.png',
    },
    {
        id: 'c3f7e0a4-3456-4cde-0a4c-cdef01234567',
        fullName: 'Peter Neel',
        dob: '1959-11-05',
        gender: 'Male',
        age: 65,
        email: 'peter.neel@example.com',
        phone: '(555) 345-6789',
        imageUrl: '/avatar3.png',
    },
    {
        id: 'd4g8f1b5-4567-4def-1b5d-def012345678',
        fullName: 'Joaquin da Silva',
        dob: '1995-03-30',
        gender: 'Male',
        age: 30,
        email: 'jdasilva@example.com',
        phone: '(555) 456-7890',
        imageUrl: '/avatar4.png',
    },
    {
        id: 'e5h9g2c6-5678-4efa-2c6e-ef0123456789',
        fullName: 'Ryan Nguyen',
        dob: '2006-09-12',
        gender: 'Male',
        age: 18,
        email: 'ryan.nguyen@example.com',
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
