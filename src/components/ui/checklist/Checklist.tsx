// Checklist.tsx
import React, { useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

type Question = {
  id: number
  text: string
  answered: boolean
}

interface ChecklistProps {
  className?: string
}

const Checklist: React.FC<ChecklistProps> = ({ className }) => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: 'How are you feeling today?', answered: false },
    { id: 2, text: 'Any pain or discomfort?', answered: false },
  ])
  const [draft, setDraft] = useState('')

  const addQuestion = (text: string) => {
    if (!text.trim()) return
    setQuestions(qs => [
      ...qs,
      { id: Date.now(), text: text.trim(), answered: false },
    ])
  }

  const deleteQuestion = (id: number) => {
    setQuestions(qs => qs.filter(q => q.id !== id))
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* add‑new form */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="New question for the patient…"
          className="flex-1 p-2 border rounded"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addQuestion(draft)
              setDraft('')
            }
          }}
        />
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => {
            addQuestion(draft)
            setDraft('')
          }}
        >
          Add
        </button>
      </div>

      {/* checklist */}
      <div className="space-y-2 max-h-[30rem] overflow-y-auto pb-6">
        {questions.map(q => (
          <ChecklistItem
            key={q.id}
            text={q.text}
            answered={q.answered}
            onDelete={() => deleteQuestion(q.id)}
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
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  text,
  answered,
  onDelete,
}) => {
  const Icon = answered ? CheckCircle : XCircle
  const iconColor = answered ? 'text-green-500' : 'text-red-500'

  return (
    <div className="group relative flex items-start space-x-3 p-3 bg-card rounded-lg border border-default hover:shadow-md">
      <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />

      <span className="flex-1 text-sm text-foreground whitespace-normal break-all pr-8">
        {text}
      </span>

      {/* delete‑X on hover */}
      <X
        className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
        onClick={onDelete}
      />
    </div>
  )
}

export default Checklist;