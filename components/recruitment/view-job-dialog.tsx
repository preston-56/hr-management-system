"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building2, Clock, Users, Calendar } from "lucide-react";
import { Job } from "@/types";

interface ViewJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
}

export function ViewJobDialog({ open, onOpenChange, job }: ViewJobDialogProps) {
  if (!job) return null;

  const getStatusBadge = (status: Job["status"]) => {
    const variants = {
      Active: "default",
      Closed: "secondary",
      Draft: "outline"
    } as const;

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{job.title}</span>
            {getStatusBadge(job.status)}
          </DialogTitle>
          <DialogDescription>Job ID: {job.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">
                      {job.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {job.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-sm text-muted-foreground">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Applicants</p>
                    <p className="text-sm text-muted-foreground">
                      {job.applicants}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We are seeking a highly skilled {job.title} to join our{" "}
                {job.department} team. This is an excellent opportunity for a
                motivated professional to contribute to our growing organization
                and advance their career in a dynamic environment.
              </p>
            </CardContent>
          </Card>

          {/* Key Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Lead and manage complex projects from conception to completion
                </li>
                <li>
                  Collaborate with cross-functional teams to achieve business
                  objectives
                </li>
                <li>
                  Develop and implement strategic initiatives to drive growth
                </li>
                <li>
                  Mentor junior team members and provide technical guidance
                </li>
                <li>
                  Ensure quality standards and best practices are maintained
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements &amp; Qualifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Required Qualifications:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>
                      Bachelor&apos;s degree in relevant field or equivalent
                      experience
                    </li>
                    <li>Minimum 3-5 years of experience in similar role</li>
                    <li>Strong analytical and problem-solving skills</li>
                    <li>Excellent communication and interpersonal skills</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    Preferred Qualifications:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Master&apos;s degree in relevant field</li>
                    <li>Industry certifications</li>
                    <li>Experience with modern tools and technologies</li>
                    <li>Leadership experience</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits &amp; Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Competitive salary and performance-based bonuses</li>
                <li>Comprehensive health insurance coverage</li>
                <li>Flexible working arrangements</li>
                <li>Professional development opportunities</li>
                <li>Generous vacation and leave policies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Application Info */}
          <Card>
            <CardHeader>
              <CardTitle>Application Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Posted Date</p>
                    <p className="text-sm text-muted-foreground">
                      {job.posted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Application Deadline</p>
                    <p className="text-sm text-muted-foreground">
                      Open until filled
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
