import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

const prismaMock = mockDeep<PrismaClient>()

export const getMockPrisma = (): DeepMockProxy<PrismaClient> => {
  return global.mockPrisma as DeepMockProxy<PrismaClient>
}

// Reset all mocks
export const resetMockPrisma = (): void => {
  mockReset(prismaMock)
  global.mockPrisma = prismaMock
}

// Initial mock setup for global use
if (!global.mockPrisma) {
  global.mockPrisma = prismaMock
}