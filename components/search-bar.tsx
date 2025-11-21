"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobCategories, jobTypes } from "@/constants/jobs";

interface SearchBarProps {
  onSearch?: (query: string, location: string, filters: SearchFilters) => void;
  showFilters?: boolean;
}

export interface SearchFilters {
  category?: string;
  jobType?: string;
  remote?: boolean;
}

export function SearchBar({ onSearch, showFilters = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = () => {
    onSearch?.(query, location, filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        {/* Job Title/Keywords */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 text-base border-2 focus:border-purple-500"
          />
        </div>

        {/* Location */}
        <div className="md:w-64 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="City or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 text-base border-2 focus:border-purple-500"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base font-semibold"
        >
          <Search className="w-5 h-5 mr-2" />
          Search Jobs
        </Button>

        {/* Filter Toggle */}
        {showFilters && (
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="h-12 px-4 border-2"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Category
            </label>
            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters({ ...filters, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {jobCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Job Type
            </label>
            <Select
              value={filters.jobType}
              onValueChange={(value) =>
                setFilters({ ...filters, jobType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Work Mode
            </label>
            <Select
              value={filters.remote?.toString()}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  remote:
                    value === "true"
                      ? true
                      : value === "false"
                      ? false
                      : undefined,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="true">Remote</SelectItem>
                <SelectItem value="false">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
