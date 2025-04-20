'use client';

import React from 'react';
import SessionControls from '../controls/RecorderControls';
import { useVisit } from '@/components/context/VisitContext';

const CurrentVisit: React.FC = () => {
    const { detailedVisit } = useVisit();
    
    if (!detailedVisit) {
        return <div>No visit data available</div>;
    }
    
    return (
        <div className="bg-card border border-default rounded-md p-6 space-y-6 h-full">
            <h3 className="text-xl font-semibold text-foreground">
                Visit on {new Date(detailedVisit.date).toLocaleDateString()}
            </h3>
            <div className="relative">
                <div className="float-left mr-4 w-[410px] mt-2">
                    <h4 className="text-lg font-semibold text-primary mb-2 text-center">Record Patient Conversation</h4>
                    <SessionControls />
                </div>
            </div>
        </div>
    );
};

export default CurrentVisit;