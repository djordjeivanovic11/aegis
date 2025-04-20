import {ClaudeResponse} from "@/types/claude/types";

export interface Visit {
    id: string;
    patient_id: string;
    doctor_id: string;
    start_time: string;
    end_time: string | null;
    is_active: boolean;
    transcript?: string;
    claude_responses?: ClaudeResponse[];
}
