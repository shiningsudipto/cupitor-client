export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  founded: number;
  location: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  rating: number;
  reviewCount: number;
  activeJobs: number;
  benefits: string[];
  culture: string[];
  images: string[];
}

export const dummyCompanies: Company[] = [
  {
    id: "comp-1",
    name: "TechCorp Solutions",
    logo: "/company-logos/techcorp.png",
    description:
      "TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprise clients. We're passionate about building products that make a difference.",
    industry: "Technology",
    size: "500-1000 employees",
    founded: 2015,
    location: "San Francisco, CA",
    website: "https://techcorp.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/techcorp",
      twitter: "https://twitter.com/techcorp",
    },
    rating: 4.5,
    reviewCount: 127,
    activeJobs: 15,
    benefits: [
      "Health Insurance",
      "401(k) Matching",
      "Flexible PTO",
      "Remote Work",
      "Stock Options",
      "Learning Budget",
    ],
    culture: [
      "Innovation-driven",
      "Collaborative environment",
      "Work-life balance",
      "Diversity and inclusion",
    ],
    images: [
      "/company-images/techcorp-office-1.jpg",
      "/company-images/techcorp-office-2.jpg",
      "/company-images/techcorp-team.jpg",
    ],
  },
  {
    id: "comp-2",
    name: "Design Studio Inc",
    logo: "/company-logos/design-studio.png",
    description:
      "Design Studio Inc is a creative agency that combines strategic thinking with beautiful design. We work with brands to create memorable digital experiences.",
    industry: "Design & Creative",
    size: "50-100 employees",
    founded: 2018,
    location: "New York, NY",
    website: "https://designstudio.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/design-studio",
      twitter: "https://twitter.com/designstudio",
      facebook: "https://facebook.com/designstudio",
    },
    rating: 4.7,
    reviewCount: 89,
    activeJobs: 8,
    benefits: [
      "Unlimited PTO",
      "Health & Dental",
      "Remote-First",
      "Design Tools",
      "Conference Budget",
      "Flexible Hours",
    ],
    culture: [
      "Creative freedom",
      "Client-focused",
      "Continuous learning",
      "Supportive team",
    ],
    images: [
      "/company-images/design-studio-workspace.jpg",
      "/company-images/design-studio-meeting.jpg",
    ],
  },
  {
    id: "comp-3",
    name: "CloudTech Systems",
    logo: "/company-logos/cloudtech.png",
    description:
      "CloudTech Systems builds cutting-edge cloud infrastructure solutions. Our platform powers thousands of applications worldwide with reliability and scalability.",
    industry: "Cloud Computing",
    size: "200-500 employees",
    founded: 2016,
    location: "Austin, TX",
    website: "https://cloudtech.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/cloudtech",
      twitter: "https://twitter.com/cloudtech",
    },
    rating: 4.3,
    reviewCount: 156,
    activeJobs: 22,
    benefits: [
      "Stock Options",
      "Health Benefits",
      "On-Site Gym",
      "Cafeteria",
      "Learning Budget",
      "Team Events",
    ],
    culture: [
      "Fast-paced",
      "Technical excellence",
      "Team collaboration",
      "Growth mindset",
    ],
    images: [
      "/company-images/cloudtech-datacenter.jpg",
      "/company-images/cloudtech-team.jpg",
    ],
  },
  {
    id: "comp-4",
    name: "AI Innovations Lab",
    logo: "/company-logos/ai-innovations.png",
    description:
      "AI Innovations Lab is at the forefront of artificial intelligence research and development. We're building the next generation of intelligent systems.",
    industry: "Artificial Intelligence",
    size: "100-200 employees",
    founded: 2019,
    location: "Boston, MA",
    website: "https://ai-innovations.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/ai-innovations",
      twitter: "https://twitter.com/aiinnovations",
    },
    rating: 4.8,
    reviewCount: 72,
    activeJobs: 12,
    benefits: [
      "Research Publications",
      "Conference Speaking",
      "Flexible Work",
      "Top Compensation",
      "Computing Resources",
      "PhD Support",
    ],
    culture: [
      "Research-driven",
      "Innovation-first",
      "Academic freedom",
      "Collaborative research",
    ],
    images: [
      "/company-images/ai-lab-research.jpg",
      "/company-images/ai-lab-office.jpg",
    ],
  },
  {
    id: "comp-5",
    name: "Infrastructure Pro",
    logo: "/company-logos/infrastructure-pro.png",
    description:
      "Infrastructure Pro provides enterprise-grade DevOps and infrastructure solutions. We help companies scale their operations with modern cloud technologies.",
    industry: "DevOps & Infrastructure",
    size: "50-100 employees",
    founded: 2017,
    location: "Seattle, WA",
    website: "https://infrastructure-pro.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/infrastructure-pro",
    },
    rating: 4.4,
    reviewCount: 64,
    activeJobs: 7,
    benefits: [
      "Certifications",
      "Remote Work",
      "Home Office Stipend",
      "Health Insurance",
      "Learning Budget",
      "Stock Options",
    ],
    culture: [
      "Automation-focused",
      "Best practices",
      "Continuous improvement",
      "Knowledge sharing",
    ],
    images: [
      "/company-images/infrastructure-office.jpg",
      "/company-images/infrastructure-team.jpg",
    ],
  },
  {
    id: "comp-6",
    name: "AppCraft Studios",
    logo: "/company-logos/appcraft.png",
    description:
      "AppCraft Studios creates award-winning mobile applications for iOS and Android. Our apps have been downloaded by millions of users worldwide.",
    industry: "Mobile Development",
    size: "100-200 employees",
    founded: 2014,
    location: "Los Angeles, CA",
    website: "https://appcraft.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/appcraft",
      twitter: "https://twitter.com/appcraft",
      facebook: "https://facebook.com/appcraft",
    },
    rating: 4.6,
    reviewCount: 98,
    activeJobs: 10,
    benefits: [
      "Apple Devices",
      "Flexible Hours",
      "Health Benefits",
      "Team Events",
      "App Store Credits",
      "Creative Time",
    ],
    culture: [
      "User-centric",
      "Quality-focused",
      "Creative environment",
      "Team collaboration",
    ],
    images: [
      "/company-images/appcraft-studio.jpg",
      "/company-images/appcraft-team.jpg",
    ],
  },
  {
    id: "comp-7",
    name: "Growth Marketing Co",
    logo: "/company-logos/growth-marketing.png",
    description:
      "Growth Marketing Co is a data-driven marketing agency helping companies achieve exponential growth through innovative digital strategies.",
    industry: "Marketing",
    size: "50-100 employees",
    founded: 2016,
    location: "Chicago, IL",
    website: "https://growth-marketing.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/growth-marketing",
      twitter: "https://twitter.com/growthmarketing",
    },
    rating: 4.5,
    reviewCount: 81,
    activeJobs: 6,
    benefits: [
      "Performance Bonuses",
      "Remote Options",
      "Conference Attendance",
      "Professional Development",
      "Health Insurance",
      "Marketing Tools",
    ],
    culture: [
      "Results-oriented",
      "Data-driven",
      "Creative thinking",
      "Client success",
    ],
    images: [
      "/company-images/growth-marketing-office.jpg",
      "/company-images/growth-marketing-team.jpg",
    ],
  },
  {
    id: "comp-8",
    name: "Startup Ventures",
    logo: "/company-logos/startup-ventures.png",
    description:
      "Startup Ventures is a fast-growing tech startup disrupting the traditional industry with innovative solutions. Join us on our exciting journey!",
    industry: "Technology Startup",
    size: "10-50 employees",
    founded: 2021,
    location: "Denver, CO",
    website: "https://startup-ventures.example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/startup-ventures",
      twitter: "https://twitter.com/startupventures",
    },
    rating: 4.2,
    reviewCount: 34,
    activeJobs: 5,
    benefits: [
      "Equity Package",
      "Flexible Schedule",
      "Remote-Friendly",
      "Learning Budget",
      "Health Insurance",
      "Startup Culture",
    ],
    culture: [
      "Move fast",
      "High impact",
      "Ownership mindset",
      "Learning culture",
    ],
    images: [
      "/company-images/startup-office.jpg",
      "/company-images/startup-team.jpg",
    ],
  },
];

export const companyIndustries = [
  "Technology",
  "Design & Creative",
  "Cloud Computing",
  "Artificial Intelligence",
  "DevOps & Infrastructure",
  "Mobile Development",
  "Marketing",
  "Finance",
  "Healthcare",
  "E-commerce",
];

export const companySizes = [
  "1-10 employees",
  "10-50 employees",
  "50-100 employees",
  "100-200 employees",
  "200-500 employees",
  "500-1000 employees",
  "1000+ employees",
];
