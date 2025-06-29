"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  MoreHorizontal,
  Eye,
  MessageSquare,
  Calendar,
  Download,
  Search,
  Filter
} from "lucide-react";
import { Job } from "@/types";

interface ViewApplicantsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  status:
    | "Under Review"
    | "Interview Scheduled"
    | "Shortlisted"
    | "Offer Extended"
    | "Rejected"
    | "Hired";
  appliedDate: string;
  score: number;
  location: string;
}

const sampleApplicants: Applicant[] = [
  {
    id: "APP001",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1-555-0123",
    experience: "5 years",
    status: "Under Review",
    appliedDate: "2024-01-20",
    score: 85,
    location: "New York, NY"
  },
  {
    id: "APP002",
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1-555-0124",
    experience: "3 years",
    status: "Interview Scheduled",
    appliedDate: "2024-01-18",
    score: 78,
    location: "San Francisco, CA"
  },
  {
    id: "APP003",
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1-555-0125",
    experience: "7 years",
    status: "Shortlisted",
    appliedDate: "2024-01-15",
    score: 92,
    location: "Austin, TX"
  },
  {
    id: "APP004",
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1-555-0126",
    experience: "4 years",
    status: "Rejected",
    appliedDate: "2024-01-12",
    score: 65,
    location: "Seattle, WA"
  },
  {
    id: "APP005",
    name: "Eva Brown",
    email: "eva.brown@email.com",
    phone: "+1-555-0127",
    experience: "6 years",
    status: "Offer Extended",
    appliedDate: "2024-01-10",
    score: 95,
    location: "Boston, MA"
  }
];

export function ViewApplicantsDialog({
  open,
  onOpenChange,
  job
}: ViewApplicantsDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  if (!job) return null;

  const getStatusBadge = (status: Applicant["status"]) => {
    const variants = {
      "Under Review": "outline",
      "Interview Scheduled": "secondary",
      Shortlisted: "default",
      "Offer Extended": "default",
      Rejected: "destructive",
      Hired: "default"
    } as const;

    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const filteredApplicants = sampleApplicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getScoreColor = (score: number): string => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Applicants for {job.title}</DialogTitle>
          <DialogDescription>
            Job ID: {job.id} • Total Applicants: {job.applicants} • Department:{" "}
            {job.department}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Interview Scheduled">
                        Interview Scheduled
                      </SelectItem>
                      <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="Offer Extended">
                        Offer Extended
                      </SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applicants Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {filteredApplicants.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total Applicants
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {
                    filteredApplicants.filter(
                      (a) => a.status === "Interview Scheduled"
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Interviews Scheduled
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {
                    filteredApplicants.filter((a) => a.status === "Shortlisted")
                      .length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Shortlisted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {
                    filteredApplicants.filter(
                      (a) => a.status === "Offer Extended"
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Offers Extended</p>
              </CardContent>
            </Card>
          </div>

          {/* Applicants Table */}
          <Card>
            <CardHeader>
              <CardTitle>Applicant Details</CardTitle>
              <CardDescription>
                Manage and review job applicants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{applicant.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {applicant.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{applicant.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {applicant.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{applicant.experience}</TableCell>
                      <TableCell>{applicant.location}</TableCell>
                      <TableCell>{applicant.appliedDate}</TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${getScoreColor(
                            applicant.score
                          )}`}
                        >
                          {applicant.score}%
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(applicant.status)}</TableCell>
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Interview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
