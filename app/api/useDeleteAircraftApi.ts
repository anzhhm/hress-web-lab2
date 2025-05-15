import { useMutation } from "@tanstack/react-query";
import { apiDelete } from "~/lib/api";
import { queryClient } from "~/lib/queryClient";

export const useDeleteAircraftApi = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await apiDelete(
        `${import.meta.env.VITE_API_BASE_LINK}/api/Aircrafts/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aircraft", id] });
    },
  });
};
