import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { IUser } from "@/types/user";
import { cache } from "react";

class UserService {
  getMe = cache(async (): Promise<ApiResponse<IUser>> => {
    const response = await api.get("/auth/me");
    return response.data;
  });
}

export default new UserService();
