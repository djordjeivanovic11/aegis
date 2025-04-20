'use client';

import React from 'react';
import { FaDiagnoses } from 'react-icons/fa';

interface VisitExtrasProps {
    differential: string[];
    nextSteps: string[];
}

const VisitExtras: React.FC<VisitExtrasProps> = ({ differential, nextSteps }) => (
    <div className="space-y-6">
        {/* Differential Diagnoses */}
        <section className="bg-card border border-default rounded-md p-4 shadow-sm">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-primary mb-2">
                <FaDiagnoses /> Differential Diagnosis
            </h4>
            <ul className="list-disc list-inside text-sm text-foreground space-y-1">
                {differential.map((d, i) => (
                    <li key={i}>{d}</li>
                ))}
            </ul>
        </section>

        {/* Next Steps */}
        <section className="bg-card border border-default rounded-md p-4 shadow-sm">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-primary mb-2">
                Next Steps
            </h4>
            <ul className="list-decimal list-inside text-sm text-foreground space-y-1">
                {nextSteps.map((s, i) => (
                    <li key={i}>{s}</li>
                ))}
            </ul>
        </section>
    </div>
);

export default VisitExtras;