// Checklist.tsx
'use client';

import React, { useState, useRef } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { Question } from '../visit/PatientQuestions'
import { useVisit } from '@/components/context/VisitContext'

interface ChecklistProps {
  questions: Question[]
  onAddQuestion: (text: string) => void
  onDeleteQuestion: (id: number) => void
  onToggleAnswer: (id: number) => void
  maxHeight?: string // New prop for customizable height
}

const Checklist: React.FC<ChecklistProps> = ({ 
  questions, 
  onAddQuestion, 
  onDeleteQuestion, 
  onToggleAnswer,
  maxHeight = "160px" // Default to the original height
}) => {
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const { isRecording } = useVisit()

  const handleAdd = () => {
    if (isRecording) return // Prevent adding when recording
    onAddQuestion(draft)
    setDraft('')
    
    if (questions.length > 2) {
      // Scroll to bottom after adding question
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: 'smooth',
          })
        }
      }, 300)
    }
  }

  return (
    <div className="space-y-4">
      {/* add‑new form */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder={isRecording ? "Recording in progress..." : "New question for the patient…"}
          className="flex-1 p-2 border rounded border-default focus:outline-none focus:ring-2 focus:ring-primary/40"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !isRecording) {
              handleAdd()
            }
          }}
          disabled={isRecording}
        />
        <button
          className={`px-4 py-2 bg-primary text-white rounded ${isRecording ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
          onClick={handleAdd}
          disabled={isRecording}
        >
          Add
        </button>
      </div>

      {/* checklist */}
      <div 
        ref={listRef} 
        className="space-y-2 overflow-y-scroll pb-6"
        style={{ maxHeight }} // Use the prop for dynamic height
      >
        {questions.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-3">
            No questions have been added yet.
          </div>
        )}
        {questions.map(q => (
          <ChecklistItem
            key={q.id}
            text={q.text}
            answered={q.answered}
            onDelete={() => onDeleteQuestion(q.id)}
            onToggle={() => onToggleAnswer(q.id)}
            disabled={isRecording}
          />
        ))}
      </div>
    </div>
  )
}

interface ChecklistItemProps {
  text: string
  answered: boolean
  onDelete: () => void
  onToggle: () => void
  disabled?: boolean
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  text,
  answered,
  onDelete,
  onToggle,
  disabled = false
}) => {
  const Icon = answered ? CheckCircle : XCircle
  const iconColor = answered ? 'text-green-500' : 'text-red-500'

  return (
    <div 
      className={`group relative flex items-start space-x-3 p-3 bg-card rounded-lg border border-default hover:shadow-md ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={disabled ? undefined : onToggle}
    >
      <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />

      <span className="flex-1 text-sm text-foreground whitespace-normal break-all pr-8">
        {text}
      </span>

      {/* delete‑X on hover - only show when not disabled */}
      {!disabled && (
        <X
          className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        />
      )}
    </div>
  )
}

export default Checklist;