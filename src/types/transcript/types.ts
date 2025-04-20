// Request to fetch by visit ID
export interface VisitRequest {
    visit_id: string;
}

// Possible response types in your claude_responses table
export type TranscriptResponseType =
    | "SUMMARY"
    | "SOAP"
    | "FOLLOWUP_CHECKLIST"
    | "LAB_ANALYSIS";

// Generic claude_responses record
export interface ClaudeResponse {
    id: string;
    visit_id: string;
    response_type: TranscriptResponseType;
    content: string;
    created_at: string;
    updated_at: string;
}

// Visit record with transcript field
export interface VisitTranscript {
    id: string;
    patient_id: string;
    doctor_id: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    transcript: string;
    created_at: string;
    updated_at: string;
}

// Simple full-text transcription
export interface FullTranscription {
    text: string;
}

// Chunk with timestamps
export interface Chunk {
    start: number;
    end: number;
    text: string;
}
export interface ChunkTranscription {
    segments: Chunk[];
}

// Combined transcription
export interface Transcription extends FullTranscription {
    segments: Chunk[];
}
