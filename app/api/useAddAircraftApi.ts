import { useMutation } from "@tanstack/react-query";
import type { CreateAircraftDto } from "~/components/AircraftFormModal";
import { apiPost } from "~/lib/api";

interface MutationFnProps {
  data: CreateAircraftDto;
}

export const useAddAircraftApi = () => {
  return useMutation({
    mutationFn: async ({ data }: MutationFnProps) => {
      return await apiPost<CreateAircraftDto>(
        `${import.meta.env.VITE_API_BASE_LINK}/api/Aircrafts`,
        data
      );
    },
  });
};
