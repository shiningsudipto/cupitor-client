/**
 * CSV Export Utility
 * Converts data to CSV format and triggers download
 */

export interface CSVExportOptions {
  filename?: string;
  columns?: string[];
  headers?: Record<string, string>;
  dateFormat?: (date: Date) => string;
  includeHeaders?: boolean;
}

/**
 * Converts an array of objects to CSV format
 */
export function convertToCSV<T extends Record<string, any>>(
  data: T[],
  options: CSVExportOptions = {}
): string {
  const {
    columns,
    headers = {},
    dateFormat = (date) => date.toISOString(),
    includeHeaders = true,
  } = options;

  if (data.length === 0) {
    return "";
  }

  // Determine columns to export
  const exportColumns = columns || Object.keys(data[0]);

  // Create header row
  const headerRow = exportColumns.map((col) => headers[col] || col);

  // Create data rows
  const dataRows = data.map((row) =>
    exportColumns.map((col) => {
      const value = row[col];

      // Handle different data types
      if (value === null || value === undefined) {
        return "";
      }

      if (value instanceof Date) {
        return dateFormat(value);
      }

      if (typeof value === "object") {
        return JSON.stringify(value);
      }

      // Escape and quote string values that contain commas, quotes, or newlines
      const stringValue = String(value);
      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    })
  );

  // Combine header and data rows
  const rows = includeHeaders ? [headerRow, ...dataRows] : dataRows;

  return rows.map((row) => row.join(",")).join("\n");
}

/**
 * Downloads data as a CSV file
 */
export function downloadCSV<T extends Record<string, any>>(
  data: T[],
  options: CSVExportOptions = {}
): void {
  const { filename = "export.csv" } = options;

  // Convert to CSV
  const csv = convertToCSV(data, options);

  // Create blob
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Create download link
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
}

/**
 * Formats filename with timestamp
 */
export function generateFilename(prefix: string, extension = "csv"): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .split("T")[0];
  return `${prefix}_${timestamp}.${extension}`;
}

/**
 * Export selected rows to CSV
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  columns?: string[],
  headers?: Record<string, string>,
  filename?: string
): void {
  downloadCSV(data, {
    filename: filename || generateFilename("export"),
    columns,
    headers,
    includeHeaders: true,
  });
}
