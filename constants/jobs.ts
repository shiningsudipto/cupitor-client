export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  remote: boolean;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
  category: string;
  experienceLevel: "Entry" | "Mid" | "Senior" | "Lead";
  skills: string[];
  applicantsCount: number;
  isFeatured: boolean;
  companyLogo?: string;
}

export const dummyJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    companyId: "comp-1",
    location: "San Francisco, CA",
    remote: true,
    jobType: "Full-time",
    salaryRange: {
      min: 120000,
      max: 180000,
      currency: "USD",
    },
    description:
      "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building modern, responsive web applications using cutting-edge technologies.",
    requirements: [
      "5+ years of experience with React or Next.js",
      "Strong TypeScript knowledge",
      "Experience with state management (Redux, Zustand, etc.)",
      "Understanding of web accessibility standards",
      "Experience with testing frameworks (Jest, React Testing Library)",
    ],
    responsibilities: [
      "Design and implement user-facing features",
      "Collaborate with designers and backend developers",
      "Optimize applications for maximum speed and scalability",
      "Ensure the technical feasibility of UI/UX designs",
      "Write clean, maintainable code with proper documentation",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work schedule",
      "Remote work options",
      "Professional development budget",
      "401(k) matching",
    ],
    postedDate: "2025-11-15T10:00:00Z",
    applicationDeadline: "2025-12-15T23:59:59Z",
    category: "Engineering",
    experienceLevel: "Senior",
    skills: ["React", "Next.js", "TypeScript", "Redux", "CSS", "REST APIs"],
    applicantsCount: 42,
    isFeatured: true,
    companyLogo: "/company-logos/techcorp.png",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Design Studio Inc",
    companyId: "comp-2",
    location: "New York, NY",
    remote: true,
    jobType: "Full-time",
    salaryRange: {
      min: 90000,
      max: 140000,
      currency: "USD",
    },
    description:
      "Join our creative team to design intuitive and beautiful digital experiences. We're looking for a talented Product Designer who can think strategically and execute flawlessly.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma and design systems",
      "Strong portfolio showcasing UI/UX work",
      "Experience with user research and testing",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with product managers and engineers",
      "Maintain and evolve design systems",
      "Present design concepts to stakeholders",
    ],
    benefits: [
      "Comprehensive health benefits",
      "Unlimited PTO",
      "Remote-first culture",
      "Latest design tools and equipment",
      "Annual design conference budget",
    ],
    postedDate: "2025-11-18T14:30:00Z",
    applicationDeadline: "2025-12-20T23:59:59Z",
    category: "Design",
    experienceLevel: "Mid",
    skills: [
      "Figma",
      "UI/UX",
      "Prototyping",
      "User Research",
      "Design Systems",
    ],
    applicantsCount: 28,
    isFeatured: true,
    companyLogo: "/company-logos/design-studio.png",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "CloudTech Systems",
    companyId: "comp-3",
    location: "Austin, TX",
    remote: false,
    jobType: "Full-time",
    salaryRange: {
      min: 110000,
      max: 160000,
      currency: "USD",
    },
    description:
      "We're seeking a Backend Engineer to build scalable, high-performance APIs and microservices. You'll work with modern cloud infrastructure and cutting-edge technologies.",
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Node.js or Python",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Understanding of microservices architecture",
      "Familiarity with cloud platforms (AWS, GCP, or Azure)",
    ],
    responsibilities: [
      "Design and implement RESTful APIs",
      "Build and maintain microservices",
      "Optimize database queries and performance",
      "Implement security best practices",
      "Collaborate with frontend teams",
    ],
    benefits: [
      "Stock options",
      "Health and wellness programs",
      "On-site gym and cafeteria",
      "Learning and development budget",
      "Team building events",
    ],
    postedDate: "2025-11-10T09:00:00Z",
    applicationDeadline: "2025-12-10T23:59:59Z",
    category: "Engineering",
    experienceLevel: "Mid",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "REST APIs",
      "Microservices",
    ],
    applicantsCount: 35,
    isFeatured: false,
    companyLogo: "/company-logos/cloudtech.png",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "AI Innovations Lab",
    companyId: "comp-4",
    location: "Boston, MA",
    remote: true,
    jobType: "Full-time",
    salaryRange: {
      min: 130000,
      max: 190000,
      currency: "USD",
    },
    description:
      "Join our AI research team to develop cutting-edge machine learning models. We're looking for a Data Scientist passionate about solving complex problems with data.",
    requirements: [
      "PhD or Master's in Computer Science, Statistics, or related field",
      "Strong Python and ML framework experience (TensorFlow, PyTorch)",
      "Experience with data analysis and visualization",
      "Knowledge of statistical modeling and algorithms",
      "Published research papers (preferred)",
    ],
    responsibilities: [
      "Develop and train machine learning models",
      "Analyze large datasets to extract insights",
      "Collaborate with engineering teams on ML deployment",
      "Present findings to technical and non-technical audiences",
      "Stay current with latest AI/ML research",
    ],
    benefits: [
      "Top-tier compensation and equity",
      "Research publication support",
      "Conference attendance and speaking opportunities",
      "Flexible work environment",
      "Access to high-performance computing resources",
    ],
    postedDate: "2025-11-12T11:00:00Z",
    applicationDeadline: "2025-12-25T23:59:59Z",
    category: "Data Science",
    experienceLevel: "Senior",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "PyTorch",
      "Statistics",
      "Data Analysis",
    ],
    applicantsCount: 18,
    isFeatured: true,
    companyLogo: "/company-logos/ai-innovations.png",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Infrastructure Pro",
    companyId: "comp-5",
    location: "Seattle, WA",
    remote: true,
    jobType: "Full-time",
    salaryRange: {
      min: 115000,
      max: 165000,
      currency: "USD",
    },
    description:
      "We need a skilled DevOps Engineer to help us scale our infrastructure and streamline our deployment processes. You'll work with modern cloud technologies and automation tools.",
    requirements: [
      "3+ years of DevOps or SRE experience",
      "Strong knowledge of Kubernetes and Docker",
      "Experience with CI/CD pipelines (Jenkins, GitHub Actions)",
      "Proficiency in scripting (Bash, Python)",
      "Experience with infrastructure as code (Terraform, Ansible)",
    ],
    responsibilities: [
      "Manage and optimize cloud infrastructure",
      "Build and maintain CI/CD pipelines",
      "Implement monitoring and logging solutions",
      "Automate deployment processes",
      "Ensure system reliability and performance",
    ],
    benefits: [
      "Competitive salary package",
      "Remote work flexibility",
      "Professional certifications (AWS, Kubernetes)",
      "Home office stipend",
      "Health and dental insurance",
    ],
    postedDate: "2025-11-14T08:00:00Z",
    applicationDeadline: "2025-12-14T23:59:59Z",
    category: "Engineering",
    experienceLevel: "Mid",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD", "Python"],
    applicantsCount: 31,
    isFeatured: false,
    companyLogo: "/company-logos/infrastructure-pro.png",
  },
  {
    id: "6",
    title: "Mobile App Developer (iOS)",
    company: "AppCraft Studios",
    companyId: "comp-6",
    location: "Los Angeles, CA",
    remote: false,
    jobType: "Full-time",
    salaryRange: {
      min: 100000,
      max: 150000,
      currency: "USD",
    },
    description:
      "Looking for an iOS developer to create beautiful, performant mobile applications. You'll work on consumer-facing apps used by millions of users.",
    requirements: [
      "4+ years of iOS development experience",
      "Strong Swift programming skills",
      "Experience with SwiftUI and UIKit",
      "Knowledge of iOS design patterns (MVVM, MVC)",
      "Published apps on the App Store",
    ],
    responsibilities: [
      "Develop and maintain iOS applications",
      "Implement new features and improvements",
      "Write unit and UI tests",
      "Collaborate with designers and product managers",
      "Optimize app performance and memory usage",
    ],
    benefits: [
      "Competitive compensation",
      "Latest Apple devices for development",
      "Flexible hours",
      "Team outings and events",
      "Health benefits",
    ],
    postedDate: "2025-11-16T13:00:00Z",
    applicationDeadline: "2025-12-18T23:59:59Z",
    category: "Mobile Development",
    experienceLevel: "Mid",
    skills: ["Swift", "SwiftUI", "iOS", "UIKit", "REST APIs", "Git"],
    applicantsCount: 25,
    isFeatured: false,
    companyLogo: "/company-logos/appcraft.png",
  },
  {
    id: "7",
    title: "Marketing Manager",
    company: "Growth Marketing Co",
    companyId: "comp-7",
    location: "Chicago, IL",
    remote: true,
    jobType: "Full-time",
    salaryRange: {
      min: 85000,
      max: 125000,
      currency: "USD",
    },
    description:
      "We're looking for a creative Marketing Manager to lead our digital marketing efforts and drive growth through innovative campaigns.",
    requirements: [
      "5+ years of marketing experience",
      "Strong understanding of digital marketing channels",
      "Experience with analytics tools (Google Analytics, Mixpanel)",
      "Proven track record of successful campaigns",
      "Excellent written and verbal communication",
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage social media and content marketing",
      "Analyze campaign performance and ROI",
      "Lead a team of marketing specialists",
      "Collaborate with sales and product teams",
    ],
    benefits: [
      "Performance bonuses",
      "Remote work options",
      "Marketing conference attendance",
      "Professional development",
      "Comprehensive benefits package",
    ],
    postedDate: "2025-11-17T10:30:00Z",
    applicationDeadline: "2025-12-22T23:59:59Z",
    category: "Marketing",
    experienceLevel: "Senior",
    skills: [
      "Digital Marketing",
      "SEO",
      "Content Marketing",
      "Analytics",
      "Social Media",
      "Leadership",
    ],
    applicantsCount: 22,
    isFeatured: false,
    companyLogo: "/company-logos/growth-marketing.png",
  },
  {
    id: "8",
    title: "Full Stack Developer",
    company: "Startup Ventures",
    companyId: "comp-8",
    location: "Denver, CO",
    remote: true,
    jobType: "Full-time",
    salaryRange: {
      min: 95000,
      max: 145000,
      currency: "USD",
    },
    description:
      "Join our fast-paced startup as a Full Stack Developer. You'll have the opportunity to work on diverse projects and make a real impact.",
    requirements: [
      "3+ years of full stack development experience",
      "Proficiency in React and Node.js",
      "Experience with SQL and NoSQL databases",
      "Understanding of RESTful APIs",
      "Startup experience preferred",
    ],
    responsibilities: [
      "Build features across the entire stack",
      "Design database schemas",
      "Implement authentication and authorization",
      "Write tests and documentation",
      "Participate in code reviews",
    ],
    benefits: [
      "Equity package",
      "Flexible work schedule",
      "Remote-friendly culture",
      "Learning budget",
      "Health insurance",
    ],
    postedDate: "2025-11-19T15:00:00Z",
    applicationDeadline: "2025-12-28T23:59:59Z",
    category: "Engineering",
    experienceLevel: "Mid",
    skills: [
      "React",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "TypeScript",
      "REST APIs",
    ],
    applicantsCount: 40,
    isFeatured: true,
    companyLogo: "/company-logos/startup-ventures.png",
  },
];

export const jobCategories = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Data Science",
  "Mobile Development",
  "DevOps",
  "Customer Success",
  "Human Resources",
];

export const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

export const experienceLevels = ["Entry", "Mid", "Senior", "Lead"];
