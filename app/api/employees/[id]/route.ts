import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/api'

interface RouteParams {
  params: { id: string }
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      include: {
        leaveRequests: {
          orderBy: { created_at: 'desc' },
          take: 10
        },
        performanceReviews: {
          orderBy: { created_at: 'desc' },
          take: 5
        }
      }
    })

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(employee)
  } catch (err) {
    console.error('Error fetching employee:', err)
    return NextResponse.json(
      { error: 'Failed to fetch employee' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const body = await request.json()
    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: body
    })

    return NextResponse.json(employee)
  } catch (err) {
    console.error('Error updating employee:', err)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    await prisma.employee.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Employee deleted' })
  } catch (err) {
    console.error('Error deleting employee:', err)
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    )
  }
}