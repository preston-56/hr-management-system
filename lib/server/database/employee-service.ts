import { prisma } from "@/lib/api"
import type { Employee, EmployeeStatus } from "@prisma/client"
import type {
  EmployeeWithRelations,
  EmployeeCreateData,
  EmployeeUpdateData
} from "@/types/employees"

export const employeeService = {
  /**
   * Get all employees
   */
  getAll: async (): Promise<Employee[]> => {
    return prisma.employee.findMany({
      orderBy: {
        created_at: "desc",
      },
    })
  },

  /**
   * Get all employees with relations
   */
  getAllWithRelations: async (): Promise<EmployeeWithRelations[]> => {
    return prisma.employee.findMany({
      orderBy: {
        created_at: "desc",
      },
    }) as Promise<EmployeeWithRelations[]>
  },

  /**
   * Get employee by ID
   */
  getById: async (id: string): Promise<Employee | null> => {
    return prisma.employee.findUnique({
      where: { id },
    })
  },

  /**
   * Get employee by ID with relations
   */
  getByIdWithRelations: async (id: string): Promise<EmployeeWithRelations | null> => {
    return prisma.employee.findUnique({
      where: { id },
    }) as Promise<EmployeeWithRelations | null>
  },

  /**
   * Get employee by email
   */
  getByEmail: async (email: string): Promise<Employee | null> => {
    return prisma.employee.findUnique({
      where: { email },
    })
  },

  /**
   * Get employee by employee ID
   */
  getByEmployeeId: async (employeeId: string): Promise<Employee | null> => {
    return prisma.employee.findUnique({
      where: { employee_id: employeeId },
    })
  },

  /**
   * Get employees by department
   */
  getByDepartment: async (department: string): Promise<Employee[]> => {
    return prisma.employee.findMany({
      where: {
        department: {
          contains: department,
          mode: 'insensitive',
        }
      },
      orderBy: {
        first_name: 'asc',
      },
    })
  },

  /**
   * Get employees by status
   */
  getByStatus: async (status: EmployeeStatus): Promise<Employee[]> => {
    return prisma.employee.findMany({
      where: { status },
      orderBy: {
        first_name: 'asc',
      },
    })
  },

  /**
   * Get employees by manager
   */
  getByManager: async (managerId: string): Promise<Employee[]> => {
    return prisma.employee.findMany({
      where: {
        manager: managerId
      },
      orderBy: {
        first_name: 'asc',
      },
    })
  },

  /**
   * Get active employees only
   */
  getActive: async (): Promise<Employee[]> => {
    return prisma.employee.findMany({
      where: { status: 'Active' },
      orderBy: {
        first_name: 'asc',
      },
    })
  },

  /**
   * Search employees
   */
  search: async (searchTerm: string): Promise<Employee[]> => {
    return prisma.employee.findMany({
      where: {
        OR: [
          {
            first_name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            last_name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            employee_id: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        first_name: 'asc',
      },
    })
  },

  /**
   * Get recently hired employees
   */
  getRecentlyHired: async (days: number = 30): Promise<Employee[]> => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    return prisma.employee.findMany({
      where: {
        start_date: {
          gte: cutoffDate,
        },
      },
      orderBy: {
        start_date: 'desc',
      },
    })
  },

  /**
   * Create a new employee
   */
  create: async (data: EmployeeCreateData): Promise<Employee> => {
    return prisma.employee.create({
      data,
    })
  },

  /**
   * Update an existing employee
   */
  update: async (
    id: string,
    data: EmployeeUpdateData
  ): Promise<Employee> => {
    return prisma.employee.update({
      where: { id },
      data,
    })
  },

  /**
   * Update employee status
   */
  updateStatus: async (id: string, status: EmployeeStatus): Promise<Employee> => {
    return prisma.employee.update({
      where: { id },
      data: { status },
    })
  },

  /**
   * Delete an employee
   */
  delete: async (id: string): Promise<Employee> => {
    return prisma.employee.delete({
      where: { id },
    })
  },

  /**
   * Get employee statistics
   */
  getStats: async () => {
    const [total, active, inactive] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { status: 'Active' } }),
      prisma.employee.count({ where: { status: 'Inactive' } }),
    ])

    return {
      total,
      active,
      inactive,
    }
  },

  /**
   * Get organization hierarchy
   */
  getHierarchy: async (): Promise<EmployeeWithRelations[]> => {
    return prisma.employee.findMany({
      where: {
        status: 'Active',
      },
      orderBy: {
        first_name: 'asc',
      },
    }) as Promise<EmployeeWithRelations[]>
  },
}