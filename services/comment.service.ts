import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import {
  GetCommentsArgs,
  CreateCommentArgs,
  IComment,
  CreateReplyCommentArgs,
  GetRepliedCommentsArgs,
  UpdateCommentArgs,
  ReactCommentArgs,
} from "@/types/comment";
import { cache } from "react";

class CommentService {
  getComments = async ({
    targetId,
    params,
  }: GetCommentsArgs): Promise<
    ApiResponse<{
      comments: IComment[];
      hasNextPage: boolean;
      nextPage: number | null;
    }>
  > => {
    const res = await api.get(`/comments/${targetId}`, { params });
    return res.data;
  };

  getRepliedComments = async ({
    targetId,
    parentId,
    params,
  }: GetRepliedCommentsArgs): Promise<ApiResponse<IComment[]>> => {
    const res = await api.get(`/comments/${targetId}/${parentId}/replies`, {
      params,
    });
    return res.data;
  };

  createComment = async ({
    targetId,
    params,
    data,
  }: CreateCommentArgs): Promise<ApiResponse<IComment>> => {
    const res = await api.post(`/comments/${targetId}`, data, {
      params,
    });
    return res.data;
  };

  createReplyComment = async ({
    targetId,
    params,
    data,
  }: CreateReplyCommentArgs): Promise<ApiResponse<IComment>> => {
    const res = await api.post(`/comments/${targetId}/reply`, data, {
      params,
    });
    return res.data;
  };

  updateComment = async ({
    commentId,
    content,
  }: UpdateCommentArgs): Promise<ApiResponse<IComment>> => {
    const res = await api.put(`/comments/${commentId}`, { content });
    return res.data;
  };

  deleteComment = async (commentId: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/comments/${commentId}`);
    return res.data;
  };

  toggleReaction = async ({
    commentId,
    value,
  }: ReactCommentArgs): Promise<
    ApiResponse<{ score: number; userReaction: 1 | -1 }>
  > => {
    const res = await api.post(`/comments/${commentId}/react`, { value });
    return res.data;
  };
}

export default new CommentService();
