"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, GraduationCap, Calendar, DollarSign, Users } from "lucide-react"
import { ScheduleTrainingDialog } from "./schedule-training-dialog"

export function TrainingManagement() {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Training Management</h2>
          <p className="text-muted-foreground">Manage employee training programs and skill development</p>
        </div>
        <Button onClick={() => setShowScheduleDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Training
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45K</div>
            <p className="text-xs text-muted-foreground">Remaining this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Management Features</CardTitle>
          <CardDescription>Comprehensive employee training and development system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Training Requisition</h4>
              <p className="text-sm text-muted-foreground">
                Allow employees to request training based on their development needs and career goals.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Budget Management</h4>
              <p className="text-sm text-muted-foreground">
                Track training budgets by department and ensure cost-effective skill development.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Training Schedule</h4>
              <p className="text-sm text-muted-foreground">
                Manage training calendars, sessions, and coordinate with external training providers.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Skills Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Monitor skill acquisition and knowledge sharing across the organization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScheduleTrainingDialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog} />
    </div>
  )
}
