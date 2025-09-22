"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  QrCode,
  Download,
  RefreshCw,
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Smartphone,
} from "lucide-react";

// Mock data
const checkIns = [
  {
    id: 1,
    visitorName: "Sarah Johnson",
    className: "Morning Yoga",
    checkInTime: "2024-01-20T08:15:00Z",
    method: "qr",
    status: "completed",
    creditsUsed: 1,
    instructor: "Sarah Johnson",
  },
  {
    id: 2,
    visitorName: "Mike Chen",
    className: "HIIT Training",
    checkInTime: "2024-01-20T09:45:00Z",
    method: "qr",
    status: "completed",
    creditsUsed: 2,
    instructor: "Mike Chen",
  },
  {
    id: 3,
    visitorName: "Emma Wilson",
    className: "Pilates",
    checkInTime: "2024-01-20T11:10:00Z",
    method: "manual",
    status: "completed",
    creditsUsed: 1,
    instructor: "Emma Wilson",
  },
  {
    id: 4,
    visitorName: "Alex Rodriguez",
    className: "Strength Training",
    checkInTime: "2024-01-20T18:05:00Z",
    method: "qr",
    status: "completed",
    creditsUsed: 2,
    instructor: "Alex Rodriguez",
  },
  {
    id: 5,
    visitorName: "Lisa Park",
    className: "Zumba",
    checkInTime: "2024-01-20T19:35:00Z",
    method: "qr",
    status: "pending",
    creditsUsed: 1,
    instructor: "Lisa Park",
  },
];

const stats = {
  totalCheckIns: 1247,
  checkInsToday: 45,
  qrCheckIns: 38,
  manualCheckIns: 7,
  avgCheckInTime: "2.3 min",
  peakHour: "6:00 PM",
};

export default function CheckInsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCheckIns = checkIns.filter((checkIn) => {
    const matchesSearch = checkIn.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkIn.className.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === "all" || checkIn.method === filterMethod;
    const matchesStatus = filterStatus === "all" || checkIn.status === filterStatus;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "qr":
        return <QrCode className="h-4 w-4 text-blue-600" />;
      case "manual":
        return <User className="h-4 w-4 text-gray-600" />;
      default:
        return <Smartphone className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCheckInTime = (timeString: string) => {
    const date = new Date(timeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Check-ins</h1>
          <p className="text-gray-600">Track visitor check-ins and QR code usage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCheckIns.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.checkInsToday}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Check-ins</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.qrCheckIns}</div>
            <p className="text-xs text-muted-foreground">84% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.peakHour}</div>
            <p className="text-xs text-muted-foreground">Most active time</p>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Generator Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Generator
          </CardTitle>
          <CardDescription>Generate QR codes for classes and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <Input placeholder="Select class..." className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Valid Until</label>
                  <Input type="datetime-local" className="mt-1" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <QrCode className="h-8 w-8 text-gray-400" />
              </div>
              <Button size="sm">Generate QR</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Check-ins Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Check-ins</CardTitle>
              <CardDescription>View and manage visitor check-ins</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search check-ins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Method</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterMethod("all")}>
                    All Methods
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterMethod("qr")}>
                    QR Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterMethod("manual")}>
                    Manual
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitor</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Credits Used</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCheckIns.map((checkIn) => {
                const { date, time } = formatCheckInTime(checkIn.checkInTime);
                return (
                  <TableRow key={checkIn.id}>
                    <TableCell className="font-medium">{checkIn.visitorName}</TableCell>
                    <TableCell>{checkIn.className}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{time}</div>
                        <div className="text-sm text-muted-foreground">{date}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMethodIcon(checkIn.method)}
                        <span className="capitalize">{checkIn.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{checkIn.creditsUsed} credits</Badge>
                    </TableCell>
                    <TableCell>{checkIn.instructor}</TableCell>
                    <TableCell>{getStatusBadge(checkIn.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Check-in</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Cancel Check-in
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
