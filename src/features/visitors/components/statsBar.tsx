import StatCard from "@/components/statCard";
import { Calendar, UserCheck, Users } from "lucide-react";

export default function StatsBar() {
  const stats = {
    totalVisitors: 1247,
    activeVisitors: 89,
    newThisMonth: 12,
    avgVisitsPerWeek: 3.2,
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        stat={stats.totalVisitors}
        title="Total Visitors"
        descriptionText="All time"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />

      <StatCard
        stat={stats.activeVisitors}
        title="Active Members"
        descriptionText="Currently active"
        icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
      />

      <StatCard
        stat={stats.newThisMonth}
        title="New This Month"
        descriptionText="+15% from last month"
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
      />

      <StatCard
        stat={stats.avgVisitsPerWeek}
        title="Avg Visits/Week"
        descriptionText="Per active member"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
