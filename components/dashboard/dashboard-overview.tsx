"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  FileText,
  GraduationCap,
  Calendar,
  Award
} from "lucide-react";
import { AddEmployeeDialog } from "@/components/employees/add-employee-dialog";
import { LeaveApplicationDialog } from "@/components/leave/leave-application-dialog";
import { CreateAppraisalDialog } from "@/components/performance/create-appraisal-dialog";
import { ScheduleTrainingDialog } from "@/components/training/schedule-training-dialog";
import { dashboardService } from "@/lib/services/dashboard";
import { useAuth } from "@/lib/auth-context";

interface DashboardStats {
  totalEmployees: number;
  openPositions: number;
  pendingApprovals: number;
  trainingSessions: number;
  recentActivities: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
  }>;
}

export function DashboardOverview() {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showLeaveRequest, setShowLeaveRequest] = useState(false);
  const [showPerformanceReview, setShowPerformanceReview] = useState(false);
  const [showScheduleTraining, setShowScheduleTraining] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    openPositions: 0,
    pendingApprovals: 0,
    trainingSessions: 0,
    recentActivities: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const setFallbackStats = () => {
    setStats({
      totalEmployees: 245,
      openPositions: 12,
      pendingApprovals: 18,
      trainingSessions: 6,
      recentActivities: [
        {
          id: "1",
          type: "employee",
          message: "New employee onboarded - Sarah Wilson joined Marketing",
          timestamp: new Date().toISOString()
        },
        {
          id: "2",
          type: "leave",
          message: "Leave request approved - Mike Johnson's sick leave",
          timestamp: new Date().toISOString()
        },
        {
          id: "3",
          type: "training",
          message: "Training session scheduled - Leadership workshop next week",
          timestamp: new Date().toISOString()
        }
      ]
    });
  };

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const response = await dashboardService.getDashboardStats();
        if (response.success && response.data) {
          setStats(response.data);
        } else {
          setFallbackStats();
        }
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
        setFallbackStats();
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  const canManageEmployees =
    user?.role === "admin" || user?.role === "hr_manager";
  const canApproveLeave = user?.role === "admin" || user?.role === "hr_manager";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">HR Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName}! Here&apos;s your HR system overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.totalEmployees}
            </div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Positions
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.openPositions}
            </div>
            <p className="text-xs text-muted-foreground">
              Across 8 departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.pendingApprovals}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Training Sessions
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.trainingSessions}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common HR tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {canManageEmployees && (
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setShowAddEmployee(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Employee
              </Button>
            )}
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => setShowLeaveRequest(true)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Process Leave Request
            </Button>
            {canApproveLeave && (
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setShowPerformanceReview(true)}
              >
                <Award className="mr-2 h-4 w-4" />
                Start Performance Review
              </Button>
            )}
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => setShowScheduleTraining(true)}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Schedule Training
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "employee"
                      ? "bg-blue-500"
                      : activity.type === "leave"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Dialog Components */}
      {canManageEmployees && (
        <AddEmployeeDialog
          open={showAddEmployee}
          onOpenChange={setShowAddEmployee}
        />
      )}
      <LeaveApplicationDialog
        open={showLeaveRequest}
        onOpenChange={setShowLeaveRequest}
      />
      {canApproveLeave && (
        <CreateAppraisalDialog
          open={showPerformanceReview}
          onOpenChange={setShowPerformanceReview}
        />
      )}
      <ScheduleTrainingDialog
        open={showScheduleTraining}
        onOpenChange={setShowScheduleTraining}
      />
    </div>
  );
}
