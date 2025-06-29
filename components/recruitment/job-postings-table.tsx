"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Users, Trash2 } from "lucide-react";
import { ViewJobDialog } from "./view-job-dialog";
import { EditJobDialog } from "./edit-job-dialog";
import { ViewApplicantsDialog } from "./view-applicants-dialog";
import { DeleteJobDialog } from "./delete-job-dialog";
import { Job } from "@/types";
import { sampleJobPostings, jobStatusVariants } from "@/data/jobs";

export function JobPostingsTable() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showApplicantsDialog, setShowApplicantsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowViewDialog(true);
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setShowEditDialog(true);
  };

  const handleViewApplicants = (job: Job) => {
    setSelectedJob(job);
    setShowApplicantsDialog(true);
  };

  const handleDelete = (job: Job) => {
    setSelectedJob(job);
    setShowDeleteDialog(true);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge
        variant={
          jobStatusVariants[status as keyof typeof jobStatusVariants] ||
          "default"
        }
      >
        {status}
      </Badge>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Job Postings</CardTitle>
          <CardDescription>
            Manage current job openings and recruitment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleJobPostings.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {job.applicants}
                    </div>
                  </TableCell>
                  <TableCell>{job.posted}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(job)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewApplicants(job)}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          View Applicants
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(job)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(job)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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

      {selectedJob && (
        <>
          <ViewJobDialog
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
            job={selectedJob}
          />
          <EditJobDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            job={selectedJob}
          />
          <ViewApplicantsDialog
            open={showApplicantsDialog}
            onOpenChange={setShowApplicantsDialog}
            job={selectedJob}
          />
          <DeleteJobDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            job={selectedJob}
          />
        </>
      )}
    </>
  );
}
