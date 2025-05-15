import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "~/lib/api";

export interface Aircraft {
  Id: number;
  Model: string;
  Capacity: number;
  ManufacturerId: number;
  Manufacturer: {
    Id: number;
    Name: string;
  };
  CompanyId: number;
  Company: {
    Id: number;
    Name: string;
  };
}

export const useAircraftsApi = () => {
  const queryKey = ["aircrafts"];

  const queryFn = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_LINK || "";
    return apiFetch<Aircraft[]>(`${baseUrl}/api/Aircrafts`);
  };

  return useQuery({ queryKey, queryFn });
};
