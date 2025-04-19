'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import SearchBar, { SearchParams } from '@/components/dashboard/records/Search';
import PatientList from '@/components/dashboard/records/RecordsList';
import CurrentPatientCard from '@/components/dashboard/records/CurrentPatientCard';
import VisitTimeline, { Visit } from '@/components/dashboard/records/visit/VisitTimeline';
import VisitDetail from '@/components/dashboard/records/visit/VisitDetail';
import VisitExtras from '@/components/dashboard/records/visit/VisitExtras';
import ChatPanel from '@/components/dashboard/ai/insights/ChatPanel';

interface Patient {
    id: string;
    fullName: string;
    dob: string;
    gender: string;
    email: string;
    phoneNumber: string;
}

export default function RecordsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    // Dummy visits; replace with API data later
    const dummyVisits: Visit[] = [
        { id: 'v1', date: '2024-03-11', summary: 'Chest pain, fatigue, no fever.' },
        { id: 'v2', date: '2024-04-02', summary: 'Follow-up: symptoms improving.' },
        { id: 'v3', date: '2024-06-20', summary: 'Annual check-up, all normal.' },
    ];
    const [visits, setVisits] = useState<Visit[]>(dummyVisits);
    const [selectedVisitId, setSelectedVisitId] = useState<string>(dummyVisits[0].id);

    const handleSearch = (params: SearchParams) => {
        // TODO: call your real patient-search API
        setPatients([
            {
                id: '1',
                fullName: 'Jane Doe',
                dob: '1985-09-15',
                gender: 'Female',
                email: 'jane@example.com',
                phoneNumber: '(555) 111-2222',
            },
        ]);
        setSelectedPatient(null);
    };

    const selectedVisit = visits.find((v) => v.id === selectedVisitId);
    const detailedVisit = selectedVisit && {
        ...selectedVisit,
        takeaways: ['Rule out cardiac cause', 'Order ECG', 'Check CBC'],
        differential: ['Angina', 'GERD', 'Musculoskeletal pain'],
        nextSteps: ['Schedule ECG', 'Start PPI trial', 'Follow up in 1 week'],
        pdfUrl: '/dummy.pdf',
    };

    return (
        <DashboardLayout pageTitle="Records">
            {/* 1. Search Patients */}
            <SearchBar onSearch={handleSearch} />

            {/* 2. Patient selection list */}
            {patients.length > 0 && !selectedPatient && (
                <div className="mt-6">
                    <PatientList
                        patients={patients}
                        selectedPatient={selectedPatient}
                        onSelect={(p) => {
                            setSelectedPatient(p);
                            // TODO: fetch p’s visits
                            setSelectedVisitId(dummyVisits[0].id);
                        }}
                    />
                </div>
            )}

            {/* 3. Patient overview */}
            {selectedPatient && (
                <div className="mt-8">
                    <CurrentPatientCard
                        name={selectedPatient.fullName}
                        dob={selectedPatient.dob}
                        gender={selectedPatient.gender}
                        patientId={selectedPatient.id}
                        email={selectedPatient.email}
                        phoneNumber={selectedPatient.phoneNumber}
                    />
                </div>
            )}

            {/* 4. Visit explorer */}
            {selectedPatient && detailedVisit && (
                <div className="mt-8 space-y-8">
                    <VisitTimeline
                        visits={visits}
                        selectedId={selectedVisitId}
                        onSelect={setSelectedVisitId}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <VisitDetail visit={detailedVisit} />
                        </div>
                        <VisitExtras
                            differential={detailedVisit.differential}
                            nextSteps={detailedVisit.nextSteps}
                        />
                    </div>
                </div>
            )}

            {/* 5. Chat panel scoped to the selected patient */}
            {selectedPatient && (
                <div className="mt-8">
                    <ChatPanel patientId={selectedPatient.id} />
                </div>
            )}
        </DashboardLayout>
    );
}
