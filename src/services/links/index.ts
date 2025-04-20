// src/services/links/index.ts

import api from "@/services/axiosInstance";
import { LinkBasic, LinkDetail, LinkCreate } from "@/types/link/types";

export async function createLinks(urls: string[]): Promise<LinkBasic[]> {
    const payload: LinkCreate = { urls };
    const res = await api.post<LinkBasic[]>("/links/create", payload);
    return res.data;
}

export async function getLinks(): Promise<LinkDetail[]> {
    // removed trailing slash to match FastAPI route prefix="/links"
    const res = await api.get<LinkDetail[]>("/links");
    return res.data;
}

/**
 * Calls the analyze-store endpoint:
 * - fetches & summarizes each URL via Claude
 * - persists the result
 * - returns full LinkDetail[] (with analysis)
 */
export async function analyzeAndStoreLinks(
    urls: string[]
): Promise<LinkDetail[]> {
    const payload: LinkCreate = { urls };
    const res = await api.post<LinkDetail[]>("/links/analyze-store", payload);
    return res.data;
}

const linksService = {
    createLinks,
    getLinks,
    analyzeAndStoreLinks,
};

export default linksService;
