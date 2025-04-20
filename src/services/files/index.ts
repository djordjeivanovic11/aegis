// src/services/files/index.ts

import api from "@/services/axiosInstance";
import {
    UploadDocumentRequest,
    UploadDocumentResponse,
} from "@/types/files/types";

/**
 * Upload a new document (multipart/form-data)
 */

export async function uploadDocument(
    payload: UploadDocumentRequest
): Promise<UploadDocumentResponse> {
    const form = new FormData();
    form.append("patient_id", payload.patient_id);              // must be a valid UUID string
    form.append("doc_type", payload.doc_type.toLowerCase());    // lowercase to 'background', 'education', 'lab_report' or 'other'
    form.append("file", payload.file);

    // **DO NOT** set Content-Type manually—let Axios add the multipart boundary
    const res = await api.post<UploadDocumentResponse>("/documents/", form);
    return res.data;
}
/**
 * List all documents, optionally filtered by patient
 */
export async function listDocuments(
    patientId?: string
): Promise<UploadDocumentResponse[]> {
    const params = patientId ? { patient_id: patientId } : {};
    const res = await api.get<UploadDocumentResponse[]>("/documents/", { params });
    return res.data;
}

/**
 * Get metadata for one document
 */
export async function getDocument(
    documentId: string
): Promise<UploadDocumentResponse> {
    const res = await api.get<UploadDocumentResponse>(`/documents/${documentId}`);
    return res.data;
}

/**
 * Delete a document (no response body)
 */
export async function deleteDocument(documentId: string): Promise<void> {
    await api.delete(`/documents/${documentId}`);
}

/**
 * Extract text from one document via Claude and store it
 */
export async function extractText(
    documentId: string
): Promise<UploadDocumentResponse> {
    const res = await api.post<UploadDocumentResponse>(
        `/documents/${documentId}/extract`
    );
    return res.data;
}

/**
 * Retrieve stored extracted_data for a single document
 */
export async function getExtractedText(
    documentId: string
): Promise<UploadDocumentResponse> {
    const res = await api.get<UploadDocumentResponse>(
        `/documents/${documentId}/extracted`
    );
    return res.data;
}

/**
 * Return combined extracted text for multiple docs as plain text
 */
export async function bulkExtractText(
    documentIds: string[]
): Promise<string> {
    const res = await api.post("/documents/extract/bulk", { document_ids: documentIds }, {
        responseType: "text",
    });
    return res.data;
}

const filesService = {
    uploadDocument,
    listDocuments,
    getDocument,
    deleteDocument,
    extractText,
    getExtractedText,
    bulkExtractText,
};

export default filesService;
