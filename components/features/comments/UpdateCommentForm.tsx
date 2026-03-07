"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentSchema,
  CommentSchema,
} from "@/lib/validations/comment.validations";
import CommentInput from "./CommentInput";
import { useUpdateComment } from "@/components/hooks/api/useComments";
import { appToast } from "@/lib/app-toast";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateCommentFormProps {
  commentId: string;
  initialContent: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function UpdateCommentForm({
  commentId,
  initialContent,
  onCancel,
  onSuccess,
}: UpdateCommentFormProps) {
  const queryClient = useQueryClient();

  const updateForm = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: initialContent },
  });

  const updateMutation = useUpdateComment();

  const onSubmit = (data: CommentSchema) => {
    updateMutation.mutate(
      { commentId, content: data.content },
      {
        onSuccess: (res) => {
          onSuccess();
          appToast.info(res.message);
          if (res.data?.parentId) {
            queryClient.invalidateQueries({
              queryKey: ["replied-comments", res.data?.parentId],
            });
          } else {
            queryClient.invalidateQueries({
              queryKey: ["comments", res.data?.targetId],
            });
          }
        },
        onError: (error: any) => {
          const message = error.message || "Kutilmagan xatolik yuz berdi";
          appToast.error(message);
        },
      },
    );
  };

  return (
    <div className="mt-2 mb-4">
      <FormProvider {...updateForm}>
        <form
          id={`update-comment-${commentId}`}
          onSubmit={updateForm.handleSubmit(onSubmit)}
        >
          <CommentInput
            formId={`update-comment-${commentId}`}
            onCancelClick={onCancel}
            submitButtonText="Tahrirlash"
          />
        </form>
      </FormProvider>
    </div>
  );
}
