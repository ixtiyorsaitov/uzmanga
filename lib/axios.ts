// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
  withCredentials: true,
});

// Token yangilash jarayoni bajarilayotganligini kuzatish
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 xato va bu retry qilinmagan so'rov
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Agar token yangilash jarayoni davom etayotgan bo'lsa
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
        // Token yangilash
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // Muvaffaqiyatli yangilangandan keyin kutayotgan so'rovlarni bajarish
        processQueue();
        isRefreshing = false;

        // Asl so'rovni qayta yuborish
        return api(originalRequest);
      } catch (refreshError) {
        // Token yangilash muvaffaqiyatsiz bo'lsa
        processQueue(refreshError);
        isRefreshing = false;

        // Cookie'larni tozalash (ixtiyoriy - server tozalashi kerak)
        // Foydalanuvchini login sahifasiga yo'naltirish AuthProvider orqali bo'ladi

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(
      error.response?.data || { message: "Noma'lum xatolik" },
    );
  },
);

export default api;
