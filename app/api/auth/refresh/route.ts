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
    let decoded: { userId: string }
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string }
    } catch {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      )
    }

    // Check if refresh token exists in database
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    })

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      // Clean up expired token if it exists
      if (tokenRecord) {
        await prisma.refreshToken.delete({
          where: { id: tokenRecord.id },
        })
      }
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 }
      )
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    )

    // Implement token rotation for better security
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    )

    // Update the refresh token in database
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        accessToken,
        refreshToken: newRefreshToken, // Return new refresh token
        user: {
          id: tokenRecord.user.id,
          email: tokenRecord.user.email,
          name: tokenRecord.user.name,
          createdAt: tokenRecord.user.createdAt,
          updatedAt: tokenRecord.user.updatedAt,
        },
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