import { prisma } from "@/lib/api"
import type { Prisma, JobPosting } from "@prisma/client"
import type {
  JobPostingCreateData,
  JobPostingUpdateData,
  JobStatus,
  JobType,
  JobLocation
} from "@/types/jobs"

const convertJobTypeToPrisma = (type: JobType) => {
  switch (type) {
    case 'Full-time':
      return 'FullTime' as const
    case 'Part-time':
      return 'PartTime' as const
    case 'Contract':
      return 'Contract' as const
    case 'Internship':
      return 'Internship' as const
    default:
      return 'FullTime' as const
  }
}

export const jobService = {
  /**
   * Get all job postings
   */
  getAll: async (): Promise<JobPosting[]> => {
    return prisma.jobPosting.findMany({
      orderBy: {
        created_at: "desc", // Use created_at instead of posted
      },
    })
  },

  /**
   * Get job posting by ID
   */
  getById: async (id: string): Promise<JobPosting | null> => {
    return prisma.jobPosting.findUnique({
      where: { id },
    })
  },

  /**
   * Get active job postings only
   */
  getActive: async (): Promise<JobPosting[]> => {
    return prisma.jobPosting.findMany({
      where: {
        status: 'Active',
      },
      orderBy: {
        created_at: "desc",
      },
    })
  },

  /**
   * Get job postings by status
   */
  getByStatus: async (status: JobStatus): Promise<JobPosting[]> => {
    return prisma.jobPosting.findMany({
      where: { status },
      orderBy: {
        created_at: "desc",
      },
    })
  },

  /**
   * Get job postings by type
   */
  getByType: async (type: JobType): Promise<JobPosting[]> => {
    const prismaType = convertJobTypeToPrisma(type)

    return prisma.jobPosting.findMany({
      where: { type: prismaType },
      orderBy: {
        created_at: "desc",
      },
    })
  },



  /**
   * Get job postings by department
   */
  getByDepartment: async (department: string): Promise<JobPosting[]> => {
    return prisma.jobPosting.findMany({
      where: {
        department: {
          contains: department,
          mode: 'insensitive',
        }
      },
      orderBy: {
        created_at: "desc",
      },
    })
  },

  /**
   * Get job postings by location
   */
  getByLocation: async (location: JobLocation): Promise<JobPosting[]> => {
    return prisma.jobPosting.findMany({
      where: { location },
      orderBy: {
        created_at: "desc",
      },
    })
  },

  /**
   * Search job postings by title or description
   */
  search: async (searchTerm: string): Promise<JobPosting[]> => {
    return prisma.jobPosting.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        created_at: "desc",
      },
    })
  },





  /**
   * Create a new job posting
   */
  create: async (data: JobPostingCreateData): Promise<JobPosting> => {
    const createData: Prisma.JobPostingCreateInput = {
      title: data.title,
      department: data.department,
      location: data.location,
      type: convertJobTypeToPrisma(data.type),
      status: data.status,
      description: data.description || '',
      requirements: data.requirements?.join('\n') || '',
    }

    return prisma.jobPosting.create({
      data: createData,
    })
  },

  /**
   * Update an existing job posting
   */
  update: async (
    id: string,
    data: JobPostingUpdateData
  ): Promise<JobPosting> => {
    const updateData: Prisma.JobPostingUpdateInput = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.department !== undefined) updateData.department = data.department
    if (data.location !== undefined) updateData.location = data.location
    if (data.type !== undefined) {
      updateData.type = convertJobTypeToPrisma(data.type)
    }
    if (data.status !== undefined) updateData.status = data.status
    if (data.description !== undefined) updateData.description = data.description
    if (data.requirements !== undefined) {
      updateData.requirements = Array.isArray(data.requirements)
        ? data.requirements.join('\n')
        : data.requirements
    }

    return prisma.jobPosting.update({
      where: { id },
      data: updateData,
    })
  },

  /**
   * Update job posting status
   */
  updateStatus: async (id: string, status: JobStatus): Promise<JobPosting> => {
    return prisma.jobPosting.update({
      where: { id },
      data: { status },
    })
  },

  /**
   * Publish a job posting
   */
  publish: async (id: string): Promise<JobPosting> => {
    return prisma.jobPosting.update({
      where: { id },
      data: {
        status: 'Active',
      },
    })
  },

  /**
   * Close a job posting
   */
  close: async (id: string): Promise<JobPosting> => {
    return prisma.jobPosting.update({
      where: { id },
      data: {
        status: 'Closed',
      },
    })
  },

  /**
   * Delete a job posting
   */
  delete: async (id: string): Promise<JobPosting> => {
    return prisma.jobPosting.delete({
      where: { id },
    })
  },

  /**
   * Get job posting statistics
   */
  getStats: async () => {
    const [total, active, draft, closed] = await Promise.all([
      prisma.jobPosting.count(),
      prisma.jobPosting.count({ where: { status: 'Active' } }),
      prisma.jobPosting.count({ where: { status: 'Draft' } }),
      prisma.jobPosting.count({ where: { status: 'Closed' } }),
    ])

    return {
      total,
      active,
      draft,
      closed,
    }
  },

  /**
   * Get job postings with application count
   */
  getWithApplicationCount: async () => {
    const jobPostings = await prisma.jobPosting.findMany({
      orderBy: {
        created_at: "desc",
      },
    })

    return jobPostings.map(job => ({
      ...job,
      applicants: 0,
      posted: job.created_at.toISOString(),
      applicationDeadline: job.created_at.toISOString(),
    }))
  },

  /**
   * Bulk update job status
   */
  bulkUpdateStatus: async (ids: string[], status: JobStatus): Promise<Prisma.BatchPayload> => {
    return prisma.jobPosting.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status,
      },
    })
  },

  /**
   * Advanced search with filters
   */
  advancedSearch: async (filters: {
    searchTerm?: string
    status?: JobStatus
    type?: JobType
    location?: JobLocation
    department?: string
  }): Promise<JobPosting[]> => {
    const where: Prisma.JobPostingWhereInput = {}

    if (filters.searchTerm) {
      where.OR = [
        {
          title: {
            contains: filters.searchTerm,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: filters.searchTerm,
            mode: 'insensitive',
          },
        },
      ]
    }

    if (filters.status) {
      where.status = filters.status
    }

    if (filters.type) {
      where.type = convertJobTypeToPrisma(filters.type)
    }

    if (filters.location) {
      where.location = filters.location
    }

    if (filters.department) {
      where.department = {
        contains: filters.department,
        mode: 'insensitive',
      }
    }

    return prisma.jobPosting.findMany({
      where,
      orderBy: {
        created_at: "desc",
      },
    })
  },
}