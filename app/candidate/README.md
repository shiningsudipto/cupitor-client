# Candidate Pages (Authenticated) - Implementation Guide

This document provides an overview of the authenticated candidate pages implementation for the Cupitor job portal.

## 📁 File Structure

```
app/
└── candidate/
    ├── layout.tsx              # Candidate dashboard layout with sidebar
    ├── dashboard/
    │   └── page.tsx           # Main dashboard with applications & suggestions
    ├── profile/
    │   └── page.tsx           # Profile editor with experience management
    ├── resumes/
    │   └── page.tsx           # Resume manager with ATS analysis
    ├── saved-jobs/
    │   └── page.tsx           # Saved/bookmarked jobs
    └── reviews/
        └── page.tsx           # Company reviews management

components/
└── apply-job-modal.tsx        # Reusable job application modal

lib/
└── validations/
    ├── candidate.ts           # Profile & experience validation schemas
    ├── application.ts         # Job application validation schema
    └── review.ts              # Review validation schema
```

## 🎨 Pages Overview

### 1. **Layout** (`/candidate/layout.tsx`)

- Sticky top navigation with notifications badge
- Sidebar navigation (Desktop only)
- Beautiful gradient background
- User avatar and info display

**Features:**

- Consistent navigation across all candidate pages
- Responsive design with mobile considerations
- Premium UI with blur effects and shadows

### 2. **Dashboard** (`/candidate/dashboard/page.tsx`)

- Welcome section with profile completeness indicator
- Statistics cards (Active Applications, Saved Jobs, Profile Views)
- Tabbed interface for Applications, Saved Jobs, and Suggestions
- Application status tracking with color-coded badges
- Job suggestions based on candidate skills

**Key Features:**

- Real-time application status (Under Review, Shortlisted, Rejected)
- Job recommendations using skill matching
- Interactive tabs for different content sections
- Empty states with call-to-action

### 3. **Profile Editor** (`/candidate/profile/page.tsx`)

- Avatar upload section
- Basic information form (Name, Email, Phone, City, Address)
- Education and experience fields
- Dynamic skills management (Add/Remove)
- Social links (GitHub, LinkedIn)
- Work experience CRUD operations with modal dialog

**Key Features:**

- Form validation with Zod and React Hook Form
- Skill tags with add/remove functionality
- Experience timeline with edit/delete actions
- Current role toggle for ongoing positions
- Real-time validation feedback

**Validation Schema:** `lib/validations/candidate.ts`

### 4. **Resume Manager** (`/candidate/resumes/page.tsx`)

- Resume upload with drag & drop
- Multiple resume management
- Primary resume selection
- ATS analysis results display
- Resume actions (View, Download, Delete, Analyze)

**Key Features:**

- File type and size validation (PDF, DOC, DOCX - Max 5MB)
- Upload progress indicator
- ATS score visualization with progress bars
- Color-coded score ratings (Excellent, Good, Needs Improvement)
- Tips for improving ATS scores
- Empty state with upload prompt

**ATS Metrics Displayed:**

- Overall Score
- Keyword Score
- Formatting Score
- ATS Compatibility Score

### 5. **Saved Jobs** (`/candidate/saved-jobs/page.tsx`)

- List of all bookmarked jobs
- Search functionality
- Filters (Job Type, Remote/On-site)
- Detailed job cards with all information
- Quick actions (View, Apply, Unsave)

**Key Features:**

- Real-time search and filtering
- Statistics footer (Total Saved, Remote Jobs, Filtered Results)
- Salary range display
- Skills badges
- Applicant count
- Empty state with browse jobs CTA

### 6. **Reviews** (`/candidate/reviews/page.tsx`)

- Write new company reviews
- Interactive star rating system
- Review form with company selection
- List of user's reviews
- Edit and delete functionality

**Key Features:**

- 5-star rating with hover effects
- Company selection dropdown
- Character counter (500 max)
- Verified badge display
- Helpful votes tracking
- Review guidelines section
- Pros and cons sections

