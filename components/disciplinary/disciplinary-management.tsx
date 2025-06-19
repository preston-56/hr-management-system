"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, FileText, Clock, CheckCircle } from "lucide-react"

export function DisciplinaryManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Disciplinary Management</h2>
        <p className="text-muted-foreground">Manage employee disciplinary cases and actions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Under investigation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting decision</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentation</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Total records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Disciplinary Management Features</CardTitle>
          <CardDescription>Comprehensive disciplinary case management system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Incident Recording</h4>
              <p className="text-sm text-muted-foreground">
                Document disciplinary incidents with detailed information, witnesses, and evidence.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Investigation Process</h4>
              <p className="text-sm text-muted-foreground">
                Manage investigation workflows with proper documentation and due process.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Action Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Track disciplinary actions taken and monitor compliance with organizational policies.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Automated notifications to relevant parties throughout the disciplinary process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
