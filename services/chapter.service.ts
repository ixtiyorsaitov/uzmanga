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

  async createChapter(
    mangaId: string,
    data: FormData,
  ): Promise<ApiResponse<IChapter>> {
    const res = await api.post(`/chapters/${mangaId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }

  async toggleReaction(
    chapterId: string,
  ): Promise<ApiResponse<{ score: number; isLiked: boolean }>> {
    const res = await api.post(`/chapters/react/${chapterId}`);
    return res.data;
  }

  async checkReaction(chapterId: string): Promise<ApiResponse<boolean>> {
    const res = await api.get(`/chapters/react/${chapterId}/check`);
    return res.data;
  }

  // async deleteChapter(chapterId: string): Promise<ApiResponse<void>> {
  //   const res = await api.delete(`/chapters/${chapterId}`);
  //   return res.data;
  // }

  // async updateChapter(
  //   chapterId: string,
  //   data: FormData,
  // ): Promise<ApiResponse<IChapter>> {
  //   const res = await api.put(`/chapters/${chapterId}`, data, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  //   return res.data;
  // }

  async markChapterAsRead(chapterId: string): Promise<ApiResponse<void>> {
    const res = await api.post(`/chapters/read/${chapterId}`);
    return res.data;
  }

  async toggleReadStatus(
    chapterId: string,
  ): Promise<ApiResponse<{ isRead: boolean }>> {
    const res = await api.post(`/chapters/read/${chapterId}/toggle-read`);
    return res.data;
  }
}

export default new ChapterService();
