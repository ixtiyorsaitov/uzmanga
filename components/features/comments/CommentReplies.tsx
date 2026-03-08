"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetInfiniteRepliedComments } from "@/components/hooks/api/useComments";
import CommentCardSkeleton from "./CommentCardSkeleton";
import CommentCard from "./CommentCard";
import { IComment } from "@/types/comment";
import { CommentSchema } from "@/lib/validations/comment.validations";

const limitReplies = 5;

interface CommentRepliesProps {
  comment: IComment;
  rootId?: string;
  onReplySubmit: (data: CommentSchema) => void;
}

export default function CommentReplies({
  comment,
  rootId,
  onReplySubmit,
}: CommentRepliesProps) {
  const [showReplies, setShowReplies] = useState(false);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetInfiniteRepliedComments({
      parentId: showReplies ? comment._id : null,
      targetId: comment.targetId,
      params: { targetType: comment.targetType },
    });

  const repliedComments =
    data?.pages.flatMap((page: any) => page.comments) || [];

  const handleShowReplies = () => {
    setShowReplies((prev) => !prev);
  };

  if (comment.stats.replies === 0) return null;

  return (
    <>
      <div
        onClick={handleShowReplies}
        className="mt-2 flex items-center justify-start gap-2"
      >
        <Separator className="w-[30px]!" />
        <p className="text-xs text-primary font-bold hover:underline underline-offset-2 cursor-pointer">
          {comment.stats.replies} ta{" "}
          {comment.stats.replies === 1 ? "javobni" : "javoblarni"}{" "}
          {showReplies ? "yashirish" : "ko'rish"}
        </p>
      </div>

      {/* Replies List */}
      {showReplies && (
        <div className="space-y-2 mt-2">
          {isLoading ? (
            <>
              {Array.from({
                length: Math.min(comment.stats.replies, limitReplies),
              }).map((_, i) => (
                <CommentCardSkeleton isRepliedComment key={i} />
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              {repliedComments.map((c: any) => (
                <CommentCard
                  key={c._id}
                  rootId={rootId || comment._id}
                  comment={c}
                  isRepliedComment
                  onReplySubmit={onReplySubmit}
                />
              ))}
            </div>
          )}

          {hasNextPage && (
            <div className="flex items-center gap-2 mt-2">
              <Separator className="w-[30px]!" />
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="text-sm text-primary font-bold hover:underline underline-offset-2 cursor-pointer"
              >
                {isFetchingNextPage
                  ? "Yuklanmoqda..."
                  : "Yana javoblarni ko'rish"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
