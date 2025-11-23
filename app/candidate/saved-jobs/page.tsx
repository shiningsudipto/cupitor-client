"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Trash2,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getSavedJobsWithDetails } from "@/constants";

export default function CandidateSavedJobsPage() {
  // TODO: Replace with actual authenticated user
  const currentCandidateId = "cand-1";
  const allSavedJobs = getSavedJobsWithDetails(currentCandidateId);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterRemote, setFilterRemote] = useState<string>("all");

  const handleUnsave = (savedJobId: string) => {
    // TODO: API call to remove saved job
    toast.success("Job removed from saved list");
  };

  const filteredJobs = allSavedJobs.filter((saved) => {
    const job = saved.job;
    if (!job) return false;

    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || job.jobType === filterType;
    const matchesRemote =
      filterRemote === "all" ||
      (filterRemote === "remote" && job.remote) ||
      (filterRemote === "onsite" && !job.remote);

    return matchesSearch && matchesType && matchesRemote;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Saved Jobs</h1>
        <p className="text-muted-foreground mt-1">
          Jobs you&apos;ve bookmarked • {allSavedJobs.length} total
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search saved jobs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRemote} onValueChange={setFilterRemote}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote Only</SelectItem>
                <SelectItem value="onsite">On-site Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((saved) => {
            const job = saved.job!;
            return (
              <Card
                key={saved._id}
                className="hover:shadow-lg transition-all hover:border-blue-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Company Logo */}
                      <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <Link href={`/jobs/${job.id}`}>
                              <h3 className="font-semibold text-xl hover:text-primary transition-colors mb-1">
                                {job.title}
                              </h3>
                            </Link>
                            <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                              <Building2 className="h-4 w-4" />
                              <span className="font-medium">{job.company}</span>
                              <span>•</span>
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Job Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="secondary">{job.jobType}</Badge>
                          <Badge variant="outline">{job.experienceLevel}</Badge>
                          {job.remote && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Remote
                            </Badge>
                          )}
                          <Badge variant="outline">{job.category}</Badge>
                        </div>

                        {/* Salary */}
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center text-green-600 font-medium">
                            <DollarSign className="h-4 w-4 mr-1" />$
                            {job.salaryRange.min.toLocaleString()} - $
                            {job.salaryRange.max.toLocaleString()}
                            <span className="text-muted-foreground ml-1">
                              /{job.salaryRange.currency}
                            </span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.slice(0, 5).map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 5 && (
                            <Badge variant="secondary" className="text-xs">
                              +{job.skills.length - 5} more
                            </Badge>
                          )}
                        </div>

                        {/* Footer Info */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Saved{" "}
                              {new Date(saved.savedAt!).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {job.applicantsCount} applicants
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link href={`/jobs/${job.id}`}>
                        <Button size="sm" className="w-full">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnsave(saved._id!)}
                        className="w-full"
                      >
                        <Heart className="mr-2 h-4 w-4 fill-pink-500 text-pink-500" />
                        Saved
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-16">
            {searchQuery || filterType !== "all" || filterRemote !== "all" ? (
              <>
                <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterType("all");
                    setFilterRemote("all");
                  }}
                >
                  Clear Filters
                </Button>
              </>
            ) : (
              <>
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">
                  No saved jobs yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start saving jobs you&apos;re interested in to apply later
                </p>
                <Link href="/jobs">
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Browse Jobs
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Footer */}
      {allSavedJobs.length > 0 && (
        <Card className="bg-primary/5 border-primary/30">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                  <p className="text-2xl font-bold text-primary">
                    {allSavedJobs.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remote Jobs</p>
                  <p className="text-2xl font-bold text-green-600">
                    {allSavedJobs.filter((s) => s.job?.remote).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Showing</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {filteredJobs.length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">
                  Keep track of opportunities
                </p>
                <p className="text-xs text-muted-foreground">
                  Apply before they fill up!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
