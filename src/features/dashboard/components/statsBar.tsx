import StatCard from "@/components/statCard";
import { Calendar, CreditCard, UserCheck, Users } from "lucide-react";
import { IStatsData } from "../services/dashboardService";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsBarProps {
  stats: IStatsData | undefined;
  isLoading: boolean;
  error: string | undefined;
}

export default function StatsBar({ stats, isLoading, error }: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-28 w-full rounded-md" />
        ))
      ) : error ? (
        <div className="col-span-full text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/30">
          {error}
        </div>
      ) : (
        <>
          <StatCard
            stat={stats?.allVisitors || 0}
            title="Total Visitors"
            descriptionText="All time"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            stat={stats?.last30DaysVisitors || 0}
            title="Last 30 Days Visitors"
            descriptionText="Last 30 Days"
            icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            stat={stats?.todayVisitors || 0}
            title="Today's Visitors"
            descriptionText="Today"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            stat={stats?.pendingPayoutSum || 0}
            title="Pending Payouts"
            descriptionText="Pending Payouts"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />
        </>
      )}
    </div>
  );
}
