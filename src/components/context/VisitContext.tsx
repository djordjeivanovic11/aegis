'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Visit } from '@/components/ui/visit/VisitTimeline';
import { Question } from '../ui/visit/PatientQuestions';

// Define session status type
export type SessionStatus = 'idle' | 'recording' | 'processing' | 'completed' | 'error';

// Define what data will be available in the context
interface VisitContextType {
  // Visit data
  detailedVisit: (Visit & { takeaways: string[]; pdfUrl: string }) | null;
  setDetailedVisit: React.Dispatch<React.SetStateAction<(Visit & { takeaways: string[]; pdfUrl: string }) | null>>;
  
  // Recording state
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Session state
  sessionStatus: SessionStatus;
  setSessionStatus: React.Dispatch<React.SetStateAction<SessionStatus>>;
  
  // Checklist data
  checklistQuestions: Question[];
  setChecklistQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  checklistStatuses: boolean[];
  setChecklistStatuses: React.Dispatch<React.SetStateAction<boolean[]>>;
}

// Create the context with a default value
const VisitContext = createContext<VisitContextType | undefined>(undefined);

// Provider component
interface VisitProviderProps {
  children: ReactNode;
  initialVisit?: Visit & { takeaways: string[]; pdfUrl: string };
}

export const VisitProvider: React.FC<VisitProviderProps> = ({ 
  children, 
  initialVisit = null 
}) => {
  const [detailedVisit, setDetailedVisit] = useState<(Visit & { takeaways: string[]; pdfUrl: string }) | null>(initialVisit);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('idle');
  const [checklistQuestions, setChecklistQuestions] = useState<Question[]>([
    { id: 1, text: 'How are you feeling today?', answered: false },
    { id: 2, text: 'Any pain or discomfort?', answered: false },
  ]);
  const [checklistStatuses, setChecklistStatuses] = useState<boolean[]>([
    false,
    false,
  ]);

  return (
    <VisitContext.Provider value={{
      detailedVisit,
      setDetailedVisit,
      isRecording,
      setIsRecording,
      sessionStatus,
      setSessionStatus,
      checklistQuestions,
      setChecklistQuestions,
      checklistStatuses,
      setChecklistStatuses
    }}>
      {children}
    </VisitContext.Provider>
  );
};

// Custom hook for using the context
export const useVisit = () => {
  const context = useContext(VisitContext);
  if (context === undefined) {
    throw new Error('useVisit must be used within a VisitProvider');
  }
  return context;
}; 