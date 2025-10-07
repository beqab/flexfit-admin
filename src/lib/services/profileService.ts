import APIClient from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRotes";

const getMe = new APIClient(API_ROUTES.GET_ME);

export const profileService = {
  getMe,
};
