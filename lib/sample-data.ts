export interface Employee {
  id: string
  name: string
  position: string
  department: string
  status: "Active" | "On Leave" | "Inactive"
  joinDate: string
}

export interface LeaveRequest {
  id: string
  employee: string
  type: string
  startDate: string
  endDate: string
  status: "Pending" | "Approved" | "Rejected"
  days: number
}

export const sampleEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    position: "HR Manager",
    department: "Human Resources",
    status: "Active",
    joinDate: "2022-01-15",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    position: "Software Engineer",
    department: "IT",
    status: "On Leave",
    joinDate: "2021-06-20",
  },
  {
    id: "EMP003",
    name: "Mike Johnson",
    position: "Accountant",
    department: "Finance",
    status: "Active",
    joinDate: "2023-03-10",
  },
  {
    id: "EMP004",
    name: "Sarah Wilson",
    position: "Marketing Specialist",
    department: "Marketing",
    status: "Active",
    joinDate: "2022-11-05",
  },
  {
    id: "EMP005",
    name: "David Brown",
    position: "Sales Representative",
    department: "Sales",
    status: "Active",
    joinDate: "2023-01-20",
  },
]

export const sampleLeaveRequests: LeaveRequest[] = [
  {
    id: "LV001",
    employee: "Jane Smith",
    type: "Annual Leave",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    status: "Pending",
    days: 5,
  },
  {
    id: "LV002",
    employee: "Mike Johnson",
    type: "Sick Leave",
    startDate: "2024-01-28",
    endDate: "2024-01-30",
    status: "Approved",
    days: 3,
  },
  {
    id: "LV003",
    employee: "Sarah Wilson",
    type: "Maternity Leave",
    startDate: "2024-03-01",
    endDate: "2024-06-01",
    status: "Pending",
    days: 90,
  },
  {
    id: "LV004",
    employee: "David Brown",
    type: "Annual Leave",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    status: "Approved",
    days: 6,
  },
]
