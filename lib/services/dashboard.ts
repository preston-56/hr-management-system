import { prisma } from "@/lib/api"

interface DashboardStats {
  totalEmployees: number
  openPositions: number
  pendingApprovals: number
  trainingSessions: number
  recentActivities: Array<{
    id: string
    type: string
    message: string
    timestamp: string
  }>
}

export const dashboardService = {
  async getDashboardStats(): Promise<{ success: boolean; data?: DashboardStats; error?: string }> {
    try {
      const totalEmployees = await prisma.employee.count({
        where: {
          status: "Active"
        }
      })

      const openPositions = await prisma.jobPosting.count({
        where: {
          status: "Active"
        }
      })

      const pendingApprovals = await prisma.leaveRequest.count({
        where: {
          status: "Pending"
        }
      })

      const trainingSessions = 0

      const recentLeaveRequests = await prisma.leaveRequest.findMany({
        take: 3,
        orderBy: {
          created_at: "desc"
        },
        include: {
          employee: true
        }
      })

      const recentEmployees = await prisma.employee.findMany({
        take: 2,
        orderBy: {
          created_at: "desc"
        }
      })

      const recentActivities = [
        ...recentLeaveRequests.map(leave => ({
          id: leave.id,
          type: "leave",
          message: `Leave request ${leave.status.toLowerCase()} - ${leave.employee.first_name} ${leave.employee.last_name}`,
          timestamp: leave.created_at.toISOString()
        })),
        ...recentEmployees.map(employee => ({
          id: employee.id,
          type: "employee",
          message: `New employee onboarded - ${employee.first_name} ${employee.last_name} joined ${employee.department}`,
          timestamp: employee.created_at.toISOString()
        }))
      ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)

      const stats: DashboardStats = {
        totalEmployees,
        openPositions,
        pendingApprovals,
        trainingSessions,
        recentActivities
      }

      return { success: true, data: stats }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      return { success: false, error: "Failed to fetch dashboard statistics" }
    }
  }
}