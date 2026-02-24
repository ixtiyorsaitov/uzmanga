import api from "@/lib/axios";
import { CategorySchema } from "@/lib/validations/category.validation";
import { ApiResponse } from "@/types/api.types";
import { ICategory } from "@/types/category";

class CategoryService {
  async getCategories(): Promise<ApiResponse<ICategory[]>> {
    const { data: response } = await api.get("/categories");
    return response;
  }

  async createCategory(data: CategorySchema): Promise<ApiResponse<ICategory>> {
    const { data: response } = await api.post("/categories", data);
    return response;
  }
}

export default new CategoryService();
