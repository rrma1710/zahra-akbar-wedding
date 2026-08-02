// src/services/sheetService.ts

// Ganti dengan URL Web App dari Apps Script Anda
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyqU90BpIb4Uwh88jSvh59bs-0U15nUmmNZE45yOjklzb_yWqg2XMH4b80iBGFSJPFm/exec";

export interface WeddingConfig {
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  locationName?: string;
  address?: string;
  googleMapsUrl?: string;
  musicUrl?: string;
  heroImageUrl?: string;
  groomPhoto?: string;
  bridePhoto?: string;
  [key: string]: string | undefined;
}

export interface RSVPItem {
  timestamp: string;
  name: string;
  status: string;
  guestsCount: number;
  message: string;
}

export interface ApiResponse {
  config: WeddingConfig;
  rsvps: RSVPItem[];
}

export const fetchWeddingData = async (): Promise<ApiResponse> => {
  const res = await fetch(GOOGLE_SCRIPT_URL);
  if (!res.ok) throw new Error("Gagal mengambil data undangan");
  return await res.json();
};

export const submitRSVP = async (data: {
  name: string;
  status: string;
  guestsCount: number;
  message: string;
}) => {
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8", // Memakai text/plain mencegah isu CORS preflight pada Apps Script
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};
