import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/api"

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User Logout
 *     description: Logout user by invalidating their refresh token from the database
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to invalidate
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHh4eDEyMzQ1Njc4OTAiLCJpYXQiOjE2MjM0NTY3ODksImV4cCI6MTYyNDA2MTU4OX0.example_signature
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       400:
 *         description: Bad request - Invalid request format or missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Refresh token required
 *       404:
 *         description: Refresh token not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid refresh token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *     security: []
 */
export async function POST(request: NextRequest) {
  try {
    // Check if request has a body
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      )
    }

    // Parse JSON with error handling
    let parsedBody
    try {
      parsedBody = JSON.parse(body)
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      )
    }

    const { refreshToken } = parsedBody

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 }
      )
    }

    // Validate refresh token format (basic check)
    if (typeof refreshToken !== 'string' || refreshToken.length < 10) {
      return NextResponse.json(
        { error: "Invalid refresh token format" },
        { status: 400 }
      )
    }

    // Delete the refresh token from database
    try {
      await prisma.refreshToken.delete({
        where: { token: refreshToken },
      })
    } catch (error) {
      // Check if error is due to token not found (Prisma error)
      if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json(
          { error: "Invalid refresh token" },
          { status: 404 }
        )
      }
      // Re-throw other database errors
      throw error
    }

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}