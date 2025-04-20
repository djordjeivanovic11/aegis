'use client';

import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import Checklist from '../checklist/Checklist';
import PatientQuestionsPopup from './PatientQuestionsPopup';

// Define the Question type (moved from Checklist.tsx)
export type Question = {
    id: number;
    text: string;
    answered: boolean;
}

interface PatientQuestionsProps {
}

const PatientQuestions: React.FC<PatientQuestionsProps> = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // Lift the questions state up to this component
    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, text: 'How are you feeling today?', answered: false },
        { id: 2, text: 'Any pain or discomfort?', answered: false },
    ]);

    const handleAddQuestion = (text: string) => {
        if (!text.trim()) return;
        setQuestions(qs => [
            ...qs,
            { id: Date.now(), text: text.trim(), answered: false },
        ]);
    };

    const handleDeleteQuestion = (id: number) => {
        setQuestions(qs => qs.filter(q => q.id !== id));
    };

    const handleToggleAnswer = (id: number) => {
        setQuestions(qs => qs.map(q => 
            q.id === id ? { ...q, answered: !q.answered } : q
        ));
    };

    return (
        <>
            <section className="bg-card border border-default rounded-md p-4 shadow-sm h-full flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <FaQuestionCircle /> Patient Questions
                    </h4>
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition cursor-pointer"
                    >
                        <ExternalLink className="h-5 w-5" />
                        Open in popup
                    </button>
                </div>
                <Checklist 
                    questions={questions}
                    onAddQuestion={handleAddQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                    onToggleAnswer={handleToggleAnswer}
                />
            </section>

            {isPopupOpen && (
                <PatientQuestionsPopup 
                    questions={questions}
                    onAddQuestion={handleAddQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                    onToggleAnswer={handleToggleAnswer}
                    onClose={() => setIsPopupOpen(false)} 
                />
            )}
        </>
    );
};

export default PatientQuestions;