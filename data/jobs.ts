import { Job } from "@/types";

// Sample job postings data
export const sampleJobPostings: Job[] = [
  {
    id: "JOB001",
    title: "Senior Software Engineer",
    department: "IT",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    applicants: 23,
    posted: "2024-01-15",
    level: "Senior",
    salaryMin: 80000,
    salaryMax: 120000,
    currency: "USD",
    description:
      "We are looking for a Senior Software Engineer to join our team...",
    requirements: ["5+ years experience", "React/Node.js", "TypeScript"],
    benefits: ["Health insurance", "401k", "Flexible hours"],
    responsibilities: [
      "Develop and maintain web applications",
      "Lead technical discussions",
      "Mentor junior developers",
      "Code review and quality assurance"
    ],
    applicationDeadline: "2024-03-15",
    contactEmail: "hr@company.com"
  },
  {
    id: "JOB002",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Office",
    type: "Full-time",
    status: "Active",
    applicants: 18,
    posted: "2024-01-20",
    level: "Mid",
    salaryMin: 60000,
    salaryMax: 85000,
    currency: "USD",
    description: "Lead our marketing initiatives and drive brand growth...",
    requirements: [
      "3+ years marketing experience",
      "Digital marketing",
      "Analytics"
    ],
    benefits: ["Health insurance", "PTO", "Professional development"],
    responsibilities: [
      "Develop marketing strategies",
      "Manage marketing campaigns",
      "Analyze market trends",
      "Coordinate with sales team"
    ],
    applicationDeadline: "2024-03-20",
    contactEmail: "marketing@company.com"
  },
  {
    id: "JOB003",
    title: "HR Coordinator",
    department: "Human Resources",
    location: "Hybrid",
    type: "Full-time",
    status: "Closed",
    applicants: 45,
    posted: "2024-01-10",
    level: "Entry",
    salaryMin: 45000,
    salaryMax: 60000,
    currency: "USD",
    description: "Support HR operations and employee relations...",
    requirements: [
      "HR degree or equivalent",
      "Communication skills",
      "HRIS experience"
    ],
    benefits: ["Health insurance", "Retirement plan", "Training opportunities"],
    responsibilities: [
      "Support recruitment process",
      "Maintain employee records",
      "Assist with onboarding",
      "Handle employee inquiries"
    ],
    applicationDeadline: "2024-02-28",
    contactEmail: "hr@company.com"
  }
];

// Job utility functions
export const getJobById = (id: string): Job | undefined => {
  return sampleJobPostings.find((job) => job.id === id);
};

export const getJobsByStatus = (status: string): Job[] => {
  return sampleJobPostings.filter((job) => job.status === status);
};

export const getJobsByDepartment = (department: string): Job[] => {
  return sampleJobPostings.filter((job) => job.department === department);
};

export const getTotalApplicants = (): number => {
  return sampleJobPostings.reduce((total, job) => total + job.applicants, 0);
};

// Helper function to get numeric salary values if needed
export const getSalaryAsNumber = (salary: string): number => {
  return parseInt(salary, 10) || 0;
};

// Job status variants for badge styling
export const jobStatusVariants = {
  Active: "default",
  Closed: "secondary",
  Draft: "outline"
} as const;

export type JobStatus = keyof typeof jobStatusVariants;
