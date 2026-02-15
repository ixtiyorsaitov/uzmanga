import { IMedia } from ".";
import { ICategory } from "./category";

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
  description: string;
  categories: ICategory[];
  slug: string;
}
