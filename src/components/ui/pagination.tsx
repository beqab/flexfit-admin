"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  isLoading?: boolean;
  size?: "sm" | "default" | "lg";
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage = true,
  hasPrevPage = true,
  isLoading = false,
  size = "default",
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || isLoading) {
      return;
    }
    onPageChange(page);
  };

  const handleFirst = () => handlePageChange(1);
  const handlePrevious = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);
  const handleLast = () => handlePageChange(totalPages);

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buttonSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "default";

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 border-t pt-4 mt-4">
      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* First page button */}
        <Button
          variant="outline"
          size={buttonSize}
          onClick={handleFirst}
          disabled={!hasPrevPage || currentPage === 1 || isLoading}
          className="hidden sm:flex"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous button */}
        <Button
          variant="outline"
          size={buttonSize}
          onClick={handlePrevious}
          disabled={!hasPrevPage || isLoading}
        >
          <ChevronLeft className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center min-w-[40px] h-9 px-2"
                >
                  ...
                </div>
              );
            }

            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size={buttonSize}
                onClick={() => handlePageChange(page)}
                disabled={isLoading}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size={buttonSize}
          onClick={handleNext}
          disabled={!hasNextPage || isLoading}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 sm:ml-1" />
        </Button>

        {/* Last page button */}
        <Button
          variant="outline"
          size={buttonSize}
          onClick={handleLast}
          disabled={!hasNextPage || currentPage === totalPages || isLoading}
          className="hidden sm:flex"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
