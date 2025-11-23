/\*\*

- Example Usage of Cupitor Constants
-
- This file demonstrates how to use the constants, helpers, and stats
- in various UI components throughout the Cupitor application.
  \*/

// ============================================================================
// EXAMPLE 1: Displaying Featured Jobs on Homepage
// ============================================================================

/\*
import { getFeaturedJobs } from "@/constants";

export function FeaturedJobsSection() {
const featuredJobs = getFeaturedJobs();

return (
<section>
<h2>Featured Jobs</h2>
<div className="grid grid-cols-3 gap-4">
{featuredJobs.map((job) => (
<JobCard key={job.id} job={job} />
))}
</div>
</section>
);
}
\*/

// ============================================================================
// EXAMPLE 2: Candidate Dashboard with Saved Jobs
// ============================================================================

/\*
import { getSavedJobsWithDetails, getNotificationsByUser } from "@/constants";

export function CandidateDashboard({ candidateId }: { candidateId: string }) {
const savedJobs = getSavedJobsWithDetails(candidateId);
const notifications = getNotificationsByUser(candidateId, "candidate");
const unreadCount = notifications.filter(n => !n.isRead).length;

return (
<div>
<header>
<h1>Dashboard</h1>
<span>Notifications: {unreadCount}</span>
</header>

      <section>
        <h2>My Saved Jobs ({savedJobs.length})</h2>
        {savedJobs.map((savedJob) => (
          <JobCard key={savedJob._id} job={savedJob.job} />
        ))}
      </section>
    </div>

);
}
\*/

// ============================================================================
// EXAMPLE 3: Company Profile with Reviews
// ============================================================================

/\*
import {
getCompanyById,
getReviewsByCompanyId,
getCompanyAverageRating
} from "@/constants";

export function CompanyProfile({ companyId }: { companyId: string }) {
const company = getCompanyById(companyId);
const reviews = getReviewsByCompanyId(companyId);
const avgRating = getCompanyAverageRating(companyId);

if (!company) return <div>Company not found</div>;

return (
<div>
<div>
<img src={company.logo} alt={company.name} />
<h1>{company.name}</h1>
<div>
Rating: {avgRating.toFixed(1)} ⭐ ({reviews.length} reviews)
</div>
</div>

      <section>
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </div>

);
}
\*/

// ============================================================================
// EXAMPLE 4: Job Search with Filters
// ============================================================================

/\*
import { useState } from "react";
import {
searchJobs,
getJobsByCategory,
getJobsByExperienceLevel,
getRemoteJobs
} from "@/constants";

export function JobSearchPage() {
const [keyword, setKeyword] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [experienceLevel, setExperienceLevel] = useState<"Entry" | "Mid" | "Senior" | "Lead" | "">("");
const [remoteOnly, setRemoteOnly] = useState(false);

let jobs = keyword ? searchJobs(keyword) : dummyJobs;

if (selectedCategory) {
jobs = jobs.filter(job => job.category === selectedCategory);
}

if (experienceLevel) {
jobs = jobs.filter(job => job.experienceLevel === experienceLevel);
}

if (remoteOnly) {
jobs = jobs.filter(job => job.remote);
}

return (
<div>
<input
value={keyword}
onChange={(e) => setKeyword(e.target.value)}
placeholder="Search jobs..."
/>
// ... filters UI
<div>
{jobs.map(job => (
<JobCard key={job.id} job={job} />
))}
</div>
</div>
);
}
\*/

// ============================================================================
// EXAMPLE 5: Company Dashboard - Shortlisted Candidates
// ============================================================================

/\*
import { getShortlistedCandidatesWithDetails } from "@/constants";

export function JobApplicantsView({ jobId }: { jobId: string }) {
const shortlistedCandidates = getShortlistedCandidatesWithDetails(jobId);

return (
<section>
<h2>Shortlisted Candidates ({shortlistedCandidates.length})</h2>
<div>
{shortlistedCandidates.map((item) => (
<CandidateCard 
            key={item._id} 
            candidate={item.candidate}
            shortlistedAt={item.createdAt}
          />
))}
</div>
</section>
);
}
\*/

