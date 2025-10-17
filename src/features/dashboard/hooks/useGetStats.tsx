import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";
import QUERY_KEYS from "@/lib/querykeys";

export const useGetStats = () => {
  const queryResult = useQuery({
    queryKey: QUERY_KEYS.VISITORS.STATS,
    queryFn: () => dashboardService.getStats.get(),
  });

  return queryResult;
};
