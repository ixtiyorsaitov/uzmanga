"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface CommentSkeletonProps {
  isRepliedComment?: boolean;
}

export default function CommentCardSkeleton({
  isRepliedComment,
}: CommentSkeletonProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-2xl border flex gap-3 transition-colors bg-background/80 backdrop-blur-sm border-input",
      )}
    >
      {/* Avatar qismi */}
      <Skeleton className="size-10 rounded-lg shrink-0" />

      <div className="flex-1 min-w-0">
        {/* Header (Ism va More icon) */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24 sm:w-32 rounded" />
          </div>
          <Skeleton className="size-5 rounded" />
        </div>

        {/* Content (Comment matni) */}
        <div className="mb-4 space-y-2 mt-2">
          {!isRepliedComment && (
            <>
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-[90%] rounded" />
            </>
          )}
          <Skeleton className="h-3.5 w-[60%] rounded" />
        </div>

        {/* Bottom actions (Sana, Javob berish va Likellar) */}
        <div className="flex items-center gap-4">
          {/* Sana */}
          <Skeleton className="h-3 w-20 rounded" />
          {/* Javob berish tugmasi */}
          <Skeleton className="h-3 w-16 rounded" />

          {/* Likes qismi (O'ng tarafda) */}
          <div className="ml-auto flex items-center gap-3">
            <Skeleton className="h-4 w-10 rounded" />
            <Skeleton className="size-4 rounded" />
          </div>
        </div>

        {/* Replies count qismi (ixtiyoriy, asosan asosiy commentlar uchun) */}
        {!isRepliedComment && (
          <div className="mt-3 flex items-center gap-2">
            <Skeleton className="h-px w-30" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        )}
      </div>
    </div>
  );
}
