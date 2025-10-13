import QUERY_KEYS from "@/lib/querykeys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  IVisitorsResponse,
  visitorsService,
} from "../services/visitorsService";
import toast from "react-hot-toast";
import { IApiError } from "@/lib/apiClient";

export const useGetVisitors = ({
  page = 1,
  limit = 10,
  facilityId,
  params = {},
}: {
  page?: number;
  limit?: number;
  facilityId?: string;
  params?: Record<string, string>;
}) => {
  const queryResult = useInfiniteQuery<IVisitorsResponse, IApiError>({
    queryKey: QUERY_KEYS.VISITORS.ALL({
      facilityId: facilityId || "",
      limit,
      params,
    }),
    queryFn: ({ pageParam }) =>
      visitorsService.getVisitors.get({
        page: pageParam as number,
        limit,
        ...(facilityId && { facilityId }),
        ...params,
      }),
    initialPageParam: page,
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more pages
      if (lastPage.data.length < limit) {
        return undefined; // No more pages
      }
      return allPages.length + 1; // Return next page number
    },
  });

  // Handle errors in useEffect if needed
  useEffect(() => {
    if (queryResult.error) {
      console.log("Error fetching visitors:", queryResult.error.message);
      toast.error(queryResult.error.message);
    }
  }, [queryResult.error]);

  return queryResult;
};
