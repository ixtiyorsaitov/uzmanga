"use client";

import { useState, useRef, useEffect } from "react";
import {
  Heart,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  HeartCrack,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IComment } from "@/types/comment";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PinIcon } from "@/components/icons";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import CommentInput from "./CommentInput";
import useCommentStore from "@/store/comment.store";
import { useGetRepliedComments } from "@/components/hooks/api/useComments";
import CommentCardSkeleton from "./CommentCardSkeleton";

const limitReplies = 5;

interface CommentProps {
  comment: IComment;
  isRepliedComment?: boolean;
  rootId?: string;
}

export default function CommentCard({
  comment,
  isRepliedComment,
  rootId,
}: CommentProps) {
  const [showReplies, setShowReplies] = useState(false);

  const { data: repliedComments, isLoading: repliedCommentsLoading } =
    useGetRepliedComments({
      parentId: (showReplies ? comment._id : null)!,
      targetId: comment.targetId,
      params: { targetType: comment.targetType },
    });

  const { activeReplyId, setActiveReplyId, replyingToCommentId } =
    useCommentStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  const { author, content, createdAt, isPinned, replyTo, stats } = comment;

  const handleReplyClick = (replyToCommentId: string) => {
    if (activeReplyId !== null) {
      setActiveReplyId(null);
    } else {
      const mainParentId = isRepliedComment && rootId ? rootId : comment._id;
      setActiveReplyId(mainParentId, replyToCommentId);
    }
  };

  const handleShowReplies = () => {
    setShowReplies((prev) => !prev);
  };

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setShowButton(isOverflowing);
    }
  }, [content]);

  return (
    <div
      className={cn(
        "p-4 rounded-2xl border flex gap-3 transition-colors bg-background/80 backdrop-blur-sm",
        isPinned && !isRepliedComment ? "border-primary" : "border-input",
      )}
    >
      <Avatar className="size-10 rounded-lg shrink-0">
        <AvatarImage src={author.avatar} />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm flex items-center gap-1">
              <Link href={`/users/${author._id}`}>{author.name}</Link>
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            {isPinned && !isRepliedComment && <PinIcon />}
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <MoreHorizontal className="size-5" />
            </button>
          </div>
        </div>

        <div className="mb-3 relative group">
          <div
            ref={textRef}
            className={cn(
              "text-sm leading-relaxed text-muted-foreground prose prose-invert prose-sm max-w-none wrap-break-word",
              !isExpanded && "line-clamp-3",
            )}
          >
            {isRepliedComment && replyTo && (
              <span className="text-primary font-semibold mr-1 inline">
                {replyTo.user.name},
              </span>
            )}
            <span
              className="[&>p]:inline [&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {showButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary cursor-pointer transition-colors mt-1.5 flex items-center gap-1 font-medium"
              type="button"
            >
              {isExpanded ? (
                <>
                  Qisqartirish <ChevronUp className="size-3" />
                </>
              ) : (
                <>
                  Ko'proq o'qish <ChevronDown className="size-3" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{format(createdAt, "dd MMM yyyy")}</span>
          <button
            onClick={() => handleReplyClick(comment._id)}
            className="transition-colors font-bold hover:underline underline-offset-2 cursor-pointer"
            type="button"
          >
            Javob berish
          </button>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-destructive transition-colors"
            >
              <Heart className="size-4" />
              <span>{stats.likes}</span>
            </button>
            <button
              type="button"
              className="hover:text-foreground transition-colors"
            >
              <HeartCrack className="size-4" />
            </button>
          </div>
        </div>
        {stats.replies > 0 && !isRepliedComment && (
          <div
            onClick={handleShowReplies}
            className="mt-2 flex items-center justify-start gap-2"
          >
            <Separator className="w-[30px]!" />
            <p className="text-xs text-primary font-bold hover:underline underline-offset-2 cursor-pointer">
              {stats.replies} ta{" "}
              {stats.replies === 1 ? "javobni" : "javoblarni"}{" "}
              {showReplies ? "yashirish" : "ko'rish"}
            </p>
          </div>
        )}
        {replyingToCommentId === comment._id && (
          <div className="mt-4">
            <CommentInput
              formId="reply-comment"
              onCancelClick={() => setActiveReplyId(null)}
            />
          </div>
        )}

        {/* Replies */}
        {!isRepliedComment && (
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
              repliedComments?.data?.map((c) => (
                <CommentCard
                  key={c._id}
                  rootId={comment._id}
                  comment={c}
                  isRepliedComment
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
