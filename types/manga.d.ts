import { IMedia } from ".";
import { IAgeRating } from "./age.rating";
import { ICategory } from "./category";
import { IChapter } from "./chapter";
import { IGenre } from "./genre";
import { IMangaStatus } from "./manga.status";
import { IMangaType } from "./manga.type";
import { ITranslationStatus } from "./translation.status";
import { IUser } from "./user";

export interface IManga {
  _id: string;
  images: {
    cover: IMedia;
    banner: IMedia;
  };
  type: IMangaType;
  rating: number;
  releaseYear: number;
  title: string;
  status: IMangaStatus;
  translationStatus: ITranslationStatus;
  ageRating: IAgeRating;
  description: string;
  categories: ICategory[];
  genres: IGenre[];
  slug: string;
  createdBy: IUser;
  userProgress: null | IChapter;
  stats: {
    comments: number;
    views: number;
    bookmarks: number;
    likes: number;
    dislikes: number;
  };
  alternativeTitles: {
    en: string;
    ru: string;
    romaji: string;
    native: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords: string[];
  };
}
