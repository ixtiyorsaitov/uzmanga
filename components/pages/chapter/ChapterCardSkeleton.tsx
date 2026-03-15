import { Skeleton } from "@/components/ui/skeleton";

export default function ChapterCardSkeleton() {
  return (
    <div className="overflow-hidden p-4 blur-card mt-2 rounded-2xl border flex items-center justify-between animate-pulse">
      <div className="flex items-center justify-start gap-5">
        <Skeleton className="h-5 w-5 rounded-md" />

        <div className="flex items-center justify-start gap-4">
          <Skeleton className="h-7 w-6 rounded-md" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-3 w-16 rounded-md hidden sm:block" />

        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center gap-2 px-2 py-1">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-6 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
