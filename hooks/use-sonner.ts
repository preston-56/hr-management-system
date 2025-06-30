"use client";

import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
};

/**
 * A simplified toast utility that wraps Sonner's toast functionality
 */
function toast({
  title,
  description,
  variant = "default",
  duration = 5000,
  ...props
}: ToastProps) {
  return sonnerToast(title as string, {
    description,
    duration,
    // Map variant to appropriate Sonner props
    // For destructive, use Sonner's error method
    ...(variant === "destructive" ? { className: "destructive" } : {}),
    ...props
  });
}

// Additional utility functions matching common toast patterns
const toastFunctions = {
  // Success toast
  success: (title: string, description?: string) => {
    return sonnerToast.success(title, { description });
  },

  // Error toast
  error: (title: string, description?: string) => {
    return sonnerToast.error(title, { description });
  },

  // Info toast
  info: (title: string, description?: string) => {
    return sonnerToast(title, { description });
  },

  // Warning/destructive toast
  warning: (title: string, description?: string) => {
    return sonnerToast.warning(title, { description });
  },

  // Promise toast
  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error
    });
  },

  // Dismiss specific or all toasts
  dismiss: (toastId?: string) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
    } else {
      sonnerToast.dismiss();
    }
  }
};

function useToast() {
  return {
    toast,
    ...toastFunctions
  };
}

export { useToast, toast };