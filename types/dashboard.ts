export interface DashboardStats {
    totalEmployees: number
    activeEmployees: number
    openPositions: number
    pendingApprovals: number
    trainingSessions: number
    recentActivities: Array<{
      id: string
      type: 'leave' | 'employee' | 'job_posting' | 'training'
      message: string
      timestamp: string
      department?: string
    }>
    additionalStats?: {
        allEmployees: number
        allLeaveRequests: number
        inactiveEmployees: number
        approvedLeaveRequests: number
        rejectedLeaveRequests: number
      }
  }

  export interface DashboardResponse {
    success: boolean
    data?: DashboardStats
    error?: string
    timestamp?: string
  }

  