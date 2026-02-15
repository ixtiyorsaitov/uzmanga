import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { IChapter } from "@/types/chapter";

class ChapterService {
  async getChapter(chapterId: string): Promise<ApiResponse<IChapter>> {
    const res = await api.get(`/chapters/${chapterId}`);
    return res.data;
  }
}

export default new ChapterService();
