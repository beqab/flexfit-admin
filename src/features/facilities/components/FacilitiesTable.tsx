"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye,
  RefreshCcw,
  Building2,
  CreditCard,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useGetFacilities } from "../hooks/useGetFacilities";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Pagination } from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/useDebaunce";
import SearchField from "@/components/ui/searchField";
import RefreshBtn from "@/components/ui/refreshBtn";

const pageSize = 20;

export default function FacilitiesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  // Debounce search term to avoid excessive API calls (500ms delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Reset to page 1 when debounced search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const { data, isLoading, error, refetch, isRefetching } = useGetFacilities({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearchTerm,
  });

  const facilities = data?.data || [];
  const pagination = data?.pagination;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if we're waiting for debounce
  const isSearching = searchTerm !== debouncedSearchTerm;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Facilities List</CardTitle>
            {data?.pagination && (
              <p className="text-sm text-muted-foreground mt-1">
                {debouncedSearchTerm ? (
                  <>
                    Found {data.pagination.totalItems} result
                    {data.pagination.totalItems !== 1 ? "s" : ""}
                  </>
                ) : (
                  <>Total: {data.pagination.totalItems} facilities</>
                )}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <SearchField
              value={searchTerm}
              onChange={setSearchTerm}
              isSearching={isSearching}
            />
            <RefreshBtn refetch={refetch} isRefetching={isRefetching} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: pageSize }).map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-10">
            <div className="text-destructive mb-2">
              Failed to load facilities
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        {/* Data Table */}
        {!isLoading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Total Payout</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilities.map((facility) => (
                  <TableRow key={facility._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {facility.img ? (
                            <Image
                              src={facility.img}
                              alt={facility.name}
                              width={96}
                              height={96}
                              quality={95}
                              className="object-cover w-full h-full"
                              priority={false}
                            />
                          ) : (
                            <Building2 className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <span>{facility.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {facility.email || "N/A"}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {facility.phone || "N/A"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <div className="text-sm">
                          {facility.address || "N/A"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        {facility.totalPayout ? facility.totalPayout : 0} ლ
                      </div>
                    </TableCell>
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Facility
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

            {/* No Results */}
            {facilities.length === 0 && !isLoading && !isSearching && (
              <div className="text-center py-10 text-muted-foreground">
                {debouncedSearchTerm
                  ? "No facilities found matching your search"
                  : "No facilities found"}
              </div>
            )}

            {/* Pagination */}
          </>
        )}
      </CardContent>
      <div className="px-4">
        {pagination && pagination.totalPages > 1 && !isSearching && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            isLoading={isLoading || isRefetching}
            size="default"
          />
        )}
      </div>
    </Card>
  );
}
