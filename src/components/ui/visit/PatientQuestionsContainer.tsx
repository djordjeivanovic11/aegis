'use client';

import React, { useState } from 'react';
import PatientQuestions from './PatientQuestions';
import PatientQuestionsPopup from './PatientQuestionsPopup';
import { Question } from './PatientQuestions';

const PatientQuestionsContainer: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
            <PatientQuestions 
                questions={questions}
                onAddQuestion={handleAddQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                onToggleAnswer={handleToggleAnswer}
                onOpenPopup={() => setIsPopupOpen(true)}
            />

            {isPopupOpen && (
                <PatientQuestionsPopup 
                    onClose={() => setIsPopupOpen(false)} 
                    questions={questions}
                    onAddQuestion={handleAddQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                    onToggleAnswer={handleToggleAnswer}
                />
            )}
        </>
    );
};

export default PatientQuestionsContainer; 