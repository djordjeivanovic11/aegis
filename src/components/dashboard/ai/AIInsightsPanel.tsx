'use client';

import React from 'react';
import { FaCheckCircle, FaEye } from 'react-icons/fa';

interface AIInsightsPanelProps {
    summary: string;
    takeaways: string[];
    onViewInsights: () => void;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
                                                             summary,
                                                             takeaways,
                                                             onViewInsights,
                                                         }) => {
    return (
        <div className="bg-card border border-default rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow space-y-8">

            {/* High‑Level Summary */}
            <div className="space-y-3">
                <h4 className="flex items-center text-lg font-semibold text-primary">
                    Live Summary
                </h4>
                <div className="text-sm text-foreground bg-muted/10 border-l-4 border-primary p-4 rounded max-h-40 overflow-y-auto leading-relaxed">
                    {summary || (
                        <p className="italic text-muted">
                            No summary available yet.
                        </p>
                    )}
                </div>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-3">
                <h4 className="flex items-center text-lg font-semibold text-primary">
                    <FaCheckCircle className="mr-2 text-primary" />
                    Key Takeaways
                </h4>
                {takeaways.length > 0 ? (
                    <ul className="list-disc list-inside marker:text-primary space-y-2 text-sm text-foreground">
                        {takeaways.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="italic text-muted text-sm">
                        No takeaways yet.
                    </p>
                )}
            </div>

            {/* View Full Insights */}
            <div className="pt-4 border-t border-default">
                <button
                    onClick={onViewInsights}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-shadow shadow-sm"
                >
                    <FaEye />
                    View Full Insights
                </button>
            </div>
        </div>
    );
};

export default AIInsightsPanel;
