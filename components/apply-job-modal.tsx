"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Upload,
  CheckCircle2,
  Briefcase,
  Building2,
  MapPin,
  Send,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  jobApplicationSchema,
  type JobApplicationFormData,
} from "@/lib/validations/application";
import { getResumeByCandidate } from "@/constants";
import type { Job } from "@/constants";

interface ApplyJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  candidateId: string;
  hasApplied?: boolean;
}

export function ApplyJobModal({
  open,
  onOpenChange,
  job,
  candidateId,
  hasApplied = false,
}: ApplyJobModalProps) {
  const resumes = getResumeByCandidate(candidateId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const form = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      resumeId: resumes[0]?._id || "",
      coverLetter: "",
    },
  });

  const onSubmit = async (data: JobApplicationFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // TODO: Actual API call to submit application
      console.log("Application data:", {
        jobId: job.id,
        candidateId,
        ...data,
      });

      setIsSubmitting(false);
      toast.success("Application submitted successfully!");
      onOpenChange(false);
      form.reset();
    }, 2000);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF or DOC files only.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success("Resume uploaded successfully!");
          setShowUploadForm(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (hasApplied) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle2 className="h-6 w-6 mr-2" />
              Already Applied
            </DialogTitle>
            <DialogDescription>
              You have already submitted an application for this position.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your application is being reviewed by the hiring team. We&apos;ll
              notify you of any updates.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <h4 className="font-semibold text-sm mb-2">{job.title}</h4>
              <div className="flex items-center text-xs text-muted-foreground space-x-2">
                <Building2 className="h-3 w-3" />
                <span>{job.company}</span>
                <span>•</span>
                <MapPin className="h-3 w-3" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary" />
            Apply for Position
          </DialogTitle>
          <DialogDescription>
            Submit your application for this role
          </DialogDescription>
        </DialogHeader>

        {/* Job Summary */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <h3 className="font-semibold mb-1">{job.title}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Building2 className="h-4 w-4" />
            <span>{job.company}</span>
            <span>•</span>
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{job.jobType}</Badge>
            <Badge variant="outline">{job.experienceLevel}</Badge>
            {job.remote && (
              <Badge className="bg-green-100 text-green-800">Remote</Badge>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Resume Selection */}
            <FormField
              control={form.control}
              name="resumeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Resume *</FormLabel>
                  {resumes.length > 0 ? (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a resume" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resumes.map((resume) => (
                            <SelectItem key={resume._id} value={resume._id!}>
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                {resume.resumeUrl
                                  .split("/")
                                  .pop()
                                  ?.replace(".pdf", "")}
                                <span className="text-xs text-muted-foreground ml-2">
                                  (
                                  {new Date(
                                    resume.createdAt!
                                  ).toLocaleDateString()}
                                  )
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose which resume to submit with your application
                      </FormDescription>
                    </>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-sm text-muted-foreground mb-3">
                        No resumes found. Please upload a resume to continue.
                      </p>
                      {!showUploadForm ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowUploadForm(true)}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Resume
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <input
                            type="file"
                            id="quick-resume-upload"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                          />
                          <label htmlFor="quick-resume-upload">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <span>
                                <Upload className="mr-2 h-4 w-4" />
                                Choose File
                              </span>
                            </Button>
                          </label>
                          {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="space-y-1">
                              <Progress
                                value={uploadProgress}
                                className="h-2"
                              />
                              <p className="text-xs text-muted-foreground">
                                Uploading... {uploadProgress}%
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Letter */}
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're the perfect fit for this role..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/1000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Important Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-amber-900 mb-1">
                  Before you apply:
                </p>
                <ul className="text-amber-700 space-y-1 text-xs">
                  <li>• Make sure your resume is up to date</li>
                  <li>• Review the job requirements carefully</li>
                  <li>• You can only apply once per position</li>
                  <li>• Your application cannot be edited after submission</li>
                </ul>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || resumes.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
