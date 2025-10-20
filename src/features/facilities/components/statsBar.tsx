"use client";

import StatCard from "@/components/statCard";
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react";

interface FacilityStats {
  totalFacilities: number;
  activeFacilities: number;
  totalRevenue: number;
  avgVisitorsPerFacility: number;
}

interface StatsBarProps {
  stats: FacilityStats;
}

export default function FacilitiesStatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        stat={stats.totalFacilities}
        title="Total Facilities"
        descriptionText="All registered facilities"
        icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        stat={stats.activeFacilities}
        title="Active Facilities"
        descriptionText="Currently operational"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        stat={stats.totalRevenue}
        title="Total Revenue"
        descriptionText="This month"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        stat={stats.avgVisitorsPerFacility}
        title="Avg. Visitors"
        descriptionText="Per facility per month"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
