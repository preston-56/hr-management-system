"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface Job {
  title: string;
  applicants: number;
}

interface DeleteJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
}

export function DeleteJobDialog({
  open,
  onOpenChange,
  job
}: DeleteJobDialogProps) {
  const handleDelete = () => {
    console.log("Deleting job:", job);
    // TODO: Call backend delete API here once integration is set up
    onOpenChange(false);
  };

  if (!job) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the job posting for{" "}
            <strong>{job.title}</strong>? This action cannot be undone.
            {job.applicants > 0 && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <strong>Warning:</strong> This job has {job.applicants}{" "}
                applicant(s). Deleting this posting will also remove all
                associated applications.
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Job Posting
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
