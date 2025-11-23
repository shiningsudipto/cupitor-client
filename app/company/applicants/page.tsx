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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Users,
  Search,
  Filter,
  FileText,
  Download,
  CheckCircle,
  X,
  Star,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { dummyCandidates, dummyJobs, getResumeByCandidate } from "@/constants";

// Mock application data
interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  appliedDate: string;
  status: "new" | "reviewed" | "shortlisted" | "rejected" | "hired";
  resumeId?: string;
  coverLetter?: string;
}

export default function CompanyApplicantsPage() {
  // Mock applications data
  const mockApplications: Application[] = [
    {
      id: "app-1",
      candidateId: "cand-1",
      jobId: "job-1",
      appliedDate: "2025-11-20",
      status: "new",
    },
    {
      id: "app-2",
      candidateId: "cand-2",
      jobId: "job-1",
      appliedDate: "2025-11-19",
      status: "reviewed",
    },
    {
      id: "app-3",
      candidateId: "cand-3",
      jobId: "job-2",
      appliedDate: "2025-11-18",
      status: "shortlisted",
    },
    {
      id: "app-4",
      candidateId: "cand-4",
      jobId: "job-1",
      appliedDate: "2025-11-17",
      status: "rejected",
    },
    {
      id: "app-5",
      candidateId: "cand-5",
      jobId: "job-3",
      appliedDate: "2025-11-16",
      status: "new",
    },
  ];

  const [applications, setApplications] = useState(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterJob, setFilterJob] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const currentCompanyId = "comp-1";
  const companyJobs = dummyJobs.filter(
    (job) => job.companyId === currentCompanyId
  );

  const getApplicationWithDetails = (app: Application) => {
    const candidate = dummyCandidates.find((c) => c._id === app.candidateId);
    const job = dummyJobs.find((j) => j.id === app.jobId);
    const resume = candidate ? getResumeByCandidate(candidate._id)[0] : null;
    return { ...app, candidate, job, resume };
  };

  const filteredApplications = applications
    .map(getApplicationWithDetails)
    .filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.candidate?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job?.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || app.status === filterStatus;
      const matchesJob = filterJob === "all" || app.jobId === filterJob;

      return matchesSearch && matchesStatus && matchesJob;
    });

  const updateApplicationStatus = (
    appId: string,
    newStatus: Application["status"]
  ) => {
    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
    toast.success(`Application status updated to ${newStatus}`);
  };

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
      case "hired":
        return "bg-accent text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const statusCounts = {
    all: applications.length,
    new: applications.filter((a) => a.status === "new").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Applicant Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage job applications • {applications.length} total
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{count}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {status}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by candidate or job title..."
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
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterJob} onValueChange={setFilterJob}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {companyJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary">
                      {app.candidate?.name.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {app.candidate?.name}
                      </h3>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="font-medium">{app.job?.title}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Applied {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {app.candidate?.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {app.candidate?.phone}
                      </div>
                    </div>

                    {app.candidate?.skills && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {app.candidate.skills.slice(0, 5).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {app.candidate.skills.length > 5 && (
                          <Badge variant="secondary" className="text-xs">
                            +{app.candidate.skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApplication(app)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {app.status !== "shortlisted" && app.status !== "hired" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateApplicationStatus(app.id, "shortlisted")
                      }
                      className="border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Shortlist
                    </Button>
                  )}
                  {app.status !== "rejected" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateApplicationStatus(app.id, "rejected")
                      }
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="text-center py-16">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                No applications found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <Dialog
          open={!!selectedApplication}
          onOpenChange={() => setSelectedApplication(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <span>{selectedApplication.candidate?.name}</span>
                <Badge className={getStatusColor(selectedApplication.status)}>
                  {selectedApplication.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Applied for {selectedApplication.job?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedApplication.candidate?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedApplication.candidate?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedApplication.candidate?.city}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              {selectedApplication.candidate?.skills && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resume */}
              {selectedApplication.resume && (
                <Card className="bg-primary/5 border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>Resume</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {selectedApplication.resume.resumeUrl.split("/").pop()}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Update application status:
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateApplicationStatus(
                        selectedApplication.id,
                        "reviewed"
                      );
                      setSelectedApplication(null);
                    }}
                  >
                    Mark Reviewed
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateApplicationStatus(
                        selectedApplication.id,
                        "shortlisted"
                      );
                      setSelectedApplication(null);
                    }}
                    className="border-green-500 text-green-600"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Shortlist
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
