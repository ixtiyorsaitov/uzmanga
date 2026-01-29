import AuthService from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: AuthService.login,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
  });
};
