export type Job = {
    id: string
    title: string
    department: string
    location: JobLocation
    type: JobType
    status: JobStatus
    level: JobLevel
    applicants: number
    posted: string
    salaryMin: number
    salaryMax: number
    currency: string
    description?: string
    requirements?: string[]
    benefits?: string[]
    responsibilities: string[]
    applicationDeadline: string
    contactEmail: string
  }

  export type JobStatus = 'Active' | 'Closed' | 'Draft'
  export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  export type JobLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive'
  export type JobLocation = 'Remote' | 'Office' | 'Hybrid'