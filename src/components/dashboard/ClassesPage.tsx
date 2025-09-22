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
  Plus,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Copy,
} from "lucide-react";

// Mock data
const classes = [
  {
    id: 1,
    name: "Morning Yoga",
    instructor: "Sarah Johnson",
    time: "08:00 AM",
    duration: 60,
    capacity: 15,
    attendees: 12,
    price: 15,
    credits: 1,
    status: "active",
    category: "Yoga",
    description: "Gentle morning yoga session to start your day",
  },
  {
    id: 2,
    name: "HIIT Training",
    instructor: "Mike Chen",
    time: "09:30 AM",
    duration: 45,
    capacity: 12,
    attendees: 8,
    price: 20,
    credits: 2,
    status: "active",
    category: "HIIT",
    description: "High-intensity interval training workout",
  },
  {
    id: 3,
    name: "Pilates",
    instructor: "Emma Wilson",
    time: "11:00 AM",
    duration: 50,
    capacity: 10,
    attendees: 6,
    price: 18,
    credits: 1,
    status: "active",
    category: "Pilates",
    description: "Core strengthening and flexibility",
  },
  {
    id: 4,
    name: "Strength Training",
    instructor: "Alex Rodriguez",
    time: "06:00 PM",
    duration: 60,
    capacity: 15,
    attendees: 10,
    price: 25,
    credits: 2,
    status: "active",
    category: "Strength",
    description: "Weight training and muscle building",
  },
  {
    id: 5,
    name: "Zumba",
    instructor: "Lisa Park",
    time: "07:30 PM",
    duration: 45,
    capacity: 20,
    attendees: 18,
    price: 16,
    credits: 1,
    status: "inactive",
    category: "Dance",
    description: "Fun dance fitness workout",
  },
];

const stats = {
  totalClasses: 25,
  activeClasses: 20,
  classesToday: 12,
  totalCapacity: 300,
  avgAttendance: 8.5,
  monthlyRevenue: 12450,
};

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || classItem.category === filterCategory;
    const matchesStatus = filterStatus === "all" || classItem.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      Yoga: "bg-purple-100 text-purple-800",
      HIIT: "bg-red-100 text-red-800",
      Pilates: "bg-pink-100 text-pink-800",
      Strength: "bg-blue-100 text-blue-800",
      Dance: "bg-orange-100 text-orange-800",
    };
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>;
  };

  const getAttendanceRate = (attendees: number, capacity: number) => {
    const rate = (attendees / capacity) * 100;
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
          <p className="text-gray-600">Manage your gym classes and schedules</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClasses}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.classesToday}</div>
            <p className="text-xs text-muted-foreground">Scheduled today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgAttendance}</div>
            <p className="text-xs text-muted-foreground">Per class</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Manage and view all your gym classes</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classes..."
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
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterCategory("all")}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("Yoga")}>
                    Yoga
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("HIIT")}>
                    HIIT
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("Pilates")}>
                    Pilates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("Strength")}>
                    Strength
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory("Dance")}>
                    Dance
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
                <TableHead>Class Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{classItem.name}</div>
                      <div className="text-sm text-muted-foreground">{classItem.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{classItem.instructor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {classItem.time}
                    </div>
                  </TableCell>
                  <TableCell>{classItem.duration} min</TableCell>
                  <TableCell>{getCategoryBadge(classItem.category)}</TableCell>
                  <TableCell>
                    <div className={`font-medium ${getAttendanceRate(classItem.attendees, classItem.capacity)}`}>
                      {classItem.attendees}/{classItem.capacity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((classItem.attendees / classItem.capacity) * 100)}% full
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${classItem.price}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{classItem.credits} credits</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(classItem.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Class
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
