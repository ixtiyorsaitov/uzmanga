import { IManga } from "./manga";

export interface IProgress {
  id: string;
  manga: IManga;
  chaptersCount: number;
  readChaptersCount: number;
  progress: number;
}
