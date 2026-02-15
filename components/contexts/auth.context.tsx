"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({
  children,
  initialUser, // Serverdan kelgan tayyor user
}: {
  children: React.ReactNode;
  initialUser: any;
}) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const pathname = usePathname();
  const router = useRouter();

  // Faqat user yo'q bo'lsa (client-side'da refresh qilinganda) ishlaydi
  useEffect(() => {
    if (!initialUser) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, [initialUser]);

  // Redirect Guard (Faqat himoyalangan sahifalar uchun)
  useEffect(() => {
    const protectedRoutes = ["/profile", "/dashboard", "/manga/create"];
    if (
      !loading &&
      !user &&
      protectedRoutes.some((r) => pathname.startsWith(r))
    ) {
      router.replace(`/login?callbackUrl=${pathname}`);
    }
  }, [user, loading, pathname]);

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
