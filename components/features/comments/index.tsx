"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentSchema,
  commentSchema,
} from "@/lib/validations/comment.validations";
import { useState } from "react";
import { CommentTargetType, IComment } from "@/types/comment";
import useCommentStore from "@/store/comment.store";
import {
  useCreateComment,
  useCreateReplyComment,
  useGetComments,
} from "@/components/hooks/api/useComments";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { appToast } from "@/lib/app-toast";
import CommentCardSkeleton from "./CommentCardSkeleton";

interface CommentSectionProps {
  targetId: string;
  targetType: CommentTargetType;
  commentsCount: number;
}

const limitComments = 10;

export default function CommentsSection({
  targetId,
  targetType,
  commentsCount,
}: CommentSectionProps) {
  const queryClient = useQueryClient();

  const getComments = useGetComments(targetId, targetType);

  const comments = getComments.data?.data || [];
  const createComment = useCreateComment();

  const [filter, setFilter] = useState("newest");
  const {
    activeReplyId,
    setActiveReplyId,
    mainEditorOpen,
    setMainEditorOpen,
    replyingToCommentId,
  } = useCommentStore();
  const createMainComment = useCreateComment();
  const createReplyComment = useCreateReplyComment();
  const mainForm = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const replyForm = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onReplySubmit = (data: CommentSchema) => {
    if (!activeReplyId) {
      return appToast.error("Parent id not found");
    }

    createReplyComment.mutate(
      {
        data: {
          content: data.content,
          parentId: activeReplyId,
          replyToCommentId: replyingToCommentId,
        },

        targetId,
        params: { targetType },
      },
      {
        onSuccess: (res) => {
          console.log(res);

          appToast.success(res.message);

          queryClient.invalidateQueries({
            queryKey: ["comments", targetId],
          });
          queryClient.invalidateQueries({
            queryKey: ["replied-comments", activeReplyId],
          });

          setActiveReplyId(null);
          replyForm.reset();
        },
        onError: (error: any) => {
          const message = error.message || "Kutilmagan xatolik yuz berdi";

          appToast.error(message);

          console.error("[CreateComment Error]:", error);
        },
      },
    );
  };

  const onMainSubmit = (data: CommentSchema) => {
    createMainComment.mutate(
      {
        data: { content: data.content },
        targetId,
        params: { targetType },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          queryClient.invalidateQueries({ queryKey: ["comments", targetId] });
          appToast.success(res.message);
          setMainEditorOpen(false);
          mainForm.reset();
        },
        onError: (error: any) => {
          const message = error.message || "Kutilmagan xatolik yuz berdi";

          appToast.error(message);

          console.error("[CreateComment Error]:", error);
        },
      },
    );
  };
  return (
    <div className="mx-auto flex flex-col gap-6">
      <FormProvider {...mainForm}>
        <form
          id="main-comment"
          onSubmit={mainForm.handleSubmit(onMainSubmit)}
          className="flex flex-col gap-4"
        >
          <CommentInput
            disabled={createComment.isPending}
            formId="main-comment"
            editorActive={mainEditorOpen}
            setEditorActive={setMainEditorOpen}
          />

          <Tabs value={filter} onValueChange={setFilter} className="w-[400px]">
            <TabsList className="blur-card">
              <TabsTrigger className="min-w-[70px]" value="newest">
                Yangi
              </TabsTrigger>
              <TabsTrigger className="min-w-[70px]" value="interesting">
                Qiziq
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </form>
      </FormProvider>

      <FormProvider {...replyForm}>
        <form
          id="reply-comment"
          onSubmit={replyForm.handleSubmit(onReplySubmit)}
          className="space-y-4"
        >
          {getComments.isLoading ? (
            <>
              {Array.from({
                length:
                  commentsCount <= limitComments
                    ? commentsCount
                    : limitComments,
              }).map((_, i) => (
                <CommentCardSkeleton key={i} />
              ))}
            </>
          ) : (
            comments.map((c) => <CommentCard key={c._id} comment={c} />)
          )}
        </form>
      </FormProvider>
    </div>
  );
}
