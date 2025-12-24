"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, X } from "lucide-react";
import { CustomPopover } from "@/components/CustomPopover";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface ColumnFilter {
  key: string;
  label: string;
  options: FilterOption[];
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: string[];
  // Filtering
  filters?: ColumnFilter[];
  // Loading state
  loading?: boolean;
  // Empty state
  emptyMessage?: string;
  // Styling
  className?: string;
  tableClassName?: string;
}

export function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  searchKeys = [],
  filters = [],
  loading = false,
  emptyMessage = "No data found",
  className,
  tableClassName,
}: CustomTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );

  // Search functionality
  const searchedData = useMemo(() => {
    if (!searchable || !searchQuery) return data;

    const query = searchQuery.toLowerCase();
    const keysToSearch = searchKeys.length > 0 ? searchKeys : columns.map((col) => col.key);

    return data.filter((row) =>
      keysToSearch.some((key) => {
        const value = row[key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, searchable, searchKeys, columns]);

  // Filter functionality
  const filteredData = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return searchedData;

    return searchedData.filter((row) =>
      Object.entries(activeFilters).every(([key, value]) => {
        if (!value || value === "all") return true;
        return row[key] === value;
      })
    );
  }, [searchedData, activeFilters]);

  const finalData = filteredData;

  // Filter handler
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (!value || value === "all") {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);
  };

  // Search handler
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filter Bar */}
      {(searchable || filters.length > 0) && (
        <div className="flex items-center gap-4">
          {/* Search */}
          {searchable && (
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-800 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
          )}

          {/* Filters */}
          {filters.length > 0 && (
            <div className="flex gap-2">
              {filters.map((filter) => (
                <CustomPopover
                  key={filter.key}
                  trigger={
                    <button className="inline-flex items-center gap-2 px-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white font-medium hover:border-purple-500/50 hover:bg-slate-800/50 transition-all">
                      <Filter className="w-4 h-4" />
                      {filter.label}
                      {activeFilters[filter.key] && (
                        <span className="ml-1 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                          1
                        </span>
                      )}
                    </button>
                  }
                  title={filter.label}
                  width="sm"
                >
                  <div className="space-y-1">
                    <button
                      onClick={() => handleFilterChange(filter.key, "all")}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm rounded hover:bg-slate-800 transition-colors text-white",
                        (!activeFilters[filter.key] ||
                          activeFilters[filter.key] === "all") &&
                          "bg-purple-500/20 text-purple-300 font-medium"
                      )}
                    >
                      All
                    </button>
                    {filter.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterChange(filter.key, option.value)
                        }
                        className={cn(
                          "w-full px-3 py-2 text-left text-sm rounded hover:bg-slate-800 transition-colors text-white",
                          activeFilters[filter.key] === option.value &&
                            "bg-purple-500/20 text-purple-300 font-medium"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </CustomPopover>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table className={tableClassName}>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      column.headerClassName,
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right"
                    )}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-[200px]">
                    <div className="text-center text-slate-400">
                      <p>Loading...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : finalData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-[200px]">
                    <div className="text-center text-slate-400">
                      <p>{emptyMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                finalData.map((row, index) => (
                  <TableRow key={row._id || index}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          column.className,
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right"
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row, index)
                          : row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
