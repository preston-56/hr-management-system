import { Spinner } from "@/components/ui/spinner"

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/*custom Spinner component */}
      <Spinner size="lg" className="bg-blue-500 dark:bg-blue-400" />

      {/* Text */}
      <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
        Redirecting to dashboard...
      </p>

      {/* Animated dots */}
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0ms]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms]"></div>
      </div>
    </div>
  )
}