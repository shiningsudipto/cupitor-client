import { z } from "zod";

export const reviewSchema = z.object({
  companyId: z.string().min(1, "Company is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be at most 500 characters"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
