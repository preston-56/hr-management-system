import { ProtectedRoute } from "@/components/auth/protected-route"
import { HRDashboard } from "@/components/dashboard/hr-dashboard"

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRoles={["admin", "hr_manager", "hr_staff"]}>
      <HRDashboard />
    </ProtectedRoute>
  )
}
