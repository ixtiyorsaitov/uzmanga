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
    likes: number;
    replies: number;
  };
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
}

export interface GetCommentsArgs {
  targetId: string;
  params: CommentsQueryParams;
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
