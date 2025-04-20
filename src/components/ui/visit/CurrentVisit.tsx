'use client';

import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Visit } from './VisitTimeline';
import SessionControls from '../controls/RecorderControls';
import Checklist from '../checklist/Checklist';

interface CurrentVisitProps {
    visit: Visit & { takeaways: string[]; pdfUrl: string };
}

const CurrentVisit: React.FC<CurrentVisitProps> = ({ visit }) => (
    <div className="bg-card border border-default rounded-md p-6 space-y-6">
        <h3 className="text-xl font-semibold text-foreground">
            Visit on {new Date(visit.date).toLocaleDateString()}
        </h3>
        <div className="flex gap-4">
            <div>
                <h4 className="text-lg font-medium text-primary mb-2 text-center">Start recording conversation</h4>
                <SessionControls />
            </div>
            <div className="flex-1">
                <Checklist />
            </div>
        </div>
    </div>
);

export default CurrentVisit;