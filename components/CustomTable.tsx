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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Download,
} from "lucide-react";
import { CustomPopover } from "@/components/CustomPopover";
import { cn } from "@/lib/utils";
import { exportToCSV, generateFilename } from "@/lib/csvExport";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  exportable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => React.ReactNode;
  exportRender?: (value: any, row: T) => string;
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
  onSearch?: (query: string) => void;
  // Filtering
  filters?: ColumnFilter[];
  onFilter?: (filters: Record<string, string>) => void;
  // Selection
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  getRowId?: (row: T) => string;
  // Sorting
  defaultSortKey?: string;
  defaultSortDirection?: "asc" | "desc";
  onSort?: (key: string, direction: "asc" | "desc") => void;
  // CSV Export
  exportable?: boolean;
  exportFilename?: string;
  exportColumns?: string[];
  onExport?: (data: T[]) => void;
  // Empty state
  emptyState?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  emptyMessage?: string;
  // Styling
  className?: string;
  tableClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  // Actions
  actions?: (row: T, index: number) => React.ReactNode;
  bulkActions?: (selectedRows: T[]) => React.ReactNode;
}

export function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  searchKeys = [],
  onSearch,
  filters = [],
  onFilter,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  getRowId = (row) => row.id,
  defaultSortKey,
  defaultSortDirection = "asc",
  onSort,
  exportable = false,
  exportFilename,
  exportColumns,
  onExport,
  emptyState,
  emptyIcon,
  emptyMessage = "No data found",
  className,
  tableClassName,
  rowClassName,
  actions,
  bulkActions,
}: CustomTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
  );

  // Search functionality
  const searchedData = useMemo(() => {
    if (!searchable || !searchQuery) return data;

    const query = searchQuery.toLowerCase();
    const keysToSearch =
      searchKeys.length > 0
        ? searchKeys
        : columns
            .filter((col) => col.searchable !== false)
            .map((col) => col.key);

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

  // Sort functionality
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [filteredData, sortKey, sortDirection]);

  const finalData = sortedData;

  // Selection handlers
  const isAllSelected =
    selectable &&
    finalData.length > 0 &&
    finalData.every((row) => selectedRows.includes(getRowId(row)));

  const isSomeSelected =
    selectable && selectedRows.length > 0 && !isAllSelected;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;

    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(finalData.map((row) => getRowId(row)));
    }
  };

  const handleSelectRow = (rowId: string) => {
    if (!onSelectionChange) return;

    if (selectedRows.includes(rowId)) {
      onSelectionChange(selectedRows.filter((id) => id !== rowId));
    } else {
      onSelectionChange([...selectedRows, rowId]);
    }
  };

  // Sort handler
  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";

    setSortKey(key);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(key, newDirection);
    }
  };

  // Filter handler
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (!value || value === "all") {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);

    if (onFilter) {
      onFilter(newFilters);
    }
  };

  // Search handler
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  const selectedRowObjects = finalData.filter((row) =>
    selectedRows.includes(getRowId(row))
  );

  // Filter visible columns (exclude hidden columns for display)
  const visibleColumns = columns.filter(
    (col) => !col.className?.includes("hidden")
  );

  // CSV Export handler
  const handleExport = (dataToExport: T[]) => {
    if (onExport) {
      onExport(dataToExport);
      return;
    }

    // Determine which columns to export
    const columnsToExport = exportColumns
      ? columns.filter((col) => exportColumns.includes(col.key))
      : columns.filter((col) => col.exportable !== false);

    // Prepare data for export
    const exportData = dataToExport.map((row) => {
      const exportRow: Record<string, any> = {};
      columnsToExport.forEach((col) => {
        const value = row[col.key];
        // Use custom export renderer if available
        if (col.exportRender) {
          exportRow[col.key] = col.exportRender(value, row);
        } else {
          exportRow[col.key] = value;
        }
      });
      return exportRow;
    });

    // Prepare headers
    const headers: Record<string, string> = {};
    columnsToExport.forEach((col) => {
      headers[col.key] = col.label;
    });

    // Generate filename
    const filename =
      exportFilename ||
      generateFilename(
        selectedRows.length > 0 && selectedRows.length < dataToExport.length
          ? "selected_export"
          : "export"
      );

    // Export to CSV
    exportToCSV(
      exportData,
      columnsToExport.map((col) => col.key),
      headers,
      filename
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filter Bar */}
      {(searchable ||
        filters.length > 0 ||
        exportable ||
        (bulkActions && selectedRows.length > 0)) && (
        <div className="flex items-center gap-4">
          {/* Search */}
          {searchable && (
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-10 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
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
                    <button className="inline-flex items-center gap-2 px-4 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all">
                      <Filter className="w-4 h-4" />
                      {filter.label}
                      {activeFilters[filter.key] && (
                        <span className="ml-1 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
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
                        "w-full px-3 py-2 text-left text-sm rounded hover:bg-muted transition-colors",
                        (!activeFilters[filter.key] ||
                          activeFilters[filter.key] === "all") &&
                          "bg-primary/10 text-primary font-medium"
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
                          "w-full px-3 py-2 text-left text-sm rounded hover:bg-muted transition-colors",
                          activeFilters[filter.key] === option.value &&
                            "bg-primary/10 text-primary font-medium"
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

          {/* Export Button */}
          {exportable && (
            <div className="flex gap-2">
              {selectedRows.length > 0 ? (
                <button
                  onClick={() => handleExport(selectedRowObjects)}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export Selected ({selectedRows.length})
                </button>
              ) : (
                <button
                  onClick={() => handleExport(finalData)}
                  className="inline-flex items-center gap-2 px-4 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export All
                </button>
              )}
            </div>
          )}

          {/* Bulk Actions */}
          {bulkActions && selectedRows.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedRows.length} selected
              </span>
              {bulkActions(selectedRowObjects)}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table className={tableClassName}>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                      className={cn(
                        isSomeSelected && "data-[state=checked]:bg-primary/50"
                      )}
                    />
                  </TableHead>
                )}
                {visibleColumns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      column.headerClassName,
                      column.sortable && "cursor-pointer select-none",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right"
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        column.align === "center" && "justify-center",
                        column.align === "right" && "justify-end"
                      )}
                    >
                      {column.label}
                      {column.sortable && (
                        <span className="text-muted-foreground">
                          {sortKey === column.key ? (
                            sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )
                          ) : (
                            <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                {actions && (
                  <TableHead className="text-right w-[100px]">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={
                      visibleColumns.length +
                      (selectable ? 1 : 0) +
                      (actions ? 1 : 0)
                    }
                    className="h-[200px]"
                  >
                    {emptyState || (
                      <div className="text-center text-muted-foreground">
                        {emptyIcon && (
                          <div className="flex justify-center mb-4">
                            {emptyIcon}
                          </div>
                        )}
                        <p>{emptyMessage}</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                finalData.map((row, index) => {
                  const rowId = getRowId(row);
                  const isSelected = selectedRows.includes(rowId);
                  const rowClass =
                    typeof rowClassName === "function"
                      ? rowClassName(row, index)
                      : rowClassName;

                  return (
                    <TableRow
                      key={rowId}
                      data-state={isSelected ? "selected" : undefined}
                      className={rowClass}
                    >
                      {selectable && (
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleSelectRow(rowId)}
                            aria-label={`Select row ${index + 1}`}
                          />
                        </TableCell>
                      )}
                      {visibleColumns.map((column) => (
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
                      {actions && (
                        <TableCell className="text-right">
                          {actions(row, index)}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
