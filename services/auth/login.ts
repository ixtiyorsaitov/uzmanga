import api from "@/lib/axios";
import { LoginInput } from "@/lib/validations/auth.validations";

const login = async (data: LoginInput) => {
  const { data: res } = await api.post("/auth/login", data);
  return res;
};

export default login;
