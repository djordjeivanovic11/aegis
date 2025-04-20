// services/chat/index.ts

import api from "@/services/axiosInstance";

export interface ChatMessage {
  isBot: boolean;     // true for assistant replies, false for user messages
  content: string;
}

export interface PatientEducationRequest {
  history: ChatMessage[];
  content: string;
}

export interface PatientEducationResponse {
  content: string;
}

/**
 * Internal helper to call the backend via our Axios instance.
 */
async function callPatientEducationApi(
    patientId: string,
    body: PatientEducationRequest
): Promise<PatientEducationResponse> {
  const { data } = await api.post<PatientEducationResponse>(
      `/patient_education/${patientId}/chat`,
      body
  );
  return data;
}

/**
 * Fetch the initial overview (no history, no content) for this patient.
 */
export function getInitialOverview(
    patientId: string
): Promise<PatientEducationResponse> {
  return callPatientEducationApi(patientId, { history: [], content: "" });
}

/**
 * Send a user message plus conversation history to the patient‐education API.
 */
export function sendPatientEducationMessage(
    patientId: string,
    content: string,
    history: ChatMessage[]
): Promise<PatientEducationResponse> {
  return callPatientEducationApi(patientId, { history, content });
}
