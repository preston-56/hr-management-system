import { NextResponse } from 'next/server'
import { prisma } from '@/lib/api'

export async function GET() {
  try {
    const [
      totalEmployees,
      activeEmployees,
      openPositions,
      pendingLeaveRequests,
      recentActivities
    ] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({
        where: { status: 'Active' }
      }),
      prisma.jobPosting.count({
        where: { status: 'Active' }
      }),
      prisma.leaveRequest.count({
        where: { status: 'Pending' }
      }),
      prisma.leaveRequest.findMany({
        include: { employee: true },
        orderBy: { created_at: 'desc' },
        take: 5
      })
    ])

    return NextResponse.json({
      stats: {
        totalEmployees,
        activeEmployees,
        openPositions,
        pendingLeaveRequests
      },
      recentActivities
    })
  } catch (err) {
    console.error('Error fetching dashboard data:', err)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}