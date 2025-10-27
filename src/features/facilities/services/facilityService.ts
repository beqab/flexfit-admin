import { createApiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRotes";
import {
  IAdmin,
  ICategory,
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

const getCategories = createApiClient<ICategory[]>(API_ROUTES.GET_CATEGORIES);

const addEditFacility = createApiClient<ISingleFacility>(
  API_ROUTES.ADD_EDIT_FACILITY
);

const getFacilityAdmins = createApiClient<IAdmin[]>(
  API_ROUTES.GET_FACILITY_ADMINS
);

const addAdmin = createApiClient<IAdmin>(API_ROUTES.ADD_FACILITY_ADMIN);

export const facilityService = {
  getFacilities,
  getFacilityById,
  getCategories,
  addEditFacility,
  getFacilityAdmins,
  addAdmin,
};
