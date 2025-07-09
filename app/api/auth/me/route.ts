import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/api"
import jwt from "jsonwebtoken"

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify Authentication
 *     description: Verify the validity of an access token and return the authenticated user's information
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid, user information returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User's unique identifier
 *                   example: clxxx1234567890
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   description: User's full name
 *                   example: John Doe
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Account creation timestamp
 *                   example: 2024-01-15T10:30:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last profile update timestamp
 *                   example: 2024-01-20T14:45:00.000Z
 *       401:
 *         description: Unauthorized - No token provided, invalid token, or token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   enum:
 *                     - No token provided
 *                     - Invalid token
 *                   example: No token provided
 *       404:
 *         description: User not found - Token is valid but user doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT access token obtained from login endpoint (expires in 15 minutes)
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }
}