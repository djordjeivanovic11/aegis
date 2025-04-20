'use client';

import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Visit } from './VisitTimeline';

interface VisitDetailProps {
    visit: Visit & { takeaways: string[]; pdfUrl: string };
}

const VisitDetail: React.FC<VisitDetailProps> = ({ visit }) => (
    <div className="bg-card border border-default rounded-md p-6 space-y-6 h-full">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-foreground">
                Visit on {new Date(visit.date).toLocaleDateString()}
            </h3>
            <a
                href={visit.pdfUrl}
                download
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition"
            >
                <DocumentArrowDownIcon className="h-5 w-5" />
                Download PDF
            </a>
        </div>
        <div>
            <h4 className="text-lg font-medium text-primary mb-2">Summary</h4>
            <p className="text-sm text-foreground leading-relaxed">{visit.summary}</p>
        </div>
        <div>
            <h4 className="text-lg font-medium text-primary mb-2">Key Takeaways</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-foreground">
                {visit.takeaways.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default VisitDetail;