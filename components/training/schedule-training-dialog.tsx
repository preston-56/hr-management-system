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
import { Checkbox } from "@/components/ui/checkbox"

interface ScheduleTrainingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleTrainingDialog({ open, onOpenChange }: ScheduleTrainingDialogProps) {
  const [formData, setFormData] = useState({
    trainingTitle: "",
    trainingType: "",
    provider: "",
    trainer: "",
    department: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxParticipants: "",
    cost: "",
    currency: "USD",
    description: "",
    objectives: "",
    prerequisites: "",
    materials: "",
    isInternal: false,
    isMandatory: false,
    certificateProvided: false,
    selectedEmployees: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Training session:", formData)
    onOpenChange(false)
  }

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const sampleEmployees = [
    { id: "EMP001", name: "John Doe", department: "HR" },
    { id: "EMP002", name: "Jane Smith", department: "IT" },
    { id: "EMP003", name: "Mike Johnson", department: "Finance" },
    { id: "EMP004", name: "Sarah Wilson", department: "Marketing" },
    { id: "EMP005", name: "David Brown", department: "Sales" },
  ]

  const handleEmployeeSelection = (employeeId: string, checked: boolean) => {
    if (checked) {
      updateFormData("selectedEmployees", [...formData.selectedEmployees, employeeId])
    } else {
      updateFormData(
        "selectedEmployees",
        formData.selectedEmployees.filter((id) => id !== employeeId),
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Training Session</DialogTitle>
          <DialogDescription>
            Create a new training session and assign participants. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Information</CardTitle>
                  <CardDescription>Basic details about the training session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trainingTitle">Training Title *</Label>
                    <Input
                      id="trainingTitle"
                      value={formData.trainingTitle}
                      onChange={(e) => updateFormData("trainingTitle", e.target.value)}
                      placeholder="e.g., Leadership Development Workshop"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trainingType">Training Type *</Label>
                      <Select
                        value={formData.trainingType}
                        onValueChange={(value) => updateFormData("trainingType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select training type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="online">Online Course</SelectItem>
                          <SelectItem value="certification">Certification Program</SelectItem>
                          <SelectItem value="orientation">Orientation</SelectItem>
                          <SelectItem value="skills">Skills Training</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Target Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => updateFormData("department", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Training Provider</Label>
                      <Input
                        id="provider"
                        value={formData.provider}
                        onChange={(e) => updateFormData("provider", e.target.value)}
                        placeholder="External provider or Internal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trainer">Trainer/Facilitator *</Label>
                      <Input
                        id="trainer"
                        value={formData.trainer}
                        onChange={(e) => updateFormData("trainer", e.target.value)}
                        placeholder="Name of trainer or facilitator"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cost">Training Cost</Label>
                      <Input
                        id="cost"
                        type="number"
                        value={formData.cost}
                        onChange={(e) => updateFormData("cost", e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="KES">KES</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        value={formData.maxParticipants}
                        onChange={(e) => updateFormData("maxParticipants", e.target.value)}
                        placeholder="e.g., 20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isInternal"
                        checked={formData.isInternal}
                        onCheckedChange={(checked) => updateFormData("isInternal", checked as boolean)}
                      />
                      <Label htmlFor="isInternal">Internal Training</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isMandatory"
                        checked={formData.isMandatory}
                        onCheckedChange={(checked) => updateFormData("isMandatory", checked as boolean)}
                      />
                      <Label htmlFor="isMandatory">Mandatory Training</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="certificateProvided"
                        checked={formData.certificateProvided}
                        onCheckedChange={(checked) => updateFormData("certificateProvided", checked as boolean)}
                      />
                      <Label htmlFor="certificateProvided">Certificate Provided</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Details</CardTitle>
                  <CardDescription>Set the training schedule and location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                      placeholder="e.g., Conference Room A, Online, External Venue"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData("startDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateFormData("endDate", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => updateFormData("startTime", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => updateFormData("endTime", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Content</CardTitle>
                  <CardDescription>Define the training content and objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Training Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      rows={4}
                      placeholder="Provide a detailed description of the training session..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectives">Learning Objectives *</Label>
                    <Textarea
                      id="objectives"
                      value={formData.objectives}
                      onChange={(e) => updateFormData("objectives", e.target.value)}
                      rows={4}
                      placeholder="List the key learning objectives and outcomes..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prerequisites">Prerequisites</Label>
                    <Textarea
                      id="prerequisites"
                      value={formData.prerequisites}
                      onChange={(e) => updateFormData("prerequisites", e.target.value)}
                      rows={3}
                      placeholder="Any prerequisites or prior knowledge required..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="materials">Training Materials</Label>
                    <Textarea
                      id="materials"
                      value={formData.materials}
                      onChange={(e) => updateFormData("materials", e.target.value)}
                      rows={3}
                      placeholder="List materials, handouts, or resources needed..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Select Participants</CardTitle>
                  <CardDescription>Choose employees who will attend this training</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Available Employees</Label>
                    <div className="max-h-60 overflow-y-auto border rounded-md p-4 space-y-2">
                      {sampleEmployees.map((employee) => (
                        <div key={employee.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={employee.id}
                            checked={formData.selectedEmployees.includes(employee.id)}
                            onCheckedChange={(checked) => handleEmployeeSelection(employee.id, checked as boolean)}
                          />
                          <Label htmlFor={employee.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>{employee.name}</span>
                              <span className="text-sm text-muted-foreground">{employee.department}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.selectedEmployees.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Participants ({formData.selectedEmployees.length})</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedEmployees.map((employeeId) => {
                          const employee = sampleEmployees.find((emp) => emp.id === employeeId)
                          return employee ? (
                            <div
                              key={employeeId}
                              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                            >
                              {employee.name}
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Training</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
