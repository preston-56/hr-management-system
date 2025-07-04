import type { Employee, Prisma } from "@prisma/client"

export type EmployeeWithManager = Employee & {
  manager?: Employee | null
}

export type EmployeeWithDirectReports = Employee & {
  directReports?: Employee[]
}

export type EmployeeWithRelations = Employee & {
  manager?: Employee | null
  directReports?: Employee[]
}

export type EmployeeCreateData = Prisma.EmployeeCreateInput
export type EmployeeUpdateData = Prisma.EmployeeUpdateInput