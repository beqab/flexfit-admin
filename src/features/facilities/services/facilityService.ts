import { createApiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRotes";
import { IFacility, IPagination } from "@/lib/types/serviceTypes";

export interface IFacilitiesResponse {
  data: IFacility[];
  pagination: IPagination;
}

const getFacilities = createApiClient<IFacilitiesResponse>(
  API_ROUTES.GET_FACILITIES
);

export const facilityService = {
  getFacilities,
};
