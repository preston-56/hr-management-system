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
import { Slider } from "@/components/ui/slider"

interface CreateAppraisalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAppraisalDialog({ open, onOpenChange }: CreateAppraisalDialogProps) {
  const [formData, setFormData] = useState({
    employeeId: "",
    reviewPeriod: "",
    reviewType: "",
    reviewer: "",
    goals: "",
    achievements: "",
    challenges: "",
    developmentPlan: "",
    overallRating: [4],
    qualityOfWork: [4],
    productivity: [4],
    communication: [4],
    teamwork: [4],
    leadership: [3],
    comments: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Appraisal data:", formData)
    onOpenChange(false)
  }

  const updateFormData = (field: keyof typeof formData, value: string | number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Performance Appraisal</DialogTitle>
          <DialogDescription>Conduct a comprehensive performance review for an employee.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="competencies">Competencies</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Review Information</CardTitle>
                  <CardDescription>Basic details about the performance review</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID *</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId}
                        onChange={(e) => updateFormData("employeeId", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reviewer">Reviewer *</Label>
                      <Input
                        id="reviewer"
                        value={formData.reviewer}
                        onChange={(e) => updateFormData("reviewer", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reviewPeriod">Review Period *</Label>
                      <Input
                        id="reviewPeriod"
                        value={formData.reviewPeriod}
                        onChange={(e) => updateFormData("reviewPeriod", e.target.value)}
                        placeholder="e.g., Q1 2024, Jan-Jun 2024"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reviewType">Review Type *</Label>
                      <Select
                        value={formData.reviewType}
                        onValueChange={(value) => updateFormData("reviewType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select review type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quarterly">Quarterly Review</SelectItem>
                          <SelectItem value="mid-year">Mid-year Review</SelectItem>
                          <SelectItem value="annual">Annual Review</SelectItem>
                          <SelectItem value="probation">Probation Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Results</CardTitle>
                  <CardDescription>Evaluate goals, achievements, and challenges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goals">Goals Set for This Period</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => updateFormData("goals", e.target.value)}
                      rows={3}
                      placeholder="List the goals that were set for this review period..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">Key Achievements</Label>
                    <Textarea
                      id="achievements"
                      value={formData.achievements}
                      onChange={(e) => updateFormData("achievements", e.target.value)}
                      rows={4}
                      placeholder="Describe the employee's key achievements and accomplishments..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenges">Challenges & Areas for Improvement</Label>
                    <Textarea
                      id="challenges"
                      value={formData.challenges}
                      onChange={(e) => updateFormData("challenges", e.target.value)}
                      rows={3}
                      placeholder="Identify challenges faced and areas that need improvement..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Overall Performance Rating</Label>
                    <div className="px-3">
                      <Slider
                        value={formData.overallRating}
                        onValueChange={(value) => updateFormData("overallRating", value)}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1 - Poor</span>
                        <span>3 - Satisfactory</span>
                        <span>5 - Excellent</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Rating: {formData.overallRating[0]}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competencies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Competencies</CardTitle>
                  <CardDescription>Rate the employee on key behavioral competencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Quality of Work</Label>
                    <div className="px-3">
                      <Slider
                        value={formData.qualityOfWork}
                        onValueChange={(value) => updateFormData("qualityOfWork", value)}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <p className="text-center mt-2 font-medium">{formData.qualityOfWork[0]}/5</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Productivity</Label>
                    <div className="px-3">
                      <Slider
                        value={formData.productivity}
                        onValueChange={(value) => updateFormData("productivity", value)}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <p className="text-center mt-2 font-medium">{formData.productivity[0]}/5</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Communication Skills</Label>
                    <div className="px-3">
                      <Slider
                        value={formData.communication}
                        onValueChange={(value) => updateFormData("communication", value)}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <p className="text-center mt-2 font-medium">{formData.communication[0]}/5</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Teamwork & Collaboration</Label>
                    <div className="px-3">
                      <Slider
                        value={formData.teamwork}
                        onValueChange={(value) => updateFormData("teamwork", value)}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <p className="text-center mt-2 font-medium">{formData.teamwork[0]}/5</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Leadership & Initiative</Label>
                    <div className="px-3">
                      <Slider
                        value={formData.leadership}
                        onValueChange={(value) => updateFormData("leadership", value)}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <p className="text-center mt-2 font-medium">{formData.leadership[0]}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="development" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Career Development Plan</CardTitle>
                  <CardDescription>Plan for the employee&apos;s future growth and development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="developmentPlan">Development Goals & Action Plan</Label>
                    <Textarea
                      id="developmentPlan"
                      value={formData.developmentPlan}
                      onChange={(e) => updateFormData("developmentPlan", e.target.value)}
                      rows={5}
                      placeholder="Outline specific development goals and action plans for the next review period..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      value={formData.comments}
                      onChange={(e) => updateFormData("comments", e.target.value)}
                      rows={4}
                      placeholder="Any additional comments or observations..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Appraisal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
