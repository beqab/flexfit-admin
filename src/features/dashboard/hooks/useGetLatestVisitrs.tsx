import QUERY_KEYS from "@/lib/querykeys";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

const useGetLatestVisitrs = ({ limit = 10 }: { limit?: number }) => {
  const result = useQuery({
    queryKey: QUERY_KEYS.VISITORS.LATEST,
    queryFn: () => dashboardService.latestVisitors.get({ limit: limit }),
  });

  return result;
};

export default useGetLatestVisitrs;
