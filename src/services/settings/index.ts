import api from "../axiosInstance";
import {
    ReportSettingsCreate,
    ReportSettingsRead,
} from "@/types/settings/types";

/**
 * Fetch the current user's report‑generation settings.
 * If none exist yet, the backend will create defaults.
 */
export async function getSettings(): Promise<ReportSettingsRead> {
    const { data } = await api.get<ReportSettingsRead>("/api/settings");
    return data;
}

/**
 * Overwrite the user's report‑generation settings.
 * Pass exactly the six boolean flags.
 */
export async function updateSettings(
    settings: ReportSettingsCreate
): Promise<ReportSettingsRead> {
    const { data } = await api.put<ReportSettingsRead>(
        "/api/settings",
        settings
    );
    return data;
}

export default {
    getSettings,
    updateSettings,
};
