import api from "@/lib/axios";
import { GenreSchema } from "@/lib/validations/genre.validation";
import { ApiResponse } from "@/types/api.types";
import { IGenre } from "@/types/genre";

class GenreService {
  async getGenres(): Promise<ApiResponse<IGenre[]>> {
    const { data: response } = await api.get("/genres");
    return response;
  }

  async createGenre(data: GenreSchema): Promise<ApiResponse<IGenre>> {
    const { data: response } = await api.post("/genres", data);
    return response;
  }
}

export default new GenreService();
