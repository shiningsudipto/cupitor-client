import { z } from "zod";

export const jobApplicationSchema = z.object({
  resumeId: z.string().min(1, "Please select a resume"),
  coverLetter: z
    .string()
    .max(1000, "Cover letter must be at most 1000 characters")
    .optional(),
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
