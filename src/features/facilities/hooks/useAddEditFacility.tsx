import { useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "../services/facilityService";
import { ISingleFacility } from "@/lib/types/serviceTypes";
import toast from "react-hot-toast";
import QUERY_KEYS from "@/lib/querykeys";

export const useAddEditFacility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (facility: ISingleFacility) =>
      facilityService.addEditFacility.post(facility),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FACILITIES.ALL });
      toast.success("Facility added successfully!");
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add or edit the facility."
      );
    },
  });
};
