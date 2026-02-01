import api from "@/lib/axios";
import {
  ForgotPasswordInput,
  LoginInput,
} from "@/lib/validations/auth.validations";
import { ApiResponse, AuthUrlResponse, UserResponse } from "@/types/api.types";

class AuthService {
  async loginWithCredentials(
    input: LoginInput,
  ): Promise<ApiResponse<UserResponse>> {
    const { data } = await api.post<ApiResponse<UserResponse>>(
      "/auth/login",
      input,
    );
    return data;
  }

  async forgotPassword(input: ForgotPasswordInput): Promise<ApiResponse> {
    const { data } = await api.post<ApiResponse>(
      "/auth/forgot-password",
      input,
    );
    return data;
  }

  async getGoogleAuthUrl(): Promise<ApiResponse<AuthUrlResponse>> {
    const { data } =
      await api.post<ApiResponse<AuthUrlResponse>>("/auth/google");
    return data;
  }

  async getCurrentUser(): Promise<ApiResponse<UserResponse>> {
    const { data } = await api.get<ApiResponse<UserResponse>>("/auth/me");
    return data;
  }

  async refreshToken(): Promise<ApiResponse> {
    const { data } = await api.post<ApiResponse>("/auth/refresh");
    return data;
  }

  async logout(): Promise<ApiResponse> {
    const { data } = await api.post<ApiResponse>("/auth/logout");
    return data;
  }
}

export default new AuthService();
