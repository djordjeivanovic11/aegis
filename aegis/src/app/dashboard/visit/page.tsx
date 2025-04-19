'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaUsers, FaUserPlus, FaClipboardList, FaRocket } from 'react-icons/fa';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import SearchBar, { SearchParams } from '@/components/dashboard/new/SearchBar';
import PatientList from '@/components/dashboard/new/PatientList';
import NewPatientForm from '@/components/dashboard/new/NewPatientForm';
import LabReportsInput from '@/components/dashboard/new/LabReportsInput';
import { Patient } from '@/components/dashboard/new/PatientCard';

export default function NewVisitPage() {
    const router = useRouter();

    const [patients, setPatients] = useState<Patient[]>([]);
    const [selected, setSelected] = useState<Patient | null>(null);
    const [labFiles, setLabFiles] = useState<File[]>([]);
    const [labText, setLabText] = useState('');

    const handleSearch = (params: SearchParams) => {
        // TODO: replace with real API call
        setPatients([
            {
                id: '1',
                fullName: 'John Doe',
                dob: '1979-04-12',
                gender: 'Male',
                email: 'john.doe@example.com',
                phoneNumber: '(555) 123‑4567',
            },
        ]);
        setSelected(null);
    };

    const handleCreate = (p: Patient) => {
        setPatients(prev => [p, ...prev]);
        setSelected(p);
    };

    const handleFilesChange = (files: File[], text: string) => {
        setLabFiles(files);
        setLabText(text);
    };

    const startVisit = () => {
        if (!selected) return;
        // TODO: persist patient + lab data, then navigate
        router.push(`/dashboard/session/${selected.id}`);
    };

    return (
        <DashboardLayout pageTitle="New Visit">
            <div className="space-y-10">
                {/* 1. Patient Search */}
                <section className="bg-card p-6">
                    <div className="flex items-center mb-4">
                        <FaSearch className="text-primary mr-2" />
                        <h2 className="text-2xl font-semibold text-foreground">Find Patient</h2>
                    </div>
                    <SearchBar onSearch={handleSearch} />
                </section>

                {/* 2. Select From Results */}
                {patients.length > 0 && !selected && (
                    <section className="bg-card p-6">
                        <div className="flex items-center mb-4">
                            <FaUsers className="text-primary mr-2" />
                            <h2 className="text-2xl font-semibold text-foreground">Select Patient</h2>
                        </div>
                        <PatientList patients={patients} onSelect={setSelected} />
                    </section>
                )}

                {/* 3. Or Create a New Patient */}
                {!selected && patients.length === 0 && (
                    <section className="bg-card p-6">
                        <div className="flex items-center mb-4">
                            <FaUserPlus className="text-primary mr-2" />
                            <h2 className="text-2xl font-semibold text-foreground">New Patient</h2>
                        </div>
                        <NewPatientForm onCreate={handleCreate} />
                    </section>
                )}

                {/* 4. Preparing visit */}
                {selected && (
                    <section className="space-y-6">
                        <div className="bg-card p-6">
                            <div className="flex items-center mb-4">
                                <FaClipboardList className="text-primary mr-2" />
                                <h2 className="text-2xl font-semibold text-foreground">Preparing Visit</h2>
                            </div>
                            <div className="mb-4 text-foreground">
                                <p><strong>{selected.fullName}</strong> (DOB: {selected.dob})</p>
                                <p className="text-sm text-muted">{selected.email} • {selected.phoneNumber}</p>
                            </div>
                            <LabReportsInput onChange={handleFilesChange} />
                        </div>
                        <button
                            onClick={startVisit}
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white text-lg font-semibold hover:bg-primary/90 transition"
                        >
                            <FaRocket />
                            Start Visit
                        </button>
                    </section>
                )}
            </div>
        </DashboardLayout>
    );
}
