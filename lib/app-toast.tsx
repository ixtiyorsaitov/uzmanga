import { toast } from "sonner";
import { cn } from "./utils";
import { AlertCircleIcon, CheckIcon, InfoIcon, XIcon } from "lucide-react";

const requiredStyle = "text-white! border-none! font-exo-2";

export const appToast = {
  success: (message: string, options = {}) =>
    toast.success(message, {
      className: cn("dark:bg-green-900! bg-green-500!", requiredStyle),
      ...options,
      icon: <CheckIcon className="h-4! w-4!" />,
    }),

  error: (message: string, options = {}) =>
    toast.error(message, {
      className: cn(
        "dark:bg-destructive-900! bg-destructive-500! text-white!",
        requiredStyle,
      ),
      ...options,
      icon: <XIcon className="h-4! w-4!" />,
    }),

  warning: (message: string, options = {}) =>
    toast.warning(message, {
      className: cn(
        "dark:bg-orange-700! bg-orange-500! text-white!",
        requiredStyle,
      ),
      ...options,
      icon: <AlertCircleIcon className="h-4! w-4!" />,
    }),

  info: (message: string, options = {}) =>
    toast(message, {
      className: cn("dark:bg-primary! bg-primary! text-white!", requiredStyle),
      ...options,
      icon: <InfoIcon className="h-4! w-4!" />,
    }),
};
