import api from "@/lib/axios";
import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import commentService from "@/services/comment.service";
import {
  CommentTargetType,
  CreateCommentArgs,
  CreateReplyCommentArgs,
  GetCommentsArgs,
  GetRepliedCommentsArgs,
  ReactCommentArgs,
  UpdateCommentArgs,
} from "@/types/comment";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetInfiniteComments = ({
  targetId,
  params,
}: GetCommentsArgs) => {
  return useInfiniteQuery({
    queryKey: ["comments", targetId, params.targetType, params.sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await commentService.getComments({
        targetId,
        params: { ...params, page: pageParam, limit: 4 },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
  });
};

export const useGetInfiniteRepliedComments = ({
  targetId,
  parentId,
  params,
}: any) => {
  return useInfiniteQuery({
    queryKey: ["replied-comments", targetId, parentId, params.targetType],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/comments/${targetId}/${parentId}/replies`, {
        params: { ...params, page: pageParam, limit: 5 },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!parentId,
  });
};

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

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: (data: UpdateCommentArgs) => commentService.updateComment(data),
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(commentId),
  });
};

export const useReactComment = () => {
  return useMutation({
    mutationFn: (data: ReactCommentArgs) => commentService.toggleReaction(data),
  });
};
