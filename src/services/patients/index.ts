// src/services/patients/index.ts

import api from "@/services/axiosInstance";

/**
 * Store a list of questions for a patient
 * @param patient_id - The ID of the patient
 * @param questions - Array of question strings
 */
export async function listQuestions(
    patient_id: string,
    questions: string[]
): Promise<{ status: string; message: string }> {
    try {
        // Validate inputs
        if (!patient_id) {
            throw new Error("Patient ID is required");
        }
        
        // Ensure we have a valid array, even if empty
        const questionsList = Array.isArray(questions) ? questions : [];
        
        // Send the request with the patient_id in the URL path and questions in the request body
        // Update the endpoint format to match backend expectations
        const res = await api.post<{ status: string; message: string }>(
            `/api/patients/${patient_id}/questions`,
            { questions: questionsList } 
        );
        
        return res.data;
    } catch (error) {
        console.error("Error storing patient questions:", error);
        throw error;
    }
}