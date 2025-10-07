import QUERY_KEYS from "@/lib/querykeys";
import { profileService } from "@/lib/services/profileService";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  console.log("useGetCurrentUser");
  const mutationResult = useQuery({
    queryKey: QUERY_KEYS.USER.CURRENT,
    queryFn: () => profileService.getMe.get(),
  });

  return mutationResult;
};
