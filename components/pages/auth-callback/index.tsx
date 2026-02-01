"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackClient = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTo = localStorage.getItem("redirect_to");
    if (redirectTo) {
      router.push(redirectTo);
      localStorage.removeItem("redirect_to");
    }
  }, [router]);

  return <div>Redirecting...</div>;
};

export default AuthCallbackClient;
