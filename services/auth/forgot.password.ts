import api from "@/lib/axios";
import { ForgotPasswordInput } from "@/lib/validations/auth.validations";

const forgotPassword = async (data: ForgotPasswordInput) => {
  const { data: res } = await api.post("/auth/forgot-password", data);
  return res;
};

export default forgotPassword;
