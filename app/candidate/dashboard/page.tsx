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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  Building2,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  dummyJobs,
  getSavedJobsWithDetails,
  dummyCandidates,
} from "@/constants";

export default function CandidateDashboardPage() {
  // TODO: Replace with actual authenticated user
  const currentCandidateId = "cand-1";
  const currentCandidate = dummyCandidates.find(
    (c) => c._id === currentCandidateId
  );

  // Get saved jobs for the current candidate
  const savedJobs = getSavedJobsWithDetails(currentCandidateId);

  // Mock application data (in a real app, this would come from the API)
  const applications = [
    {
      id: "app-1",
      job: dummyJobs[0],
      status: "under_review",
      appliedAt: "2025-11-20T10:00:00Z",
      statusColor: "blue",
    },
    {
      id: "app-2",
      job: dummyJobs[1],
      status: "shortlisted",
      appliedAt: "2025-11-18T14:30:00Z",
      statusColor: "green",
    },
    {
      id: "app-3",
      job: dummyJobs[2],
      status: "rejected",
      appliedAt: "2025-11-15T09:15:00Z",
      statusColor: "red",
    },
  ];

  // Job suggestions based on skills
  const suggestedJobs = dummyJobs
    .filter((job) =>
      job.skills.some((skill) => currentCandidate?.skills?.includes(skill))
    )
    .slice(0, 4);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shortlisted":
        return <CheckCircle2 className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: string; label: string }> = {
      under_review: { variant: "secondary", label: "Under Review" },
      shortlisted: { variant: "default", label: "Shortlisted" },
      rejected: { variant: "destructive", label: "Rejected" },
    };
    return variants[status] || { variant: "secondary", label: status };
  };

  const profileCompleteness = 85; // Calculate based on filled fields

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-primary rounded-2xl p-8 text-black shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {currentCandidate?.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-blue-100 mb-6">
          You have {applications.length} active applications and{" "}
          {savedJobs.length} saved jobs
        </p>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Profile Completeness</span>
              <span className="text-sm font-bold">{profileCompleteness}%</span>
            </div>
            <Progress value={profileCompleteness} className="h-2 bg-white/20" />
          </div>
          <Link href="/candidate/profile">
            <Button variant="secondary" size="sm">
              Complete Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{applications.length}</p>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saved Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{savedJobs.length}</p>
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">24</p>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>
                Track the status of your job applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {application.job.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                          <Building2 className="h-4 w-4" />
                          <span>{application.job.company}</span>
                          <span>•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{application.job.location}</span>
                        </div>
                      </div>
                      <Badge {...getStatusBadge(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">
                          {getStatusBadge(application.status).label}
                        </span>
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Applied{" "}
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </div>
                      <Link href={`/jobs/${application.job.id}`}>
                        <Button variant="ghost" size="sm">
                          View Job
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {applications.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No applications yet. Start applying to jobs!</p>
                  <Link href="/jobs">
                    <Button className="mt-4">Browse Jobs</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Jobs Tab */}
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>
                Jobs you&apos;ve bookmarked for later
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedJobs.map((saved) => (
                <div
                  key={saved._id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {saved.job?.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Building2 className="h-4 w-4" />
                      <span>{saved.job?.company}</span>
                      <span>•</span>
                      <MapPin className="h-4 w-4" />
                      <span>{saved.job?.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{saved.job?.jobType}</Badge>
                      <Badge variant="outline">
                        {saved.job?.experienceLevel}
                      </Badge>
                      {saved.job?.remote && (
                        <Badge variant="default">Remote</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link href={`/jobs/${saved.jobId}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                    </Button>
                  </div>
                </div>
              ))}

              {savedJobs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No saved jobs yet. Save jobs to apply later!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>
                Jobs matching your skills and experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                      <span>•</span>
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        ${job.salaryRange.min.toLocaleString()} - $
                        {job.salaryRange.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 4).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link href={`/jobs/${job.id}`}>
                      <Button size="sm">View Job</Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
