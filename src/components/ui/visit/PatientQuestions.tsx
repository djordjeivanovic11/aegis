'use client';

import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import Checklist from '../checklist/Checklist';

// Define the Question type (moved from Checklist.tsx)
export type Question = {
    id: number;
    text: string;
    answered: boolean;
}

interface PatientQuestionsProps {
    questions: Question[];
    onAddQuestion: (text: string) => void;
    onDeleteQuestion: (id: number) => void;
    onToggleAnswer: (id: number) => void;
    onOpenPopup?: () => void;
    showPopupButton?: boolean;
    maxHeight?: string; // Add maxHeight prop
}

const PatientQuestions: React.FC<PatientQuestionsProps> = ({
    questions,
    onAddQuestion,
    onDeleteQuestion,
    onToggleAnswer,
    onOpenPopup,
    showPopupButton = true, // Default to showing the popup button
    maxHeight, // Default to undefined to use Checklist's default
}) => {
    return (
        <section className="bg-card border border-default rounded-md p-4 shadow-sm h-full flex-1">
            <div className="flex justify-between items-center mb-4">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <FaQuestionCircle /> Patient Questions
                </h4>
                {showPopupButton && onOpenPopup && (
                    <button
                        onClick={onOpenPopup}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition cursor-pointer"
                    >
                        <ExternalLink className="h-5 w-5" />
                        Open in popup
                    </button>
                )}
            </div>
            <Checklist 
                questions={questions}
                onAddQuestion={onAddQuestion}
                onDeleteQuestion={onDeleteQuestion}
                onToggleAnswer={onToggleAnswer}
                maxHeight={maxHeight}
            />
        </section>
    );
};

export default PatientQuestions;