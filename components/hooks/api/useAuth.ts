import AuthService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: AuthService.loginWithCredentials,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
  });
};

export const useLoginWithGoogle = () => {
  return useMutation({
    mutationFn: AuthService.getGoogleAuthUrl,
  });
};
