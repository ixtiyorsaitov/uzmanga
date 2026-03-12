import { AuthProvider } from "@/components/contexts/auth.context";
import { Toaster } from "../ui/sonner";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme.provider";
import NextTopLoader from "nextjs-toploader";
import userService from "@/services/user.service";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  let user = null;

  try {
    const { data: res } = await userService.getMe();

    user = res ?? null;
  } catch (err) {
    user = null;
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider initialUser={user}>{children}</AuthProvider>
        <NextTopLoader showSpinner={true} color="#3878df" />
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
