import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import {
  ChapterListResponse,
  ChapterQueryParams,
  IChapter,
} from "@/types/chapter";

class ChapterService {
  async getChapter(chapterId: string): Promise<ApiResponse<IChapter>> {
    const res = await api.get(`/chapters/single/${chapterId}`);
    return res.data;
  }

  async getChaptersByMangaId(
    mangaId: string,
    params: ChapterQueryParams = { page: 1, limit: 10 },
  ): Promise<ApiResponse<ChapterListResponse>> {
    const res = await api.get(`/chapters/manga/${mangaId}`, { params });
    return res.data;
  }
}

export default new ChapterService();
