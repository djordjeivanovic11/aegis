'use client';

import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

export interface Visit {
    id: string;
    date: string;   // ISO or readable
    summary: string;
}

interface VisitTimelineProps {
    visits: Visit[];
    selectedId?: string;
    onSelect: (id: string) => void;
}

const VisitTimeline: React.FC<VisitTimelineProps> = ({
                                                         visits,
                                                         selectedId,
                                                         onSelect,
                                                     }) => (
    <div className="bg-card border border-default rounded-lg px-4 py-3 overflow-x-auto whitespace-nowrap">
        {visits.map(v => {
            const isActive = v.id === selectedId;
            return (
                <button
                    key={v.id}
                    onClick={() => onSelect(v.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 mr-3 mb-1 rounded-full text-sm font-medium transition ${
                        isActive
                            ? 'bg-primary text-white shadow'
                            : 'bg-muted/10 text-foreground hover:bg-muted/20'
                    }`}
                >
                    <FaCalendarAlt className={isActive ? 'text-white' : 'text-primary'} />
                    {new Date(v.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </button>
            );
        })}
    </div>
);

export default VisitTimeline;
