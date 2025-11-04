import { useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "../services/facilityService";
import toast from "react-hot-toast";
import QUERY_KEYS from "@/lib/querykeys";

export const useFinishPayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ facilityId }: { facilityId: string }) =>
      facilityService.finishFacilityPayout.post({ facilityId }),
    onSuccess: (_data, variables) => {
      toast.success("Payout finished");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FACILITIES.BY_ID({
          facilityId: variables.facilityId,
        }),
      });
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to finish payout"
      );
    },
  });
};
