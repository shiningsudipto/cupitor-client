// company
export interface TCompanyType {
  _id: string;
  label: string;
}

export interface TCompany {
  _id: string;
  name: string;
  username: string;
  slug: string;
  email: string;
  logo?: string;
  companyType: string;
  location?: string;
  employee_len?: string;
  password: string;
}

// candidate / user

export type TCandidate = {
  _id: string;
  name: string;
  slug: string;
  email: string;
  avatar?: string;
  password: string;
  phone: string;
  role: "candidate";
  city?: string;
  address?: string;
  skills?: string[];
  education?: string;
  yearsOfExperience?: string;
  github?: string;
  linkedin?: string;
};

export const USER_ROLE = {
  user: "user",
  admin: "admin",
  candidate: "candidate",
  company: "company",
};

export interface TCandidateExperience {
  _id?: string;
  candidateId: string;
  companyName: string;
  companyLocation?: string;
  role: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

// job

export interface TJobType {
  _id: string;
  label: string;
}

export interface TJob {
  companyId: string;
  jobType: string;
  title: string;
  description: string;
  requirements: string;
  experience_level: string;
  salaryRange?: string;
  skills: string[];
  deadline: string;
  share_slug: string;
}

export interface TSavedJob {
  _id?: string;
  jobId: string;
  candidateId: string;
  savedAt?: Date;
}

export interface TReview {
  _id?: string;
  companyId: string;
  candidateId: string;
  rating: number;
  comment?: string;
  reviewDate?: Date;
}

export interface TShortList {
  _id?: string;
  jobId: string;
  companyId: string;
  candidateId: string;
  createdAt?: Date;
}

// notification

export interface TNotification {
  _id?: string;
  userId: string;
  userType: "candidate" | "company";
  title: string;
  message: string;
  type: "application" | "job" | "review" | "general";
  isRead: boolean;
  relatedId?: string;
  createdAt?: Date;
}

// resume

export interface TResume {
  _id?: string;
  candidateId: string;
  resumeUrl: string;
  createdAt?: Date;
}

export interface TResumeAnalysis {
  _id: string;
  candidateId: string;
  resumeId?: string;
  jobId?: string;
  resumeUrl: string;
  parsedContent: string;
  analysisType: "general" | "job-specific";
  title: string;
  atsScore: number;
  keywordScore: number;
  formattingScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingKeywords: string[];
  matchedKeywords: string[];
  sections: {
    hasContactInfo: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
    hasSummary: boolean;
  };
  aiAnalysis: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TResumeSection {
  hasContactInfo: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  hasSummary: boolean;
}

export interface TAIAnalysisResult {
  atsScore: number;
  keywordScore: number;
  formattingScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingKeywords: string[];
  matchedKeywords: string[];
  sections: TResumeSection;
  aiAnalysis: string;
}
