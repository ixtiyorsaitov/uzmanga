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
import { CommentTargetType } from "@/types/comment";
import useCommentStore from "@/store/comment.store";
import {
  useCreateComment,
  useCreateReplyComment,
  useGetInfiniteComments,
} from "@/components/hooks/api/useComments";
import { useQueryClient } from "@tanstack/react-query";
import { appToast } from "@/lib/app-toast";
import CommentCardSkeleton from "./CommentCardSkeleton";
import DeleteCommentModal from "@/components/modals/comments/DeleteCommentModal";
import { Button } from "@/components/ui/button";

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
  const [filter, setFilter] = useState<"newest" | "popular">("newest");
  const queryClient = useQueryClient();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetInfiniteComments({
      targetId,
      params: { targetType, sortBy: filter },
    });

  // Infinite data formatini (sahifalarni) bitta tekis massivga (arrayga) aylantiramiz
  const comments = data?.pages.flatMap((page) => page?.comments) || [];

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
    defaultValues: { content: "" },
  });

  const replyForm = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
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
          queryClient.invalidateQueries({ queryKey: ["comments", targetId] });
          appToast.success(res.message);
          setMainEditorOpen(false);
          mainForm.reset();
        },
        onError: (error: any) => {
          const message = error.message || "Kutilmagan xatolik yuz berdi";

          appToast.error(message);
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
            disabled={createMainComment.isPending}
            formId="main-comment"
            editorActive={mainEditorOpen}
            setEditorActive={setMainEditorOpen}
          />

          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as "newest" | "popular")}
            className="w-[400px]"
          >
            <TabsList className="blur-card">
              <TabsTrigger className="min-w-[70px]" value="newest">
                Yangi
              </TabsTrigger>
              <TabsTrigger className="min-w-[70px]" value="popular">
                Mashhur
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </form>
      </FormProvider>

      <FormProvider {...replyForm}>
        {isLoading ? (
          <>
            {Array.from({ length: Math.min(commentsCount, limitComments) }).map(
              (_, i) => (
                <CommentCardSkeleton key={i} />
              ),
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((c: any) => (
              <CommentCard
                onReplySubmit={onReplySubmit}
                key={c._id}
                comment={c}
              />
            ))}
          </div>
        )}
      </FormProvider>

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full max-w-[200px]"
          >
            {isFetchingNextPage ? "Yuklanmoqda..." : "Ko'proq ko'rish"}
          </Button>
        </div>
      )}

      <DeleteCommentModal targetId={targetId} />
    </div>
  );
}
