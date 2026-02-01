import api from "@/lib/axios";

const loginWithGoogle = async () => {
  const { data: generateUrlResponse } = await api.post("/auth/google");
  return generateUrlResponse;
};

export default loginWithGoogle;
