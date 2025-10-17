"use client";

import DashboardList from "../components/dashboardList";
import RecentVisitItem from "../components/recentVisitItm";
import ActivityItem from "../components/activityitem";
import useGetLatestVisitrs from "../hooks/useGetLatestVisitrs";
import { useGetCurrentUser } from "@/lib/hooks/profile/useGetCurrentUser";
import { useGetStats } from "../hooks/useGetStats";
import StatsBar from "../components/statsBar";

const pageLimit = 10;

export default function OverviewPage() {
  const {
    data: latestVisitorsData,
    isLoading,
    error: latestVisitorsError,
  } = useGetLatestVisitrs({
    limit: pageLimit,
  });
  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    error: currentUserError,
  } = useGetCurrentUser();

  const {
    data: statsData,
    isLoading: isStatsLoading,
    error: statsError,
  } = useGetStats();

  const stats = statsData?.data;

  const workingHours = currentUser?.facility?.workingHours || [];

  const latestVisitors = latestVisitorsData?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening at your gym today.
        </p>
      </div>

      {/* Stats Grid */}
      <StatsBar
        stats={stats}
        isLoading={isStatsLoading}
        error={statsError?.message}
      />

      {/* Recent Activity and Upcoming Classes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <DashboardList
          name="Recent Activity"
          description="Latest check-ins and payouts"
          isLoading={isLoading}
          error={latestVisitorsError?.message}
        >
          <div className="space-y-4">
            {latestVisitors.length > 0 ? (
              latestVisitors.map((item) => (
                <RecentVisitItem key={item._id} item={item} />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No recent activity
              </div>
            )}
          </div>
        </DashboardList>
        {/* Weekly Schedule */}
        <DashboardList
          name="Weekly Schedule"
          description="Activities throughout the week"
          error={currentUserError?.message}
          isLoading={isCurrentUserLoading}
        >
          <ActivityItem workingHours={workingHours} />
        </DashboardList>
      </div>
    </div>
  );
}
