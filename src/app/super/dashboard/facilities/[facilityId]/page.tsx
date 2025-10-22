import FacilityDetails from "@/features/facilities/pages/facilityDetails";

interface FacilityPageProps {
  params: {
    facilityId: string;
  };
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { facilityId } = await params;
  console.log("facilityId param", facilityId);

  return <FacilityDetails facilityId={facilityId} />;
}
