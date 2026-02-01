export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface AuthUrlResponse {
  url: string;
}

export interface UserResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    provider: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
