"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, FileText } from "lucide-react"

const samplePerformanceData = [
  {
    id: "APR001",
    employee: "John Doe",
    period: "2024 Q1",
    type: "Quarterly Review",
    status: "Completed",
    score: 4.5,
    reviewer: "Jane Smith",
  },
  {
    id: "APR002",
    employee: "Sarah Wilson",
    period: "2024 Q1",
    type: "Mid-year Review",
    status: "In Progress",
    score: null,
    reviewer: "Mike Johnson",
  },
  {
    id: "APR003",
    employee: "Mike Johnson",
    period: "2024 Q1",
    type: "Annual Review",
    status: "Pending",
    score: null,
    reviewer: "John Doe",
  },
]

export function PerformanceTable() {
  const getStatusBadge = (status: string) => {
    const variants = {
      Completed: "default",
      "In Progress": "secondary",
      Pending: "outline",
      Overdue: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Reviews</CardTitle>
        <CardDescription>Track employee performance appraisals and reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Review ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {samplePerformanceData.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.id}</TableCell>
                <TableCell>{review.employee}</TableCell>
                <TableCell>{review.period}</TableCell>
                <TableCell>{review.type}</TableCell>
                <TableCell>{getStatusBadge(review.status)}</TableCell>
                <TableCell>
                  {review.score ? (
                    <span className="font-medium">{review.score}/5.0</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{review.reviewer}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Review
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
