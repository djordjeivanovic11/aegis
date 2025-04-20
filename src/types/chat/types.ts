/**
 * Represents a single message in the chat history
 */
export interface ChatMessage {
    content: string;
    isBot: boolean;  // true for assistant messages, false for user messages
}

/**
 * Represents the response from the chat API
 */
export interface ChatResponse {
    content: string;  // The assistant's response text
}