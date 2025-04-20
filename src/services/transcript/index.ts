import api from "@/services/axiosInstance";
import {
    VisitRequest,
    ClaudeResponse,
    VisitTranscript,
    FullTranscription,
    ChunkTranscription,
    Transcription,
} from "@/types/transcript/types";

// Fetch summary (SUMMARY)
export async function getSummary(visitId: string): Promise<ClaudeResponse> {
    const payload: VisitRequest = { visit_id: visitId };
    const res = await api.post<ClaudeResponse>(
        "/transcriptions/get_summary",
        payload
    );
    return res.data;
}

// Fetch SOAP note
export async function getSoap(visitId: string): Promise<ClaudeResponse> {
    const payload: VisitRequest = { visit_id: visitId };
    const res = await api.post<ClaudeResponse>(
        "/transcriptions/get_soap",
        payload
    );
    return res.data;
}

// Fetch follow-up checklist
export async function getFollowup(
    visitId: string
): Promise<ClaudeResponse> {
    const payload: VisitRequest = { visit_id: visitId };
    const res = await api.post<ClaudeResponse>(
        "/transcriptions/get_followup",
        payload
    );
    return res.data;
}

// Fetch lab analysis
export async function getAnalysis(
    visitId: string
): Promise<ClaudeResponse> {
    const payload: VisitRequest = { visit_id: visitId };
    const res = await api.post<ClaudeResponse>(
        "/transcriptions/get_analysis",
        payload
    );
    return res.data;
}

// Fetch raw transcript from visits table
export async function getTranscript(
    visitId: string
): Promise<VisitTranscript> {
    const payload: VisitRequest = { visit_id: visitId };
    const res = await api.post<VisitTranscript>(
        "/transcriptions/get_transcript",
        payload
    );
    return res.data;
}

// Transcribe full audio text
export async function transcribeFull(
    file: File
): Promise<FullTranscription> {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post<FullTranscription>(
        "/transcriptions/full",
        form,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

// Transcribe into timed chunks
export async function transcribeChunks(
    file: File
): Promise<ChunkTranscription> {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post<ChunkTranscription>(
        "/transcriptions/chunks",
        form,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

// Transcribe both full text and chunks
export async function transcribeAll(
    file: File
): Promise<Transcription> {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post<Transcription>(
        "/transcriptions/",
        form,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

// Bundle export
const transcriptService = {
    getSummary,
    getSoap,
    getFollowup,
    getAnalysis,
    getTranscript,
    transcribeFull,
    transcribeChunks,
    transcribeAll,
};

export default transcriptService;
