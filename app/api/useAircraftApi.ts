import { apiFetch } from "~/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { Aircraft } from "./useAircraftsApi";

export const useAircraftApi = (id: number) => {
  const queryKey = ["aircraft", id];
  const baseUrl = import.meta.env.VITE_API_BASE_LINK || "";

  const queryFn = async () => {
    return await apiFetch<Aircraft>(`${baseUrl}/api/Aircrafts/${id}`);
  };

  return useQuery({ queryKey, queryFn });
};
