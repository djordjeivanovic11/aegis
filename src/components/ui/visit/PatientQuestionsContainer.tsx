'use client';

import React, { useEffect, useState } from 'react';
import PatientQuestions from './PatientQuestions';
import PatientQuestionsPopup from './PatientQuestionsPopup';
import { useVisit } from '@/components/context/VisitContext';

const PatientQuestionsContainer: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { checklistQuestions, setChecklistQuestions, checklistStatuses } = useVisit();

    // This effect is causing an infinite loop because:
    // 1. It depends on checklistQuestions
    // 2. It then modifies checklistQuestions via setChecklistQuestions
    // 3. This triggers the effect again, creating an infinite loop
    
    // We should either remove this effect or modify it to avoid the loop
    // For now, we'll fix the typing issue and add protection against the loop
    useEffect(() => {
        // Skip effect if we already have questions with the right structure
        if (checklistQuestions.length > 0 && typeof checklistQuestions[0] === 'object' && 'id' in checklistQuestions[0]) {
            // Questions are already in the correct format
            return;
        }
        
        // Only run this transformation if checklistQuestions is not already 
        // in the Question format (which would be a rare case now)
        console.log('Transforming questions to Question format');
        const nextQuestions = checklistQuestions.map((q, index) => {
            // If q is already a Question object, return it as is
            if (typeof q === 'object' && q !== null && 'id' in q && 'text' in q && 'answered' in q) {
                return q;
            }
            // Otherwise construct a new Question object (this path should never execute with current setup)
            return {
                id: index + 1,
                text: typeof q === 'string' ? q : String(q),
                answered: checklistStatuses[index] || false
            };
        });
        setChecklistQuestions(nextQuestions);
    }, []); // Run only once on mount to avoid loops

    const handleAddQuestion = (text: string) => {
        if (!text.trim()) return;
        setChecklistQuestions(qs => [
            ...qs,
            { id: Date.now(), text: text.trim(), answered: false },
        ]);
    };

    const handleDeleteQuestion = (id: number) => {
        setChecklistQuestions(qs => qs.filter(q => q.id !== id));
    };

    const handleToggleAnswer = (id: number) => {
        setChecklistQuestions(qs => qs.map(q => 
            q.id === id ? { ...q, answered: !q.answered } : q
        ));
    };

    return (
        <>
            <PatientQuestions 
                questions={checklistQuestions}
                onAddQuestion={handleAddQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                onToggleAnswer={handleToggleAnswer}
                onOpenPopup={() => setIsPopupOpen(true)}
            />

            {isPopupOpen && (
                <PatientQuestionsPopup 
                    onClose={() => setIsPopupOpen(false)} 
                    questions={checklistQuestions}
                    onAddQuestion={handleAddQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                    onToggleAnswer={handleToggleAnswer}
                />
            )}
        </>
    );
};

export default PatientQuestionsContainer; 