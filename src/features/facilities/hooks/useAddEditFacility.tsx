import { useMutation } from "@tanstack/react-query";
import { facilityService } from "../services/facilityService";
import { ISingleFacility } from "@/lib/types/serviceTypes";

export const useAddEditFacility = () => {
  const addFacility = useMutation({
    mutationFn: (facility: ISingleFacility) =>
      facilityService.addEditFacility.post(facility),
  });
  return addFacility;
};
