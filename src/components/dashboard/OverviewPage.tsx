"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const recentActivity = [
  {
    id: 1,
    type: "checkin",
    user: "Sarah Johnson",
    time: "2 minutes ago",
    class: "Morning Yoga",
  },
  {
    id: 2,
    type: "checkin",
    user: "Mike Chen",
    time: "5 minutes ago",
    class: "HIIT Training",
  },
  {
    id: 3,
    type: "payout",
    user: "Emma Wilson",
    time: "1 hour ago",
    class: "Pilates",
    amount: 15,
  },
  {
    id: 4,
    type: "checkin",
    user: "Alex Rodriguez",
    time: "1 hour ago",
    class: "Strength Training",
  },
  {
    id: 5,
    type: "payout",
    user: "Lisa Park",
    time: "2 hours ago",
    class: "Zumba",
    amount: 12,
  },
];

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your gym today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
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
            <CardTitle className="text-sm font-medium">Check-ins Today</CardTitle>
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
            <div className="text-3xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">+8.2%</Badge>
              <span className="text-sm text-muted-foreground">vs last month</span>
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
            <div className="text-3xl font-bold">${stats.pendingPayouts.toLocaleString()}</div>
            <Button className="mt-2" size="sm">
              Process Payouts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Upcoming Classes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest check-ins and payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {activity.type === "checkin" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <QrCode className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.type === "checkin" ? "Checked in to" : "Payout for"} {activity.class}
                      {activity.amount && ` - $${activity.amount}`}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Today's class schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{classItem.name}</p>
                      <p className="text-xs text-gray-500">{classItem.time} • {classItem.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {classItem.attendees}/{classItem.capacity}
                    </p>
                    <p className="text-xs text-gray-500">attendees</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
