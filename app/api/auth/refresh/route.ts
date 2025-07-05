import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/api"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 }
      )
    }

    // Verify refresh token signature and expiration
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)

    // Check if refresh token exists in database
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    })

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 }
      )
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: tokenRecord.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    )

    return NextResponse.json({
      accessToken,
      user: {
        id: tokenRecord.user.id,
        email: tokenRecord.user.email,
        name: tokenRecord.user.name,
        createdAt: tokenRecord.user.createdAt,
        updatedAt: tokenRecord.user.updatedAt,
      },
    })
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    )
  }
}
