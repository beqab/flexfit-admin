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
  Download,
  Send,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  CreditCard,
  AlertCircle,
} from "lucide-react";

// Mock data
const payouts = [
  {
    id: 1,
    instructorName: "Sarah Johnson",
    instructorEmail: "sarah.johnson@email.com",
    period: "January 2024",
    totalClasses: 24,
    totalEarnings: 360,
    creditsEarned: 24,
    status: "pending",
    dueDate: "2024-02-01",
    processedDate: null,
    paymentMethod: "Bank Transfer",
  },
  {
    id: 2,
    instructorName: "Mike Chen",
    instructorEmail: "mike.chen@email.com",
    period: "January 2024",
    totalClasses: 20,
    totalEarnings: 400,
    creditsEarned: 40,
    status: "pending",
    dueDate: "2024-02-01",
    processedDate: null,
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    instructorName: "Emma Wilson",
    instructorEmail: "emma.wilson@email.com",
    period: "January 2024",
    totalClasses: 18,
    totalEarnings: 324,
    creditsEarned: 18,
    status: "processed",
    dueDate: "2024-02-01",
    processedDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 4,
    instructorName: "Alex Rodriguez",
    instructorEmail: "alex.rodriguez@email.com",
    period: "January 2024",
    totalClasses: 22,
    totalEarnings: 550,
    creditsEarned: 44,
    status: "processed",
    dueDate: "2024-02-01",
    processedDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 5,
    instructorName: "Lisa Park",
    instructorEmail: "lisa.park@email.com",
    period: "January 2024",
    totalClasses: 16,
    totalEarnings: 256,
    creditsEarned: 16,
    status: "failed",
    dueDate: "2024-02-01",
    processedDate: null,
    paymentMethod: "PayPal",
  },
];

const stats = {
  totalPayouts: 1890,
  pendingPayouts: 760,
  processedThisMonth: 1130,
  failedPayouts: 256,
  avgPayoutAmount: 378,
  nextPayoutDate: "2024-02-01",
};

export default function PayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch = payout.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.instructorEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payout.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "processed":
        return <Badge className="bg-green-100 text-green-800">Processed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "processed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
          <p className="text-gray-600">Manage instructor payouts and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Process Payouts
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.processedThisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Successfully paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(stats.nextPayoutDate)}</div>
            <p className="text-xs text-muted-foreground">Due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Payout Summary */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payout Summary</CardTitle>
            <CardDescription>Overview of this month's payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Instructors</span>
                <span className="text-sm">{payouts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Payout</span>
                <span className="text-sm">${stats.avgPayoutAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Failed Payouts</span>
                <span className="text-sm text-red-600">{payouts.filter(p => p.status === 'failed').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm text-green-600">
                  {Math.round((payouts.filter(p => p.status === 'processed').length / payouts.length) * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common payout operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <Send className="mr-2 h-4 w-4" />
                Process All Pending
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Methods
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payouts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Instructor Payouts</CardTitle>
              <CardDescription>View and manage instructor payments</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search instructors..."
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
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                    All Payouts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                    Pending Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("processed")}>
                    Processed Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("failed")}>
                    Failed Only
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
                <TableHead>Instructor</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payout.instructorName}</div>
                      <div className="text-sm text-muted-foreground">{payout.instructorEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{payout.period}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {payout.totalClasses}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${payout.totalEarnings}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{payout.creditsEarned} credits</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payout.status)}
                      {getStatusBadge(payout.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(payout.dueDate)}
                    </div>
                  </TableCell>
                  <TableCell>{payout.paymentMethod}</TableCell>
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
                        <DropdownMenuItem>Process Payment</DropdownMenuItem>
                        <DropdownMenuItem>Edit Payout</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Cancel Payout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
