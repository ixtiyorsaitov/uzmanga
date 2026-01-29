import { useEffect, useState } from "react";
import Login from "./login";
import Link from "next/link";
import Register from "./register";
import ForgotPassword from "./forgot-password";

export type AuthMethod = "login" | "register" | "forgotPassword";

const AuthContent = ({ onReady }: { onReady?: () => void }) => {
  const [method, setMethod] = useState<AuthMethod>("login");
  useEffect(() => {
    onReady?.();
  }, []);
  return (
    <>
      {method === "login" ? (
        <Login setMethod={setMethod} />
      ) : method === "register" ? (
        <Register setMethod={setMethod} />
      ) : (
        method === "forgotPassword" && <ForgotPassword setMethod={setMethod} />
      )}
      <div>
        {method === "login" ? (
          <h1 className="text-sm text-center">
            {"Hisobingiz yo'qmi? "}
            <span
              onClick={() => setMethod("register")}
              className="text-primary hover:underline cursor-pointer font-semibold"
            >
              {"Ro'yxatdan o'ting"}
            </span>
          </h1>
        ) : (
          method === "register" && (
            <h1 className="text-sm text-center">
              {"Hisobingiz bormi? "}
              <span
                onClick={() => setMethod("login")}
                className="text-primary hover:underline cursor-pointer font-semibold"
              >
                {"Kirish"}
              </span>
            </h1>
          )
        )}
      </div>
      {method !== "forgotPassword" && (
        <div>
          <p className="text-xs text-center">
            {`«${method === "register" ? "Ro'yhatdan o'tish" : method === "login" && "Kirish"}» tugmasini bosish orqali siz `}
            <Link
              href="/user-agreement"
              className="hover:underline text-primary cursor-pointer font-semibold"
            >
              foydalanuvchi shartnomasi
            </Link>
            {" va "}
            <Link
              href="/privacy-policy"
              className="hover:underline text-primary cursor-pointer font-semibold"
            >
              maxfiylik siyosatini qabul qilasiz.
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default AuthContent;
