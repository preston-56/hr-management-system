"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CreateJobDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateJobDialog({ open, onOpenChange }: CreateJobDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    level: "",
    salaryMin: "",
    salaryMax: "",
    currency: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    applicationDeadline: "",
    contactEmail: "",
    isInternal: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Job posting:", formData)
    onOpenChange(false)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Job Posting</DialogTitle>
          <DialogDescription>Create a new job posting for recruitment. Fill in all required details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential job posting details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateFormData("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => updateFormData("department", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Work Location *</Label>
                      <Select value={formData.location} onValueChange={(value) => updateFormData("location", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Employment Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="intern">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Experience Level</Label>
                      <Select value={formData.level} onValueChange={(value) => updateFormData("level", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salaryMin">Minimum Salary</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        value={formData.salaryMin}
                        onChange={(e) => updateFormData("salaryMin", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryMax">Maximum Salary</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        value={formData.salaryMax}
                        onChange={(e) => updateFormData("salaryMax", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                          <SelectItem value="kes">KES</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                  <CardDescription>Detailed job description and responsibilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      rows={5}
                      placeholder="Provide a comprehensive job description..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">Key Responsibilities *</Label>
                    <Textarea
                      id="responsibilities"
                      value={formData.responsibilities}
                      onChange={(e) => updateFormData("responsibilities", e.target.value)}
                      rows={5}
                      placeholder="List the main responsibilities and duties..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits & Perks</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) => updateFormData("benefits", e.target.value)}
                      rows={4}
                      placeholder="Describe the benefits and perks offered..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Qualifications</CardTitle>
                  <CardDescription>Specify the required qualifications and skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements & Qualifications *</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => updateFormData("requirements", e.target.value)}
                      rows={6}
                      placeholder="List education, experience, skills, and other requirements..."
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>Configure application deadline and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicationDeadline">Application Deadline</Label>
                      <Input
                        id="applicationDeadline"
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) => updateFormData("applicationDeadline", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => updateFormData("contactEmail", e.target.value)}
                        placeholder="hr@company.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Job Posting</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
