"use client";

import { useState } from "react";
import { SearchBar, SearchFilters } from "@/components/search-bar";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { dummyJobs } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobsPage() {
  const [filteredJobs, setFilteredJobs] = useState(dummyJobs);
  const [sortBy, setSortBy] = useState("relevance");

  const handleSearch = (
    query: string,
    location: string,
    filters: SearchFilters
  ) => {
    let results = [...dummyJobs];

    // Filter by query
    if (query) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    // Filter by location
    if (location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category && filters.category !== "all") {
      results = results.filter((job) => job.category === filters.category);
    }

    // Filter by job type
    if (filters.jobType && filters.jobType !== "all") {
      results = results.filter((job) => job.jobType === filters.jobType);
    }

    // Filter by remote
    if (filters.remote !== undefined) {
      results = results.filter((job) => job.remote === filters.remote);
    }

    // Sort results
    if (sortBy === "date") {
      results.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    } else if (sortBy === "salary") {
      results.sort((a, b) => b.salaryRange.max - a.salaryRange.max);
    }

    setFilteredJobs(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-primary text-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Find Your Perfect Job
          </h1>
          <p className="text-xl text-center mb-8 opacity-90">
            Explore thousands of opportunities from top companies
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} showFilters={true} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {filteredJobs.length} Jobs Found
              </h2>
              <p className="text-gray-600">
                Showing relevant opportunities for you
              </p>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date Posted</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Cards Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} featured={job.isFeatured} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => setFilteredJobs(dummyJobs)}>
                Show All Jobs
              </Button>
            </div>
          )}

          {/* Pagination (placeholder) */}
          {filteredJobs.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button className="bg-primary text-black hover:bg-primary/90">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
