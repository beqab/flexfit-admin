import { createApiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRotes";
import {
  IFacility,
  IPagination,
  ISingleFacility,
} from "@/lib/types/serviceTypes";

export interface IFacilitiesResponse {
  data: IFacility[];
  pagination: IPagination;
}

const getFacilities = createApiClient<IFacilitiesResponse>(
  API_ROUTES.GET_FACILITIES
);

const getFacilityById = createApiClient<ISingleFacility>(
  API_ROUTES.GET_FACILITY_BY_ID
);

export const facilityService = {
  getFacilities,
  getFacilityById,
};