// ============================================================================
// EXAMPLE 6: Candidate Profile with Experience
// ============================================================================

/\*
import { getCandidateById, getCandidateExperiences } from "@/constants";

export function CandidateProfile({ candidateId }: { candidateId: string }) {
const candidate = getCandidateById(candidateId);
const experiences = getCandidateExperiences(candidateId);

if (!candidate) return <div>Candidate not found</div>;

return (
<div>
<header>
<img src={candidate.avatar} alt={candidate.name} />
<h1>{candidate.name}</h1>
<p>{candidate.city}</p>
</header>

      <section>
        <h2>Skills</h2>
        <div>
          {candidate.skills?.map((skill) => (
            <span key={skill} className="badge">{skill}</span>
          ))}
        </div>
      </section>

      <section>
        <h2>Experience</h2>
        {experiences.map((exp) => (
          <div key={exp._id}>
            <h3>{exp.role}</h3>
            <p>{exp.companyName} • {exp.companyLocation}</p>
            <p>{exp.startDate} - {exp.endDate || "Present"}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>
    </div>

);
}
\*/

// ============================================================================
// EXAMPLE 7: Using Statistics for Dashboard Widgets
// ============================================================================

/\*
import { jobStats, candidateStats, companyStats } from "@/constants";

export function AdminDashboard() {
return (
<div className="grid grid-cols-3 gap-4">
<div className="stat-card">
<h3>Total Jobs</h3>
<p className="stat-value">{jobStats.total}</p>
<p className="stat-detail">
{jobStats.featured} featured • {jobStats.remote} remote
</p>
</div>

      <div className="stat-card">
        <h3>Total Candidates</h3>
        <p className="stat-value">{candidateStats.total}</p>
        <p className="stat-detail">
          Avg Experience: {candidateStats.averageExperience.toFixed(1)} years
        </p>
      </div>

      <div className="stat-card">
        <h3>Companies</h3>
        <p className="stat-value">{companyStats.total}</p>
        <p className="stat-detail">
          Avg Rating: {companyStats.averageRating.toFixed(1)} ⭐
        </p>
      </div>
    </div>

);
}
\*/

// ============================================================================
// EXAMPLE 8: Notification Center
// ============================================================================

/\*
import {
getNotificationsByUser,
getUnreadNotifications
} from "@/constants";

export function NotificationCenter({ userId, userType }: {
userId: string;
userType: "candidate" | "company";
}) {
const allNotifications = getNotificationsByUser(userId, userType);
const unreadNotifications = getUnreadNotifications(userId, userType);

return (
<div>
<header>
<h2>Notifications</h2>
<span className="badge">{unreadNotifications.length} new</span>
</header>

      <div>
        {allNotifications.map((notification) => (
          <div
            key={notification._id}
            className={notification.isRead ? "read" : "unread"}
          >
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <span className="timestamp">
              {new Date(notification.createdAt!).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>

);
}
\*/

// ============================================================================
// EXAMPLE 9: Check if Job is Saved (Toggle State)
// ============================================================================

/\*
import { isJobSavedByCandidate } from "@/constants";

export function SaveJobButton({
jobId,
candidateId
}: {
jobId: string;
candidateId: string;
}) {
const isSaved = isJobSavedByCandidate(jobId, candidateId);

const handleToggleSave = () => {
// In a real app, this would call an API
console.log(isSaved ? "Unsave job" : "Save job");
};

return (
<button onClick={handleToggleSave}>
{isSaved ? "❤️ Saved" : "🤍 Save"}
</button>
);
}
\*/

// ============================================================================
// EXAMPLE 10: Job Type Selector (Form Input)
// ============================================================================

/\*
import { dummyJobTypes } from "@/constants";

export function JobTypeSelector({
value,
onChange
}: {
value: string;
onChange: (value: string) => void;
}) {
return (
<select value={value} onChange={(e) => onChange(e.target.value)}>
<option value="">Select job type...</option>
{dummyJobTypes.map((type) => (
<option key={type._id} value={type._id}>
{type.label}
</option>
))}
</select>
);
}
\*/

export {};
