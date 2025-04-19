import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "http://localhost:8000";

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

export function setAuthToken(token: string | null) {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}

export default api;
