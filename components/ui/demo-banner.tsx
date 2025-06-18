"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DemoBanner() {
  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Demo Mode:</strong> This is a frontend demo. The Python backend is not connected yet. All data is
        simulated for demonstration purposes.
      </AlertDescription>
    </Alert>
  )
}
