import api from "@/lib/axios";
import { TranslationStatusSchema } from "@/lib/validations/translation.status.validations";
import { ApiResponse } from "@/types/api.types";
import { ITranslationStatus } from "@/types/translation.status";

class TranslationStatusService {
  async getTranslationStatus(): Promise<ApiResponse<ITranslationStatus[]>> {
    const { data: response } = await api.get("/translation-statuses");
    return response;
  }

  async createTranslationStatus(
    data: TranslationStatusSchema,
  ): Promise<ApiResponse<ITranslationStatus>> {
    const { data: response } = await api.post("/translation-statuses", data);
    return response;
  }
}

export default new TranslationStatusService();
