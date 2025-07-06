// Type definitions for Prisma mock methods
type MockedPrismaMethod = jest.MockedFunction<(...args: unknown[]) => Promise<unknown>>

// Type definitions for Prisma mock based on schema
interface MockPrismaClient {
  user: {
    findUnique: MockedPrismaMethod
    findMany: MockedPrismaMethod
    create: MockedPrismaMethod
    update: MockedPrismaMethod
    delete: MockedPrismaMethod
    count: MockedPrismaMethod
  }
  refreshToken: {
    findUnique: MockedPrismaMethod
    findMany: MockedPrismaMethod
    create: MockedPrismaMethod
    update: MockedPrismaMethod
    delete: MockedPrismaMethod
    count: MockedPrismaMethod
  }
  employee: {
    findUnique: MockedPrismaMethod
    findMany: MockedPrismaMethod
    create: MockedPrismaMethod
    update: MockedPrismaMethod
    delete: MockedPrismaMethod
    count: MockedPrismaMethod
  }
  leaveRequest: {
    findUnique: MockedPrismaMethod
    findMany: MockedPrismaMethod
    create: MockedPrismaMethod
    update: MockedPrismaMethod
    delete: MockedPrismaMethod
    count: MockedPrismaMethod
  }
  jobPosting: {
    findUnique: MockedPrismaMethod
    findMany: MockedPrismaMethod
    create: MockedPrismaMethod
    update: MockedPrismaMethod
    delete: MockedPrismaMethod
    count: MockedPrismaMethod
    aggregate: MockedPrismaMethod
  }
  application: {
    findUnique: MockedPrismaMethod
    findMany: MockedPrismaMethod
    create: MockedPrismaMethod
    update: MockedPrismaMethod
    delete: MockedPrismaMethod
    count: MockedPrismaMethod
  }
  performanceReview: {
    findUnique: MockedPrismaMethod
    findMany: MockedPrismaMethod
    create: MockedPrismaMethod
    update: MockedPrismaMethod
    delete: MockedPrismaMethod
    count: MockedPrismaMethod
  }
  $connect: MockedPrismaMethod
  $disconnect: MockedPrismaMethod
  $transaction: MockedPrismaMethod
}

const mockPrisma: MockPrismaClient = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  refreshToken: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  employee: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  leaveRequest: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  jobPosting: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
  },
  application: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  performanceReview: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $transaction: jest.fn(),
}

// Mock the Prisma module using jest.mock()
jest.mock('@/lib/api', () => ({
  prisma: mockPrisma,
}))

// Make mockPrisma available globally
;(global as typeof global & { mockPrisma: MockPrismaClient }).mockPrisma = mockPrisma

// Export both mockPrisma instance and the MockPrismaClient type
export { mockPrisma }
export type { MockPrismaClient }

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})