"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/types/user";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: IUser | null;
}

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(!initialUser);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, [initialUser]);

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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
