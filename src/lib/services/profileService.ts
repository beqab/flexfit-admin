import APIClient from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRotes";
import { IAdmin } from "../types/serviceTypes";

const getMe = new APIClient<IAdmin>(API_ROUTES.GET_ME);

export const profileService = {
  getMe,
};
