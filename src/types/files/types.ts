export type DocumentType = 'BACKGROUND' | 'EDUCATION' | 'LAB_REPORT';

export interface UploadDocumentRequest {
    patient_id: string; // UUID
    doc_type: DocumentType;
    file: File;
}

export interface UploadDocumentResponse {
    id: string; // UUID
    patient_id: string; // UUID
    filename: string;
    file_url: string;
    doc_type: DocumentType;
    extracted_data?: Record<string, any>; // JSONB
    created_at: string; // ISO 8601
    updated_at: string; // ISO 8601
}