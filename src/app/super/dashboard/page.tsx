import DashboardLayout from "@/components/DashboardLayout";
import OverviewPage from "@/components/dashboard/OverviewPage";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div>super admin dashboard</div>
      <OverviewPage />
    </DashboardLayout>
  );
}
