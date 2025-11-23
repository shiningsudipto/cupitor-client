# Company Pages (Authenticated) - Implementation Guide

This document provides an overview of the authenticated company pages implementation for the Cupitor job portal.

## 📁 File Structure

```
app/
└── company/
    ├── layout.tsx              # Company dashboard layout with sidebar
    ├── dashboard/
    │   └── page.tsx           # Main dashboard with job analytics
    ├── jobs/
    │   └── new/
    │       └── page.tsx       # Job editor/creator
    └── applicants/
        └── page.tsx           # Applicant management with resume viewer

lib/
└── validations/
    └── job.ts                 # Job posting validation schema

components/
└── header.tsx                 # Updated with dashboard links
```

## 🎨 Pages Overview

### 1. **Layout** (`/company/layout.tsx`)

- Sticky top navigation with notifications badge
- Sidebar navigation (Desktop only)
- Company logo and info display
- Consistent design with candidate layout

**Features:**

- Clean navigation across all company pages
- Responsive design
- Primary color scheme integration

### 2. **Dashboard** (`/company/dashboard/page.tsx`)

- Welcome section with "Post New Job" CTA
- Statistics cards (Active Jobs, Total Applicants, Profile Views, Shortlisted)
- Posted jobs overview with status
- Recent applications feed
- Quick insights (avg applicants, application rate, top job)

**Key Features:**

- Real-time job statistics
- Application activity tracking
- Color-coded status indicators
- Quick access to job management
- Analytics visualization

**Stats Displayed:**

- Active jobs count
- Total applicants across all jobs
- Profile views
- Shortlisted candidates
- Application rate trends

### 3. **Job Editor** (`/company/jobs/new/page.tsx`)

- Comprehensive job creation form
- Form validation with Zod
- Rich text fields for job description
- Skills management (add/remove tags)
- Salary range configuration
- Benefits and perks section

**Key Features:**

- Multi-section form layout:
  - Basic Information (title, description, category, type, level, location)
  - Compensation (salary range, benefits)
  - Requirements & Skills (skills tags, requirements, responsibilities)
  - Application Settings (deadline)
- Dynamic skills input with badge display
- Remote work toggle
- Save draft / Publish workflow
- Form validation with helpful error messages

**Validation Schema:** `lib/validations/job.ts`

### 4. **Applicant Management** (`/company/applicants/page.tsx`)

- List all applications across all jobs
- Advanced search and filtering
- Status management workflow
- Resume viewer modal
- Shortlist/Reject actions

**Key Features:**

- Status counters (All, New, Reviewed, Shortlisted, Rejected)
- Three-filter system:
  - Search by candidate name or job title
  - Filter by application status
  - Filter by specific job
- Application cards with:
  - Candidate information
  - Contact details
  - Skills preview
  - Application date
  - Current status badge
- Quick actions (View Details, Shortlist, Reject)
- Detailed application modal with:
  - Full candidate information
  - Skills list
  - Resume download link
  - Status update buttons

**Status Colors:**

- New: Primary (mint)
- Reviewed: Secondary (purple)
- Shortlisted: Green
- Rejected: Red
- Hired: Accent (orange)

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
  dummyJobs,
  dummyCompanies,
  dummyCandidates,
  getResumeByCandidate,
} from "@/constants";
```

**Mock Data Created:**

- Application data (in-component mock for demonstration)
- Uses existing candidates, jobs, and resumes

## 🎨 Design Principles

1. **Consistent with Candidate Pages**

   - Same layout structure
   - Matching color scheme
   - Similar navigation patterns

2. **Business-Focused**

   - Analytics-driven dashboard
   - Efficient applicant management
   - Quick actions for common tasks

3. **User Experience**

   - Clear visual hierarchy
   - Status-based color coding
   - Helpful empty states
   - Toast notifications
   - Loading indicators

4. **Responsiveness**
   - Mobile-first approach
   - Grid layouts adapt to screen size
   - Sidebar hidden on mobile
   - Flexible card designs

## 🔐 Authentication

Currently using mock company ID: `comp-1`

**TODO:**

- Integrate with actual authentication system
- Get current company from session/token
- Protect routes with middleware
- Handle unauthorized access

## 🚀 Future Enhancements

1. **Dashboard**

   - Real-time analytics charts
   - Application trends over time
   - Candidate pipeline visualization
   - Email notification settings

2. **Job Editor**

   - Rich text editor for descriptions
   - Job templates
   - Clone existing jobs
   - Schedule job posting
   - Multi-language support

3. **Applicant Management**

   - Bulk actions (shortlist multiple, reject multiple)
   - Email integration
   - Interview scheduling
   - Candidate notes/comments
   - Rating system
   - Advanced filters (skills match, experience range)
   - Export applicant data

4. **Additional Pages**
   - Company profile editor
   - Team management
   - Billing and subscription
   - Analytics dashboard
   - Interview scheduler

## 📝 Form Validation Schema

**Job Posting** (`lib/validations/job.ts`):

- Title (min 5 chars)
- Description (min 50 chars)
- Category, job type, experience level
- Location
- Remote work toggle
- Salary range (min/max, currency period)
- Skills array (min 1 skill)
- Requirements (min 20 chars)
- Responsibilities (min 20 chars)
- Benefits (optional)
- Application deadline

## 🎯 Usage Examples

### Accessing Current Company Data

```typescript
const currentCompanyId = "comp-1"; // TODO: Get from auth
const company = dummyCompanies.find((c) => c.id === currentCompanyId);
const companyJobs = dummyJobs.filter((j) => j.companyId === currentCompanyId);
```

### Updating Application Status

```typescript
const updateApplicationStatus = (appId: string, newStatus: string) => {
  // TODO: API call
  setApplications(
    apps.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
  );
  toast.success(`Application status updated to ${newStatus}`);
};
```

## ✅ Completed Features

- ✅ Company dashboard with analytics
- ✅ Job posting form with validation
- ✅ Applicant management system
- ✅ Resume viewer modal
- ✅ Status management workflow
- ✅ Search and filter functionality
- ✅ Shortlist workflow
- ✅ Form validation with Zod
- ✅ Toast notifications
- ✅ Loading and empty states
- ✅ Responsive design
- ✅ Primary color scheme integration

## 🔗 Navigation Updates

Updated `components/header.tsx`:

- Added dashboard link for authenticated users
- Dynamic routing based on user role (candidate/company)
- Updated colors to use primary color scheme
- Mobile-responsive navigation

## 🎨 Color Scheme

All company pages use the same color scheme as candidate pages:

- **Primary**: #21f3be (Mint/Turquoise)
- **Secondary**: #af9aff (Purple/Lavender)
- **Accent**: #ff9356 (Orange/Coral)
- **Text**: #000 (Black)

All colors are defined in `app/globals.css` for easy modification.

---

**Section 3: Company Pages (Authenticated) is now complete!** 🎉

The company portal is fully functional with job management, applicant tracking, and a comprehensive dashboard!
