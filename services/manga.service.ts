import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { ChapterListResponse, ChapterQueryParams } from "@/types/chapter";
import { IManga } from "@/types/manga";
import { cache } from "react";

class MangaService {
  async getMangas(
    page: number,
    limit: number,
  ): Promise<ApiResponse<{ limit: number; page: number; mangas: IManga[] }>> {
    const res = await api.get(`/mangas?page=${page}&limit=${limit}`);
    return res.data;
  }

  getManga = cache(async (identifier: string): Promise<ApiResponse<IManga>> => {
    const res = await api.get(`/mangas/${identifier}`);
    return res.data;
  });

  async getMangaByTitle(title: string) {
    const res = await api.get(`/mangas/${title}`);
    return res.data;
  }

  async getMangaByGenre(genre: string) {
    const res = await api.get(`/mangas/${genre}`);
    return res.data;
  }

  async getMangaByStatus(status: string) {
    const res = await api.get(`/mangas/${status}`);
    return res.data;
  }

  async getMangaByRating(rating: number) {
    const res = await api.get(`/mangas/${rating}`);
    return res.data;
  }

  async getMangaByYear(year: number) {
    const res = await api.get(`/mangas/${year}`);
    return res.data;
  }

  async getMangaByAuthor(author: string) {
    const res = await api.get(`/mangas/${author}`);
    return res.data;
  }

  async getMangaByArtist(artist: string) {
    const res = await api.get(`/mangas/${artist}`);
    return res.data;
  }

  async getMangaByPublisher(publisher: string) {
    const res = await api.get(`/mangas/${publisher}`);
    return res.data;
  }

  async getMangaByTranslator(translator: string) {
    const res = await api.get(`/mangas/${translator}`);
    return res.data;
  }
}

export default new MangaService();
