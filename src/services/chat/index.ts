
/**
 * Send a message to the patient education chatbot
 * @param patientId - The ID of the patient
 * @param content - The message content to send (optional for initial message)
 * @param history - Previous conversation history
 * @returns Promise with the assistant's response
 */
export async function sendPatientEducationMessage(
    patientId: string, 
    content?: string,
    history: ChatMessage[] = []
  ): Promise<ChatResponse> {
    try {
      const response = await api.post(
        `/api/patient_education/${patientId}/chat`,
        {
          content,
          history
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message to patient education chat:", error);
      throw error;
    }
  }
  
  /**
   * Get initial overview message from the patient education chatbot
   * @param patientId - The ID of the patient
   * @returns Promise with the assistant's initial overview
   */
  export function getInitialOverview(patientId: string): Promise<ChatResponse> {
    return sendPatientEducationMessage(patientId, undefined, []);
  }