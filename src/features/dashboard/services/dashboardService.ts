import { createApiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRotes";
import { IHistory, IPagination } from "@/lib/types/serviceTypes";

export interface IVisitorsResponse {
  data: IHistory[];
  pagination: IPagination;
}

export interface IStatsData {
  pendingPayoutSum: number;
  allVisitors: number;
  todayVisitors: number;
  last30DaysVisitors: number;
}

const getStats = createApiClient<{ data: IStatsData }>(API_ROUTES.GET_STATS);

const latestVisitors = createApiClient<IVisitorsResponse>(
  API_ROUTES.GET_VISITORS
);

export const dashboardService = {
  latestVisitors,
  getStats,
};
