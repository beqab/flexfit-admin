import { useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "../services/facilityService";
import toast from "react-hot-toast";
import QUERY_KEYS from "@/lib/querykeys";

interface AddAdminParams {
  username: string;
  password: string;
  facilityId: string;
}

export const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, password, facilityId }: AddAdminParams) =>
      facilityService.addAdmin.post({
        username,
        password,
        facilityId,
      } as any),
    onSuccess: (data, variables) => {
      toast.success("Admin added successfully!");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FACILITIES.ALL_ADMINS,
      });
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to add admin."
      );
    },
  });
};
