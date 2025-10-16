"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  QrCode,
  DollarSign,
  UserCheck,
  Clock,
} from "lucide-react";
import DashboardList from "../components/dashboardList";
import RecentVisitItem from "../components/recentVisitItm";
import ActivityItem from "../components/activityitem";
import useGetLatestVisitrs from "../hooks/useGetLatestVisitrs";

// Mock data - in real app, this would come from API
const stats = {
  totalVisitors: 1247,
  activeMembers: 89,
  classesToday: 12,
  checkInsToday: 45,
  monthlyRevenue: 12450,
  pendingPayouts: 3200,
  avgClassAttendance: 8.5,
  creditUsage: 156,
};

const upcomingClasses = [
  {
    id: 1,
    name: "Morning Yoga",
    time: "8:00 AM",
    instructor: "Sarah Johnson",
    attendees: 12,
    capacity: 15,
  },
  {
    id: 2,
    name: "HIIT Training",
    time: "9:30 AM",
    instructor: "Mike Chen",
    attendees: 8,
    capacity: 12,
  },
  {
    id: 3,
    name: "Pilates",
    time: "11:00 AM",
    instructor: "Emma Wilson",
    attendees: 6,
    capacity: 10,
  },
  {
    id: 4,
    name: "Strength Training",
    time: "6:00 PM",
    instructor: "Alex Rodriguez",
    attendees: 10,
    capacity: 15,
  },
];

export default function OverviewPage() {
  const { data: latestVisitorsData, isLoading } = useGetLatestVisitrs({
    limit: 10,
  });
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalVisitors.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMembers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.classesToday}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+2</span> more than yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Check-ins Today
            </CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.checkInsToday}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Payouts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Monthly Revenue
            </CardTitle>
            <CardDescription>Total revenue for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${stats.monthlyRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">+8.2%</Badge>
              <span className="text-sm text-muted-foreground">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pending Payouts
            </CardTitle>
            <CardDescription>Amount pending for instructors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${stats.pendingPayouts.toLocaleString()}
            </div>
            <Button className="mt-2" size="sm">
              Process Payouts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Upcoming Classes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}

        <DashboardList
          name="Recent Activity"
          description="Latest check-ins and payouts"
          items={latestVisitors}
          isLoading={isLoading}
          renderItem={(item) => <RecentVisitItem item={item} />}
        />

        {/* Upcoming Classes */}

        <DashboardList
          name="Upcoming Classes"
          description="Today's class schedule"
          items={upcomingClasses}
          renderItem={(item) => <ActivityItem item={item} />}
        />
      </div>
    </div>
  );
}
