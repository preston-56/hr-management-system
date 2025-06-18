"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { HRSidebar } from "@/components/layout/hr-sidebar"
import { HRHeader } from "@/components/layout/hr-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { EmployeeManagement } from "@/components/employees/employee-management"
import { LeaveManagement } from "@/components/leave/leave-management"
import { RecruitmentManagement } from "@/components/recruitment/recruitment-management"
import { PerformanceManagement } from "@/components/performance/performance-management"
import { JobManagement } from "@/components/jobs/job-management"
import { TrainingManagement } from "@/components/training/training-management"
import { DisciplinaryManagement } from "@/components/disciplinary/disciplinary-management"
import { DemoBanner } from "@/components/ui/demo-banner"

export function HRDashboard() {
  const [activeModule, setActiveModule] = useState("dashboard")

  const renderModuleContent = () => {
    switch (activeModule) {
      case "employees":
        return <EmployeeManagement />
      case "leave":
      case "leave-requests":
        return <LeaveManagement />
      case "recruitment":
        return <RecruitmentManagement />
      case "performance":
        return <PerformanceManagement />
      case "jobs":
        return <JobManagement />
      case "training":
        return <TrainingManagement />
      case "disciplinary":
        return <DisciplinaryManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <HRSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <SidebarInset>
        <HRHeader />
        <div className="flex flex-1 flex-col gap-4 p-6">
          <DemoBanner />
          {renderModuleContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
