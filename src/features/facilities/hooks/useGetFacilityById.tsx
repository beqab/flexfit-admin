import QUERY_KEYS from "@/lib/querykeys";
import { useQuery } from "@tanstack/react-query";
import { facilityService } from "../services/facilityService";

export const useGetFacilityById = (facilityId: string) => {
  const QueryResult = useQuery({
    queryKey: QUERY_KEYS.FACILITIES.BY_ID({ facilityId }),
    queryFn: () => facilityService.getFacilityById.get({}, facilityId),
  });
  return QueryResult;
};
