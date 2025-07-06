import { NextRequest } from 'next/server'

/**
 * Build a mock NextRequest with optional method, headers, and JSON body
 */
interface RequestOptions {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

export const createMockRequest = (url: string, options: RequestOptions = {}): NextRequest => {
  const { method = 'GET', body, headers = {} } = options

  const requestInit: ConstructorParameters<typeof NextRequest>[1] = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    requestInit.body = JSON.stringify(body)
  }

  return new NextRequest(url, requestInit)
}

/**
 * Base job posting object for GET, POST, PUT, DELETE tests
 */
export const mockJobPosting = {
  id: '123',
  title: 'Senior Developer',
  description: 'Test job description',
  department: 'Engineering',
  location: 'Remote' as const,
  type: 'FullTime' as const,
  status: 'Active' as const,
  level: 'Senior' as const,
  posted: new Date('2024-01-01'),
  salaryMin: 70000,
  salaryMax: 90000,
  currency: 'USD',
  requirements: ['5+ years experience', 'TypeScript', 'React'],
  benefits: ['Health insurance', 'Remote work', '401k'],
  responsibilities: ['Lead development', 'Code reviews', 'Mentoring'],
  applicationDeadline: new Date('2024-12-31'),
  contactEmail: 'hr@company.com',
  created_at: new Date('2024-01-01'),
  updated_at: new Date('2024-01-01'),
}

// Variants with different `location` values
export const mockJobPostingOffice = {
  ...mockJobPosting,
  id: '124',
  location: 'Office' as const,
  title: 'Frontend Developer',
}

export const mockJobPostingHybrid = {
  ...mockJobPosting,
  id: '125',
  location: 'Hybrid' as const,
  title: 'Full Stack Developer',
}

/**
 * Valid PUT input without server-managed fields like `id` or timestamps
 */
export const mockJobPostingUpdateData = {
  title: 'Senior Developer',
  description: 'Test job description',
  department: 'Engineering',
  location: 'Remote' as const,
  type: 'FullTime' as const,
  status: 'Active' as const,
  level: 'Senior' as const,
  salaryMin: 70000,
  salaryMax: 90000,
  currency: 'USD',
  requirements: ['5+ years experience', 'TypeScript', 'React'],
  benefits: ['Health insurance', 'Remote work', '401k'],
  responsibilities: ['Lead development', 'Code reviews', 'Mentoring'],
  applicationDeadline: new Date('2024-12-31'),
  contactEmail: 'hr@company.com',
}

/**
 * Employee object for profile or HR dashboard assertions
 */
export const mockEmployee = {
  id: '123',
  employee_id: 'EMP001',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@company.com',
  phone: '+1234567890',
  position: 'Senior Developer',
  department: 'Engineering',
  manager: 'Jane Smith',
  start_date: new Date('2023-01-01'),
  status: 'Active' as const,
  basic_salary: 80000,
  created_at: new Date('2023-01-01'),
  updated_at: new Date('2023-01-01'),
}

/**
 * Auth-related user object
 */
export const mockUser = {
  id: '123',
  email: 'test@company.com',
  password: 'hashedpassword',
  name: 'Test User',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

/**
 * Application record for job submission logic
 */
export const mockApplication = {
  id: '123',
  jobId: '123',
  applicantId: '456',
  status: 'pending' as const,
  appliedAt: new Date('2024-01-01'),
}

/**
 * Dashboard metrics object
 */
export const mockDashboardStats = {
  totalJobs: 25,
  activeJobs: 20,
  totalApplications: 150,
  recentApplications: 12,
}

/**
 * Recent activity items for dashboard feed
 */
export const mockRecentActivities = [
  {
    id: '1',
    type: 'application' as const,
    description: 'New application for Senior Developer',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    type: 'job_posting' as const,
    description: 'New job posting created',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
]

/**
 * Assert JSON response status and content type, then return parsed JSON
 */
export const expectJsonResponse = async (response: Response, expectedStatus: number = 200) => {
  expect(response.status).toBe(expectedStatus)
  expect(response.headers.get('content-type')).toContain('application/json')
  return await response.json()
}

/**
 * Assert status and error message in standard API error response
 */
export const expectErrorResponse = async (
  response: Response,
  expectedStatus: number,
  expectedMessage: string
) => {
  expect(response.status).toBe(expectedStatus)
  const data = await response.json()
  expect(data.error).toBe(expectedMessage)
  return data
}

// Type aliases to simplify test usage
export type MockJobPosting = typeof mockJobPosting
export type MockEmployee = typeof mockEmployee
export type MockUser = typeof mockUser
export type MockApplication = typeof mockApplication

/**
 * Create a full job posting object with optional overrides
 */
export const createMockJobPosting = (
  overrides: Partial<typeof mockJobPosting> = {}
) => ({
  ...mockJobPosting,
  ...overrides,
})

/**
 * Create a valid update payload with optional overrides
 */
export const createMockUpdateData = (
  overrides: Partial<typeof mockJobPostingUpdateData> = {}
) => ({
  ...mockJobPostingUpdateData,
  ...overrides,
})
