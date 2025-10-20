import QUERY_KEYS from "@/lib/querykeys";
import { facilityService } from "../services/facilityService";
import { useQuery } from "@tanstack/react-query";

export const useGetFacilities = ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const queryResult = useQuery({
    queryKey: QUERY_KEYS.FACILITIES.LIST({ page, limit, search }),
    queryFn: () => facilityService.getFacilities.get({ page, limit, search }),
  });

  return queryResult;
};
