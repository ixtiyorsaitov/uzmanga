"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetRepliedComments } from "@/components/hooks/api/useComments";
import CommentCardSkeleton from "./CommentCardSkeleton";
import CommentCard from "./CommentCard"; // Aylanma (circular) import bo'ladi, bu React'da normal
import { IComment } from "@/types/comment";

const limitReplies = 5;

interface CommentRepliesProps {
  comment: IComment;
  rootId?: string;
}

export default function CommentReplies({
  comment,
  rootId,
}: CommentRepliesProps) {
  const [showReplies, setShowReplies] = useState(false);

  const { data: repliedComments, isLoading: repliedCommentsLoading } =
    useGetRepliedComments({
      parentId: (showReplies ? comment._id : null)!,
      targetId: comment.targetId,
      params: { targetType: comment.targetType },
    });

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
          {repliedCommentsLoading ? (
            <>
              {Array.from({
                length:
                  comment.stats.replies <= limitReplies
                    ? comment.stats.replies
                    : limitReplies,
              }).map((_, i) => (
                <CommentCardSkeleton isRepliedComment key={i} />
              ))}
            </>
          ) : (
            (repliedComments as { data: IComment[] })?.data?.map((c) => (
              <CommentCard
                key={c._id}
                rootId={rootId || comment._id} // Root ID ni uzatish
                comment={c}
                isRepliedComment
              />
            ))
          )}
        </div>
      )}
    </>
  );
}
