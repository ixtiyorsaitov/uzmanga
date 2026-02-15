import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve()));
  failedQueue = [];
};

api.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    if (allCookies) config.headers.Cookie = allCookies;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshConfig: any = { withCredentials: true };
        if (typeof window === "undefined") {
          const { cookies } = await import("next/headers");
          const cookieStore = await cookies(); // await qo'shildi
          refreshConfig.headers = { Cookie: cookieStore.toString() };
        }
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
          {},
          refreshConfig,
        );
        processQueue();
        return api(originalRequest);
      } catch (re) {
        processQueue(re);
        return Promise.reject(re);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error.response?.data || error);
  },
);

export default api;
