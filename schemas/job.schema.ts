import * as z from "zod";

// Job Post Schema
export const jobPostSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  location: z.string().min(2, "Location is required"),
  jobType: z.string().min(1, "Please select a job type"),
  experienceLevel: z.string().min(1, "Please select experience level"),
  salary: z
    .object({
      min: z.number().min(0, "Minimum salary must be positive"),
      max: z.number().min(0, "Maximum salary must be positive"),
      currency: z.string().default("USD"),
    })
    .optional(),
  requirements: z
    .array(z.string())
    .min(1, "At least one requirement is needed"),
  benefits: z.array(z.string()).optional(),
  deadline: z.date().optional(),
});

export type JobPostFormValues = z.infer<typeof jobPostSchema>;

// Job Application Schema
export const jobApplicationSchema = z.object({
  coverLetter: z
    .string()
    .min(100, "Cover letter must be at least 100 characters"),
  resume: z.any().optional(), // File upload
  availability: z.date().optional(),
  expectedSalary: z
    .number()
    .min(0, "Expected salary must be positive")
    .optional(),
});

export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;
