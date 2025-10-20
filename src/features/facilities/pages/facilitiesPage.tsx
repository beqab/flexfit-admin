"use client";

import FacilitiesStatsBar from "../components/statsBar";
import FacilitiesTable from "../components/FacilitiesTable";
import AddFacilityDialog from "../components/AddFacilityDialog";

// Dummy stats data
const dummyStats = {
  totalFacilities: 8,
  activeFacilities: 7,
  totalRevenue: 78400,
  avgVisitorsPerFacility: 127,
};

export default function FacilitiesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facilities</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all your fitness facilities in one place
          </p>
        </div>
        <div className="flex gap-2">
          <AddFacilityDialog />
        </div>
      </div>

      {/* Stats Bar */}
      <FacilitiesStatsBar stats={dummyStats} />

      {/* Facilities Table */}
      <FacilitiesTable />
    </div>
  );
}
