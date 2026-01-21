"use client";

import { IUser } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

type Status = "authenticated" | "unauthenticated" | "loading";

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  status: Status;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const router = useRouter();

  const logout = () => {
    setStatus("unauthenticated");
    setUser(null);

    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser, status, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
