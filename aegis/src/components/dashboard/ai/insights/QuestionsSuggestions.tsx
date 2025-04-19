// components/dashboard/insights/QuestionsSuggestions.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface Suggestion {
    id: string;
    text: string;
}

interface QuestionsSuggestionsProps {
    fetchSuggestions: () => Promise<Suggestion[]>;
    intervalMs?: number;
}

const QuestionsSuggestions: React.FC<QuestionsSuggestionsProps> = ({
                                                                       fetchSuggestions,
                                                                       intervalMs = 30000,
                                                                   }) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        let mounted = true;
        const update = async () => {
            const results = await fetchSuggestions();
            if (mounted) setSuggestions(results);
        };
        update();
        const handle = setInterval(update, intervalMs);
        return () => {
            mounted = false;
            clearInterval(handle);
        };
    }, [fetchSuggestions, intervalMs]);

    return (
        <div className="w-full bg-card border-t-4 border-primary rounded-lg p-8 shadow-md">
            {/* Header */}
            <h2 className="text-3xl font-bold text-primary mb-6">Live Suggestions</h2>

            {/* Suggestions List */}
            {suggestions.length > 0 ? (
                <ul className="space-y-4">
                    {suggestions.map(s => (
                        <li
                            key={s.id}
                            className="pl-4 border-l-4 border-primary text-lg text-foreground leading-snug hover:bg-muted/5 transition rounded"
                        >
                            {s.text}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg text-muted italic">Waiting for suggestions…</p>
            )}
        </div>
    );
};

export default QuestionsSuggestions;
