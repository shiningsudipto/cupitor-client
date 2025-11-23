# Constants - Demo Data Overview

This directory contains all demo data constants for the Cupitor job portal application, following the type definitions from `types/collections.ts`.

## Available Demo Data

### 1. Company Types (`companyTypes.ts`)

- **Count:** 8 entries
- **Type:** `TCompanyType`
- **IDs:** `ct-1` to `ct-8`
- **Categories:** Technology, Healthcare, Finance, E-commerce, Education, Manufacturing, Consulting, Media & Entertainment

### 2. Companies (`companies.ts`)

- **Count:** 8 entries
- **Type:** Custom `Company` interface (legacy)
- **IDs:** `comp-1` to `comp-8`
- **Note:** This uses a different interface structure than `TCompany` from collections.ts

### 3. Job Types (`jobTypes.ts`)

- **Count:** 8 entries
- **Type:** `TJobType`
- **IDs:** `jt-1` to `jt-8`
- **Categories:** Full-time, Part-time, Contract, Freelance, Internship, Temporary, Remote, Hybrid

### 4. Jobs (`jobs.ts`)

- **Count:** 8 entries
- **Type:** Custom `Job` interface (legacy)
- **IDs:** `1` to `8`
- **Note:** This uses a different interface structure than `TJob` from collections.ts

### 5. Candidates (`candidates.ts`)

- **Count:** 8 entries
- **Type:** `TCandidate`
- **IDs:** `cand-1` to `cand-8`
- **Details:** Complete candidate profiles with avatar, skills, education, experience, and social links

### 6. Candidate Experiences (`candidateExperiences.ts`)

- **Count:** 10 entries
- **Type:** `TCandidateExperience`
- **IDs:** `exp-1` to `exp-10`
- **Details:** Work experience entries for candidates, including company, role, dates, and descriptions

### 7. Reviews (`reviews.ts`)

- **Count:** 10 entries
- **Type:** Custom `Review` interface (legacy)
- **IDs:** `rev-1` to `rev-10`
- **Note:** This uses a different interface structure than `TReview` from collections.ts

### 8. Saved Jobs (`savedJobs.ts`)

- **Count:** 8 entries
- **Type:** `TSavedJob`
- **IDs:** `sj-1` to `sj-8`
- **Details:** Links candidates to their saved/bookmarked job postings

### 9. Short Lists (`shortLists.ts`)

- **Count:** 8 entries
- **Type:** `TShortList`
- **IDs:** `sl-1` to `sl-8`
- **Details:** Companies' shortlisted candidates for specific jobs

### 10. Notifications (`notifications.ts`)

- **Count:** 10 entries
- **Type:** `TNotification`
- **IDs:** `notif-1` to `notif-10`
- **Types:** application, job, review, general
- **User Types:** Both candidates and companies

### 11. Resumes (`resumes.ts`)

- **Count:** 8 entries
- **Type:** `TResume`
- **IDs:** `resume-1` to `resume-8`
- **Details:** Resume files linked to candidate profiles

## Data Relationships

### Candidate to Companies

- Candidates have work experiences at various companies
- Candidates can save jobs from companies
- Candidates can be shortlisted by companies
- Candidates can write reviews about companies

### Jobs to Candidates

- Jobs are posted by companies
- Candidates can save specific jobs
- Candidates can be shortlisted for specific jobs
- Jobs have application workflows

### Notifications

- Both candidates and companies receive notifications
- Types include: application updates, job matches, reviews, and general alerts

## Usage

Import the constants in your components:

```typescript
import {
  dummyCompanyTypes,
  dummyJobTypes,
  dummyCandidates,
  dummyCandidateExperiences,
  dummyCompanies,
  dummyJobs,
  dummyReviews,
  dummySavedJobs,
  dummyShortLists,
  dummyNotifications,
  dummyResumes,
} from "@/constants";
```

## Notes

- Some existing interfaces (Company, Job, Review) differ from the TypeScript definitions in `types/collections.ts`
- These legacy interfaces may need to be migrated to match the collection types
- All demo data uses consistent ID patterns for easy reference tracking
- Date fields use ISO 8601 format or JavaScript Date objects
