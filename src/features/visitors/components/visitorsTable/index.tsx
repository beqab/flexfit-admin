"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInView } from "react-intersection-observer";
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
  Phone,
  Calendar,
  CreditCard,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useGetVisitors } from "../../hooks/useGetVisitors";
import { VisitDate } from "../visitDate";
import { useRole } from "@/hooks/useRole";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/lib/querykeys";

const limit = 10;

export default function VisitorsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isSuperAdmin } = useRole();
  const queryClient = useQueryClient();

  const {
    data: visitorsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    error,
    refetch,
  } = useGetVisitors({
    page: 1,
    limit,
  });

  // Intersection observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Automatically fetch next page when scroll trigger is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  console.log("visitorsData", visitorsData);

  // Flatten all pages into a single array
  const allVisitors = visitorsData?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      {" "}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Visitor List</CardTitle>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search visitors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  refetch();
                  queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.VISITORS.ALL,
                  });
                }}
                disabled={isRefetching}
              >
                <RefreshCcw
                  className={`mr-2 h-4 w-4 ${
                    isRefetching ? "animate-spin" : ""
                  }`}
                />
                {isRefetching ? "Refetching..." : "Refresh"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>

                <TableHead>Activity</TableHead>

                <TableHead>Payout</TableHead>
                <TableHead>Last Visit</TableHead>

                {isSuperAdmin && <TableHead className="w-[50px]"></TableHead>}
              </TableRow>
            </TableHeader>
            {isLoading && !visitorsData ? null : (
              <TableBody>
                {allVisitors.map((visitor) => (
                  <TableRow key={visitor._id}>
                    <TableCell className="font-medium">
                      {visitor.user.firstName + " " + visitor.user.lastName ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {visitor.user.phone}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{visitor?.activityName}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        {visitor.facilityPayout} ლ
                      </div>
                    </TableCell>
                    <TableCell>
                      <VisitDate date={visitor.visitDate} />
                    </TableCell>
                    {isSuperAdmin && (
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
                            <DropdownMenuItem>Edit Member</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          {isLoading && (
            <div className="text-center py-7 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          )}
          {error && (
            <div className="text-center py-7 text-muted-foreground">
              {error.message}
            </div>
          )}
          {!isLoading && allVisitors.length === 0 && !error && (
            <div className="text-center py-7 text-muted-foreground">
              No visitors found
            </div>
          )}
          {/* Infinite scroll trigger */}
          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-4">
              {isFetchingNextPage && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading more...</span>
                </div>
              )}
            </div>
          )}
          {/* End of list message */}
          {!isLoading && !hasNextPage && allVisitors.length > limit && (
            <div className="text-center py-4 text-sm text-muted-foreground border-t">
              No more visitors to load
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
