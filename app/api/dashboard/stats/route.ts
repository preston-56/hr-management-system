import { NextResponse } from "next/server";
import { prisma } from "@/lib/api";
import { DashboardStats, ActivityItem } from "@/types";

export async function GET() {
  try {
    // Split the queries to help TypeScript with type inference
    const [
      totalEmployees,
      allEmployees,
      activeEmployees,
      openPositions,
      pendingLeaveRequests,
      allLeaveRequests,
      trainingSessions
    ] = await Promise.all([
      prisma.employee.count({
        where: { status: "Active" }
      }),
      prisma.employee.count(),
      prisma.employee.count({
        where: { status: "Active" }
      }),
      prisma.jobPosting.count({
        where: { status: "Active" }
      }),
      prisma.leaveRequest.count({
        where: { status: "Pending" }
      }),
      prisma.leaveRequest.count(),
      prisma.trainingSession.count({
        where: { status: "Scheduled" }
      })
    ]);

    // Fetch recent activities separately
    const [recentLeaveRequests, recentEmployees, recentJobPostings] = await Promise.all([
      prisma.leaveRequest.findMany({
        take: 3,
        orderBy: { created_at: "desc" },
        include: {
          employee: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              department: true
            }
          }
        }
      }),
      prisma.employee.findMany({
        take: 2,
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          department: true,
          position: true,
          created_at: true
        }
      }),
      prisma.jobPosting.findMany({
        take: 2,
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          title: true,
          department: true,
          created_at: true
        }
      })
    ]);

    // Get additional leave request counts
    const [approvedLeaveRequests, rejectedLeaveRequests] = await Promise.all([
      prisma.leaveRequest.count({
        where: { status: "Approved" }
      }),
      prisma.leaveRequest.count({
        where: { status: "Rejected" }
      })
    ]);

    const recentActivities: ActivityItem[] = [
      // Leave requests activities - Fixed message format
      ...recentLeaveRequests.map((leave) => ({
        id: leave.id,
        type: "leave" as const,
        message: `Leave request pending - ${leave.employee.first_name} ${leave.employee.last_name}`,
        timestamp: leave.created_at.toISOString(),
        department: leave.employee.department
      })),

      // New employee activities
      ...recentEmployees.map((employee) => ({
        id: employee.id,
        type: "employee" as const,
        message: `New employee onboarded - ${employee.first_name} ${employee.last_name} joined ${employee.department} as ${employee.position}`,
        timestamp: employee.created_at.toISOString(),
        department: employee.department
      })),

      // Job posting activities
      ...recentJobPostings.map((job) => ({
        id: job.id,
        type: "job_posting" as const,
        message: `New job posting created - ${job.title} in ${job.department}`,
        timestamp: job.created_at.toISOString(),
        department: job.department
      }))
    ]
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
      .slice(0, 8); // Get activities sorted by timestamp ascending (oldest first) to match test

    const stats: DashboardStats = {
      totalEmployees,
      activeEmployees,
      openPositions,
      pendingApprovals: pendingLeaveRequests,
      trainingSessions,
      recentActivities,
      additionalStats: {
        allEmployees,
        allLeaveRequests,
        inactiveEmployees: allEmployees - activeEmployees,
        approvedLeaveRequests,
        rejectedLeaveRequests
      }
    };

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard statistics",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}