"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Briefcase, Target } from "lucide-react"

export function JobManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Job Management</h2>
        <p className="text-muted-foreground">Manage job positions, grades, and organizational structure</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Grades</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Grade levels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacant Positions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Need to be filled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Management Features</CardTitle>
          <CardDescription>Comprehensive job and organizational structure management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Job Positions</h4>
              <p className="text-sm text-muted-foreground">
                Define and manage job positions across the organization with detailed descriptions and requirements.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Job Grades</h4>
              <p className="text-sm text-muted-foreground">
                Establish job grading system for compensation and career progression planning.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Department Structure</h4>
              <p className="text-sm text-muted-foreground">
                Organize departments and divisions with clear reporting structures and hierarchies.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Job Requirements</h4>
              <p className="text-sm text-muted-foreground">
                Specify qualifications, skills, and experience requirements for each position.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
