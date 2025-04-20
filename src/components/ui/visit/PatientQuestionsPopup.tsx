'use client';

import React from 'react';
import { X } from 'lucide-react';
import PatientQuestions from './PatientQuestions';
import CurrentVisit from './CurrentVisit';
import { Question } from './PatientQuestions';

interface PatientQuestionsPopupProps {
    questions: Question[];
    onAddQuestion: (text: string) => void;
    onDeleteQuestion: (id: number) => void;
    onToggleAnswer: (id: number) => void;
    onClose: () => void;
}

const PatientQuestionsPopup: React.FC<PatientQuestionsPopupProps> = ({ 
    questions,
    onAddQuestion,
    onDeleteQuestion,
    onToggleAnswer,
    onClose
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-default rounded-md p-6 shadow-lg w-[90vw] max-w-7xl">
                {/* Header with close button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={onClose}
                        className="text-muted hover:text-foreground transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                {/* Content area with same layout as main view */}
                <div className="flex flex-row gap-8 h-[80vh]">
                    <CurrentVisit />
                    <PatientQuestions 
                        questions={questions}
                        onAddQuestion={onAddQuestion}
                        onDeleteQuestion={onDeleteQuestion}
                        onToggleAnswer={onToggleAnswer}
                        showPopupButton={false} // Hide the popup button in the popup view
                    />
                </div>
            </div>
        </div>
    );
};

export default PatientQuestionsPopup; 