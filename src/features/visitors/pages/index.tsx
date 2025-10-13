import GenerateQrCode from "@/components/generateQrCode";

import StatsBar from "../components/statsBar";
import VisitorsTable from "../components/visitorsTable";

export default function VisitorsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitors</h1>
        </div>
        <div className="flex gap-2">
          <GenerateQrCode />
        </div>
      </div>
      <StatsBar />

      <VisitorsTable />
    </div>
  );
}
