import api from "@/lib/axios";
import { ForgotPassword } from "@/lib/validations/auth.validations";

const forgotPassword = async (data: ForgotPassword) => {
  const { data: res } = await api.post("/auth/forgot-password", data);
  return res;
};

export default forgotPassword;
