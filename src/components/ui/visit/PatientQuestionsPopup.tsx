'use client';

import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { X } from 'lucide-react';
import Checklist from '../checklist/Checklist';
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
            <div className="bg-card border border-default rounded-md p-4 shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <FaQuestionCircle /> Patient Questions
                    </h4>
                    <button
                        onClick={onClose}
                        className="text-muted hover:text-foreground transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <Checklist 
                    questions={questions}
                    onAddQuestion={onAddQuestion}
                    onDeleteQuestion={onDeleteQuestion}
                    onToggleAnswer={onToggleAnswer}
                />
            </div>
        </div>
    );
};

export default PatientQuestionsPopup; 