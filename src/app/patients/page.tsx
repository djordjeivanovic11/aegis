'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/ui/layout/DashboardLayout';
import SearchBar, { SearchParams } from '@/components/ui/patients/Search';
import { PatientInfo } from '@/types/patients/types';
import { dummyPatients } from '@/components/ui/agenda/PatientList';
import CurrentPatientCard from '@/components/ui/patients/CurrentPatientCard';
import VisitTimeline from '@/components/ui/visit/VisitTimeline';
import VisitDetail from '@/components/ui/visit/VisitDetail';
import VisitExtras from '@/components/ui/visit/VisitExtras';
import CurrentVisit from '@/components/ui/visit/CurrentVisit';
import PatientQuestions from '@/components/ui/visit/PatientQuestions';

export default function RecordsPage() {
    const [selectedPatient, setSelectedPatient] = useState<PatientInfo | null>(null);
    // Dummy visits; replace with API data later
    const dummyVisits: any[] = [
        { id: 'v1', date: '2024-03-11', summary: 'Chest pain, fatigue, no fever.' },
        { id: 'v2', date: '2024-04-02', summary: 'Follow-up: symptoms improving.' },
        { id: 'v3', date: '2024-06-20', summary: 'Annual check-up, all normal.' },
        { 
            id: 'current', 
            date: new Date().toISOString().split('T')[0], 
            summary: 'Current visit in progress...' 
        }
    ];
    const [visits, setVisits] = useState<any[]>(dummyVisits);
    // Set the default selected visit to the current visit (last in the array)
    const [selectedVisitId, setSelectedVisitId] = useState<string>(dummyVisits[dummyVisits.length - 1].id);
    
    const handleSearch = (params: SearchParams) => {
        console.log('Search params:', params);
    };

    const selectedVisit = visits.find((v) => v.id === selectedVisitId);
    const detailedVisit = selectedVisit && {
         ...selectedVisit,
         takeaways: selectedVisit.id === 'current' 
            ? ['Initial assessment pending', 'Gathering patient history', 'Review previous records']
            : ['Rule out cardiac cause', 'Order ECG', 'Check CBC'],
         differential: selectedVisit.id === 'current'
            ? ['Assessment in progress']
            : ['Angina', 'GERD', 'Musculoskeletal pain'],
         nextSteps: selectedVisit.id === 'current'
            ? ['Complete initial assessment', 'Document current symptoms', 'Review medical history']
            : ['Schedule ECG', 'Start PPI trial', 'Follow up in 1 week'],
         pdfUrl: '/dummy.pdf',
     };
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const patientId = params.get('id');
            if (patientId) {
                const patient = dummyPatients.find(p => p.id === patientId);
                if (patient) {
                    setSelectedPatient(patient);
                }
            }
        }
    }, []);

    return (
        <DashboardLayout pageTitle="Patients">
            <SearchBar onSearch={handleSearch} />
            
            {/* 3. Patient overview */}
            {selectedPatient && (
                <div className="mt-8">
                    <CurrentPatientCard patient={selectedPatient} />
                </div>
            )}

            {selectedPatient && detailedVisit && (
                 <div className="mt-8 space-y-8">
                     <VisitTimeline
                         visits={visits}
                         selectedId={selectedVisitId}
                         onSelect={setSelectedVisitId}
                     />
 
                    {/* 4. Past visits */}
                    {selectedVisitId !== 'current' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[300px]">
                            <div className="lg:col-span-2">
                                <VisitDetail visit={detailedVisit} />
                            </div>
                            <VisitExtras
                                differential={detailedVisit.differential}
                                nextSteps={detailedVisit.nextSteps}
                            />
                        </div>
                    )}

                    {/* 5. Current visits */}
                    {selectedVisitId === 'current' && (
                        <div className="flex flex-row gap-8 h-[300px]">
                            <CurrentVisit visit={detailedVisit} />
                            <PatientQuestions />
                        </div>
                    )}
                 </div>
             )}
        </DashboardLayout>
    );
}
