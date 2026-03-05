import { IUser } from "./user";

export interface IComment {
  _id: string;
  targetId: string;
  targetType: CommentTargetType;
  author: IUser;
  content: string;
  parentId: string | null;
  replyTo: {
    commentId: string;
    user: IUser;
  } | null;
  isPinned: boolean;
  likesCount: number;
  repliesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum CommentTargetType {
  MANGA = "Manga",
  CHAPTER = "Chapter",
  USER = "User",
}
export interface CommentsQueryParams {
  targetType: CommentTargetType;
  parentId?: string | null; // Replylarni olish uchun ixtiyoriy
}

// Buni soddalashtiramiz, chunki endi bitta funksiya hammasini bajara oladi
export interface GetCommentsArgs {
  targetId: string;
  params: CommentsQueryParams;
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
