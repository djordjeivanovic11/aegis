'use client';

import React, { useEffect, useRef, useState } from 'react';
import TranscriptLine from './TranscriptLine';
import {
    FaBookOpen,
    FaDatabase,
    FaLightbulb,
    FaDownload,
    FaTrash,
    FaPlusCircle,
    FaCog,
} from 'react-icons/fa';

interface TranscriptEntry {
    speaker: string;
    text: string;
    timestamp?: string;
}

interface TranscriptFeedProps {
    transcript: TranscriptEntry[];
}

const TranscriptFeed: React.FC<TranscriptFeedProps> = ({ transcript }) => {
    const feedRef = useRef<HTMLDivElement>(null);
    const [showActions, setShowActions] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Auto‑scroll on new lines
    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTo({
                top: feedRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [transcript]);

    const handleAction = (action: string) => {
        console.log(`[TranscriptFeed] Action: ${action}`, transcript);
        // TODO: implement database, Claude, Neo4j calls
    };

    return (
        <div className="flex bg-card border border-default rounded-lg overflow-hidden shadow-md">
            {/* ───── Transcript Area ───── */}
            <div
                ref={feedRef}
                className="flex-1 p-4 max-h-[30rem] overflow-y-auto space-y-3"
            >
                {transcript.map((line, idx) => (
                    <TranscriptLine
                        key={idx}
                        speaker={line.speaker}
                        text={line.text}
                        timestamp={line.timestamp}
                    />
                ))}
            </div>

            {/* ───── Sidebar ───── */}
            <aside className="w-24 bg-card border-l border-default flex flex-col items-center py-4 space-y-4">
                {/* Actions Toggle */}
                <button
                    onClick={() => { setShowActions(!showActions); setShowSettings(false); }}
                    className="p-2 text-primary hover:text-primary/80 transition"
                    title="Show Actions"
                >
                    <FaPlusCircle size={20} />
                </button>

                {/* Settings Toggle */}
                <button
                    onClick={() => { setShowSettings(!showSettings); setShowActions(false); }}
                    className="p-2 text-muted hover:text-muted/80 transition"
                    title="Show Settings"
                >
                    <FaCog size={20} />
                </button>

                {/* Actions Panel */}
                {showActions && (
                    <div className="mt-2 flex flex-col items-center space-y-3">
                        <button
                            onClick={() => handleAction('commit')}
                            title="Commit to Memory"
                            className="p-2 hover:bg-accent/10 rounded-full transition"
                        >
                            <FaBookOpen className="text-accent" size={18} />
                        </button>
                        <button
                            onClick={() => handleAction('save')}
                            title="Save to Database"
                            className="p-2 hover:bg-accent/10 rounded-full transition"
                        >
                            <FaDatabase className="text-accent" size={18} />
                        </button>
                        <button
                            onClick={() => handleAction('insights')}
                            title="Generate Insights"
                            className="p-2 hover:bg-accent/10 rounded-full transition"
                        >
                            <FaLightbulb className="text-accent" size={18} />
                        </button>
                    </div>
                )}

                {/* Settings Panel */}
                {showSettings && (
                    <div className="mt-2 flex flex-col items-center space-y-3">
                        <button
                            onClick={() => handleAction('export')}
                            title="Export as PDF"
                            className="p-2 hover:bg-accent/10 rounded-full transition"
                        >
                            <FaDownload className="text-accent" size={18} />
                        </button>
                        <button
                            onClick={() => handleAction('clear')}
                            title="Clear Transcript"
                            className="p-2 hover:bg-accent/10 rounded-full transition"
                        >
                            <FaTrash className="text-accent" size={18} />
                        </button>
                    </div>
                )}
            </aside>
        </div>
    );
};

export default TranscriptFeed;
