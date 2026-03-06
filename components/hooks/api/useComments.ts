import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import commentService from "@/services/comment.service";
import {
  CommentTargetType,
  CreateCommentArgs,
  CreateReplyCommentArgs,
  GetRepliedCommentsArgs,
} from "@/types/comment";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetComments = (
  targetId: string,
  targetType: CommentTargetType,
) => {
  return useQuery({
    queryKey: ["comments", targetId],
    queryFn: async () =>
      commentService.getComments({ targetId, params: { targetType } }),
    enabled: !!targetId,
    staleTime: cacheStaleTimesInMilliseconds.minute * 5,
  });
};

export const useGetRepliedComments = (args: GetRepliedCommentsArgs) => {
  return useQuery({
    queryKey: ["replied-comments", args.parentId],
    queryFn: async () => commentService.getRepliedComments(args),
    enabled: !!args.parentId,
    staleTime: cacheStaleTimesInMilliseconds.minute * 5,
  })
}

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (data: CreateCommentArgs) => commentService.createComment(data),
  });
};

export const useCreateReplyComment = () => {
  return useMutation({
    mutationFn: (data: CreateReplyCommentArgs) =>
      commentService.createReplyComment(data),
  });
};
