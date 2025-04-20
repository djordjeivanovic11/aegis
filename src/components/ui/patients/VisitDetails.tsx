'use client';

import React from 'react';
import { Visit } from '@/types/visit/types';
import { ClaudeResponse } from '@/types/claude/types';

interface VisitDetailsProps {
    visit: Visit;
}

export default function VisitDetails({ visit }: VisitDetailsProps) {
    const {
        start_time,
        end_time,
        is_active,
        transcript,
        claude_responses = [],
    } = visit;

    const formatDate = (iso: string) => {
        try {
            return new Date(iso).toLocaleString();
        } catch {
            return iso;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Visit Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Visit Details</h2>
                <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                        is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                >
          {is_active ? 'Active' : 'Closed'}
        </span>
            </div>

            {/* Time Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="text-sm text-gray-600">Start Time</p>
                    <p className="text-gray-800 font-medium">{formatDate(start_time)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">End Time</p>
                    <p className="text-gray-800 font-medium">
                        {end_time ? formatDate(end_time) : 'Ongoing'}
                    </p>
                </div>
            </div>

            {/* Transcript */}
            {transcript && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Transcript</h3>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700">
                        {transcript}
                    </div>
                </div>
            )}

            {/* Claude Responses */}
            {claude_responses.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Responses</h3>
                    <div className="space-y-4">
                        {claude_responses.map((resp: ClaudeResponse, idx: number) => (
                            <div
                                key={idx}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm"
                            >
                                <pre className="text-gray-700 text-sm whitespace-pre-wrap">
                  {typeof resp.content === 'string'
                      ? resp.content
                      : JSON.stringify(resp.content, null, 2)}
                </pre>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
