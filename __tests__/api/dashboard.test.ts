import { describe, it, expect, beforeEach } from '@jest/globals'
import { GET } from '@/app/api/dashboard/route'
import { mockRecentActivities, expectJsonResponse, expectErrorResponse } from '../utils/test-helpers'

describe('/api/dashboard', () => {
  beforeEach(() => {
    // Reset mocks before each test
    global.mockPrisma.employee.count.mockReset()
    global.mockPrisma.jobPosting.count.mockReset()
    global.mockPrisma.leaveRequest.count.mockReset()
    global.mockPrisma.leaveRequest.findMany.mockReset()
  })

  // Suppress console.error to keep test output clean
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
  describe('GET', () => {
    it('should return dashboard stats and recent activities', async () => {
      // Mock Prisma responses
      global.mockPrisma.employee.count
        .mockResolvedValueOnce(100) // totalEmployees
        .mockResolvedValueOnce(95) // activeEmployees

      global.mockPrisma.jobPosting.count.mockResolvedValueOnce(10) // openPositions

      global.mockPrisma.leaveRequest.count.mockResolvedValueOnce(5) // pendingLeaveRequests

      global.mockPrisma.leaveRequest.findMany.mockResolvedValueOnce(mockRecentActivities)

      const response = await GET()

      const data = await expectJsonResponse(response, 200)

      expect(data).toEqual({
        stats: {
          totalEmployees: 100,
          activeEmployees: 95,
          openPositions: 10,
          pendingLeaveRequests: 5,
        },
        recentActivities: mockRecentActivities,
      })
    })

    it('should handle database errors gracefully', async () => {
      global.mockPrisma.employee.count.mockRejectedValueOnce(new Error('Database error'))

      const response = await GET()

      await expectErrorResponse(response, 500, 'Failed to fetch dashboard data')
    })

    it('should call Prisma methods with correct parameters', async () => {
      // Mock successful responses
      global.mockPrisma.employee.count
        .mockResolvedValueOnce(100)
        .mockResolvedValueOnce(95)
      global.mockPrisma.jobPosting.count.mockResolvedValueOnce(10)
      global.mockPrisma.leaveRequest.count.mockResolvedValueOnce(5)
      global.mockPrisma.leaveRequest.findMany.mockResolvedValueOnce([])

      await GET()

      // Verify Prisma calls
      expect(global.mockPrisma.employee.count).toHaveBeenCalledTimes(2)
      expect(global.mockPrisma.employee.count).toHaveBeenNthCalledWith(1) // totalEmployees
      expect(global.mockPrisma.employee.count).toHaveBeenNthCalledWith(2, {
        where: { status: 'Active' }
      }) // activeEmployees

      expect(global.mockPrisma.jobPosting.count).toHaveBeenCalledWith({
        where: { status: 'Active' }
      }) // openPositions

      expect(global.mockPrisma.leaveRequest.count).toHaveBeenCalledWith({
        where: { status: 'Pending' }
      }) // pendingLeaveRequests

      expect(global.mockPrisma.leaveRequest.findMany).toHaveBeenCalledWith({
        include: { employee: true },
        orderBy: { created_at: 'desc' },
        take: 5
      })
    })
  })
})