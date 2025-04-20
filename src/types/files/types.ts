// src/types/files/types.ts

export type DocumentType = "BACKGROUND" | "EDUCATION" | "LAB_REPORT" | "OTHER";

export interface UploadDocumentRequest {
    patient_id: string; // UUID
    doc_type: DocumentType;
    file: File;
}

export interface UploadDocumentResponse {
    id: string;             // UUID
    patient_id: string;     // UUID
    filename: string;
    file_url: string;
    doc_type: DocumentType;
    extracted_data?: Record<string, any>; // JSONB stored in DB
    created_at: string;     // ISO 8601 timestamp
    updated_at: string;     // ISO 8601 timestamp
}

// (For bulk extract, we return plain text, so no extra type needed beyond string)
export type PlainTextResponse = string;
