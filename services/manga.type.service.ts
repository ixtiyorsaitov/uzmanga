import api from "@/lib/axios";
import { MangaTypeSchema } from "@/lib/validations/manga.type.validations";
import { ApiResponse } from "@/types/api.types";
import { IMangaType } from "@/types/manga.type";

class MangaTypeService {
  async getMangaTypes(): Promise<ApiResponse<IMangaType[]>> {
    const { data: response } = await api.get("/manga-types");
    return response;
  }

  async createMangaType(
    data: MangaTypeSchema,
  ): Promise<ApiResponse<IMangaType>> {
    const { data: response } = await api.post("/manga-types", data);
    return response;
  }
}

export default new MangaTypeService();
