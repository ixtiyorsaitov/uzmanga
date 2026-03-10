import CommentCardSkeleton from "./CommentCardSkeleton";

export default function CommentsSectionLoading({
  skeletonCount = 5,
}: {
  skeletonCount?: number;
}) {
  return (
    <div className="mx-auto flex flex-col gap-6">
      <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />

      <div className="h-10 w-[150px] animate-pulse rounded-lg bg-muted" />

      <div className="flex flex-col gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CommentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
