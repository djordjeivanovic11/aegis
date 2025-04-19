'use client';

import React from 'react';
import { useRouter } from 'next/router';

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

export default function PatientCard({ patient }: PatientCardProps) {
    const router = useRouter();

    const handleStartVisit = () => {
        router.push(`/dashboard/patients/${patient.id}`);
    };

    return (
        <div className="w-full max-w-screen-xl h-40 bg-white rounded-xl shadow-lg mx-auto flex overflow-hidden">
            {/* Patient Image */}
            <div className="w-1/4 h-full">
                <img
                    src={patient.imageUrl || '/default-avatar.png'}
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
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
                    >
                        Start Visit
                    </button>
                </div>
            </div>
        </div>
    );
}
