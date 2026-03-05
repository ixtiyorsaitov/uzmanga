import { IMedia } from ".";
import { IAgeRating } from "./age.rating";
import { ICategory } from "./category";
import { IGenre } from "./genre";
import { IMangaStatus } from "./manga.status";
import { ITranslationStatus } from "./translation.status";
import { IUser } from "./user";

export interface IManga {
  _id: string;
  images: {
    cover: IMedia;
    banner: IMedia;
  };
  type: string;
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
}
