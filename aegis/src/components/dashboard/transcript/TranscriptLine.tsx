import React from "react";

interface TranscriptLineProps {
    speaker: string;
    text: string;
    timestamp?: string;
}

const TranscriptLine: React.FC<TranscriptLineProps> = ({
                                                           speaker,
                                                           text,
                                                           timestamp,
                                                       }) => {
    return (
        <div className="group mb-3 p-3 bg-card rounded-lg border border-default hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded">
            {speaker}
          </span>
                    <p className="text-sm text-foreground">{text}</p>
                </div>
                {timestamp && (
                    <span className="text-xs text-muted opacity-75 group-hover:opacity-100 transition-opacity">
            {timestamp}
          </span>
                )}
            </div>
        </div>
    );
};

export default TranscriptLine;
