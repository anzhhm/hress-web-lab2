import { useMutation } from "@tanstack/react-query";
import type { CreateAircraftDto } from "~/components/AircraftFormModal";
import { apiPut } from "~/lib/api";
import { queryClient } from "~/lib/queryClient";

export const useUpdateAircraftApi = (id: number) => {
    return useMutation({
        mutationFn: async (data: CreateAircraftDto) => {
            return await apiPut<CreateAircraftDto>(
                `${import.meta.env.VITE_API_BASE_LINK}/api/Aircrafts/${id}`,
                data
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["aircraft", id] });
        },
    })
}