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
  Briefcase,
  Plus,
  Search,
  MapPin,
  Clock,
  Users,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { dummyJobs } from "@/constants";

export default function CompanyJobsPage() {
  // TODO: Replace with actual authenticated company
  const currentCompanyId = "comp-1";
  const allCompanyJobs = dummyJobs.filter(
    (job) => job.companyId === currentCompanyId
  );

  const [jobs, setJobs] = useState(allCompanyJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredJobs = jobs.filter((job) => {
    const isActive = new Date(job.applicationDeadline) > new Date();
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && isActive) ||
      (filterStatus === "closed" && !isActive);

    return matchesSearch && matchesStatus;
  });

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    toast.success("Job deleted successfully!");
  };

  const stats = {
    total: jobs.length,
    active: jobs.filter((job) => new Date(job.applicationDeadline) > new Date())
      .length,
    closed: jobs.filter(
      (job) => new Date(job.applicationDeadline) <= new Date()
    ).length,
    totalApplicants: jobs.reduce((sum, job) => sum + job.applicantsCount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posted Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Manage your job listings • {jobs.length} total
          </p>
        </div>
        <Link href="/company/jobs/new">
          <Button
            size="lg"
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{stats.total}</p>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-green-600">
                {stats.active}
              </p>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Closed Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-600">{stats.closed}</p>
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applicants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-secondary">
                {stats.totalApplicants}
              </p>
              <Users className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or category..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="closed">Closed Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isActive = new Date(job.applicationDeadline) > new Date();
          return (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge
                        variant={isActive ? "default" : "secondary"}
                        className={isActive ? "bg-primary text-black" : ""}
                      >
                        {isActive ? "Active" : "Closed"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{job.location}</span>
                        {job.remote && (
                          <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                            Remote
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>
                          ${job.salaryRange.min.toLocaleString()} - $
                          {job.salaryRange.max.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">
                          {job.applicantsCount}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          applicants
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          Deadline:{" "}
                          {new Date(
                            job.applicationDeadline
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 6).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 6 && (
                        <Badge variant="secondary" className="text-xs">
                          +{job.skills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/company/jobs/${job.id}/edit`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/company/applicants?job=${job.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-primary hover:bg-primary/10"
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Applicants ({job.applicantsCount})
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteJob(job.id)}
                      className="w-full border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-16">
              {searchQuery || filterStatus !== "all" ? (
                <>
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              ) : (
                <>
                  <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">
                    No jobs posted yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start by posting your first job listing
                  </p>
                  <Link href="/company/jobs/new">
                    <Button className="bg-primary text-black hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Post Your First Job
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
