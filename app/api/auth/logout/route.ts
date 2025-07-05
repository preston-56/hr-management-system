import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/api"

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 }
      )
    }

    // Delete the refresh token from database
    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    })

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}