// src/types/link/types.ts

export interface LinkBasic {
    id: number;
    url: string;
}

export interface LinkDetail extends LinkBasic {
    // analysis will be `null` or `undefined` until run through analyze-store
    analysis?: string;
}

export interface LinkCreate {
    urls: string[];
}
