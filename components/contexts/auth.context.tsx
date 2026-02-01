"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const initAuth = async () => {
    try {
      setLoading(true);
      const { data: res } = await api.get("/auth/me");

      setUser(res.data.user);
    } catch (err: any) {
      console.error("Auth initialization failed:", err);
      setUser(null);

      // Himoyalangan sahifalarda bo'lsa, login'ga yo'naltirish
      const protectedRoutes = [
        "/profile",
        "/dashboard",
        "/settings",
        "/manga/create",
      ];
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (isProtectedRoute) {
        const url = `/login?callbackUrl=${encodeURIComponent(pathname)}`;
        router.replace(url);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []); // Faqat mount bo'lganda ishga tushadi

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, initAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
