'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaCopy, FaCheck } from 'react-icons/fa';
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

    // Build a deterministic avatar fallback
    const pickDefaultAvatar = (id: string) => {
        const hash = Array.from(id).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
        return DEFAULT_AVATARS[hash % DEFAULT_AVATARS.length];
    };
    const imgSrc = imageUrl || pickDefaultAvatar(id);

    // Share link state
    const [shareUrl, setShareUrl] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    // Compute the full URL on client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShareUrl(`${window.location.origin}/ask?patientId=${id}`);
        }
    }, [id]);

    const handleCopy = () => {
        if (!shareUrl) return;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="w-full bg-card border border-default rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-start gap-6">
            {/* Left: Patient Info */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary mb-4">Current Patient</h2>
                <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr] gap-x-12 gap-y-4">
                    {/* Avatar */}
                    <div className="flex justify-center row-span-2">
                        <div className="w-48 h-48 rounded-lg overflow-hidden">
                            <img
                                src={imgSrc}
                                alt={`${fullName} avatar`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details Column 1 */}
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

                    {/* Details Column 2 */}
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


            {/* Right: QR Code + Copy Link */}
            <div className="flex flex-col items-center">
                <div className="mb-2">
                    {shareUrl && (
                        <QRCodeSVG
                            value={shareUrl}
                            size={128}
                        />
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    disabled={!shareUrl}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                    {copied ? (
                        <>
                            <FaCheck /> Copied!
                        </>
                    ) : (
                        <>
                            <FaCopy /> Copy Link
                        </>
                    )}
                </button>
            </div>        </div>
    );
};

export default CurrentPatientCard;
