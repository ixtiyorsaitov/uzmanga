export interface IErrorResponse {
  success: false;
  message: string;
}

export interface ISuccessResponse<T> {
  success: true;
  data: T;
}

export type IAuthProviders = "google" | "telegram";

export interface IMedia {
  _id: string;
  url: string;
  type: string;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
