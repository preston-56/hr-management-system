import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterAll
} from "@jest/globals";
import { GET, POST } from "@/app/api/job-postings/route";
import {
  createMockRequest,
  expectJsonResponse,
  expectErrorResponse
} from "@/__tests__/utils/test-helpers";

import type { MockPrismaClient } from "@/jest.setup";

declare global {
  // eslint-disable-next-line no-var
  var mockPrisma: MockPrismaClient;
}

// Suppress console.error during tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockJobPostings = [
  {
    id: "1",
    title: "Frontend Dev",
    location: "Remote",
    salaryMin: 60000,
    salaryMax: 90000,
    department: "Engineering",
    status: "Active",
    created_at: new Date("2024-05-01T00:00:00.000Z").toISOString(),
    applicationDeadline: new Date("2024-12-01T00:00:00.000Z").toISOString()
  },
  {
    id: "2",
    title: "Backend Dev",
    location: "Office",
    salaryMin: 70000,
    salaryMax: 95000,
    department: "Engineering",
    status: "Active",
    created_at: new Date("2024-04-01T00:00:00.000Z").toISOString(),
    applicationDeadline: new Date("2024-11-01T00:00:00.000Z").toISOString()
  }
];

describe("/api/job-postings", () => {
  beforeEach(() => {
    global.mockPrisma.jobPosting.findMany.mockReset();
    global.mockPrisma.jobPosting.create.mockReset();
  });

  describe("GET", () => {
    it("should return job postings ordered by created_at desc", async () => {
      global.mockPrisma.jobPosting.findMany.mockResolvedValueOnce(
        mockJobPostings
      );

      const request = createMockRequest(
        "http://localhost:3000/api/job-postings"
      );
      const response = await GET(request);

      const data = await expectJsonResponse(response, 200);
      expect(data).toEqual(mockJobPostings);
      expect(global.mockPrisma.jobPosting.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { created_at: "desc" }
      });
    });

    it("should filter by status and department if provided", async () => {
      const filtered = [mockJobPostings[0]];
      global.mockPrisma.jobPosting.findMany.mockResolvedValueOnce(filtered);

      const request = createMockRequest(
        "http://localhost:3000/api/job-postings?status=Active&department=Engineering"
      );
      const response = await GET(request);

      const data = await expectJsonResponse(response, 200);
      expect(data).toEqual(filtered);
      expect(global.mockPrisma.jobPosting.findMany).toHaveBeenCalledWith({
        where: { status: "Active", department: "Engineering" },
        orderBy: { created_at: "desc" }
      });
    });

    it("should handle database errors in GET", async () => {
      global.mockPrisma.jobPosting.findMany.mockRejectedValueOnce(
        new Error("Database error")
      );

      const request = createMockRequest(
        "http://localhost:3000/api/job-postings"
      );
      const response = await GET(request);

      await expectErrorResponse(response, 500, "Failed to fetch job postings");
    });
  });

  describe("POST", () => {
    const inputData = {
      title: "Product Manager",
      location: "Remote",
      salaryMin: 80000,
      salaryMax: 110000,
      department: "Product",
      benefits: ["Remote work"],
      applicationDeadline: "2024-12-15"
    };

    const createdJob = {
      id: "99",
      ...inputData,
      applicationDeadline: new Date("2024-12-15").toISOString(),
      status: "Draft"
    };

    it("should create a job posting successfully", async () => {
      global.mockPrisma.jobPosting.create.mockResolvedValueOnce(createdJob);

      const request = createMockRequest(
        "http://localhost:3000/api/job-postings",
        {
          method: "POST",
          body: inputData
        }
      );
      const response = await POST(request);

      const data = await expectJsonResponse(response, 201);
      expect(data).toEqual(createdJob);
      expect(global.mockPrisma.jobPosting.create).toHaveBeenCalledWith({
        data: {
          ...inputData,
          applicationDeadline: new Date("2024-12-15"),
          status: "Draft"
        }
      });
    });

    it("should handle database errors in POST", async () => {
      global.mockPrisma.jobPosting.create.mockRejectedValueOnce(
        new Error("Database error")
      );

      const request = createMockRequest(
        "http://localhost:3000/api/job-postings",
        {
          method: "POST",
          body: inputData
        }
      );
      const response = await POST(request);

      await expectErrorResponse(response, 500, "Failed to create job posting");
    });
  });
});
