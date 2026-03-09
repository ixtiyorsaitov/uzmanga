import { IManga } from "./manga";
import { IUser } from "./user";

export interface IBookmark {
  _id: string;
  user: IUser;
  manga: IManga;
  status: BOOKMARK_STATUS;
}

export enum BOOKMARK_STATUS {
  READING = "READING",
  PLAN_TO_READ = "PLAN_TO_READ",
  COMPLETED = "COMPLETED",
  DROPPED = "DROPPED",
  ON_HOLD = "ON_HOLD",
}

export interface ToggleBookmarkProps {
  mangaId: string;
  status: BOOKMARK_STATUS;
}

export interface ChechIsBookmarkedProps {
  mangaId: string;
}

export interface DeleteBookmarkProps {
  mangaId: string;
}
