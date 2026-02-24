import { AuthProvider } from "@/components/contexts/auth.context";
import { Toaster } from "../ui/sonner";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme.provider";
import api from "@/lib/axios";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  let user = null;

  try {
    const { data: res } = await api.get("/auth/me");

    user = res.data.user;
  } catch (err) {
    user = null;
  }
  return (
    <AuthProvider initialUser={user}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
