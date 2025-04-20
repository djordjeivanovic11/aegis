import api from "@/services/axiosInstance";
import { UploadDocumentRequest, UploadDocumentResponse } from "@/types/files/types";

export async function uploadDocument(
    { patient_id, doc_type, file }: UploadDocumentRequest
): Promise<UploadDocumentResponse> {
    const form = new FormData();
    form.append("patient_id", patient_id);
    form.append("doc_type", doc_type);
    form.append("file", file);

    const { data } = await api.post<UploadDocumentResponse>(
        "/documents",
        form,
        {
            headers: {
                'Accept': 'application/json',
            },
        }
    );
 
    return data;
}