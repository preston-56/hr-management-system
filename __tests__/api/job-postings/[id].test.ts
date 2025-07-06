import { describe, it, expect, beforeEach } from '@jest/globals'
import { GET, PUT, DELETE } from '@/app/api/job-postings/[id]/route'

import type { MockPrismaClient } from '@/jest.setup'
import { createMockRequest, expectErrorResponse, expectJsonResponse } from '@/__tests__/utils/test-helpers'

declare global {
  // eslint-disable-next-line no-var
  var mockPrisma: MockPrismaClient
}

// Silence console.error during tests
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

const mockJobPosting = {
  id: '123',
  title: 'Software Engineer',
  description: 'Great role',
  location: 'Remote',
  salaryMin: 60000,
  salaryMax: 90000,
  benefits: ['Health insurance', 'Remote work', '401k'],
  applicationDeadline: new Date('2024-12-31T00:00:00.000Z').toISOString(),
}

describe('/api/job-postings/[id]', () => {
  const mockParams = { params: { id: '123' } }

  beforeEach(() => {
    global.mockPrisma.jobPosting.findUnique.mockReset()
    global.mockPrisma.jobPosting.update.mockReset()
    global.mockPrisma.jobPosting.delete.mockReset()
  })

  describe('GET', () => {
    it('should return job posting when found', async () => {
      global.mockPrisma.jobPosting.findUnique.mockResolvedValueOnce(mockJobPosting)

      const request = createMockRequest('http://localhost:3000/api/job-postings/123')
      const response = await GET(request, mockParams)

      const data = await expectJsonResponse(response, 200)
      expect(data).toEqual(mockJobPosting)
      expect(global.mockPrisma.jobPosting.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
        include: { applications: true },
      })
    })

    it('should return 404 when job posting not found', async () => {
      global.mockPrisma.jobPosting.findUnique.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/job-postings/123')
      const response = await GET(request, mockParams)

      await expectErrorResponse(response, 404, 'Job posting not found')
    })

    it('should handle database errors in GET', async () => {
      global.mockPrisma.jobPosting.findUnique.mockRejectedValueOnce(new Error('Database error'))

      const request = createMockRequest('http://localhost:3000/api/job-postings/123')
      const response = await GET(request, mockParams)

      await expectErrorResponse(response, 500, 'Internal server error')
    })
  })

  describe('PUT', () => {
    const updateData = {
      title: 'Updated Senior Developer',
      description: 'Updated description',
      location: 'Office' as const,
      salaryMin: 80000,
      salaryMax: 100000,
      applicationDeadline: '2024-12-31',
    }

    it('should update job posting successfully', async () => {
      const updatedJobPosting = {
        ...mockJobPosting,
        ...updateData,
        applicationDeadline: new Date('2024-12-31').toISOString(),
      }

      global.mockPrisma.jobPosting.update.mockResolvedValueOnce(updatedJobPosting)

      const request = createMockRequest('http://localhost:3000/api/job-postings/123', {
        method: 'PUT',
        body: updateData,
      })
      const response = await PUT(request, mockParams)

      const data = await expectJsonResponse(response, 200)
      expect(data).toEqual(updatedJobPosting)
      expect(global.mockPrisma.jobPosting.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: {
          ...updateData,
          applicationDeadline: new Date('2024-12-31'),
        }
      })
    })

    it('should handle date conversion for applicationDeadline', async () => {
      const dateUpdateData = {
        title: 'Test Job',
        applicationDeadline: '2024-06-15T10:30:00Z',
      }

      const expectedResult = {
        ...mockJobPosting,
        title: 'Test Job',
        applicationDeadline: new Date('2024-06-15T10:30:00Z').toISOString(), // ✅
      }

      global.mockPrisma.jobPosting.update.mockResolvedValueOnce(expectedResult)

      const request = createMockRequest('http://localhost:3000/api/job-postings/123', {
        method: 'PUT',
        body: dateUpdateData,
      })
      const response = await PUT(request, mockParams)
      await expectJsonResponse(response, 200)

      expect(global.mockPrisma.jobPosting.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: {
          title: 'Test Job',
          applicationDeadline: new Date('2024-06-15T10:30:00Z'),
        }
      })
    })

    it('should handle location enum values', async () => {
      const locationUpdateData = {
        title: 'Remote Job',
        location: 'Remote' as const,
      }

      const expectedResult = {
        ...mockJobPosting,
        ...locationUpdateData,
      }

      global.mockPrisma.jobPosting.update.mockResolvedValueOnce(expectedResult)

      const request = createMockRequest('http://localhost:3000/api/job-postings/123', {
        method: 'PUT',
        body: locationUpdateData,
      })
      await PUT(request, mockParams)

      expect(global.mockPrisma.jobPosting.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: locationUpdateData
      })
    })

    it('should handle hybrid location', async () => {
      const hybridUpdateData = {
        title: 'Hybrid Job',
        location: 'Hybrid' as const,
      }

      const expectedResult = {
        ...mockJobPosting,
        ...hybridUpdateData,
      }

      global.mockPrisma.jobPosting.update.mockResolvedValueOnce(expectedResult)

      const request = createMockRequest('http://localhost:3000/api/job-postings/123', {
        method: 'PUT',
        body: hybridUpdateData,
      })
      await PUT(request, mockParams)

      expect(global.mockPrisma.jobPosting.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: hybridUpdateData
      })
    })

    it('should handle database errors in PUT', async () => {
      global.mockPrisma.jobPosting.update.mockRejectedValueOnce(new Error('Database error'))

      const request = createMockRequest('http://localhost:3000/api/job-postings/123', {
        method: 'PUT',
        body: updateData,
      })
      const response = await PUT(request, mockParams)

      await expectErrorResponse(response, 500, 'Internal server error')
    })
  })

  describe('DELETE', () => {
    it('should delete job posting successfully', async () => {
      global.mockPrisma.jobPosting.delete.mockResolvedValueOnce(mockJobPosting)

      const request = createMockRequest('http://localhost:3000/api/job-postings/123', {
        method: 'DELETE',
      })
      const response = await DELETE(request, mockParams)

      const data = await expectJsonResponse(response, 200)
      expect(data).toEqual({ message: 'Job posting deleted successfully' })
      expect(global.mockPrisma.jobPosting.delete).toHaveBeenCalledWith({
        where: { id: '123' }
      })
    })

    it('should handle database errors in DELETE', async () => {
      global.mockPrisma.jobPosting.delete.mockRejectedValueOnce(new Error('Database error'))

      const request = createMockRequest('http://localhost:3000/api/job-postings/123', {
        method: 'DELETE',
      })
      const response = await DELETE(request, mockParams)

      await expectErrorResponse(response, 500, 'Internal server error')
    })
  })
})
