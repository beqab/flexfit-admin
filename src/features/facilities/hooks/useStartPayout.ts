import { useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "../services/facilityService";
import toast from "react-hot-toast";
import QUERY_KEYS from "@/lib/querykeys";

export const useStartPayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      facilityId,
      currentPayout,
    }: {
      facilityId: string;
      currentPayout?: number;
    }) =>
      facilityService.startFacilityPayout.post({
        facilityId,
        currentPayout,
      } as any),
    onSuccess: (_data, variables) => {
      toast.success("Payout started");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FACILITIES.BY_ID({
          facilityId: variables.facilityId,
        }),
      });
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to start payout"
      );
    },
  });
};

