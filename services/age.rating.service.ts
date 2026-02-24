import api from "@/lib/axios";
import { AgeRatingSchema } from "@/lib/validations/age.rating.validations";
import { ApiResponse } from "@/types/api.types";
import { IAgeRating } from "@/types/age.rating";

class AgeRatingService {
  async getAgeRatings(): Promise<ApiResponse<IAgeRating[]>> {
    const { data: response } = await api.get("/age-ratings");
    return response;
  }

  async createAgeRating(
    data: AgeRatingSchema,
  ): Promise<ApiResponse<IAgeRating>> {
    const { data: response } = await api.post("/age-ratings", data);
    return response;
  }
}

export default new AgeRatingService();
