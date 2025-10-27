import { useQuery } from "@tanstack/react-query";
import { facilityService } from "../services/facilityService";
import QUERY_KEYS from "@/lib/querykeys";

export const useGetFacilityAdmins = (facilityId: string) => {
  const queryResult = useQuery({
    queryKey: QUERY_KEYS.FACILITIES.ADMINS({ facilityId }),
    queryFn: () => facilityService.getFacilityAdmins.get({}, facilityId),
  });

  return queryResult;
};
