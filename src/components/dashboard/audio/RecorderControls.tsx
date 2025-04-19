'use client';

import React from 'react';
import { FaMicrophone, FaRobot, FaStop } from 'react-icons/fa';

interface RecorderControlsProps {
    isRecording: boolean;
    onStartWhisper: () => void;
    onStartClaude: () => void;
    onStopAll: () => void;
}

const RecorderControls: React.FC<RecorderControlsProps> = ({
                                                               isRecording,
                                                               onStartWhisper,
                                                               onStartClaude,
                                                               onStopAll,
                                                           }) => {
    return (
        <div className="p-4 flex flex-col lg:flex-row items-center justify-center gap-4">
            {/* Start Whisper */}
            <button
                onClick={onStartWhisper}
                className="flex items-center gap-2 px-5 py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
            >
                <FaMicrophone />
                Start Whisper
            </button>

            {/* Start Claude */}
            <button
                onClick={onStartClaude}
                className="flex items-center gap-2 px-5 py-2 rounded bg-secondary text-white hover:bg-secondary/90 transition"
            >
                <FaRobot />
                Start Claude
            </button>

            {/* Stop All */}
            {isRecording && (
                <button
                    onClick={onStopAll}
                    className="flex items-center gap-2 px-5 py-2 rounded bg-muted text-white hover:bg-muted/80 transition"
                >
                    <FaStop />
                    Stop Session
                </button>
            )}
        </div>
    );
};

export default RecorderControls;
