import { z } from "zod";

export const companyProfileSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required"),
  companyType: z.string().min(1, "Company type is required"),
  employeeCount: z.string().min(1, "Employee count is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  founded: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
  facebook: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
});

export type CompanyProfileFormData = z.infer<typeof companyProfileSchema>;
