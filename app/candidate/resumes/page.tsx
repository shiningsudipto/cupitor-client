"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  Star,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { getResumeByCandidate } from "@/constants";

export default function CandidateResumesPage() {
  // TODO: Replace with actual authenticated user
  const currentCandidateId = "cand-1";
  const resumes = getResumeByCandidate(currentCandidateId);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [primaryResumeId, setPrimaryResumeId] = useState(resumes[0]?._id);

  // Mock ATS analysis results
  const atsAnalyses = [
    {
      resumeId: "resume-1",
      atsScore: 85,
      keywordScore: 90,
      formattingScore: 80,
      overallScore: 85,
      status: "excellent",
      analyzedAt: "2025-11-20T10:00:00Z",
    },
  ];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF or DOC files only.");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Resume uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // TODO: Actual upload to backend/Cloudinary
    console.log("Uploading file:", file.name);
  };

  const handleSetPrimary = (resumeId: string) => {
    setPrimaryResumeId(resumeId);
    toast.success("Primary resume updated!");
  };

  const handleDelete = (_resumeId: string) => {
    // TODO: API call to delete resume
    toast.success("Resume deleted successfully!");
  };

  const handleAnalyze = (_resumeId: string) => {
    // TODO: Navigate to ATS checker or trigger analysis
    toast.info("Starting ATS analysis...");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: "Excellent", icon: CheckCircle2 };
    if (score >= 60) return { label: "Good", icon: AlertCircle };
    return { label: "Needs Improvement", icon: AlertCircle };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resume Manager</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage your resumes
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-lg">
              <Upload className="mr-2 h-5 w-5" />
              Upload Resume
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Resume</DialogTitle>
              <DialogDescription>
                Upload your resume in PDF or DOC format (Max 5MB)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC or DOCX (max. 5MB)
                  </p>
                </label>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button disabled={isUploading}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Resumes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{resumes.length}</p>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ATS Analyzed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{atsAnalyses.length}</p>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. ATS Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">
                {atsAnalyses.length > 0
                  ? Math.round(
                      atsAnalyses.reduce((sum, a) => sum + a.overallScore, 0) /
                        atsAnalyses.length
                    )
                  : 0}
              </p>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumes List */}
      <div className="grid grid-cols-1 gap-6">
        {resumes.map((resume) => {
          const analysis = atsAnalyses.find((a) => a.resumeId === resume._id);
          const isPrimary = resume._id === primaryResumeId;
          const scoreLabel = analysis
            ? getScoreLabel(analysis.overallScore)
            : null;

          return (
            <Card
              key={resume._id}
              className={isPrimary ? "border-2 border-blue-500" : ""}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg">
                          {resume.resumeUrl
                            .split("/")
                            .pop()
                            ?.replace(".pdf", "")}
                        </h3>
                        {isPrimary && (
                          <Badge className="bg-blue-500">
                            <Star className="h-3 w-3 mr-1" />
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Uploaded{" "}
                          {new Date(resume.createdAt!).toLocaleDateString()}
                        </div>
                      </div>

                      {/* ATS Analysis Results */}
                      {analysis && (
                        <div
                          className={`p-4 rounded-lg border ${getScoreColor(
                            analysis.overallScore
                          )} mt-3`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {scoreLabel && (
                                <scoreLabel.icon className="h-5 w-5" />
                              )}
                              <span className="font-semibold">
                                ATS Score: {analysis.overallScore}/100
                              </span>
                              <Badge variant="outline">
                                {scoreLabel?.label}
                              </Badge>
                            </div>
                            <span className="text-xs">
                              Analyzed{" "}
                              {new Date(
                                analysis.analyzedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs mb-1">Keywords</p>
                              <Progress
                                value={analysis.keywordScore}
                                className="h-2"
                              />
                              <p className="text-xs mt-1 font-medium">
                                {analysis.keywordScore}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs mb-1">Formatting</p>
                              <Progress
                                value={analysis.formattingScore}
                                className="h-2"
                              />
                              <p className="text-xs mt-1 font-medium">
                                {analysis.formattingScore}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs mb-1">ATS Compatibility</p>
                              <Progress
                                value={analysis.atsScore}
                                className="h-2"
                              />
                              <p className="text-xs mt-1 font-medium">
                                {analysis.atsScore}%
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    {!isPrimary && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetPrimary(resume._id!)}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Set Primary
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {!analysis && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAnalyze(resume._id!)}
                      >
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Analyze
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(resume._id!)}
                      className="text-red-600 hover:text-red-700"
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

        {resumes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                No resumes uploaded yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload your first resume to get started with ATS analysis
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Your First Resume
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Resume</DialogTitle>
                    <DialogDescription>
                      Upload your resume in PDF or DOC format (Max 5MB)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      id="resume-upload-empty"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="resume-upload-empty"
                      className="cursor-pointer"
                    >
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC or DOCX (max. 5MB)
                      </p>
                    </label>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips Section */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Tips for Better ATS Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>
                Use standard section headings like &ldquo;Work Experience&rdquo; and
                &ldquo;Education&rdquo;
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>Include relevant keywords from the job description</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>Avoid using tables, images, or complex formatting</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>Use a clean, simple font like Arial or Calibri</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>Save as PDF to preserve formatting</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
