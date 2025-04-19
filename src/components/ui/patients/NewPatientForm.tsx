'use client';

import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { PatientInfo } from '@/types/patients/types';

interface NewPatientFormProps {
    onCreate: (patient: PatientInfo) => void;
}

const calculateAge = (dob: string): number => {
    const birth = new Date(dob);
    const diffMs = Date.now() - birth.getTime();
    const diffDate = new Date(diffMs);
    return Math.abs(diffDate.getUTCFullYear() - 1970);
};

const NewPatientForm: React.FC<NewPatientFormProps> = ({ onCreate }) => {
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPatient: PatientInfo = {
            id: uuidv4(),
            fullName,
            dob,
            gender,
            email,
            phone,
            age: calculateAge(dob),
            imageUrl: imageUrl || undefined,
        };

        onCreate(newPatient);

        // reset form
        setFullName('');
        setDob('');
        setGender('');
        setEmail('');
        setPhone('');
        setImageUrl('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-card border border-default rounded-md p-6 space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-foreground mb-1">
                        Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Jane Smith"
                        className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        autoFocus
                    />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-foreground mb-1">
                        Date of Birth <span className="text-danger">*</span>
                    </label>
                    <input
                        type="date"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-foreground mb-1">
                        Gender
                    </label>
                    <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">— Select —</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-foreground mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Phone */}
                <div className="md:col-span-2 flex flex-col">
                    <label className="text-sm font-medium text-foreground mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="(555) 123‑4567"
                        className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Image URL (optional) */}
                <div className="md:col-span-2 flex flex-col">
                    <label className="text-sm font-medium text-foreground mb-1">
                        Image URL
                    </label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full rounded-md border border-default px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition"
            >
                <FaUserPlus />
                Create Patient
            </button>
        </form>
    );
};

export default NewPatientForm;
