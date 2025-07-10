import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8', // Use V8 for faster coverage

  testEnvironment: 'node',
  preset: 'ts-jest',

  // Support path aliases like @/ or ~/
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },

  // Transform TypeScript files using ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Load global setup for mocks and test config
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Include coverage from app code, ignore tests and type files
  collectCoverageFrom: [
    '{app,components,lib,hooks,types}/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/__tests__/**',
    '!**/*.test.{ts,tsx}',
    '!**/*.spec.{ts,tsx}',
  ],

  // Ignore test files in build output
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Resolve modules from node_modules and root
  moduleDirectories: ['node_modules', '<rootDir>'],

  // Recognize these file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Minimum coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  verbose: true,
}

export default config
