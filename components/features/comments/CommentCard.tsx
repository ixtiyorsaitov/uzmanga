"use client";

import { Heart, MoreHorizontal, HeartCrack } from "lucide-react";
import { cn } from "@/lib/utils";
import { IComment, ICommentReplyTo } from "@/types/comment";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PinIcon } from "@/components/icons";
import Link from "next/link";
import CommentInput from "./CommentInput";
import useCommentStore from "@/store/comment.store";

import CommentContent from "./CommentContent";
import CommentReplies from "./CommentReplies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
  const {
    activeReplyId,
    setActiveReplyId,
    replyingToCommentId,
    setCommentToDelete,
  } = useCommentStore();

  const { author, content, createdAt, isPinned, replyTo, stats } = comment;

  const handleReplyClick = (replyToCommentId: string) => {
    if (activeReplyId !== null) {
      setActiveReplyId(null);
    } else {
      const mainParentId = isRepliedComment && rootId ? rootId : comment._id;
      setActiveReplyId(mainParentId, replyToCommentId);
    }
  };

  const handleDeleteClick = () => {
    setCommentToDelete(comment._id, isRepliedComment ? rootId : null);
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-accent size-8"
                  size={"icon"}
                >
                  <MoreHorizontal className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteClick}>
                  O'chirish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <CommentContent
          content={content}
          replyTo={replyTo}
          isRepliedComment={isRepliedComment}
        />

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

        {replyingToCommentId === comment._id && (
          <div className="mt-4">
            <CommentInput
              formId="reply-comment"
              onCancelClick={() => setActiveReplyId(null)}
            />
          </div>
        )}

        {!isRepliedComment && (
          <CommentReplies comment={comment} rootId={rootId} />
        )}
      </div>
    </div>
  );
}
