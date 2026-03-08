import { IUser } from "./user";

export interface IComment {
  _id: string;
  targetId: string;
  targetType: CommentTargetType;
  author: IUser;
  content: string;
  parentId: string | null;
  replyTo: ICommentReplyTo | null;
  isPinned: boolean;
  stats: {
    score: number;
    replies: number;
  };
  userReaction: 1 | -1 | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentReplyTo {
  commentId: string;
  user: IUser;
}

export enum CommentTargetType {
  MANGA = "Manga",
  CHAPTER = "Chapter",
  USER = "User",
}
export interface CommentsQueryParams {
  targetType: CommentTargetType;
  parentId?: string | null;
  page?: number;
  limit?: number;
}

export interface GetCommentsArgs {
  targetId: string;
  params: CommentsQueryParams & { sortBy?: "newest" | "popular" };
}

export interface GetRepliedCommentsArgs extends GetCommentsArgs {
  parentId: string;
}

export interface CreateCommentArgs extends GetCommentsArgs {
  data: {
    content: string;
  };
}
export interface CreateReplyCommentArgs extends GetCommentsArgs {
  data: {
    content: string;
    parentId: string;
    replyToCommentId: string | null;
  };
}

export interface UpdateCommentArgs {
  commentId: string;
  content: string;
}

export interface ReactCommentArgs {
  commentId: string;
  value: 1 | -1;
}
