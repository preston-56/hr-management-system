// API Response wrapper
export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
  }

  // User & Authentication Types
  export type UserRole = "admin" | "hr_manager" | "hr_staff" | "employee"

  export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: UserRole
    department?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }

  export interface LoginResponse {
    user: User
    accessToken: string
    refreshToken: string
  }

  export interface RefreshTokenRequest {
    refreshToken: string
  }

  export interface ChangePasswordRequest {
    currentPassword: string
    newPassword: string
  }

  // Employee Types
  export type EmployeeStatus = "Active" | "On Leave" | "Inactive"

  export interface Employee {
    id: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    phone: string
    position: string
    department: string
    manager?: string
    startDate: string
    status: EmployeeStatus
    basicSalary?: number
    createdAt: string
    updatedAt: string
  }

  // Leave Request Types
  export type LeaveRequestStatus = "Pending" | "Approved" | "Rejected"

  export interface LeaveRequest {
    id: string
    employeeId: string
    employee?: Employee
    leaveType: string
    startDate: string
    endDate: string
    days: number
    reason: string
    status: LeaveRequestStatus
    reliever?: string
    createdAt: string
    updatedAt: string
  }

  // Job Posting Types
  export type JobPostingStatus = "Active" | "Closed" | "Draft"

  export interface JobPosting {
    id: string
    title: string
    department: string
    location: string
    type: string
    description: string
    requirements: string
    status: JobPostingStatus
    applicantCount: number
    createdAt: string
    updatedAt: string
  }

  // Performance Review Types
  export type PerformanceReviewStatus = "Draft" | "In Progress" | "Completed"

  export interface PerformanceReview {
    id: string
    employeeId: string
    employee?: Employee
    reviewerId: string
    reviewer?: Employee
    reviewPeriod: string
    reviewType: string
    overallRating?: number
    status: PerformanceReviewStatus
    createdAt: string
    updatedAt: string
  }

  // Dashboard Types
  export interface DashboardActivity {
    id: string
    type: string
    message: string
    timestamp: string
  }

  export interface DashboardStats {
    totalEmployees: number
    openPositions: number
    pendingApprovals: number
    trainingSessions: number
    recentActivities: DashboardActivity[]
  }

  // Demo User Type
  export interface DemoUser {
    email: string
    password: string
    user: User
  }
