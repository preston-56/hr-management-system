import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/api'
import { EmployeeStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') as EmployeeStatus | null
    const department = searchParams.get('department')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where = {
      ...(status && { status }),
      ...(department && { department })
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.employee.count({ where })
    ])

    return NextResponse.json({
      employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (err) {
    console.error('Error fetching employees:', err)
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      employee_id,
      first_name,
      last_name,
      email,
      phone,
      position,
      department,
      manager,
      start_date,
      basic_salary
    } = body

    if (!employee_id || !first_name || !last_name || !email) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.create({
      data: {
        employee_id,
        first_name,
        last_name,
        email,
        phone,
        position,
        department,
        manager,
        start_date: new Date(start_date),
        basic_salary: parseFloat(basic_salary),
        status: 'Active'
      }
    })

    return NextResponse.json(employee, { status: 201 })
  } catch (err) {
    console.error('Error creating employee:', err)
    if (err instanceof Error && 'code' in err && err.code === 'P2002') {
      return NextResponse.json(
        { error: 'Employee ID or email already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    )
  }
}