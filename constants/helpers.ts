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
 * Get candidate by ID
 */
export const getCandidateById = (candidateId: string) => {
  return dummyCandidates.find((c) => c._id === candidateId);
};

/**
 * Get candidate experiences by candidate ID
 */
export const getCandidateExperiences = (candidateId: string) => {
  return dummyCandidateExperiences.filter(
    (exp) => exp.candidateId === candidateId
  );
};

/**
 * Get company by ID
 */
export const getCompanyById = (companyId: string) => {
  return dummyCompanies.find((c) => c.id === companyId);
};

/**
 * Get jobs by company ID
 */
export const getJobsByCompanyId = (companyId: string) => {
  return dummyJobs.filter((job) => job.companyId === companyId);
};

/**
 * Get job by ID
 */
export const getJobById = (jobId: string) => {
  return dummyJobs.find((job) => job.id === jobId);
};

/**
 * Get reviews by company ID
 */
export const getReviewsByCompanyId = (companyId: string) => {
  return dummyReviews.filter((review) => review.companyId === companyId);
};

/**
 * Get saved jobs by candidate ID
 */
export const getSavedJobsByCandidate = (candidateId: string) => {
  return dummySavedJobs.filter((sj) => sj.candidateId === candidateId);
};

/**
 * Get saved jobs with full job details for a candidate
 */
export const getSavedJobsWithDetails = (candidateId: string) => {
  const savedJobs = getSavedJobsByCandidate(candidateId);
  return savedJobs.map((sj) => ({
    ...sj,
    job: getJobById(sj.jobId),
  }));
};

/**
 * Get shortlisted candidates for a job
 */
export const getShortlistedCandidates = (jobId: string) => {
  return dummyShortLists.filter((sl) => sl.jobId === jobId);
};

/**
 * Get shortlisted candidates with full details
 */
export const getShortlistedCandidatesWithDetails = (jobId: string) => {
  const shortlists = getShortlistedCandidates(jobId);
  return shortlists.map((sl) => ({
    ...sl,
    candidate: getCandidateById(sl.candidateId),
  }));
};

/**
 * Get notifications for a user
 */
export const getNotificationsByUser = (
  userId: string,
  userType?: "candidate" | "company"
) => {
  return dummyNotifications.filter((notif) => {
    if (userType) {
      return notif.userId === userId && notif.userType === userType;
    }
    return notif.userId === userId;
  });
};

/**
 * Get unread notifications for a user
 */
export const getUnreadNotifications = (
  userId: string,
  userType?: "candidate" | "company"
) => {
  return getNotificationsByUser(userId, userType).filter(
    (notif) => !notif.isRead
  );
};

/**
 * Get resume by candidate ID
 */
export const getResumeByCandidate = (candidateId: string) => {
  return dummyResumes.filter((resume) => resume.candidateId === candidateId);
};

/**
 * Check if a job is saved by a candidate
 */
export const isJobSavedByCandidate = (jobId: string, candidateId: string) => {
  return dummySavedJobs.some(
    (sj) => sj.jobId === jobId && sj.candidateId === candidateId
  );
};

/**
 * Check if a candidate is shortlisted for a job
 */
export const isCandidateShortlisted = (jobId: string, candidateId: string) => {
  return dummyShortLists.some(
    (sl) => sl.jobId === jobId && sl.candidateId === candidateId
  );
};

/**
 * Get average rating for a company
 */
export const getCompanyAverageRating = (companyId: string) => {
  const reviews = getReviewsByCompanyId(companyId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

/**
 * Get featured jobs
 */
export const getFeaturedJobs = () => {
  return dummyJobs.filter((job) => job.isFeatured);
};

/**
 * Get remote jobs
 */
export const getRemoteJobs = () => {
  return dummyJobs.filter((job) => job.remote);
};

/**
 * Search jobs by keyword
 */
export const searchJobs = (keyword: string) => {
  const lowerKeyword = keyword.toLowerCase();
  return dummyJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerKeyword) ||
      job.description.toLowerCase().includes(lowerKeyword) ||
      job.company.toLowerCase().includes(lowerKeyword) ||
      job.skills.some((skill) => skill.toLowerCase().includes(lowerKeyword))
  );
};

/**
 * Filter jobs by experience level
 */
export const getJobsByExperienceLevel = (
  level: "Entry" | "Mid" | "Senior" | "Lead"
) => {
  return dummyJobs.filter((job) => job.experienceLevel === level);
};

/**
 * Filter jobs by category
 */
export const getJobsByCategory = (category: string) => {
  return dummyJobs.filter((job) => job.category === category);
};
