export type Confidence = "high" | "low" | "unreadable";

export interface MedicineEntry {
  name_as_read: string;
  identified_name: string | null;
  confidence: Confidence;
  general_use_en: string;
  general_use_ur: string;
}

export interface AnalyseResponse {
  medicines: MedicineEntry[];
}
