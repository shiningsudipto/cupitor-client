# **Cupitor — Frontend Architecture & Implementation Guide**

> **Tech Stack:** Next.js (App Router), TypeScript, shadcn/ui, Tailwind CSS, Zod, React Hook Form, Redux Toolkit (RTK) + RTK Query, Fetch/Axios

This guide outlines the structure, UI features, component architecture, state-management patterns, validation logic, and integration flow for the **Cupitor Job Portal Frontend**, designed to pair cleanly with the existing REST API backend.

### **Collections**

All collections are defined in the `types/collections.ts` file.

---

# **1. Public Pages**

### **Homepage**

- Marketing header, featured jobs, and a global search bar.
- Prominent categories and quick navigation sections.

### **Job Search & Listing**

- Keyword search.
- Filters: location, remote option, job type, salary range.
- Sort by relevance, date, or salary.
- Pagination or infinite scroll.

### **Job Details**

- Complete job description.
- Company preview card.
- Persistent Apply and Save buttons.

### **Company Public Profile**

- Company overview.
- List of active job postings.
- Ratings and reviews.

### **Authentication Pages**

- Register, Login, Forgot Password.
- Shared UI and Zod-driven validation.

---

# **2. Candidate Pages (Authenticated)**

### **Dashboard**

- Active applications.
- Saved jobs.
- Job suggestions.

### **Profile Editor**

- Avatar, headline, location.
- Skills and experience entries.

### **Resume Manager**

- Upload multiple resumes.
- Mark a primary resume.

### **Application Flow**

- Apply with selected resume.
- Optional cover letter.
- Application status tracking.

### **Company Reviews**

- Leave reviews after an interview or application process.

---

# **3. Company Pages (Authenticated)**

### **Dashboard**

- Overview of posted jobs.
- Application activity and basic analytics.

### **Job Editor**

- Create or update job listings.
- Rich job description fields.

### **Applicant View**

- Resume viewer.
- Shortlist workflow.
- Update application status.

---

# **4. Key UI Components & Design Patterns**

shadcn/ui components should be used as the foundation for creating consistent interfaces across Cupitor.

### **Core Components**

- Search bar with debounced input and optional autosuggest.
- Job card for concise job overviews with clear CTAs.
- Company card for compact company previews.
- Job detail layout that clearly separates responsibilities, requirements, and benefits.
- Resume uploader with drag-and-drop support and accessible file input fallback.
- Application modal for a focused apply flow.
- Protected route handling to redirect unauthenticated visitors to the login flow.
- Shared auth forms driven by Zod schemas.
- Toast/toaster system for transient notifications.
- Confirm dialogs for destructive or irreversible actions.

### **Design & UX Considerations**

- Use optimistic UI patterns for save/bookmark and shortlist actions to keep interactions feeling immediate.
- Show skeleton loaders for lists while fetching remote data.
- Keep Apply and Save CTAs persistent and visible in the job detail view.
- Ensure accessible modals with focus trapping and proper ARIA attributes.

---

# **5. Forms, Validation & Zod**

Use React Hook Form together with Zod schemas to centralize and enforce validation logic. Keep schema definitions in a dedicated folder so they are easy to reuse across forms (auth, profile, job posting, application, review).

Validation guidance:

- Provide clear, user-friendly error messages.
- Keep validations consistent between frontend and backend by mirroring shape and rules.
- Validate files (size, type) on the client before upload to reduce failed requests.

---

# **6. State Management — Redux Toolkit & RTK Query**

Adopt **Redux Toolkit (RTK)** for predictable global state and **RTK Query** for all server interactions, caching, and request management. Use RTK for UI state (modals, toast queue, global flags) and RTK Query for data fetching, caching, and mutations (jobs, companies, users, resumes, applications).

Best practices:

- Model server resources as RTK Query endpoints with tag-based invalidation to keep lists and details in sync.
- Use selectors and memoization for derived UI state when necessary.
- Keep ephemeral UI state in a small slice separate from server-driven data.
- Rely on Redux DevTools for debugging and tracing state changes during development.
- Consider persisted storage for lightweight UI preferences (theme, list view) but avoid persisting sensitive tokens in local storage.

Security note: Prefer server-set httpOnly cookies for authentication when backend support is available; otherwise treat tokens with caution and limit persistence.

---

# **7. Authentication Flow**

Frontend responsibilities for JWT-based auth:

- Handle login and logout flows and reflect user state in the global store.
- Include credentials in requests according to the backend's chosen strategy (headers or cookies).
- Handle 401 responses gracefully, redirecting to login or showing contextual messages.
- Use short-lived tokens or refresh flows if the backend exposes refresh endpoints.

Security reminder: If possible, use httpOnly cookies to avoid exposing tokens to JavaScript.

---

# **8. Resume & File Uploads**

- Provide drag-and-drop and accessible file input alternatives.
- Show immediate feedback: filename, size, and preview when possible.
- Offer two upload strategies depending on security needs: direct upload to Cloudinary with unsigned presets or upload via backend-signed requests.
- Display upload progress and handle failures with clear retries and error messaging.

---

# **9. Apply-to-Job Flow**

Recommend an in-place modal for the apply flow to reduce context switching. The apply flow should:

- Allow selecting an existing resume or uploading a new one.
- Include an optional cover letter field.
- Prevent duplicate applications (visual cue and disabled CTA if already applied).
- Provide immediate confirmation and surface the updated application status in the candidate dashboard.

---

# **10. Saved Jobs & Shortlisting**

Saved Jobs (Candidates):

- Enable toggling saved state directly on job cards and job detail pages.
- Apply optimistic UI updates and reconcile with server state via RTK Query invalidation.

Shortlisting (Companies):

- Provide one-click shortlist actions, optional notes for reviewers, and explicit confirmation for irreversible actions.

---

# **11. Notifications & Real-Time Updates**

Options and guidance:

- Use Server-Sent Events (SSE) for simple, server-to-client updates (application status changes, new messages).
- Use WebSockets if bi-directional communication or low-latency interactions are required.

Implementation notes:

- Establish the real-time connection after authentication.
- Surface notifications via toasts and a notification center with persisted read/unread state.
- Keep the real-time channel limited to relevant events to reduce noise and improve battery/network usage.

---

# **12. Resume ATS Checker Integration**

UX expectations:

- Allow candidates to select or upload a resume to analyze.
- Present an easy-to-read score and prioritized suggestions.
- Offer actionable guidance rather than raw recommendations (e.g., highlight missing keywords, format tips).
- Optionally allow quick inline edits or a downloadable report.

---

# **13. Company Reviews & Ratings**

- Restrict review submissions to verified candidates where possible.
- Show aggregated ratings and recent reviews on company profiles.
- Allow users to flag or report problematic reviews and provide a moderation path.

---

# **14. Accessibility & Internationalization**

- Use semantic HTML and proper ARIA attributes for interactive components.
- Ensure keyboard navigation and screen-reader compatibility for all major flows (search, apply, upload, review).
- Prepare the app for localization with an i18n framework and externalized strings.

---

# **15. Testing, Quality & Deployment**

- Test components with unit tests and use end-to-end tests for critical flows (auth, apply, post job).
- Use TypeScript strict mode and linting tools to keep the codebase maintainable.
- Deploy to Vercel or a similar platform and configure environment variables for production.

---

# **End of Guide**

This document has been updated to use Redux Toolkit and RTK Query for state management and server interactions. All embedded code examples have been removed; the guide now focuses on architecture, UX, and implementation patterns without code samples. The text has been proofread for clarity and consistency.
