'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export interface PatientInfo {
    id: string;
    fullName: string;
    dob: string;
    gender: string;
    age: number;
    email?: string;
    phone?: string;
    imageUrl?: string;
}

interface PatientCardProps {
    patient: PatientInfo;
}

const DEFAULT_AVATARS = [
    '/avatar1.png',
    '/avatar2.png',
    '/avatar3.png',
    '/avatar4.png',
    '/avatar5.png',
];

export default function PatientCard({ patient }: PatientCardProps) {
    const router = useRouter();

    // pick a default avatar based on a simple hash of the patient ID
    const pickDefaultAvatar = (id: string) => {
        const hash = Array.from(id).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
        return DEFAULT_AVATARS[hash % DEFAULT_AVATARS.length];
    };

    const imgSrc = patient.imageUrl || pickDefaultAvatar(patient.id);

    const handleStartVisit = () => {
        router.push(`/patients?id=${patient.id}`);
    };


    return (
        <div className="w-full max-w-screen-xl h-40 bg-white rounded-xl shadow-lg mx-auto flex overflow-hidden">
            {/* Patient Image */}
            <div className="w-1/4 h-full">
                <img
                    src={imgSrc}
                    alt={`${patient.fullName} avatar`}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Patient Details & Action */}
            <div className="w-3/4 flex flex-col justify-between p-4">
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xl font-semibold text-gray-800">
                            {patient.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {patient.gender}, {patient.age} years old
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">DOB:</span> {patient.dob}
                        </p>
                        {patient.email && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Email:</span> {patient.email}
                            </p>
                        )}
                        {patient.phone && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Phone:</span> {patient.phone}
                            </p>
                        )}
                    </div>
                </div>

                {/* Start Visit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleStartVisit}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition cursor-pointer"
                    >
                        Start Visit
                    </button>
                </div>
            </div>
        </div>
    );
}
