import { dummyCompanyTypes } from "./companyTypes";
import { dummyJobTypes } from "./jobTypes";
import { dummyCandidates } from "./candidates";
import { dummyCandidateExperiences } from "./candidateExperiences";
import { dummyCompanies } from "./companies";
import { dummyJobs } from "./jobs";
import { dummyReviews } from "./reviews";
import { dummySavedJobs } from "./savedJobs";
import { dummyShortLists } from "./shortLists";
import { dummyNotifications } from "./notifications";
import { dummyResumes } from "./resumes";

/**
 * Statistics about the demo data
 */
export const dataStats = {
  companyTypes: dummyCompanyTypes.length,
  jobTypes: dummyJobTypes.length,
  candidates: dummyCandidates.length,
  candidateExperiences: dummyCandidateExperiences.length,
  companies: dummyCompanies.length,
  jobs: dummyJobs.length,
  reviews: dummyReviews.length,
  savedJobs: dummySavedJobs.length,
  shortLists: dummyShortLists.length,
  notifications: dummyNotifications.length,
  resumes: dummyResumes.length,
};

/**
 * Job statistics
 */
export const jobStats = {
  total: dummyJobs.length,
  featured: dummyJobs.filter((j) => j.isFeatured).length,
  remote: dummyJobs.filter((j) => j.remote).length,
  byExperienceLevel: {
    entry: dummyJobs.filter((j) => j.experienceLevel === "Entry").length,
    mid: dummyJobs.filter((j) => j.experienceLevel === "Mid").length,
    senior: dummyJobs.filter((j) => j.experienceLevel === "Senior").length,
    lead: dummyJobs.filter((j) => j.experienceLevel === "Lead").length,
  },
  byType: {
    fullTime: dummyJobs.filter((j) => j.jobType === "Full-time").length,
    partTime: dummyJobs.filter((j) => j.jobType === "Part-time").length,
    contract: dummyJobs.filter((j) => j.jobType === "Contract").length,
    internship: dummyJobs.filter((j) => j.jobType === "Internship").length,
  },
  totalApplicants: dummyJobs.reduce((sum, job) => sum + job.applicantsCount, 0),
  averageApplicants: Math.round(
    dummyJobs.reduce((sum, job) => sum + job.applicantsCount, 0) /
      dummyJobs.length
  ),
};

/**
 * Company statistics
 */
export const companyStats = {
  total: dummyCompanies.length,
  averageRating:
    dummyCompanies.reduce((sum, company) => sum + company.rating, 0) /
    dummyCompanies.length,
  totalReviews: dummyCompanies.reduce(
    (sum, company) => sum + company.reviewCount,
    0
  ),
  totalActiveJobs: dummyCompanies.reduce(
    (sum, company) => sum + company.activeJobs,
    0
  ),
};

/**
 * Candidate statistics
 */
export const candidateStats = {
  total: dummyCandidates.length,
  withGithub: dummyCandidates.filter((c) => c.github).length,
  withLinkedIn: dummyCandidates.filter((c) => c.linkedin).length,
  averageExperience:
    dummyCandidates.reduce(
      (sum, c) => sum + (parseInt(c.yearsOfExperience || "0") || 0),
      0
    ) / dummyCandidates.length,
  totalSkills: dummyCandidates.reduce(
    (sum, c) => sum + (c.skills?.length || 0),
    0
  ),
};

/**
 * Review statistics
 */
export const reviewStats = {
  total: dummyReviews.length,
  verified: dummyReviews.filter((r) => r.verified).length,
  averageRating:
    dummyReviews.reduce((sum, r) => sum + r.rating, 0) / dummyReviews.length,
  totalHelpful: dummyReviews.reduce((sum, r) => sum + r.helpful, 0),
  byWorkStatus: {
    current: dummyReviews.filter((r) => r.workStatus === "Current Employee")
      .length,
    former: dummyReviews.filter((r) => r.workStatus === "Former Employee")
      .length,
    interviewed: dummyReviews.filter((r) => r.workStatus === "Interviewed")
      .length,
  },
};

/**
 * Notification statistics
 */
export const notificationStats = {
  total: dummyNotifications.length,
  unread: dummyNotifications.filter((n) => !n.isRead).length,
  byType: {
    application: dummyNotifications.filter((n) => n.type === "application")
      .length,
    job: dummyNotifications.filter((n) => n.type === "job").length,
    review: dummyNotifications.filter((n) => n.type === "review").length,
    general: dummyNotifications.filter((n) => n.type === "general").length,
  },
  byUserType: {
    candidate: dummyNotifications.filter((n) => n.userType === "candidate")
      .length,
    company: dummyNotifications.filter((n) => n.userType === "company").length,
  },
};

/**
 * Get all statistics
 */
export const getAllStats = () => ({
  data: dataStats,
  jobs: jobStats,
  companies: companyStats,
  candidates: candidateStats,
  reviews: reviewStats,
  notifications: notificationStats,
});
