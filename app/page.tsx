"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/dashboard")
    }, 2000) /* wait 2 seconds*/

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <LoadingSpinner />
    </div>
  )
}