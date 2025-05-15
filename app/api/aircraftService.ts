import { apiFetch } from "~/lib/api";
import type { CreateAircraftDto } from "~/components/AircraftFormModal";
import type { Aircraft } from "./useAircraftsApi";

const BASE_URL = import.meta.env.VITE_API_BASE_LINK || "";

export const aircraftService = {
  createAircraft: async (data: CreateAircraftDto): Promise<Aircraft> => {
    return apiFetch<Aircraft>(`${BASE_URL}/api/Aircrafts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  updateAircraft: async (
    id: number,
    data: CreateAircraftDto
  ): Promise<Aircraft> => {
    return apiFetch<Aircraft>(`${BASE_URL}/api/Aircrafts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
