import api from "@/lib/axios";
import { MangaStatusSchema } from "@/lib/validations/manga.status.validations";
import { ApiResponse } from "@/types/api.types";
import { IMangaStatus } from "@/types/manga.status";

class MangaStatusService {
  async getMangaStatus(): Promise<ApiResponse<IMangaStatus[]>> {
    const { data: response } = await api.get("/manga-statuses");
    return response;
  }

  async createMangaStatus(
    data: MangaStatusSchema,
  ): Promise<ApiResponse<IMangaStatus>> {
    const { data: response } = await api.post("/manga-statuses", data);
    return response;
  }
}

export default new MangaStatusService();
