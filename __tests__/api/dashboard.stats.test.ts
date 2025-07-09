import { describe, it, expect, beforeEach, beforeAll, afterAll, jest } from '@jest/globals'
import { getMockPrisma, resetMockPrisma } from '../utils/mockPrisma'

// mock prisma before importing it
jest.mock('@/lib/api', () => ({
  prisma: getMockPrisma()
}))

// import after mocking
import { prisma } from '@/lib/api'
import { GET } from '@/app/api/dashboard/stats/route'
import { expectJsonResponse, expectErrorResponse } from '../utils/test-helpers'
import {
  LeaveRequest,
  JobPosting,
  Employee,
  JobType
} from '@prisma/client'

// create the mock after importing
const prismaMock = prisma as jest.Mocked<typeof prisma>

type LeaveRequestWithEmployee = LeaveRequest & {
  employee: {
    id: string
    first_name: string
    last_name: string
    department: string
  }
}

describe('/api/dashboard/stats', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}) // silence errors
  })

  beforeEach(() => {
    resetMockPrisma()
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('GET', () => {
    it('returns stats and recent activities', async () => {
      prismaMock.employee.count
        .mockResolvedValueOnce(100) // activeEmployees
        .mockResolvedValueOnce(120) // allEmployees
        .mockResolvedValueOnce(100) // inactiveEmployees = 120 - 100
      prismaMock.jobPosting.count.mockResolvedValueOnce(10)
      prismaMock.leaveRequest.count
        .mockResolvedValueOnce(5)   // pending
        .mockResolvedValueOnce(50)  // all
        .mockResolvedValueOnce(40)  // approved
        .mockResolvedValueOnce(5)   // rejected
      prismaMock.trainingSession.count.mockResolvedValueOnce(3)

      const mockLeaveRequest: LeaveRequestWithEmployee = {
        id: '1',
        employee_id: 'EMP001',
        leave_type: 'Annual',
        start_date: new Date('2024-01-10'),
        end_date: new Date('2024-01-15'),
        days: 5,
        reason: 'Vacation',
        reliever: 'EMP002',
        status: 'Pending',
        created_at: new Date('2024-01-01T10:00:00Z'),
        updated_at: new Date('2024-01-01T10:00:00Z'),
        employee: {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          department: 'Engineering'
        }
      }

      prismaMock.leaveRequest.findMany.mockResolvedValueOnce([
        mockLeaveRequest as unknown as LeaveRequest
      ])

      const mockEmployee: Employee = {
        id: '2',
        employee_id: 'EMP002',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@company.com',
        phone: '+1234567891',
        position: 'Manager',
        department: 'Marketing',
        manager: 'manager-id',
        start_date: new Date('2024-01-02'),
        status: 'Active',
        basic_salary: 80000,
        created_at: new Date('2024-01-02T10:00:00Z'),
        updated_at: new Date('2024-01-02T10:00:00Z')
      }

      prismaMock.employee.findMany.mockResolvedValueOnce([mockEmployee])

      const mockJobPosting: JobPosting = {
        id: '3',
        title: 'Software Developer',
        department: 'Engineering',
        location: 'Remote',
        type: JobType.FullTime,
        status: 'Active',
        level: 'Mid',
        posted: new Date('2024-01-03T10:00:00Z'),
        salaryMin: 70000,
        salaryMax: 90000,
        currency: 'USD',
        description: 'Software Developer position',
        requirements: ['JavaScript', 'React'],
        benefits: ['Health insurance'],
        responsibilities: ['Develop software'],
        applicationDeadline: new Date('2024-02-03'),
        contactEmail: 'hr@company.com',
        created_at: new Date('2024-01-03T10:00:00Z'),
        updated_at: new Date('2024-01-03T10:00:00Z')
      }

      prismaMock.jobPosting.findMany.mockResolvedValueOnce([mockJobPosting])

      const response = await GET()
      const result = await expectJsonResponse(response, 200)

      expect(result).toEqual({
        success: true,
        data: {
          totalEmployees: 100,
          activeEmployees: 100,
          openPositions: 10,
          pendingApprovals: 5,
          trainingSessions: 3,
          recentActivities: expect.arrayContaining([
            expect.objectContaining({ type: 'leave' }),
            expect.objectContaining({ type: 'employee' }),
            expect.objectContaining({ type: 'job_posting' })
          ]),
          additionalStats: {
            allEmployees: 120,
            allLeaveRequests: 50,
            inactiveEmployees: 20,
            approvedLeaveRequests: 40,
            rejectedLeaveRequests: 5
          }
        },
        timestamp: expect.any(String)
      })
    })

    it('returns 500 on DB error', async () => {
      prismaMock.employee.count.mockRejectedValueOnce(new Error('DB error'))
      const response = await GET()
      await expectErrorResponse(response, 500, 'Failed to fetch dashboard statistics')
    })

    it('uses correct filters for each count/find', async () => {
      prismaMock.employee.count
        .mockResolvedValueOnce(100)
        .mockResolvedValueOnce(120)
        .mockResolvedValueOnce(100)
      prismaMock.jobPosting.count.mockResolvedValueOnce(10)
      prismaMock.leaveRequest.count
        .mockResolvedValueOnce(5)
        .mockResolvedValueOnce(50)
        .mockResolvedValueOnce(40)
        .mockResolvedValueOnce(5)
      prismaMock.trainingSession.count.mockResolvedValueOnce(3)

      prismaMock.leaveRequest.findMany.mockResolvedValueOnce([])
      prismaMock.employee.findMany.mockResolvedValueOnce([])
      prismaMock.jobPosting.findMany.mockResolvedValueOnce([])

      await GET()

      expect(prismaMock.employee.count).toHaveBeenCalledWith({ where: { status: 'Active' } })
      expect(prismaMock.jobPosting.count).toHaveBeenCalledWith({ where: { status: 'Active' } })
      expect(prismaMock.trainingSession.count).toHaveBeenCalledWith({ where: { status: 'Scheduled' } })
      expect(prismaMock.leaveRequest.count).toHaveBeenCalledWith({ where: { status: 'Pending' } })
      expect(prismaMock.leaveRequest.count).toHaveBeenCalledWith({ where: { status: 'Approved' } })
      expect(prismaMock.leaveRequest.count).toHaveBeenCalledWith({ where: { status: 'Rejected' } })

      expect(prismaMock.leaveRequest.findMany).toHaveBeenCalledWith({
        take: 3,
        orderBy: { created_at: 'desc' },
        include: {
          employee: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              department: true
            }
          }
        }
      })

      expect(prismaMock.employee.findMany).toHaveBeenCalledWith({
        take: 2,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          department: true,
          position: true,
          created_at: true
        }
      })

      expect(prismaMock.jobPosting.findMany).toHaveBeenCalledWith({
        take: 2,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          title: true,
          department: true,
          created_at: true
        }
      })
    })

    it('formats recent activities correctly', async () => {
      const mockLeaveRequest: LeaveRequestWithEmployee = {
        id: '1',
        employee_id: 'EMP001',
        leave_type: 'Annual',
        start_date: new Date(),
        end_date: new Date(),
        days: 5,
        reason: 'Vacation',
        reliever: 'EMP002',
        status: 'Pending',
        created_at: new Date('2024-01-01T10:00:00Z'),
        updated_at: new Date(),
        employee: {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          department: 'Engineering'
        }
      }

      prismaMock.employee.count
        .mockResolvedValueOnce(100)
        .mockResolvedValueOnce(120)
        .mockResolvedValueOnce(100)
      prismaMock.jobPosting.count.mockResolvedValueOnce(10)
      prismaMock.leaveRequest.count
        .mockResolvedValueOnce(5)
        .mockResolvedValueOnce(50)
        .mockResolvedValueOnce(40)
        .mockResolvedValueOnce(5)
      prismaMock.trainingSession.count.mockResolvedValueOnce(3)

      prismaMock.leaveRequest.findMany.mockResolvedValueOnce([
        mockLeaveRequest as unknown as LeaveRequest
      ])

      prismaMock.employee.findMany.mockResolvedValueOnce([
        {
          id: '2',
          employee_id: 'EMP002',
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@company.com',
          phone: '+1234567891',
          position: 'Manager',
          department: 'Marketing',
          manager: 'manager-id',
          start_date: new Date(),
          status: 'Active',
          basic_salary: 80000,
          created_at: new Date('2024-01-02T10:00:00Z'),
          updated_at: new Date()
        }
      ])

      prismaMock.jobPosting.findMany.mockResolvedValueOnce([
        {
          id: '3',
          title: 'Software Developer',
          department: 'Engineering',
          location: 'Remote',
          type: JobType.FullTime,
          status: 'Active',
          level: 'Mid',
          posted: new Date(),
          salaryMin: 70000,
          salaryMax: 90000,
          currency: 'USD',
          description: 'Software Developer position',
          requirements: ['JavaScript', 'React'],
          benefits: ['Health insurance'],
          responsibilities: ['Develop software'],
          applicationDeadline: new Date(),
          contactEmail: 'hr@company.com',
          created_at: new Date('2024-01-03T10:00:00Z'),
          updated_at: new Date()
        }
      ])

      const response = await GET()
      const result = await expectJsonResponse(response, 200)

      expect(result.data.recentActivities).toEqual([
        {
          id: '1',
          type: 'leave',
          message: 'Leave request pending - John Doe',
          timestamp: '2024-01-01T10:00:00.000Z',
          department: 'Engineering'
        },
        {
          id: '2',
          type: 'employee',
          message: 'New employee onboarded - Jane Smith joined Marketing as Manager',
          timestamp: '2024-01-02T10:00:00.000Z',
          department: 'Marketing'
        },
        {
          id: '3',
          type: 'job_posting',
          message: 'New job posting created - Software Developer in Engineering',
          timestamp: '2024-01-03T10:00:00.000Z',
          department: 'Engineering'
        }
      ])
    })
  })
})