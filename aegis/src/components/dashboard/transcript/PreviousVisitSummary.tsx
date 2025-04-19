import React from "react";

interface PreviousVisitSummaryProps {
    summary: string;
}

const PreviousVisitSummary: React.FC<PreviousVisitSummaryProps> = ({ summary }) => {
    return (
        <div className="bg-card border border-default rounded p-4 shadow-sm">
            <h3 className="text-lg font-bold text-primary mb-2">Previous Visit Summary</h3>
            <p className="text-sm text-foreground">{summary}</p>
        </div>
    );
};

export default PreviousVisitSummary;
