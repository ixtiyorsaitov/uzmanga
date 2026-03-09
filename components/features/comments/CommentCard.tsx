"use client";

import { Heart, MoreHorizontal, HeartCrack } from "lucide-react";
import { cn } from "@/lib/utils";
import { IComment } from "@/types/comment";
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
import { memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CommentSchema } from "@/lib/validations/comment.validations";
import UpdateCommentForm from "./UpdateCommentForm";
import CommentScore from "./CommentScore";
import { useAuth } from "@/components/contexts/auth.context";

interface CommentProps {
  comment: IComment;
  isRepliedComment?: boolean;
  rootId?: string;
  onReplySubmit?: (data: CommentSchema) => void;
}

const CommentCard = ({
  comment,
  isRepliedComment,
  rootId,
  onReplySubmit,
}: CommentProps) => {
  const {
    activeReplyId,
    setActiveReplyId,
    replyingToCommentId,
    setCommentToDelete,
  } = useCommentStore();

  const { user } = useAuth();

  const replyForm = useFormContext<CommentSchema>();

  const [isEditing, setIsEditing] = useState(false);

  const { author, createdAt, isPinned, replyTo, stats } = comment;

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleReportCLick = () => {};
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
                {user?._id === comment.author._id ? (
                  <>
                    <DropdownMenuItem onClick={handleEditClick}>
                      Tahrirlash
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick}>
                      O'chirish
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={handleReportCLick}>
                    Shikoyat qilish
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isEditing ? (
          <UpdateCommentForm
            commentId={comment._id}
            initialContent={comment.content}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <CommentContent
            content={comment.content}
            replyTo={replyTo}
            isRepliedComment={isRepliedComment}
          />
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{format(createdAt, "dd MMM yyyy")}</span>
          <button
            onClick={() => handleReplyClick(comment._id)}
            className="transition-colors font-bold hover:underline underline-offset-2 cursor-pointer"
            type="button"
          >
            Javob berish
          </button>

          <CommentScore
            score={comment.stats.score}
            commentId={comment._id}
            userReaction={comment.userReaction}
          />
        </div>

        {replyingToCommentId === comment._id && (
          <div className="mt-4">
            <form
              id="reply-comment"
              onSubmit={replyForm.handleSubmit(onReplySubmit!)}
            >
              <CommentInput
                formId="reply-comment"
                onCancelClick={() => {
                  setActiveReplyId(null);
                  replyForm.reset();
                }}
              />
            </form>
          </div>
        )}

        {!isRepliedComment && (
          <CommentReplies
            onReplySubmit={onReplySubmit!}
            comment={comment}
            rootId={rootId}
          />
        )}
      </div>
    </div>
  );
};

export default memo(CommentCard);
