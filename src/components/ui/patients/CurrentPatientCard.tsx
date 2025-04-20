'use client';

import React from 'react';
import { PatientInfo } from '@/types/patients/types';

interface CurrentPatientCardProps {
    patient: PatientInfo;
}

const DEFAULT_AVATARS = [
    '/avatar1.png',
    '/avatar2.png',
    '/avatar3.png',
    '/avatar4.png',
    '/avatar5.png',
];

const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const diffMs = Date.now() - birthDate.getTime();
    const diffDate = new Date(diffMs);
    return Math.abs(diffDate.getUTCFullYear() - 1970);
};

const CurrentPatientCard: React.FC<CurrentPatientCardProps> = ({ patient }) => {
    const { id, fullName, dob, gender, email, phone, imageUrl } = patient;
    const age = calculateAge(dob);

    const pickDefaultAvatar = (id: string) => {
        const hash = Array.from(id).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
        return DEFAULT_AVATARS[hash % DEFAULT_AVATARS.length];
    };

    const imgSrc = imageUrl || pickDefaultAvatar(id);

    return (
        <div className="w-full bg-card border border-default rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr] gap-x-12 gap-y-4">
                {/* First Row */}
                <div className="col-span-1"><h2 className="text-xl font-semibold text-primary text-center">Current Patient</h2></div>
                <div className="col-span-1" />
                <div className="col-span-1" />

                {/* Second Row */}
                <div className="flex justify-center">
                    <div className="w-48 h-48 rounded-lg overflow-hidden">
                        <img
                            src={imgSrc}
                            alt={`${fullName} avatar`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Patient Details - Second Column */}
                <div className="space-y-3 flex flex-col justify-center">
                    <div>
                        <span className="font-medium text-muted">Name:</span> {fullName}
                    </div>
                    <div>
                        <span className="font-medium text-muted">Date of Birth:</span> {dob}
                    </div>
                    <div>
                        <span className="font-medium text-muted">Age:</span> {age}
                    </div>
                </div>

                {/* Patient Details - Third Column */}
                <div className="space-y-3 flex flex-col justify-center">
                    <div>
                        <span className="font-medium text-muted">Gender:</span> {gender || '—'}
                    </div>
                    <div>
                        <span className="font-medium text-muted">Email:</span> {email || '—'}
                    </div>
                    <div>
                        <span className="font-medium text-muted">Phone:</span> {phone || '—'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentPatientCard;
