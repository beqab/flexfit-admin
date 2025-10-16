import StatCard from "@/components/statCard";
import { Calendar, UserCheck, Users } from "lucide-react";

export default function StatsBar() {
  const stats = {
    totalVisitors: 1247,
    activeVisitors: 89,
    newThisMonth: 12,
    avgVisitsPerWeek: 320,
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        stat={stats.totalVisitors}
        title="Total Visits"
        descriptionText="All time"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />

      <StatCard
        stat={stats.avgVisitsPerWeek}
        title="Unique Visitors"
        descriptionText="All time"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />

      <StatCard
        stat={stats.activeVisitors}
        title="Total Visits "
        descriptionText="Last 30 Days"
        icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
      />

      <StatCard
        stat={stats.newThisMonth}
        title="Unique Visitors "
        descriptionText="last 30 days"
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
