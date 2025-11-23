import { z } from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  jobType: z.string().min(1, "Job type is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  location: z.string().min(2, "Location is required"),
  remote: z.boolean().default(false),
  salaryMin: z.number().min(0, "Minimum salary must be positive"),
  salaryMax: z.number().min(0, "Maximum salary must be positive"),
  salaryCurrency: z.string().default("year"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  requirements: z
    .string()
    .min(20, "Requirements must be at least 20 characters"),
  responsibilities: z
    .string()
    .min(20, "Responsibilities must be at least 20 characters"),
  benefits: z.string().optional(),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
});

export type JobPostFormData = z.infer<typeof jobPostSchema>;
