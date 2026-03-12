import { IMedia, IPagination } from ".";
import { IManga } from "./manga";
import { IUser } from "./user";

export interface IChapter {
  _id: string;
  manga: IManga;
  title?: string;
  isLocked: boolean;
  price: number;
  volumeNumber: number;
  pages: IChapterPage[];
  disableComments: boolean;
  chapterNumber: number;
  createdBy: IUser;
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

export interface IChapterPage {
  pageNumber: number;
  media: IMedia;
}

export interface ChapterQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  ordering?: "index" | "-index";
}

export interface ChapterListResponse {
  chapters: IChapter[];
  pagination: IPagination;
}
