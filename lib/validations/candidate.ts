import { z } from "zod";

export const candidateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(2, "City is required"),
  address: z.string().optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  education: z.string().min(5, "Education details are required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
});

export const experienceSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyLocation: z.string().optional(),
  role: z.string().min(2, "Role is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean().default(false),
});

export type CandidateProfileFormData = z.infer<typeof candidateProfileSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
