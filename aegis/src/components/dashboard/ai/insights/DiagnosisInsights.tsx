// components/dashboard/insights/DiagnosisInsights.tsx
'use client';

import React from 'react';

export interface TreatmentOption {
    name: string;
    description: string;
    sideEffects?: string;
}

export interface RecoveryStage {
    stage: string;
    description: string;
    timeline?: string;
}

export interface DiagnosisInsightsProps {
    diagnosis: string;
    rationale: string;
    treatments: TreatmentOption[];
    recoveryPlan: RecoveryStage[];
}

const DiagnosisInsights: React.FC<DiagnosisInsightsProps> = ({
                                                                 diagnosis,
                                                                 rationale,
                                                                 treatments,
                                                                 recoveryPlan,
                                                             }) => (
    <div className="w-full bg-card border-t-4 border-primary rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-primary/10">
            <h2 className="text-2xl font-bold text-primary">{diagnosis}</h2>
        </div>

        {/* Rationale */}
        <div className="px-6 py-4 border-b border-default">
            <h3 className="text-lg font-semibold text-foreground mb-2">Rationale</h3>
            <p className="text-sm text-foreground leading-relaxed">{rationale}</p>
        </div>

        {/* Treatments & Recovery Plan */}
        <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    Treatment Options
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {treatments.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white border border-default rounded-lg p-4 shadow-sm"
                        >
                            <h4 className="text-base font-semibold text-foreground mb-2">
                                {t.name}
                            </h4>
                            <p className="text-sm text-muted mb-2">{t.description}</p>
                            <p className="text-sm text-foreground italic">
                                Side Effects: {t.sideEffects || 'None listed'}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recovery Plan */}
            <section>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    Recovery Plan
                </h3>
                <ul className="space-y-4">
                    {recoveryPlan.map((r, i) => (
                        <li
                            key={i}
                            className="flex justify-between items-start bg-muted/5 p-4 rounded-lg"
                        >
                            <div>
                                <h4 className="text-base font-semibold text-foreground">
                                    {r.stage}
                                </h4>
                                <p className="text-sm text-muted">{r.description}</p>
                            </div>
                            <span className="text-sm font-medium text-primary">
                {r.timeline || 'TBD'}
              </span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    </div>
);

export default DiagnosisInsights;