**Validation Schema:** `lib/validations/review.ts`

## 🔄 Application Flow Component

### **Apply Job Modal** (`components/apply-job-modal.tsx`)

- Modal dialog for job applications
- Resume selection from existing uploads
- Quick resume upload option
- Optional cover letter (1000 char limit)
- Duplicate application prevention
- Application guidelines/warnings

**Key Features:**

- Dynamic resume list loading
- Upload progress indicator
- Form validation with Zod
- Loading states during submission
- Already applied state handling
- Job summary display in modal

**Validation Schema:** `lib/validations/application.ts`

## 🎯 Key Technologies Used

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📊 Data Integration

All pages use the demo data constants from `/constants`:

```typescript
import {
  dummyCandidates,
  dummyJobs,
  dummyCompanies,
  getSavedJobsWithDetails,
  getCandidateExperiences,
  getResumeByCandidate,
} from "@/constants";
```

## 🎨 Design Principles

1. **Premium Aesthetics**

   - Gradient backgrounds
   - Card-based layouts with shadows
   - Smooth hover transitions
   - Color-coded status indicators

2. **User Experience**

   - Clear visual hierarchy
   - Helpful empty states
   - Loading indicators
   - Toast notifications for actions
   - Form validation with helpful messages

3. **Responsiveness**

   - Mobile-first approach
   - Grid layouts adapt to screen size
   - Sidebar hidden on mobile
   - Flexible card designs

4. **Accessibility**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support
   - Focus states on interactive elements

## 🔐 Authentication

Currently using mock candidate ID: `cand-1`

**TODO:**

- Integrate with actual authentication system
- Get current user from session/token
- Protect routes with middleware
- Handle unauthorized access

## 🚀 Future Enhancements

1. **Dashboard**

   - Real-time notifications
   - Activity feed
   - Calendar integration for interviews

2. **Profile**

   - LinkedIn profile import
   - Portfolio project links
   - Certifications section

3. **Resumes**

   - Resume builder/editor
   - ATS checker integration with AI
   - Resume templates
   - Download optimized versions

4. **Reviews**

   - Rating breakdown by category
   - Image uploads
   - Response from companies
   - Moderation system

5. **Application Flow**
   - Application tracking timeline
   - Interview scheduling
   - Follow-up reminders
   - Withdrawal option

## 📝 Form Validation Schemas

All forms use Zod for validation:

- **Profile**: `candidateProfileSchema` - Name, email, phone, city, skills, education, experience, social links
- **Experience**: `experienceSchema` - Company, role, dates, description
- **Application**: `jobApplicationSchema` - Resume selection, cover letter
- **Review**: `reviewSchema` - Company, rating (1-5), comment (10-500 chars)

## 🎯 Usage Examples

### Opening Apply Modal

```typescript
import { ApplyJobModal } from "@/components/apply-job-modal";

<ApplyJobModal
  open={isOpen}
  onOpenChange={setIsOpen}
  job={selectedJob}
  candidateId={currentCandidateId}
  hasApplied={false}
/>;
```

### Accessing Current Candidate Data

```typescript
const currentCandidateId = "cand-1"; // TODO: Get from auth
const candidate = dummyCandidates.find((c) => c._id === currentCandidateId);
const experiences = getCandidateExperiences(currentCandidateId);
const resumes = getResumeByCandidate(currentCandidateId);
const savedJobs = getSavedJobsWithDetails(currentCandidateId);
```

## ✅ Completed Features

- ✅ Dashboard with application tracking
- ✅ Profile editor with experience management
- ✅ Resume manager with upload
- ✅ Saved jobs with search and filters
- ✅ Company reviews system
- ✅ Job application modal
- ✅ Form validation with Zod
- ✅ Toast notifications
- ✅ Loading and empty states
- ✅ Responsive design
- ✅ Premium UI/UX

All features from **Section 2: Candidate Pages (Authenticated)** of `cupitor-instructions.md` have been implemented! 🎉
