export interface IErrorResponse {
  success: false;
  message: string;
}

export interface ISuccessResponse<T> {
  success: true;
  data: T;
}

export type IAuthProviders = "google" | "telegram";
