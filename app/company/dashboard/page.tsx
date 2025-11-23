"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Plus,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { dummyJobs, dummyCompanies } from "@/constants";

export default function CompanyDashboardPage() {
  //  TODO: Replace with actual authenticated company
  const currentCompanyId = "comp-1";
  const currentCompany = dummyCompanies.find((c) => c.id === currentCompanyId);

  // Get jobs for this company
  const companyJobs = dummyJobs.filter(
    (job) => job.companyId === currentCompanyId
  );

  // Mock analytics data
  const analytics = {
    totalJobs: companyJobs.length,
    activeJobs: companyJobs.filter(
      (j) => new Date(j.applicationDeadline) > new Date()
    ).length,
    totalApplicants: companyJobs.reduce(
      (sum, job) => sum + job.applicantsCount,
      0
    ),
    avgApplicantsPerJob: Math.round(
      companyJobs.reduce((sum, job) => sum + job.applicantsCount, 0) /
        companyJobs.length
    ),
    profileViews: 347,
    shortlistedCandidates: 12,
  };

  // Recent activity (mock)
  const recentApplications = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      job: companyJobs[0]?.title,
      time: "2 hours ago",
      status: "new",
    },
    {
      id: 2,
      candidate: "Michael Chen",
      job: companyJobs[0]?.title,
      time: "5 hours ago",
      status: "reviewed",
    },
    {
      id: 3,
      candidate: "Emily Rodriguez",
      job: companyJobs[1]?.title,
      time: "1 day ago",
      status: "shortlisted",
    },
    {
      id: 4,
      candidate: "David Kim",
      job: companyJobs[0]?.title,
      time: "2 days ago",
      status: "rejected",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-primary text-black";
      case "reviewed":
        return "bg-secondary text-black";
      case "shortlisted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-primary border border-primary/30 rounded-2xl p-8 text-black shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {currentCompany?.name}! 👋
        </h1>
        <p className="opacity-90 mb-6">
          Manage your job posts and connect with top talent
        </p>
        <Link href="/company/jobs/new">
          <Button variant="secondary" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Post a New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{analytics.activeJobs}</p>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applicants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{analytics.totalApplicants}</p>
              <Users className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{analytics.profileViews}</p>
              <Eye className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Shortlisted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">
                {analytics.shortlistedCandidates}
              </p>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posted Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Posted Jobs</CardTitle>
                <CardDescription>
                  Manage and track your job listings
                </CardDescription>
              </div>
              <Link href="/company/jobs">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {companyJobs.slice(0, 3).map((job) => {
              const isActive = new Date(job.applicationDeadline) > new Date();
              return (
                <div
                  key={job.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{job.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={isActive ? "default" : "secondary"}
                      className={isActive ? "bg-primary text-black" : ""}
                    >
                      {isActive ? "Active" : "Closed"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">
                          {job.applicantsCount}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          applicants
                        </span>
                      </div>
                    </div>
                    <Link href={`/company/jobs/${job.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest candidates who applied</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="flex-1">
                  <p className="font-medium">{application.candidate}</p>
                  <p className="text-sm text-muted-foreground">
                    {application.job}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {application.time}
                  </p>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
            ))}
            <Link href="/company/applicants">
              <Button variant="outline" className="w-full mt-4">
                View All Applicants
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Avg. Applicants per Job
              </p>
              <div className="flex items-end space-x-2">
                <p className="text-2xl font-bold text-primary">
                  {analytics.avgApplicantsPerJob}
                </p>
                <span className="text-sm text-green-600 mb-1">
                  +12% this month
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Application Rate
              </p>
              <div className="space-y-2">
                <Progress value={75} className="h-2" />
                <p className="text-sm font-medium">75% response rate</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Top Performing Job
              </p>
              <p className="text-sm font-bold">{companyJobs[0]?.title}</p>
              <p className="text-xs text-muted-foreground">
                {companyJobs[0]?.applicantsCount} applicants
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
