import QUERY_KEYS from "@/lib/querykeys";
import { facilityService } from "../services/facilityService";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const queryResult = useQuery({
    queryKey: QUERY_KEYS.FACILITIES.CATEGORIES,
    queryFn: () => facilityService.getCategories.get(),
  });
  return queryResult;
};
