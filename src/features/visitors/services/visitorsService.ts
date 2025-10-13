import { createApiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRotes";
import { IHistory, IPagination } from "@/lib/types/serviceTypes";

export interface IVisitorsResponse {
  data: IHistory[];
  pagination: IPagination;
}

const getVisitors = createApiClient<IVisitorsResponse>(API_ROUTES.GET_VISITORS);

export const visitorsService = {
  getVisitors,
};
