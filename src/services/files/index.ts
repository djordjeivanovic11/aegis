
import api from "@/services/axiosInstance";
import {
    UploadDocumentRequest,
    UploadDocumentResponse,
} from "@/types/files/types";

const BASE = "/documents";

export async function uploadDocument(
    payload: UploadDocumentRequest
): Promise<UploadDocumentResponse> {
    const form = new FormData();
    form.append("patient_id", payload.patient_id);
    form.append("doc_type", payload.doc_type.toLowerCase());
    form.append("file", payload.file);
    const res = await api.post<UploadDocumentResponse>(`${BASE}/`, form);
    return res.data;
}

export async function listDocuments(
    patientId?: string
): Promise<UploadDocumentResponse[]> {
    const params = patientId ? { patient_id: patientId } : {};
    const res = await api.get<UploadDocumentResponse[]>(`${BASE}/`, { params });
    return res.data;
}

export async function getDocument(
    documentId: string
): Promise<UploadDocumentResponse> {
    const res = await api.get<UploadDocumentResponse>(`${BASE}/${documentId}`);
    return res.data;
}

export async function deleteDocument(documentId: string): Promise<void> {
    await api.delete(`${BASE}/${documentId}`);
}

export async function extractText(
    documentId: string
): Promise<UploadDocumentResponse> {
    const res = await api.post<UploadDocumentResponse>(
        `${BASE}/${documentId}/extract`
    );
    return res.data;
}

export async function getExtractedText(
    documentId: string
): Promise<UploadDocumentResponse> {
    const res = await api.get<UploadDocumentResponse>(
        `${BASE}/${documentId}/extracted`
    );
    return res.data;
}

export async function bulkExtractText(
    documentIds: string[]
): Promise<string> {
    // note: use "documents.py", not "documents.p"
    const res = await api.post(
        `${BASE}/extract/bulk`,
        { document_ids: documentIds },
        { responseType: "text" }
    );
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
