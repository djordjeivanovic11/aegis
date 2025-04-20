export interface PatientInfo {
    id: string;
    fullName: string;
    dob: string;
    email: string;
    gender: string;
    age: number;
    phone: string;
    imageUrl?: string;
}

export interface PatientSummaryProps {
    patient: PatientInfo;
}
