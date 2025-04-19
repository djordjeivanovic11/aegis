export interface ReportSettingsCreate {
    include_transcript: boolean;
    include_soap_note: boolean;
    include_patient_summary: boolean;
    include_lab_analysis: boolean;
    include_reminders: boolean;
    include_followup_checklist: boolean;
}

export interface ReportSettingsRead extends ReportSettingsCreate {
    id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}
