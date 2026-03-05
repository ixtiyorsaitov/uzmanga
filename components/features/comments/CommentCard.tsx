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

interface CommentProps {
  comment: IComment;
  isRepliedComment?: boolean;
}

export default function CommentCard({
  comment,
  isRepliedComment,
}: CommentProps) {
  const { activeReplyId, setActiveReplyId } = useCommentStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  const {
    author,
    content,
    createdAt,
    isPinned,
    replyTo,
    likesCount,
    repliesCount,
  } = comment;

  const handleReplyClick = (replyToCommentId: string) => {
    setActiveReplyId(comment._id, replyToCommentId);
    // if (isReplying) {
    //   setActiveReplyId(null);
    // } else {
    // }
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
            dangerouslySetInnerHTML={{
              __html: `${isRepliedComment && replyTo ? `<span class="text-primary font-semibold">${replyTo.user.name}, </span>` : ""}${content}`,
            }}
          />

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
              <span>{likesCount}</span>
            </button>
            <button
              type="button"
              className="hover:text-foreground transition-colors"
            >
              <HeartCrack className="size-4" />
            </button>
          </div>
        </div>
        {repliesCount > 0 && !isRepliedComment && (
          <div className="mt-2 flex items-center justify-start gap-2">
            <Separator className="w-[30px]!" />
            <p className="text-xs text-primary font-bold hover:underline underline-offset-2 cursor-pointer">
              {repliesCount} ta javoblarni ko'rish
            </p>
          </div>
        )}
        {activeReplyId === comment._id && (
          <div className="mt-4">
            <CommentInput
              formId="reply-comment"
              onCancelClick={() => setActiveReplyId(null)}
            />
          </div>
        )}

        {/* Replies */}
        {!isRepliedComment && <div className="space-y-2 mt-2"></div>}
      </div>
    </div>
  );
}
