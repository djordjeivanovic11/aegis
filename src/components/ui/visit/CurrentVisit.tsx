'use client';

import React from 'react';
import { Visit } from './VisitTimeline';
import SessionControls from '../controls/RecorderControls';

interface CurrentVisitProps {
    visit: Visit & { takeaways: string[]; pdfUrl: string };
}

const CurrentVisit: React.FC<CurrentVisitProps> = ({ visit }) => (
    <div className="bg-card border border-default rounded-md p-6 space-y-6 h-full">
        <h3 className="text-xl font-semibold text-foreground">
            Visit on {new Date(visit.date).toLocaleDateString()}
        </h3>
        <div className="relative">
            <div className="float-left mr-4 w-[410px] mt-2">
                <h4 className="text-lg font-semibold text-primary mb-2 text-center">Start recording conversation</h4>
                <SessionControls />
            </div>
        </div>
    </div>
);

export default CurrentVisit;